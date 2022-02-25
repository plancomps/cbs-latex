---
title: Language specifications
layout: cbs-mathjax-local
nav_exclude: true
---

> This page is using MathJax-3. [See the same page using MathJax-2.7](../mathjax-2.7/SIMPLE-3-Statements).

{:.note}
> Links to non-local declarations are disabled on this sample page.

{::comment}{% raw %}{:/}


----

$$\KEY{Language} \quad \LANG{\STRING{SIMPLE}}$$

# $$\SECT{3}$$ Statements {#SectionNumber:3}


$$\begin{align*}
  \KEY{Syntax} \quad
    \VARDEC{Block} : \SYNDEC{block}
      \ ::= \ & \
      \LEX{{\LEFTBRACE}} \ \SYNREF{stmts}\QUERY \ \LEX{{\RIGHTBRACE}}
    \\
    \VARDEC{Stmts} : \SYNDEC{stmts}
      \ ::= \ & \
      \SYNREF{stmt} \ \SYNREF{stmts}\QUERY
    \\
    \VARDEC{Stmt} : \SYNDEC{stmt}
      \ ::= \ & \
      \SYNREF{imp-stmt} \mid \SYNHYP{../.}{SIMPLE-4-Declarations}{vars-decl}
    \\
    \VARDEC{ImpStmt} : \SYNDEC{imp-stmt}
      \ ::= \ & \
      \SYNREF{block} \\
      \ \mid \ & \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exp} \ \LEX{{;}} \\
      \ \mid \ & \ \LEX{if} \ \LEX{{(}} \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exp} \ \LEX{{)}} \ \SYNREF{block} \ \LEFTGROUP \LEX{else} \ \SYNREF{block} \RIGHTGROUP\QUERY \\
      \ \mid \ & \ \LEX{while} \ \LEX{{(}} \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exp} \ \LEX{{)}} \ \SYNREF{block} \\
      \ \mid \ & \ \LEX{for} \ \LEX{{(}} \ \SYNREF{stmt} \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exp} \ \LEX{{;}} \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exp} \ \LEX{{)}} \ \SYNREF{block} \\
      \ \mid \ & \ \LEX{print} \ \LEX{{(}} \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exps} \ \LEX{{)}} \ \LEX{{;}} \\
      \ \mid \ & \ \LEX{return} \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exp}\QUERY \ \LEX{{;}} \\
      \ \mid \ & \ \LEX{try} \ \SYNREF{block} \ \LEX{catch} \ \LEX{{(}} \ \SYNHYP{../.}{SIMPLE-1-Lexical}{id} \ \LEX{{)}} \ \SYNREF{block} \\
      \ \mid \ & \ \LEX{throw} \ \SYNHYP{../.}{SIMPLE-2-Expressions}{exp} \ \LEX{{;}}
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \LEFTPHRASE \
        \LEX{if} \ \LEX{{(}} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exp} \ \LEX{{)}} \ \VARREF{Block} \
      \RIGHTPHRASE : \SYNREF{stmt} = \\&
      \LEFTPHRASE \
        \LEX{if} \ \LEX{{(}} \ \VAR{Exp} \ \LEX{{)}} \ \VAR{Block} \ \LEX{else} \ \LEX{{\LEFTBRACE}} \ \LEX{{\RIGHTBRACE}} \
      \RIGHTPHRASE
\\
  \KEY{Rule} \quad
    & \LEFTPHRASE \
        \LEX{for} \ \LEX{{(}} \ \VARREF{Stmt} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exp}\SUB{1} \ \LEX{{;}} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exp}\SUB{2} \ \LEX{{)}} \\&\quad
        \LEX{{\LEFTBRACE}} \ \VARREF{Stmts} \ \LEX{{\RIGHTBRACE}} \
      \RIGHTPHRASE : \SYNREF{stmt} = \\&
      \LEFTPHRASE \
        \LEX{{\LEFTBRACE}} \ \VAR{Stmt} \\&\quad
        \LEX{while} \ \LEX{{(}} \ \VAR{Exp}\SUB{1} \ \LEX{{)}} \\&\quad
        \LEX{{\LEFTBRACE}} \ \LEX{{\LEFTBRACE}} \ \VAR{Stmts} \ \LEX{{\RIGHTBRACE}} \ \VAR{Exp}\SUB{2} \ \LEX{{;}} \ \LEX{{\RIGHTBRACE}} \\&\quad
        \LEX{{\RIGHTBRACE}} \
      \RIGHTPHRASE
\end{align*}$$

$$\begin{align*}
  \KEY{Semantics} \quad
  & \SEMDEC{exec} \LEFTPHRASE \ \_ : \SYNREF{stmts} \ \RIGHTPHRASE  
    :  \TO \FUNHYP{../../../../../Funcons-beta/Values/Primitive}{Null}{null-type} 
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{{\LEFTBRACE}} \ \LEX{{\RIGHTBRACE}} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Values/Primitive}{Null}{null}
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{{\LEFTBRACE}} \ \VARREF{Stmts} \ \LEX{{\RIGHTBRACE}} \
                          \RIGHTPHRASE  = 
      \SEMREF{exec} \LEFTPHRASE \
                \VAR{Stmts} \
              \RIGHTPHRASE 
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \VARREF{ImpStmt} \ \VARREF{Stmts} \
                          \RIGHTPHRASE  = \\&\quad
      \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Flowing}{sequential}
        (  \SEMREF{exec} \LEFTPHRASE \
                        \VAR{ImpStmt} \
                      \RIGHTPHRASE , 
               \SEMREF{exec} \LEFTPHRASE \
                        \VAR{Stmts} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \VARHYP{../.}{SIMPLE-4-Declarations}{VarsDecl} \ \VARREF{Stmts} \
                          \RIGHTPHRASE  = \\&\quad
      \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Binding}{scope}
        (  \SEMHYP{../.}{SIMPLE-4-Declarations}{declare} \LEFTPHRASE \
                        \VAR{VarsDecl} \
                      \RIGHTPHRASE , 
               \SEMREF{exec} \LEFTPHRASE \
                        \VAR{Stmts} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \VARHYP{../.}{SIMPLE-4-Declarations}{VarsDecl} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Flowing}{effect}
        (  \SEMHYP{../.}{SIMPLE-4-Declarations}{declare} \LEFTPHRASE \
                        \VAR{VarsDecl} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \VARHYP{../.}{SIMPLE-2-Expressions}{Exp} \ \LEX{{;}} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Flowing}{effect}
        (  \SEMHYP{../.}{SIMPLE-2-Expressions}{rval} \LEFTPHRASE \
                        \VAR{Exp} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{if} \ \LEX{{(}} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exp} \ \LEX{{)}} \ \VARREF{Block}\SUB{1} \ \LEX{else} \ \VARREF{Block}\SUB{2} \
                          \RIGHTPHRASE  = \\&\quad
      \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Flowing}{if-else}
        (  \SEMHYP{../.}{SIMPLE-2-Expressions}{rval} \LEFTPHRASE \
                        \VAR{Exp} \
                      \RIGHTPHRASE , 
               \SEMREF{exec} \LEFTPHRASE \
                        \VAR{Block}\SUB{1} \
                      \RIGHTPHRASE , 
               \SEMREF{exec} \LEFTPHRASE \
                        \VAR{Block}\SUB{2} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{while} \ \LEX{{(}} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exp} \ \LEX{{)}} \ \VARREF{Block} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Flowing}{while}
        (  \SEMHYP{../.}{SIMPLE-2-Expressions}{rval} \LEFTPHRASE \
                        \VAR{Exp} \
                      \RIGHTPHRASE , 
               \SEMREF{exec} \LEFTPHRASE \
                        \VAR{Block} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{print} \ \LEX{{(}} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exps} \ \LEX{{)}} \ \LEX{{;}} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Interacting}{print}
        (  \SEMHYP{../.}{SIMPLE-2-Expressions}{rvals} \LEFTPHRASE \
                        \VAR{Exps} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{return} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exp} \ \LEX{{;}} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Computations/Abnormal}{Returning}{return}
        (  \SEMHYP{../.}{SIMPLE-2-Expressions}{rval} \LEFTPHRASE \
                        \VAR{Exp} \
                      \RIGHTPHRASE  )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{return} \ \LEX{{;}} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Computations/Abnormal}{Returning}{return}
        (  \FUNHYP{../../../../../Funcons-beta/Values/Primitive}{Null}{null} )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{try} \ \VARREF{Block}\SUB{1} \ \LEX{catch} \ \LEX{{(}} \ \VARHYP{../.}{SIMPLE-1-Lexical}{Id} \ \LEX{{)}} \ \VARREF{Block}\SUB{2} \
                          \RIGHTPHRASE  = \\&\quad
      \FUNHYP{../../../../../Funcons-beta/Computations/Abnormal}{Throwing}{handle-thrown}
        ( \\&\quad\quad \SEMREF{exec} \LEFTPHRASE \
                        \VAR{Block}\SUB{1} \
                      \RIGHTPHRASE , \\&\quad\quad
               \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Binding}{scope}
                ( \\&\quad\quad\quad \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Binding}{bind}
                        (  \SEMHYP{../.}{SIMPLE-1-Lexical}{id} \LEFTPHRASE \
                                        \VAR{Id} \
                                      \RIGHTPHRASE , 
                               \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Storing}{allocate-initialised-variable}
                                (  \FUNHYP{../../../../../Funcons-beta/Values}{Value-Types}{values}, 
                                       \FUNHYP{../../../../../Funcons-beta/Computations/Normal}{Giving}{given} ) ), \\&\quad\quad\quad
                       \SEMREF{exec} \LEFTPHRASE \
                                \VAR{Block}\SUB{2} \
                              \RIGHTPHRASE  ) )
\\
  \KEY{Rule} \quad
    & \SEMREF{exec} \LEFTPHRASE \
                            \LEX{throw} \ \VARHYP{../.}{SIMPLE-2-Expressions}{Exp} \ \LEX{{;}} \
                          \RIGHTPHRASE  = 
      \FUNHYP{../../../../../Funcons-beta/Computations/Abnormal}{Throwing}{throw}
        (  \SEMHYP{../.}{SIMPLE-2-Expressions}{rval} \LEFTPHRASE \
                        \VAR{Exp} \
                      \RIGHTPHRASE  )
\end{align*}$$



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
[SIMPLE-3-Statements.cbs]: https://github.com/plancomps/CBS-beta/blob/math/Languages-beta/SIMPLE/SIMPLE-cbs/SIMPLE/SIMPLE-3-Statements/SIMPLE-3-Statements.cbs
  "CBS SOURCE FILE ON GITHUB"
[PLAIN]: /CBS-beta/docs/Languages-beta/SIMPLE/SIMPLE-cbs/SIMPLE/SIMPLE-3-Statements
  "CBS SOURCE WEB PAGE"
 [PRETTY]: /CBS-beta/math/Languages-beta/SIMPLE/SIMPLE-cbs/SIMPLE/SIMPLE-3-Statements
  "CBS-KATEX WEB PAGE"
[PDF]: /CBS-beta/math/Languages-beta/SIMPLE/SIMPLE-cbs/SIMPLE/SIMPLE-3-Statements/SIMPLE-3-Statements.pdf
  "CBS-LATEX PDF FILE"
[PLanCompS Project]: https://plancomps.github.io
  "PROGRAMMING LANGUAGE COMPONENTS AND SPECIFICATIONS PROJECT HOME PAGE"
{::comment}{% endraw %}{:/}
