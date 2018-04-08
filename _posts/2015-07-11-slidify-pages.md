---
layout: post
title: Simple Emacs presentations for coders.
---

![slidify-pages-mode](/images/slidify-pages.gif "slidify-pages-mod")

I've really come to enjoy the practice of regular, scheduled
skill-sharing sessions among distributed teams. At Outpace, where I
first encountered these sessions, they were dubbed "Learn You A
Thing," and the topics ranged from
[Pixie](https://github.com/pixie-lang/pixie) internals to
[core.async](https://github.com/clojure/core.async) to Montessori
schooling to advanced Excel-fu (this last from the a member of the
business team).

At my current employer, we're working to establish a similar
tradition, so last week I gave a short presentation (over video chat
and a shared screen) on error handling and the debugger in Common
Lisp. I wanted to be able to evaluate pre-prepared code live in the
REPL, so it was clear I'd be using Emacs and Slime, but I also wanted
to be able to navigate between "slides," displaying only the relevant
content at any one time. I looked into the various Emacs presentation
modes, but none seemed to do exactly what I
needed. [`org-present`](https://github.com/rlister/org-present) and
similar options require you to structure your slides as an `org-mode`
file, meaning I would lack the Slime integration I wanted (`org-babel`
is nice, but not as nice as Slime for Common
Lisp). [`bufshow`](https://github.com/pjones/bufshow) might have
worked, but seemed oriented more toward presentations spanning several
files, and requires a separate presentation definition.

So I threw together the extremely minimalist
[`slidify-pages`](https://github.com/enaeher/slidify-pages), which
simply lets you navigate, slide-style, between pages in any Emacs
buffer, narrowing the buffer to display only the current page. (Pages
are defined using the standard Emacs
[`page-delimiter`](http://www.gnu.org/software/emacs/manual/html_node/emacs/Pages.html),
by default <kbd>^L</kbd> at the beginning of a line.) This let me structure my
presentation as a regular Lisp file, with code samples inline and
notes in the comments.

I really enjoyed showing off some of the capabilities of Slime's
debugger and inspector, along with the Lisp condition system, and my
simple slide system worked well, stayed out of the way, and got me a
little closer to my life goal of never needing to leave Emacs for any
reason at any time.
