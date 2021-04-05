---
title: Home
layout: default
nav_exclude: true
---
# CBS-LaTeX

This site presents `cbs-latex`, a small LaTeX package for CBS specifications.
When CBS is marked up using the package, LaTeX formatting produces mathematical
typography, suitable for inclusion in published articles.

It also includes [KaTeX] and [MathJax] configurations that produce similar-looking
results from the same LaTeX mark-up when embedded in web pages.

The highlighting of CBS symbols by `cbs-latex` is comparable to that shown on
the [CBS-beta] website (and to that provided by the CBS editor implemented in
[Spoofax]). Navigation in CBS specifications is supported by hyperlinks from names
to declarations.

Markup using `cbs-latex` is quite low-level. This makes it easy to adjust the
layout to fit the intended page width, but tedious to write. Generation of
marked-up CBS from CBS source text is currently being implemented in Spoofax;
when complete, the tool will be made freely available as an Eclipse plugin.

{% include links.md %}
