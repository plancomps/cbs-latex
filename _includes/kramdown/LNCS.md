{::comment}{% raw %}{:/}

# Fundamental Constructs in Programming Languages

Extracts for testing MathJax

Abstract

> The body of this document consists of fragments of the published article.
> It is for use in testing the formatting of mathematical formulae
> in paragraphs, inline displays, and floating figures by $$\LaTeX$$ and MathJax.

## Introduction

Version control is superfluous for funcons;
translations of language constructs to funcons, in contrast, may need to change
when the specified language evolves.
For example, the illustrative language IMP includes a plain old while-loop
with a Boolean-valued condition:
`$$\mathtt{while} \mathtt{(} \VAR{BExp} \mathtt{)} \VAR{Block}$$'.
The following rule translates it to the funcon $$\NAME{while-true}$$,
which has exactly the required behaviour:

$$
\begin{align*}
  \KEY{Rule} \quad
    & \SEM{execute} \LEFTPHRASE \
        \LEX{while} \ \LEX{(} \ \VAR{BExp} \ \LEX{)} \ \VAR{Block} \ \RIGHTPHRASE  = \\&\quad
      \NAME{while-true}
        (  \SEM{eval-bool} \LEFTPHRASE \ \VAR{BExp} \ \RIGHTPHRASE , 
               \SEM{execute} \LEFTPHRASE \ \VAR{Block} \ \RIGHTPHRASE  )
\end{align*}
$$

The behaviour of the funcon $$\NAME{while-true}$$ is fixed.
But suppose the IMP language evolves,
and a $$\VAR{Block}$$ can now execute a statement `$$\mathtt{break;}$$',
which is supposed to terminate just the *closest* enclosing while-loop.
We can extend the translation with the following rule:

$$
\begin{align*}
  \KEY{Rule} \quad
    & \SEM{execute} \LEFTPHRASE \ \LEX{break} \ \LEX{;} \ \RIGHTPHRASE  = 
      \NAME{abrupt}(\NAME{broken})
\end{align*}
$$

The translation of `$$\mathtt{while(true)\{break;\}}$$' is 
$$\NAME{while-true}(\NAME{true}, \NAME{abrupt}(\NAME{broken}))$$.
The funcon $$\NAME{abrupt}(V)$$ terminates execution abruptly,
signalling its argument value $$V$$ as the reason for termination.
However, the behaviour of $$\NAME{while-true}(\NAME{true}, X)$$ is to terminate abruptly whenever $$X$$ does
-- so this translation would lead to abrupt termination of *all* enclosing while-loops!

We cannot change the definition of $$\NAME{while-true}$$,
so we are forced to change the translation rule.
The following updated translation rule reflects the extension of the behaviour of while-loops
with the intended handling of abrupt termination due to break-statements,
and that they propagate abrupt termination for any other reason:

$$
\begin{align*}
  \KEY{Rule} \quad
    & \SEM{execute} \LEFTPHRASE \
        \LEX{while} \ \LEX{(} \ \VAR{BExp} \ \LEX{)} \ \VAR{Block} \ \RIGHTPHRASE  = \\&\quad
      \NAME{handle-abrupt}
        (  \\&\quad\quad
        \NAME{while-true}
            (  \SEM{eval-bool} \LEFTPHRASE \ \VAR{BExp} \ \RIGHTPHRASE , 
               \SEM{execute} \LEFTPHRASE \ \VAR{Block} \ \RIGHTPHRASE  ),\\&\quad\quad
            \NAME{if-true-else}
            (   \NAME{is-equal} ( \NAME{given}, \NAME{broken}), 
               \NAME{null-value},
               \NAME{abrupt}(\NAME{given})))
\end{align*}
$$

Computing $$\NAME{null-value}$$ represents normal termination;
$$\NAME{given}$$ refers to the reason for the abrupt termination.

The specialised funcon $$\NAME{handle-break}$$ can be used
to specify the same behaviour more concisely:

$$
\begin{align*}
  \KEY{Rule} \quad
    & \SEM{execute} \LEFTPHRASE \
        \LEX{while} \ \LEX{(} \ \VAR{BExp} \ \LEX{)} \ \VAR{Block} \ \RIGHTPHRASE  = \\&\quad
      \NAME{handle-break}
        (  %\\&\quad\quad
        \NAME{while-true}
            (  \SEM{eval-bool} \LEFTPHRASE \ \VAR{BExp} \ \RIGHTPHRASE , 
               \SEM{execute} \LEFTPHRASE \ \VAR{Block} \ \RIGHTPHRASE  ))
\end{align*}
$$

Wrapping $$ \SEM{execute} \LEFTPHRASE \ \VAR{Block} \ \RIGHTPHRASE$$ in $$\NAME{handle-continue}$$ 
would also support abrupt termination of the current \emph{iteration} due to executing a continue-statement.

## The Nature of Funcons

Funcons are often independent, but not always.
For instance, the definition of the funcon $$\NAME{while-true}$$
specifies the reduction of $$\NAME{while-true}(B, X)$$ to
a term involving the funcons $$\NAME{if-true-else}$$ and $$\NAME{sequential}$$:

$$
\begin{align*}
  \KEY{Funcon} \quad
  & \NAME{while-true}(
                       B :  \TO \NAME{booleans}, X :  \TO \NAME{null-type}) 
    :  \TO \NAME{null-type} \\&\quad
    \leadsto \NAME{if-true-else}
               (  B, 
                      \NAME{sequential}
                       (  X, 
                              \NAME{while-true}
                               (  B, 
                                      X ) ), 
                      \NAME{null-value} )
\end{align*}
$$

## Translation of Language Constructs to Funcons

The translation specification in Fig. 1 declares $$\SYN{exp}$$ as a phrase sort,
with the meta-variable $$\VAR{Exp}$$ (possibly with subscripts and/or primes)
ranging over phrases of that sort.
The BNF-like production shows two language constructs of sort $$\SYN{exp}$$:
an identifier of sort $$\SYN{id}$$
(lexical tokens, here assumed to be specified elsewhere with meta-variable $$\VAR{Id}$$)
and a function application written `$$\VAR{Exp}_1 \mathtt{(} \VAR{Exp}_2\mathtt{)}$$'.

$$
\begin{align*}
  \KEY{Syntax} \quad
    \VAR{Exp} : \SYN{exp}
      ::=  \cdots 
      \mid \SYN{id}
      \mid \SYN{exp} \ \LEX{(} \ \SYN{exp} \ \LEX{)}
      \mid \cdots
\end{align*}
$$

>

$$
\begin{align*}
  \KEY{Semantics} \quad
  & \SEM{rval} \LEFTPHRASE \ \_ : \SYN{exp} \ \RIGHTPHRASE  
    :  \TO \NAME{values} 
\\
  \KEY{Rule} \quad
    & \SEM{rval} \LEFTPHRASE \ \VAR{Id} \  \RIGHTPHRASE  = 
      \NAME{assigned-value}
        (  \NAME{bound-value}
        ( \SEM{id} \LEFTPHRASE \ \VAR{Id} \ \RIGHTPHRASE  ) )
\\
  \KEY{Rule} \quad
    & \SEM{rval} \LEFTPHRASE \ \VAR{Exp}_1 \ \LEX{(} \ \VAR{Exp}_2 \ \LEX{)} \ \RIGHTPHRASE  = 
      \NAME{apply}
        (  \SEM{rval} \LEFTPHRASE \ \VAR{Exp}_1 \ \RIGHTPHRASE , 
               \SEM{rval} \LEFTPHRASE \ \VAR{Exp}_2 \ \RIGHTPHRASE  )
\end{align*}
$$


The translation specification for function declarations in Fig. 2
assumes a translation function $$\SEM{exec}\LEFTPHRASE \VAR{Block} \RIGHTPHRASE$$ 
for phrases $$\VAR{Block}$$ of sort $$\SYN{block}$$.
A block is a statement, which normally computes a null value;
but here, as in many languages, a block can return an expression value by executing a return statement,
which terminates the execution of the block abruptly.

$$
\begin{align*}
  \KEY{Syntax} \quad
    \VAR{Decl} : \SYN{decl}
      ::= \cdots \mid 
      \LEX{function} \ \SYN{id} \ \LEX{(} \ \SYN{id} \ \LEX{)} \ \SYN{block}
\end{align*}
$$

>

$$
\begin{align*}
  \KEY{Semantics} \quad
  & \SEM{declare} \LEFTPHRASE \ \_ : \SYN{decl} \ \RIGHTPHRASE  
    :  \TO \NAME{environments} 
\\[1ex]
  \KEY{Rule} \quad
    & \SEM{declare} \LEFTPHRASE \
        \LEX{function} \ \VAR{Id}_1 \ \LEX{(} \ \VAR{Id}_2 \ \LEX{)} \ \VAR{Block} \
                          \RIGHTPHRASE  = \\&\quad
      \NAME{bind-value}
        ( \SEM{id} \LEFTPHRASE \ \VAR{Id}_1 \ \RIGHTPHRASE , \\&\quad\quad
               \NAME{allocate-initialised-variable}
                (  \NAME{functions}
                        (  \NAME{values}, 
                           \NAME{values} ),
                    \\&\quad\quad\quad
               \NAME{function} 
                ( \NAME{closure}
                  ( \\&\quad\quad\quad\quad \NAME{scope}
                          ( \\&\quad\quad\quad\quad\quad \NAME{bind-value}
                                  (  \SEM{id} \LEFTPHRASE \ \VAR{Id}_2 \ \RIGHTPHRASE ,\\&\quad\quad\quad\quad\quad\quad
                            \NAME{allocate-initialised-variable}
                (  \NAME{values}, 
                                  \NAME{given} ) ), \\&\quad\quad\quad\quad\quad
                                 \NAME{handle-return}
                                  (  \SEM{exec} \LEFTPHRASE \ \VAR{Block} \ \RIGHTPHRASE  ) ) ) ) )
                    )
\end{align*}
$$

## Defining and Implementing Funcons

The funcon signature in Fig. 3 specifies that $$\NAME{scope}$$ takes two arguments.
The first argument is required to be pre-evaluated to a value of type $$\NAME{environments}$$;
the second argument should be unevaluated, as indicated by `$$\TO T$$'.
Values computed by $$\NAME{scope}( \rho_1, X )$$ are to have the same type ($$T$$)
as the values computed by $$X$$.

$$
\begin{align*}
  \KEY{Funcon} \quad
  & \NAME{scope}( \_ : \NAME{environments}, \_ :  \TO T) 
    :  \TO T 
\\
  \KEY{Rule} \quad
    & \RULE{
      \NAME{environment} (  \NAME{map-override}
                                     (  \rho_1, 
                                            \rho_0 ) ) \vdash X \TRANS 
          X'
      }{
      \NAME{environment} (  \rho_0 ) \vdash \NAME{scope}
                      (  \rho_1 : \NAME{environments}, 
                             X ) \TRANS 
          \NAME{scope}
            (  \rho_1, 
                   X' )
      }
\\
  \KEY{Rule} \quad
    & \NAME{scope}
        (  \_ : \NAME{environments}, V : T ) \leadsto V
\end{align*}
$$

The rules define how evaluation of $$\NAME{scope}( \rho_1, X )$$ can proceed
when the current bindings are represented by $$\rho_0$$.
The premise of the first rule holds if $$X$$ can make a transition to $$X'$$
when $$\rho_1$$ overrides the current bindings $$\rho_0$$.
Whether $$X'$$ is a computed value or an intermediate term is irrelevant.
When the premise holds, the conclusion is that $$\NAME{scope}( \rho_1, X )$$
can make a transition to $$\NAME{scope}( \rho_1, X' )$$.

{::comment}{% endraw %}{:/}
