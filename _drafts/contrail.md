---
layout: post
title: Tracing Clojure with Contrail.
---

One of the great things about the "[better is better](http://www.jwz.org/doc/worse-is-better.html)"[^1] ethos in the Common Lisp community is that it's given rise to a culture of very good tools. For example, the Common Lisp [`trace`](http://www.ai.mit.edu/projects/iiip/doc/CommonLISP/HyperSpec/Body/mac_tracecm_untrace.html) macro is defined to allow implementation-dependent additional argument formats, and most implementations take advantage of this to [extend it in interesting ways](http://netzhansa.blogspot.com/2012/02/traces-of-awesomeness.html). In particular, [SBCL](http://www.sbcl.org/manual/#Function-Tracing) provides a number of useful options, and I've missed having this functionality when working in Clojure. So I'm making [Contrail](http://github.com/enaeher/contrail), which is an attempt to bring some of the nice features of SBCL's interactive `trace` facility to Clojure. It's built using the [Richelieu](https://github.com/thunknyc/richelieu) advice (in the Emacs Lisp sense) library with a few tweaks to support advice that persists when an interactively traced var is re-defined (typically by the user re-compiling her source file).

There are a number of tools in this space, most notably [clojure.tools.trace](https://github.com/clojure/tools.trace), which ships with Clojure, but they lack much of the functionality of the SBCL tool. The "persistent trace" feature described above is a good example, in fact, of some underlying differences between the "better-is-better" ethos of Common Lisp and the "worse-is-better" ethos which Clojure shares with much of today's mainstream programming community[^2]. Choosing whether or not to implement this feature involves making an explicit choice between interface complexity and implementation complexity.

If you choose simplicity of implementation, you'll advise a function bound to a var by re-binding the var to a new function which does the advising and then calls the original function. When the source file is re-compiled, your advised definition is replaced by the unadvised definition in the source. You incur complexity in the interface: whenever the user wants to recompile her source file, if she wants to continue seeing trace output she must remember whether she had previously traced any vars defined in that file, and with which options, and then she must re-trace them with those same options.

From the user's perspective, interactive tracing is orthogonal to redefining a var, and a traced var should stay traced until she takes explicit action to untrace it. But the implementation complexity that this invites is considerable. It's no longer possible to store all of the information regarding trace state on the traced var itself (since `defn` replaces not only the existing value of a var but its metadata as well), so there is no longer a single source of truth

Additionally, it becomes necessary to monitor changes to the var's value and re-trace it as required&mdash;and of course you need to distinguish between changes made by the tracing library (e.g. when a user explicitly untraces) and those made elsewhere:

{% highlight clojure %}

(defn get-watcher
  "Returns a function suitable for use by `add-watcher` which will
  watch a var and re-advise it with `advice-fn` whenever it changes."
  [advice-fn]
  (fn [_ advised-var _ new-var-value]
    (when-not *suppress-readvising?*
      (binding [*suppress-readvising?* true]
        (println advised-var "changed, re-tracing.")
        (unadvise* advised-var)
        (advise* advised-var advice-fn)))))

(add-watch f "contrail" (get-watcher final-advice-fn))
{% endhighlight %}

[^1]: Gabriel calls this the "the right thing" ethos, but I think this connotes something more rigid and deterministic than the design process and belief system which he is actually describing.

[^2]: There are notable exceptions, of course: Apple frequently attempts to build simple interfaces concealing implementation complexity (e.g. Handoff, various cross-device syncing) with mixed results.