---
title: ASCII Tests
layout: cbs-mathjax-local
nav_exclude: true
---
> This page is using MathJax-3. [See the same page using MathJax-2.7](../mathjax-2.7/TEST-Start).

{::comment}{% raw %}{:/}

----

$$\KEY{Language} \quad \STRING{Test}$$

# ASCII characters

$$\begin{align*}
  \KEY{Syntax} \quad
     \SYN{test}
      \ ::= \ & \
      \LEX{{!}~{"}~{\HASH}~{\DOLLAR}~{\PERCENT}~{\AMPERSAND}~{\APOSTROPHE}~{(}~{)}~{*}~{+}~{,}~{-}~{.}~{/}~{:}~{;}} \\
      \ \mid \ & \ \LEX{{<}~{=}~{>}~{?}~{@}~{[}~{\BACKSLASH}~{]}~{\CARET}~{\UNDERSCORE}~{\GRAVE}~{\LEFTBRACE}~{|}~{\RIGHTBRACE}~{\TILDE}~A~Z~a~z~0~9}
\end{align*}$$

The apostrophe and the backslash have to be escaped in CBS:

```
Syntax
  test ::= '! " # $ % & \' ( ) * + , - . / : ;'
         | '< = > ? @ [ \\ ] ^ _ ` { | } ~ A Z a z 0 9'
```




[Funcons-beta]: /CBS-beta/math/Funcons-beta
  "FUNCONS-BETA"
[Unstable-Funcons-beta]: /CBS-beta/math/Unstable-Funcons-beta
  "UNSTABLE-FUNCONS-BETA"
[Languages-beta]: /CBS-beta/math/Languages-beta
  "LANGUAGES-BETA"
[Unstable-Languages-beta]: /CBS-beta/math/Unstable-Languages-beta
  "UNSTABLE-LANGUAGES-BETA"
[CBS-beta]: /CBS-beta
  "CBS-BETA"
[TEST-Start.cbs]: https://github.com/plancomps/CBS-beta/blob/master/Unstable-Languages-beta/Test/TEST-cbs/TEST/TEST-Start/TEST-Start.cbs
  "CBS SOURCE FILE ON GITHUB"
[PLAIN]: /CBS-beta/docs/Unstable-Languages-beta/Test/TEST-cbs/TEST/TEST-Start
  "CBS SOURCE WEB PAGE"
 [PRETTY]: /CBS-beta/math/Unstable-Languages-beta/Test/TEST-cbs/TEST/TEST-Start
  "CBS-KATEX WEB PAGE"
[PDF]: /CBS-beta/math/Unstable-Languages-beta/Test/TEST-cbs/TEST/TEST-Start/TEST-Start.pdf
  "CBS-LATEX PDF FILE"
[PLanCompS Project]: https://plancomps.github.io
  "PROGRAMMING LANGUAGE COMPONENTS AND SPECIFICATIONS PROJECT HOME PAGE"
{::comment}{% endraw %}{:/}
