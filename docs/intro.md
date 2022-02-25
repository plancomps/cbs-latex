---
title: Introduction
layout: cbs-katex
---

# Introduction

The [Local browsing] page explains how to build and browse a copy of this website.

The [Macros] page explains how to mark up CBS specifications when using the CBS-LaTeX package.
It provides links to the macro definitions for use with LaTeX, [KaTeX], and [MathJax].

The [Samples] page links to marked-up CBS specifications,
and to the results of formatting them to produce web pages and PDFs.
It also explains how the web pages and PDFs were produced
using [Jekyll], [kramdown], and LaTeX.

The [Issues] page on GitHub is to list known problems with the package.

# Browsing

PDFs

: Acrobat Reader is recommended. 
  The Preview app on macOS does not support hyperlinks from references to declarations,
  which are needed for navigation in multi-file CBS specifications.

  PDFs can also be browsed directly in Firefox.

Web pages

: Currently, KaTeX renders the CBS-LaTeX markup faster than MathJax.
  For example, compare this [KaTeX page](katex/SIMPLE-3-Statements) with the corresponding
  [MathJax page](mathjax-3/SIMPLE-3-Statements).

  The appearance of the web pages (at least when using recent versions of Firefox and Safari)
  is close to that of the PDFs produced from the same CBS files using pdflatex.

[Local browsing]: local
[Macros]: macros
[Samples]: samples
[Issues]: https://github.com/plancomps/cbs-latex/issues

{% include links.md %}
