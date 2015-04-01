---
layout: post
title: WebKit Bug 29055.
---

After this last redesign I spent days tearing my hair out over one nasty little alignment issue I couldn't figure out. In the masthead, this markup:
{% highlight html %}
<p>
  <i>by</i> Eli Naeher
  <br>
  (<a href="http://portfolio.flyoverblues.com">
    hire me
  </a>)
  <br>
  (<a href="mailto:eli@flyoverblues.com">
    send me mail
  </a>)
  <br>
  (<a href="http://codeanddata.com/pgp.txt">
    encrypt it
  </a>)
</p>
{% endhighlight %}

looked like this in Chrome:

<div class="embed">
  <img src="/images/webkit-bug.png" alt="Image showing WebKit rendering problem">
</div>

As you can see, the last line is slightly to the right (or, more accurately, all lines but the last are slightly to the left of the rightmost edge of the containing paragraph).

It turns out that this is <a href="https://bugs.webkit.org/show_bug.cgi?id=29055">WebKit bug 29055</a> (though the bug describes an issue where <code>text-align: center</code> rather than <code>text-align: right</code>, the problematic behavior is the same). It seems to manifest only when a series of lines are interrupted with <code>&lt;br&gt;</code> elements&mdash;if the text is allowed to wrap naturally it renders correctly.

Of course, you can easily work around this bug by adding a trailing <code>&lt;br&gt;</code>. Nonetheless it worries me that the ticket was opened in 2009 and has apparently seen no activity whatsoever since.

