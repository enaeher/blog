---
layout: post
title: Testing with embedded Postgres in Clojure.
tag: clojure
---

When writing tests, I've often simulated Postgres using in-memory Java
SQL databases like [HSQL](http://hsqldb.org/)
or [H2](http://www.h2database.com/). In general this has been a
frustrating experience. While both have modes which purport to offer
syntax compatibility with Postgres, neither has true feature parity,
and it's always a struggle to "test what you fly." So you can imagine
how excited I was to discover just how easy it is to embed[^1] a real,
no-kidding Postgres server in your Clojure application, thanks to
OpenTable's
[Embedded Postgres](https://github.com/opentable/otj-pg-embedded)
component.

I originally discovered this component via
the [lein-postgres](https://github.com/whostolebenfrog/lein-postgres)
plugin, but it didn't really mesh with my REPL-heavy workflow, so I
decided to manage the embedded Postgres instance from within my own
code. This turns out to be very straightforward.

To begin, add the component's coordinates to profile.clj (probably in
your dev or test profile):

{% highlight clojure %}

[com.opentable.components/otj-pg-embedded "0.7.1"]

{% endhighlight %}

And import the class in your `ns` form:

{% highlight clojure %}

(:import [com.opentable.db.postgres.embedded EmbeddedPostgres])

{% endhighlight %}

Then:

{% highlight clojure %}

user> (def pg (-> (EmbeddedPostgres/builder)
                  .start))
#'user/pg
user> (def subname (str "//localhost:" (.getPort pg) "/postgres"))
#'user/subname
user> (def db-spec {:classname "org.postgresql.Driver"
                    :subprotocol "postgresql"
                    :subname subname
                    :user "postgres"})
#'user/db-spec
user> (jdbc/with-db-connection [db db-spec]
        (jdbc/query db "select version()"))
({:version
  "PostgreSQL 9.5.3 on x86_64-apple-darwin, compiled by i686-apple-darwin11-llvm-gcc-4.2 (GCC) 4.2.1 (Based on Apple Inc. build 5658) (LLVM build 2336.11.00), 64-bit"})

{% endhighlight %}

The Postgres process runs as a child of the Java process, and there
are no external dependencies. By default, it empties the data
directory that it uses each time it starts up, although this is
configurable, as are the data directory location, port number,
etc. (see the OpenTable documentation). You can even connect to the
server with the psql client.

I ended up using clojure.test fixtures to manage the lifecycle of the
database server:

{% highlight clojure %}

(defn with-postgres [f]
  (let [db (-> (EmbeddedPostgres/builder)
               (.setPort port)
               (.start))]
    (try
      (f)
      (finally
        (.close db)))))

(t/use-fixtures :once with-postgres)

{% endhighlight %}

You can even directly load schema dumps generated
with
[pg_dump](https://www.postgresql.org/docs/9.6/static/app-pgdump.html)--try
that with HSQL!

{% highlight clojure %}

(defn with-schema [f]
  (jdbc/with-db-connection [db db-spec]
    (jdbc/execute! db (slurp (io/resource "schema.ddl")))
    (f)))

(t/use-fixtures :once (t/join-fixtures [with-postgres with-schema]))

{% endhighlight %}

As a die-hard Postgres fan I've found it liberating to be able to
really take advantage of Postgres's advanced features without giving
up solid tests--tests which exercise not only my code but my
understanding of how Postgres will behave.

([source for the examples used in this post](https://github.com/enaeher/embedded-postgres-demo))

[^1]: I'm playing a little fast and loose with the word "embedded"
    here--in fact, Postgres runs as a separate child process, so it's
    not truly embedded in the sense that SQLite is embedded. My
    terminology follows OpenTable's description of its component.
