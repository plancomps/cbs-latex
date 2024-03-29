# Macros
{: .no_toc }

This page explains how to mark up CBS specifications in LaTeX when using the `cbs-latex` package.
It also provides links to the macro definitions for use with LaTeX, KaTeX, and MathJax.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

----

Markup using CBS-LaTeX is quite low-level. This makes it easy to adjust the
layout to fit the intended page width, but tedious to write.[^generation]

[^generation]: 
    Generation of marked-up CBS from CBS source text is currently being implemented in [Spoofax];
    when complete, the tool will be made freely available as an Eclipse plugin.

CBS-LaTeX provides the following files:

- [`cbs-latex.sty`]\: a package of macro definitions for use in LaTeX documents
- [`cbs-katex.sty`]\: a configuration defining [KaTeX] macros for use in web pages
- [`cbs-mathjax.sty`]\: a configuration defining [MathJax] macros for use in web pages

The packages include some explanatory comments.
Each package defines the same collection of LaTeX macro names, taking the same arguments.
The rendering of the macros should have the same layout and symbols,
regardless of which format is used, except that the font families may differ.

All macro names are uppercase, to reduce the risk of clashes with macros defined by other packages.[^prefix]
They are intended for use primarily in math mode.

[^prefix]:
    An alternative would be to prefix all macro names with `cbs`.

## Required packages

When used with $$\LaTeX$$, the `cbs-latex` package requires the following packages (all included in [TeXLive]):

`amsmath`
: Provides various environments and commands for math alignment, including the `align` and `aligned` environments.

`amssymb`
: Provides an extended math symbol collection, including $$\leadsto$$.

`stmaryrd`
: Provides symbols for TCS, including $$\llbracket$$ and $$\rrbracket$$.

`textcomp`
: Provides commands for various characters in text mode, including $$\LEX{\APOSTROPHE}$$.[^implicit]

`xcolor`
: The `svgnames` option provides color names that can also be used on web pages (see the [W3schools Colors Tutorial]).

`hyperref`
: Needed for creating hyperlinks. Use `\hypersetup{filebordercolor=White}` to avoid colored boxes around references to names in CBS specifications.

[^implicit]:
    The `textcomp` package is automatically loaded in recent $$\LaTeX$$ distributions.

The following packages are not required, but using them may make the formatting of running text in $$\LaTeX$$ closer to that produced from Markdown on web pages:

`cmbright`
: Global sans-serif fonts.

`geometry`
: Allows adjustment of page dimensions. Set in the preamble, e.g., `\geometry{a4paper, textwidth=150mm, top=10mm, bottom=20mm, footnotesep=10mm plus 10mm}`.

`parskip`
: Uses blank lines to separate paragraphs.

## Names

CBS specifications involve declaration and reference of names for 
funcons, entities, syntax sorts, and semantic functions.[^sections]
The macro used for a name depends on the namespace.
Names in different namespaces have different highlighting colors,
and the colors depend on the configured `color_scheme`.

[^sections]:
    CBS section numbers are also treated as names.

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `funcon-name` | `\FUN{funcon-name}` | $$\FUN{funcon-name}$$ |
| `entity-name` | `\FUN{entity-name}` | $$\FUN{entity-name}$$ |
| `syntax-name` | `\SYN{syntax-name}` | $$\SYN{syntax-name}$$ |
| `semantics-name` | `\SEM{semantics-name}` | $$\SEM{semantics-name}$$ |
| `§2.1 A section` | `\textsf{\S\SECT{2.1} A section}` | $$\textsf{\S\SECT{2.1} A section}$$ |

### Hyperlinks

Variants of the name markup macros indicate that the occurrence of a name is a declaration or a reference.
In both PDFs and web pages, each name reference becomes a hyperlink to the declaration of that name.
A name should not be declared (in the same namespace) more than once per document.

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `name` | `\FUNDEC{name}` | $$\FUNDEC{name}$$ |
| `name` | `\FUNREF{name}` | $$\FUNREF{name}$$ |
| `name` | `\FUNHYP{url}{file}{name}` | $$\FUNHYP{.}{macros}{name}$$ |

Similarly for `\SYN`, `\SEM`, `\SECT`.

### Variables

The macro for variable names formats its argument in text mode.
A Greek letter used as a variable name has to be in math mode.
Subscripts should be marked up directly after the variable name,
to ensure that they are in the intended sans serif font
(and to support italic spacing correction).
Any primes and multiplicity are written after the name and subscript.

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `X'` | `\VAR{X}'` | $$\VAR{X}'$$ |
| `X12''` | `\VAR{X}\SUB{12}''` | $$\VAR{X}\SUB{12}''$$ |
| `X+` | `\VAR{X}\PLUS` | $$\VAR{X}\PLUS$$ |
| `X?` | `\VAR{X}\QUERY` | $$\VAR{X}\QUERY$$ |
| `X*` | `\VAR{X}\STAR` | $$\VAR{X}\STAR$$ |
| `Rho` | `\rho` or `\VAR{$\rho$}` | $$\VAR{$\rho$}$$ |

## Language specifications

### Grammars

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `Lexis ...` | `\KEY{Lexis} ~ ...` | $$\KEY{Lexis} ~ \ldots$$ |
| `Syntax ...` | `\KEY{Syntax} ~ ...` | $$\KEY{Syntax} ~ \ldots$$ |
| `...:... ::= ...` | `...:... ::= ...` | $$\ldots:\ldots ::= \ldots$$ |

### Syntactic phrase types

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `syntax-name` | `\SYN{syntax-name}` | $$\SYN{syntax-name}$$ |
| `'lexeme'` | `\LEX{lexeme}` | $$\LEX{lexeme}$$ |
| `P_1 P_2` | `P_1 ~ P_2` | $$P_1 ~ P_2$$ |
| `P_1 | P_2` | `P_1 \mid P_2` | $$P_1 \mid P_2$$ |
| `P+` | `P\PLUS` | $$P\PLUS$$ |
| `P?` | `P\QUERY` | $$P\QUERY$$ |
| `P*` | `P\STAR` | $$P\STAR$$ |
| `(P)` | `\LEFTGROUP P \RIGHTGROUP` | $$\LEFTGROUP P \RIGHTGROUP$$ |

### Lexemes

Characters in lexemes are marked up as follows.
Those that require macros include all the special characters of $$\LaTeX$$,
and characters that look different in text and math mode.

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `'0...9A...Za...z'` | `\LEX{0...9A...Za...z}` | $$\LEX{0...9A...Za...z}$$ |
| `'!()*,./:;=?@[]'` | `\LEX{!()*,./:;=?@[]}` | $$\LEX{!()*,./:;=?@[]}$$ |
| `'#'` | `\LEX{\HASH}` | $$\LEX{\HASH}$$ |
| `'$'` | `\LEX{\DOLLAR}` | $$\LEX{\DOLLAR}$$ |
| `'%'` | `\LEX{\PERCENT}` | $$\LEX{\PERCENT}$$ |
| `'&'` | `\LEX{\AMPERSAND}` | $$\LEX{\AMPERSAND}$$ |
| `'\''` | `\LEX{\APOSTROPHE}` | $$\LEX{\APOSTROPHE}$$ |
| `'\\'` | `\LEX{\BACKSLASH}` | $$\LEX{\BACKSLASH}$$ |
| `'^'` | `\LEX{\CARET}` | $$\LEX{\CARET}$$ |
| `'_'` | `\LEX{\UNDERSCORE}` | $$\LEX{\UNDERSCORE}$$ |
| ``'`'`` | `\LEX{\GRAVE}` | $$\LEX{\GRAVE}$$ |
| `'{'` | `\LEX{\LEFTBRACE}` | $$\LEX{\LEFTBRACE}$$ |
| `'}'` | `\LEX{\RIGHTBRACE}` | $$\LEX{\RIGHTBRACE}$$ |
| `'~'` | `\LEX{\TILDE}` | $$\LEX{\TILDE}$$ |

### Semantic functions

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
|  `Semantics s-n[[_:...]] : ...` | `\KEY{Semantics} ~ \SEMDEC{s-n} \LEFTPHRASE \_ : ... \RIGHTPHRASE : ...` | $$\KEY{Semantics} ~ \SEM{s-n} \LEFTPHRASE \_ : \nobreak \ldots \RIGHTPHRASE : \ldots$$ |
| `Rule ... = ...` | `\KEY{Rule} ~ ... = ...` | $$\KEY{Rule} ~ \ldots = \ldots$$ |
| `[[...]]` | `\LEFTPHRASE ... \RIGHTPHRASE` | $$\LEFTPHRASE \ldots \RIGHTPHRASE$$ |
| `s-n[[...]]` | `\SEMREF{s-n} \LEFTPHRASE ... \RIGHTPHRASE` | $$\SEMREF{s-n} \LEFTPHRASE \ldots \RIGHTPHRASE$$ |

## Funcon specifications

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `Funcon f-n ... : ...` | `\KEY{Funcon} ~ \FUNDEC{f-n} ... : ...` | $$\KEY{Funcon} ~ \FUN{f-n} \ldots : \ldots$$ |
| `Alias f-n1 = f-n2` | `\KEY{Alias} ~ \FUNDEC{f-n1} = \FUNREF{f-n2}` | $$\KEY{Alias} ~ \FUNDEC{f-n1} = \FUNREF{f-n2}$$ |
| `Type t-n ...` | `\KEY{Type} ~ \FUNDEC{t-n} ...` | $$\KEY{Type} ~ \FUNDEC{t-n} \ldots$$ |

### Datatype specifications

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `Datatype d-n ::= ...` | `\KEY{Datatype} ~ \FUNDEC{d-n} ::= ...` | $$\KEY{Datatype} ~ \FUNDEC{d-n} ::= \ldots$$ |
| `... | ...` | `... \mid ...` | $$\ldots \mid \ldots$$ |
| `c-n` | `\FUNDEC{c-n}` | $$\FUNDEC{c-n}$$ |
| `c-n(...)` | `\FUNDEC{c-n}(...)` | $$\FUNDEC{c-n}(\ldots)$$ |
| `{ _ : ... }` | `\{ ~ _ : ... ~ \}` | $$\{ ~ \_ : \ldots ~ \}$$ |

### Entity declarations

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `Entity ...` | `\KEY{Entity} ~ ...` | $$\KEY{Entity} ~ \ldots$$ |
| `e-n(_:...)|- _ ---> _` | `\FUNDEC{e-n}(\_:...) \vdash \_\TRANS\_` | $$\FUNDEC{e-n}(\_ : \ldots) \vdash \_ \TRANS \_$$ |
| `<_,e-n(_:...)> ---> <_,e-n(_:...)>` | `\langle\_,\FUNDEC{e-n}(\_:...)\rangle \TRANS \langle\_,\FUN{e-n}(\_:...)\rangle` | $$\langle\_,\FUN{e-n}(\_:\ldots)\rangle \TRANS \langle\_,\FUN{e-n}(\_:\ldots)\rangle$$ |
| `_ -- e-n.(_:...) -> _` | `\_ \xrightarrow{\FUNDEC{e-n}.(\_:...)} \_` | $$\_ \xrightarrow{\FUN{e-n}.(\_:\ldots)} \_$$ |

The `.` in the last line above should be `!`, `?`, or omitted.

### Rules

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `Rule ...` | `\KEY{Rule} ~ ...` | $$\KEY{Rule} ~ \ldots$$ |
| `Rule ... ⏎ ...` | `\begin{aligned} \KEY{Rule} ~ & ...\\ & ... \end{aligned}` | $$\begin{aligned}\KEY{Rule}~&\ldots\\[-2ex]&\quad\ldots\end{aligned}$$ |
| `Rule ... ⏎ ---- ⏎ ...` | `\KEY{Rule} ~ \RULE{...}{...}` | $$\KEY{Rule} ~ \RULE{\ldots}{\ldots}$$ |
| `Otherwise ...` | `\KEY{Otherwise} ~ ...` | $$\KEY{Otherwise} ~ \ldots$$ |
| `Assert ...` | `\KEY{Assert} ~ ...` | $$\KEY{Assert} ~ \ldots$$ |

### Formulae

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `... ~> ...` | `... \leadsto ...` | $$\ldots \leadsto \ldots$$ |
| `... == ...` | `... == ...` | $$\ldots == \ldots$$ |
| `... =/= ...` | `... \neq ...` | $$\ldots \neq \ldots$$ |
| `... <: ...` | `... <: ...` | $$\ldots <: \ldots$$ |
| `... ---> ...` | `... \TRANS ...` | $$\ldots \TRANS \ldots$$ |
| `e-n(...)|- ...--->...` | `\FUN{e-n}(...) \vdash ...\TRANS...` | $$\FUNREF{e-n}(\ldots) \vdash \ldots \TRANS \ldots$$ |
| `<...,e-n(...)> ---> <...,e-n(...)>` | `\langle...,\FUN{e-n}(...)\rangle \TRANS \langle...,\FUN{e-n}(...)\rangle` | $$\langle\ldots,\FUN{e-n}(\ldots)\rangle \TRANS \langle\ldots,\FUN{e-n}(\ldots)\rangle$$ |
| `... -- e-n.(...) -> ...` | `...\xrightarrow{\FUN{e-n}.(...)}...` | $$\ldots\xrightarrow{\FUN{e-n}.(\ldots)}\ldots$$ |

The `.` in the last line above should be `!`, `?`, or omitted.

### Terms

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `( )` | `( ~ )` | $$( ~ )$$ |
| `'...'` | `\ATOM{text}` | $$\ATOM{text}$$ |
| `42` | `42` | $$42$$ |
| `2.14` | `2.14` | $$2.14$$ |
| `"..."` | `\STRING{text}` | $$\STRING{text}$$ |
| `... : ...` | `... : ...` | $$\ldots : \ldots$$ |
| `... => ...` | `... \TO ...` | $$\ldots \TO \ldots$$ |
| `...+` | `...\PLUS` | $$\ldots\PLUS$$ |
| `...?` | `...\QUERY` | $$\ldots\QUERY$$ |
| `...*` | `...\STAR` | $$\ldots\STAR$$ |
| `... | ...` | `... \mid ...` | $$\ldots \mid \ldots$$ |
| `... & ...` | `... \& ...` | $$\ldots \& \ldots$$ |
| `...^N` | `...^{N}` | $$\ldots^{N}$$ |
| `(..., ...)` | `(..., ...)` | $$(\ldots, \ldots)$$ |
| `[..., ...]` | `[..., ...]` | $$[\ldots, \ldots]$$ |
| `{..., ...}` | `\{..., ...\}` | $$\{\ldots, \ldots\}$$ |
| `{...|->..., ...}` | `\{... \mapsto ..., \cdots\}` | $$\{\ldots \mapsto \ldots, \cdots\}$$ |

### Other specifications

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `Auxiliary K ...` | `\KEY{Auxiliary K} ~ ...` | $$\KEY{Auxiliary K} ~ \ldots$$ |
| `Built-in K ...` | `\KEY{Built-in K} ~ ...` | $$\KEY{Built-in K} ~ \ldots$$ |
| `Meta-variables ...` | `\KEY{Meta-variables} ~ ...` | $$\KEY{Meta-variables} ~ \ldots$$ |

## Alignment

| Plain CBS | CBS-LaTeX | Formatted CBS |
| - | - | - | 
| `... ...` | `... \ ...` | $$\ldots \ \ldots$$ |
| `...   ...` | `...\quad...` | $$\ldots\quad\ldots$$ |
| `...      ...` | `...\qquad...` | $$\ldots\qquad\ldots$$ |
| `... ... ⏎    ...` | `\begin{aligned} ... ~ & ... \\ ~ & ... \end{aligned}` | $$\begin{aligned} \ldots ~ & \ldots \\ ~ & \ldots \end{aligned}$$ |

----

{% include links.md %}
