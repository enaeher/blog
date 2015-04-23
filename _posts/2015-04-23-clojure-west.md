---
title: Clojure/West 2015.
layout: post
tag: clojure
---

{% flickr_photo 17248486811 "Medium 800" %}

I'm just back from lovely Portland (my first visit since 2005--damn,
has it been that long?), where I attended [Clojure/West
2015](http://clojurewest.org/)--my first Clojure conference. It's been
a wonderful experience thanks to the speakers and organizers, but
also to the half-dozen or more of my fellow former Outpacers with whom
I was able to catch up.

Below I've described a few of the talks
that stood out to me. (There were many other excellent talks I saw
which I haven't mentioned here, as well as talks I missed but have
heard good things about. Make sure to check out the [whole
list](https://www.youtube.com/user/ClojureTV)--and thank you to
Cognitect for making these talks freely available online so quickly.)

## [Programming Clojure, Smalltalk-Style](https://www.youtube.com/watch?v=qQvvgzvPgQI)

[Robert Krahn](http://robert.kra.hn/) described
[cloxp](http://cloxp.github.io/cloxp-intro.html), a web-based
environment for exploratory programming in Clojure. Cloxp looks
intriguing, and it's immensely encouraging to see people thinking
creatively about the environments in which we spend our working
lives. Krahn mentioned as a good description of the Smalltalk
development environment a blog post called ["Swimming with the
Fish"](http://simberon.blogspot.com/2013/01/swimming-with-fish.html),
which is worth reading in its entirety:

> As a Smalltalker, you're used to "swimming with the fish".  You live
  in the same world as the objects you're exploring.  You can reach
  out and touch them, manipulate them, turn things and see how it
  feels. You can go anywhere and do anything.  You can go behind the
  scenes and figure things out.


## [Boot Can Build It](https://www.youtube.com/watch?v=TcnzB2tB-8Q)

[Alan Dipert](http://tailrecursion.com/~alan/index.cgi/index) and
[Micha Niskin](http://micha.github.io/) presented their new build
framework, [Boot](http://boot-clj.com/). There are some echoes of
[ASDF](https://common-lisp.net/project/asdf/) in the idea of using
composable tasks which can run arbitrary code--I'd love to know
whether the Boot authors were familiar with it.

Even more interesting was the FileSet abstraction which serves as the
fundamental structure exchanged between tasks, serving a role
analogous to text streams in Unix pipes.

I was on the fence about switching to Boot from Leiningen, but this
talk sold me on giving it a try for my next project.

## [Well I Wouldn't Want to Make a \*Dys\*functional Game](https://www.youtube.com/watch?v=TDDJsKLUh1Y)

To be honest, I wasn't expecting to get much out of this talk--I'm not
a gamer and have little interest in game programming. But I ended up
really enjoying it, mostly because it turned out to be what the
speaker ([Morgan Mullaney](https://github.com/morgan-mullaney))
described as "an anthropological exploration of Lisp in games." It was
fascinating to hear the details of how Lisp was used in games like
Abuse and Vendetta Online (where the developers, apparently made of
sterner stuff than I, used the REPL to script one-off in-game events
in real time in production).

This talk also reminded me of [David
O'Toole](http://xelf.me/profile.html)'s amazing work around
[Xelf](http://xelf.me/), an "Emacs for games" written in Common Lisp,
which I really need to explore in detail someday. (OK, maybe I have some interest
in game programming after all.)

## [Domain-Specific Type Systems](https://www.youtube.com/watch?v=gY0H0KVc_h0)

[Nathan Sorenson](https://github.com/takeoutweight) described a
lightweight DSL for describing types which he built at
[SparkFund](http://sparkfund.co), but the specifics of this system
weren't what made this talk so great. He used the system as a way to
talk about *what types are for* (expressing abstractions, not
enforcing correctness). My favorite (paraphrased) quote: "Saying that
types are a premature optimization is like saying that design is a
premature optimization." This might be the talk that finally convinces
me to learn Haskell.

## [Purely Random](https://www.youtube.com/watch?v=u0t-6lUvXHo)

[Gary Fredericks](http://gfredericks.com/) made RNGs much more
interesting to me than I would have thought possible. I shouldn't have
been surprised; he gave the excellent (and well-titled) presentation
[*Vars Vars Vars Vars Vars Vars Vars Vars Vars Vars
Vars*](http://gfredericks.com/speaking/2015-02-25-vars.pdf) at the
Chicago Clojure meetup in February, which was not only (like this
talk) more entertaining than it had any right to be but also very
helpful to me as I implemented
[Contrail](https://github.com/enaeher/contrail)'s persistent-advice
feature.

The short version: splittable, immutable random number generation is
key to a lot of desired `test.check` use cases, but is a surprisingly
tricky thing to implement.

## [Adapting Clojure to an Intro CS Classroom](https://www.youtube.com/watch?v=k5erDyDPzgc )

I have to confess that it was probably 10 or 15 minutes into this talk
before I realized that the speaker, [Elena
Machkasova](http://cda.morris.umn.edu/~elenam/), was the adviser on
["Improving Error Messages in the Clojure Programming
Language,"](http://cda.morris.umn.edu/~elenam/publications/mics2011clojure.pdf)
a paper I stumbled upon after getting fed up with (some of) Clojure's
error messages. Since this is a particular hobby-horse of mine, I
enjoyed the talk and it lead to some great discussion during the Q&A.

## Developing ClojureScript with Figwheel

I almost didn't go to this talk. I haven't used ClojureScript and do
little front-end work these days. The talk scheduled opposite, Anthony
Marcar's [_Clojure at
Scale_](https://www.youtube.com/watch?v=av9Xi6CNqq40), looked
interesting and relevant to the work that I've been doing
recently. (In fact I'm told it was great and plan to watch it
shortly.)

But I do have a weakness for interesting development tools
and environments. And then I saw that Bruce Hauman [lives in a
geodesic dome which he designed and
built](http://rigsomelight.com/2013/09/09/frameless-geodesic-dome.html),
and, well, how could I not go to his talk?

[Figwheel](https://github.com/bhauman/lein-figwheel) allows you
to make REPL-style changes to the running ClojureScript code in a live
browser (or even multiple browsers simultaneously!) over WebSockets
without losing DOM or other application state. It's the tool I always
wanted back when I did work on the front end--a really impressive
achievement. All in all, a big win for my dome-oriented
decision-making technique; +1, would use again. (There's no link to
the video because it is embargoed until after Euroclojure.)

## [Visual Situation Recognition: An Integration of Deep Networks and Analogy-Making](https://www.youtube.com/watch?v=I1ay-iwk2sI)

I've heard several people describe this, the closing keynote, as the
standout talk of the conference, as it was for me. [Dr. Melanie
Mitchell](http://web.cecs.pdx.edu/~mm/) talked about her Common Lisp
analogy-making software
[Copycat](http://web.cecs.pdx.edu/~mm/how-to-get-copycat.html) and
gave a demo (using a modified Scheme version called
[Metacat](http://science.slc.edu/~jmarshall/metacat/)), then described
her current research in using similar analogy-making techniques in
conjunction with image recognition tools to perform "situation
recognition." I'm not doing it justice; watch this one if you want to
get excited about what we can do with computers.