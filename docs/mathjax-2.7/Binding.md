---
title: Funcon specifications
layout: cbs-mathjax-2.7-local
nav_exclude: true
---

> This page is using MathJax-2.7. [See the same page using MathJax-3](../mathjax-3/Binding).

{:.note}
> Links to non-local declarations are disabled on this sample page.

{::comment}{% raw %}{:/}
<details open markdown="block">
  <summary>
    OUTLINE
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>


----

### Binding
               


$$\begin{align*}
  [ \
  \KEY{Type} \quad & \FUNREF{environments} \\
  \KEY{Alias} \quad & \FUNREF{envs} \\
  \KEY{Datatype} \quad & \FUNREF{identifiers} \\
  \KEY{Alias} \quad & \FUNREF{ids} \\
  \KEY{Funcon} \quad & \FUNREF{identifier-tagged} \\
  \KEY{Alias} \quad & \FUNREF{id-tagged} \\
  \KEY{Funcon} \quad & \FUNREF{fresh-identifier} \\
  \KEY{Entity} \quad & \FUNREF{environment} \\
  \KEY{Alias} \quad & \FUNREF{env} \\
  \KEY{Funcon} \quad & \FUNREF{initialise-binding} \\
  \KEY{Funcon} \quad & \FUNREF{bind-value} \\
  \KEY{Alias} \quad & \FUNREF{bind} \\
  \KEY{Funcon} \quad & \FUNREF{unbind} \\
  \KEY{Funcon} \quad & \FUNREF{bound-directly} \\
  \KEY{Funcon} \quad & \FUNREF{bound-value} \\
  \KEY{Alias} \quad & \FUNREF{bound} \\
  \KEY{Funcon} \quad & \FUNREF{closed} \\
  \KEY{Funcon} \quad & \FUNREF{scope} \\
  \KEY{Funcon} \quad & \FUNREF{accumulate} \\
  \KEY{Funcon} \quad & \FUNREF{collateral} \\
  \KEY{Funcon} \quad & \FUNREF{bind-recursively} \\
  \KEY{Funcon} \quad & \FUNREF{recursive}
  \ ]
\end{align*}$$

$$\begin{align*}
  \KEY{Meta-variables} \quad
  & \VAR{T} <: \FUNHYP{../../../Values}{Value-Types}{values}
\end{align*}$$

#### Environments
               


$$\begin{align*}
  \KEY{Type} \quad 
  & \FUNDEC{environments}  
    \leadsto \FUNHYP{../../../Values/Composite}{Maps}{maps}
               (  \FUNREF{identifiers}, 
                      \FUNHYP{../../../Values}{Value-Types}{values}\QUERY )
\\
  \KEY{Alias} \quad
  & \FUNDEC{envs} = \FUNREF{environments}
\end{align*}$$


  An environment represents bindings of identifiers to values.
  Mapping an identifier to $$(   \  )$$ represents that its binding is hidden.
  
  Circularity in environments (due to recursive bindings) is represented using
  bindings to cut-points called $$\FUNHYP{../.}{Linking}{links}$$. Funcons are provided for making
  declarations recursive and for referring to bound values without explicit
  mention of links, so their existence can generally be ignored.


$$\begin{align*}
  \KEY{Datatype} \quad 
  \FUNDEC{identifiers} 
  \ ::= \ &
  \{ \_ : \FUNHYP{../../../Values/Composite}{Strings}{strings} \} \mid \FUNDEC{identifier-tagged}(
                   \_ : \FUNREF{identifiers}, \_ : \FUNHYP{../../../Values}{Value-Types}{values})
\end{align*}$$

$$\begin{align*}
  \KEY{Alias} \quad
  & \FUNDEC{ids} = \FUNREF{identifiers}
\\
  \KEY{Alias} \quad
  & \FUNDEC{id-tagged} = \FUNREF{identifier-tagged}
\end{align*}$$


  An identifier is either a string of characters, or an identifier tagged with
  some value (e.g., with the identifier of a namespace).


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{fresh-identifier} 
    :  \TO \FUNREF{identifiers} 
\end{align*}$$


  $$\FUNREF{fresh-identifier}$$ computes an identifier distinct from all previously
  computed identifiers.


$$\begin{align*}
  \KEY{Rule} \quad
    & \FUNREF{fresh-identifier} \leadsto 
        \FUNREF{identifier-tagged}
          (  \STRING{generated}, 
                 \FUNHYP{../.}{Generating}{fresh-atom} )
\end{align*}$$

#### Current bindings
               


$$\begin{align*}
  \KEY{Entity} \quad
  & \FUNDEC{environment}(\_ : \FUNREF{environments}) \vdash \_ \TRANS  \_
\end{align*}$$

$$\begin{align*}
  \KEY{Alias} \quad
  & \FUNDEC{env} = \FUNREF{environment}
\end{align*}$$


  The environment entity allows a computation to refer to the current bindings
  of identifiers to values.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{initialise-binding}(
                     \VAR{X} :  \TO \VAR{T}) 
    :  \TO \VAR{T} \\&\quad
    \leadsto \FUNHYP{../.}{Linking}{initialise-linking}
               (  \FUNHYP{../.}{Generating}{initialise-generating}
                       (  \FUNREF{closed}
                               (  \VAR{X} ) ) )
\end{align*}$$


  $$\FUNREF{initialise-binding}
    (  \VAR{X} )$$ ensures that $$\VAR{X}$$ does not depend on non-local bindings.
  It also ensures that the linking entity (used to represent potentially cyclic
  bindings) and the generating entity (for creating fresh identifiers) are 
  initialised.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bind-value}(
                     \VAR{I} : \FUNREF{identifiers}, \VAR{V} : \FUNHYP{../../../Values}{Value-Types}{values}) 
    :  \TO \FUNREF{environments} \\&\quad
    \leadsto \{ \VAR{I} \mapsto 
                  \VAR{V} \}
\\
  \KEY{Alias} \quad
  & \FUNDEC{bind} = \FUNREF{bind-value}
\end{align*}$$


  $$\FUNREF{bind-value}
    (  \VAR{I}, 
           \VAR{X} )$$ computes the environment that binds only $$\VAR{I}$$ to the value
  computed by $$\VAR{X}$$.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{unbind}(
                     \VAR{I} : \FUNREF{identifiers}) 
    :  \TO \FUNREF{environments} \\&\quad
    \leadsto \{ \VAR{I} \mapsto 
                  (   \  ) \}
\end{align*}$$


  $$\FUNREF{unbind}
    (  \VAR{I} )$$ computes the environment that hides the binding of $$\VAR{I}$$.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bound-directly}(
                     \_ : \FUNREF{identifiers}) 
    :  \TO \FUNHYP{../../../Values}{Value-Types}{values} 
\end{align*}$$

 
  $$\FUNREF{bound-directly}
    (  \VAR{I} )$$ returns the value to which $$\VAR{I}$$ is currently bound, if any,
  and otherwise fails.

  $$\FUNREF{bound-directly}
    (  \VAR{I} )$$ does *not* follow links. It is used only in connection with
  recursively-bound values when references are not encapsulated in abstractions.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
      \FUNHYP{../../../Values/Composite}{Maps}{lookup}
        (  \VAR{\rho}, 
               \VAR{I} ) \leadsto 
        (  \VAR{V} : \FUNHYP{../../../Values}{Value-Types}{values} )
      }{
      \FUNREF{environment} (  \VAR{\rho} ) \vdash \FUNREF{bound-directly}
                    (  \VAR{I} : \FUNREF{identifiers} ) \TRANS 
        \VAR{V}
      }
\\
  \KEY{Rule} \quad
    & \RULE{
      \FUNHYP{../../../Values/Composite}{Maps}{lookup}
        (  \VAR{\rho}, 
               \VAR{I} ) \leadsto 
        (   \  )
      }{
      \FUNREF{environment} (  \VAR{\rho} ) \vdash \FUNREF{bound-directly}
                    (  \VAR{I} : \FUNREF{identifiers} ) \TRANS 
        \FUNHYP{../../Abnormal}{Failing}{fail}
      }
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bound-value}(
                     \VAR{I} : \FUNREF{identifiers}) 
    :  \TO \FUNHYP{../../../Values}{Value-Types}{values} \\&\quad
    \leadsto \FUNHYP{../.}{Linking}{follow-if-link}
               (  \FUNREF{bound-directly}
                       (  \VAR{I} ) )
\\
  \KEY{Alias} \quad
  & \FUNDEC{bound} = \FUNREF{bound-value}
\end{align*}$$

 
   $$\FUNREF{bound-value}
    (  \VAR{I} )$$ inspects the value to which $$\VAR{I}$$ is currently bound, if any,
   and otherwise fails. If the value is a link, $$\FUNREF{bound-value}
    (  \VAR{I} )$$ returns the
   value obtained by following the link, if any, and otherwise fails. If the 
   inspected value is not a link, $$\FUNREF{bound-value}
    (  \VAR{I} )$$ returns it. 
   
   $$\FUNREF{bound-value}
    (  \VAR{I} )$$ is used for references to non-recursive bindings and to
   recursively-bound values when references are encapsulated in abstractions.


#### Scope
               


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{closed}(
                     \VAR{X} :  \TO \VAR{T}) 
    :  \TO \VAR{T} 
\end{align*}$$


  $$\FUNREF{closed}
    (  \VAR{X} )$$ ensures that $$\VAR{X}$$ does not depend on non-local bindings.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
      \FUNREF{environment} (  \FUNHYP{../../../Values/Composite}{Maps}{map}
                      (   \  ) ) \vdash \VAR{X} \TRANS 
        \VAR{X}'
      }{
      \FUNREF{environment} (  \_ ) \vdash \FUNREF{closed}
                    (  \VAR{X} ) \TRANS 
        \FUNREF{closed}
          (  \VAR{X}' )
      }
\\
  \KEY{Rule} \quad
    & \FUNREF{closed}
        (  \VAR{V} : \VAR{T} ) \leadsto 
        \VAR{V}
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{scope}(
                     \_ : \FUNREF{environments}, \_ :  \TO \VAR{T}) 
    :  \TO \VAR{T} 
\end{align*}$$


  $$\FUNREF{scope}
    (  \VAR{D}, 
           \VAR{X} )$$ executes $$\VAR{D}$$ with the current bindings, to compute an environment
  $$\VAR{\rho}$$ representing local bindings. It then executes $$\VAR{X}$$ to compute the result,
  with the current bindings extended by $$\VAR{\rho}$$, which may shadow or hide previous
  bindings.
  
  $$\FUNREF{closed}
    (  \FUNREF{scope}
            (  \VAR{\rho}, 
                   \VAR{X} ) )$$ ensures that $$\VAR{X}$$ can reference only the bindings
  provided by $$\VAR{\rho}$$.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
      \FUNREF{environment} (  \FUNHYP{../../../Values/Composite}{Maps}{map-override}
                      (  \VAR{\rho}\SUB{1}, 
                             \VAR{\rho}\SUB{0} ) ) \vdash \VAR{X} \TRANS 
        \VAR{X}'
      }{
      \FUNREF{environment} (  \VAR{\rho}\SUB{0} ) \vdash \FUNREF{scope}
                    (  \VAR{\rho}\SUB{1} : \FUNREF{environments}, 
                           \VAR{X} ) \TRANS 
        \FUNREF{scope}
          (  \VAR{\rho}\SUB{1}, 
                 \VAR{X}' )
      }
\\
  \KEY{Rule} \quad
    & \FUNREF{scope}
        (  \_ : \FUNREF{environments}, 
               \VAR{V} : \VAR{T} ) \leadsto 
        \VAR{V}
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{accumulate}(
                     \_ : (   \TO \FUNREF{environments} )\STAR) 
    :  \TO \FUNREF{environments} 
\end{align*}$$


  $$\FUNREF{accumulate}
    (  \VAR{D}\SUB{1}, 
           \VAR{D}\SUB{2} )$$ executes $$\VAR{D}\SUB{1}$$ with the current bindings, to compute an
  environment $$\VAR{\rho}\SUB{1}$$ representing some local bindings. It then executes $$\VAR{D}\SUB{2}$$ to
  compute an environment $$\VAR{\rho}\SUB{2}$$ representing further local bindings, with the
  current bindings extended by $$\VAR{\rho}\SUB{1}$$, which may shadow or hide previous
  current bindings. The result is $$\VAR{\rho}\SUB{1}$$ extended by $$\VAR{\rho}\SUB{2}$$, which may shadow
  or hide the bindings of $$\VAR{\rho}\SUB{1}$$.
  
  $$\FUNREF{accumulate}
    (  \_, 
           \_ )$$ is associative, with $$\FUNHYP{../../../Values/Composite}{Maps}{map}
    (   \  )$$ as unit, and extends to any
  number of arguments.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
       \VAR{D}\SUB{1} \TRANS 
        \VAR{D}\SUB{1}'
      }{
       \FUNREF{accumulate}
                    (  \VAR{D}\SUB{1}, 
                           \VAR{D}\SUB{2} ) \TRANS 
        \FUNREF{accumulate}
          (  \VAR{D}\SUB{1}', 
                 \VAR{D}\SUB{2} )
      }
\\
  \KEY{Rule} \quad
    & \FUNREF{accumulate}
        (  \VAR{\rho}\SUB{1} : \FUNREF{environments}, 
               \VAR{D}\SUB{2} ) \leadsto 
        \FUNREF{scope}
          (  \VAR{\rho}\SUB{1}, 
                 \FUNHYP{../../../Values/Composite}{Maps}{map-override}
                  (  \VAR{D}\SUB{2}, 
                         \VAR{\rho}\SUB{1} ) )
\\
  \KEY{Rule} \quad
    & \FUNREF{accumulate}
        (   \  ) \leadsto 
        \FUNHYP{../../../Values/Composite}{Maps}{map}
          (   \  )
\\
  \KEY{Rule} \quad
    & \FUNREF{accumulate}
        (  \VAR{D}\SUB{1} ) \leadsto 
        \VAR{D}\SUB{1}
\\
  \KEY{Rule} \quad
    & \FUNREF{accumulate}
        (  \VAR{D}\SUB{1}, 
               \VAR{D}\SUB{2}, 
               \VAR{D}\PLUS ) \leadsto 
        \FUNREF{accumulate}
          (  \VAR{D}\SUB{1}, 
                 \FUNREF{accumulate}
                  (  \VAR{D}\SUB{2}, 
                         \VAR{D}\PLUS ) )
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{collateral}(
                     \VAR{\rho}\STAR : \FUNREF{environments}\STAR) 
    :  \TO \FUNREF{environments} \\&\quad
    \leadsto \FUNHYP{../../Abnormal}{Failing}{checked} \ 
               \FUNHYP{../../../Values/Composite}{Maps}{map-unite}
                 (  \VAR{\rho}\STAR )
\end{align*}$$

 
  $$\FUNREF{collateral}
    (  \VAR{D}\SUB{1}, 
           \cdots )$$ pre-evaluates its arguments with the current bindings,
  and unites the resulting maps, which fails if the domains are not pairwise
  disjoint.

  $$\FUNREF{collateral}
    (  \VAR{D}\SUB{1}, 
           \VAR{D}\SUB{2} )$$ is associative and commutative with $$\FUNHYP{../../../Values/Composite}{Maps}{map}
    (   \  )$$ as unit, 
  and extends to any number of arguments.


#### Recurse
               


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bind-recursively}(
                     \VAR{I} : \FUNREF{identifiers}, \VAR{E} :  \TO \FUNHYP{../../../Values}{Value-Types}{values}) 
    :  \TO \FUNREF{environments} \\&\quad
    \leadsto \FUNREF{recursive}
               (  \{  \VAR{I} \}, 
                      \FUNREF{bind-value}
                       (  \VAR{I}, 
                              \VAR{E} ) )
\end{align*}$$


  $$\FUNREF{bind-recursively}
    (  \VAR{I}, 
           \VAR{E} )$$ binds $$\VAR{I}$$ to a link that refers to the value of $$\VAR{E}$$, 
  representing a recursive binding of $$\VAR{I}$$ to the value of $$\VAR{E}$$.
  Since $$\FUNREF{bound-value}
    (  \VAR{I} )$$ follows links, it should not be executed during the
  evaluation of $$\VAR{E}$$.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{recursive}(
                     \VAR{SI} : \FUNHYP{../../../Values/Composite}{Sets}{sets}
                               (  \FUNREF{identifiers} ), \VAR{D} :  \TO \FUNREF{environments}) 
    :  \TO \FUNREF{environments} \\&\quad
    \leadsto \FUNREF{re-close}
               (  \FUNREF{bind-to-forward-links}
                       (  \VAR{SI} ), 
                      \VAR{D} )
\end{align*}$$


  $$\FUNREF{recursive}
    (  \VAR{SI}, 
           \VAR{D} )$$ executes $$\VAR{D}$$ with potential recursion on the bindings of 
  the identifiers in the set $$\VAR{SI}$$ (which need not be the same as the set of
  identifiers bound by $$\VAR{D}$$).


$$\begin{align*}
  \KEY{Auxiliary Funcon} \quad
  & \FUNDEC{re-close}(
                     \VAR{M} : \FUNHYP{../../../Values/Composite}{Maps}{maps}
                               (  \FUNREF{identifiers}, 
                                      \FUNHYP{../.}{Linking}{links} ), \VAR{D} :  \TO \FUNREF{environments}) 
    :  \TO \FUNREF{environments} \\&\quad
    \leadsto \FUNREF{accumulate}
               (  \FUNREF{scope}
                       (  \VAR{M}, 
                              \VAR{D} ), 
                      \FUNHYP{../.}{Flowing}{sequential}
                       (  \FUNREF{set-forward-links}
                               (  \VAR{M} ), 
                              \FUNHYP{../../../Values/Composite}{Maps}{map}
                               (   \  ) ) )
\end{align*}$$


  $$\FUNREF{re-close}
    (  \VAR{M}, 
           \VAR{D} )$$ first executes $$\VAR{D}$$ in the scope $$\VAR{M}$$, which maps identifiers
  to freshly allocated links. This computes an environment $$\VAR{\rho}$$ where the bound
  values may contain links, or implicit references to links in abstraction
  values. It then sets the link for each identifier in the domain of $$\VAR{M}$$ to
  refer to its bound value in $$\VAR{\rho}$$, and returns $$\VAR{\rho}$$ as the result.


$$\begin{align*}
  \KEY{Auxiliary Funcon} \quad
  & \FUNDEC{bind-to-forward-links}(
                     \VAR{SI} : \FUNHYP{../../../Values/Composite}{Sets}{sets}
                               (  \FUNREF{identifiers} )) 
    :  \TO \FUNHYP{../../../Values/Composite}{Maps}{maps}
                     (  \FUNREF{identifiers}, 
                            \FUNHYP{../.}{Linking}{links} ) \\&\quad
    \leadsto \FUNHYP{../../../Values/Composite}{Maps}{map-unite}
               ( \\&\quad\quad\quad\quad \FUNHYP{../.}{Giving}{interleave-map}
                       ( \\&\quad\quad\quad\quad\quad \FUNREF{bind-value}
                               (  \FUNHYP{../.}{Giving}{given}, 
                                      \FUNHYP{../.}{Linking}{fresh-link}
                                       (  \FUNHYP{../../../Values}{Value-Types}{values} ) ), \\&\quad\quad\quad\quad\quad
                              \FUNHYP{../../../Values/Composite}{Sets}{set-elements}
                               (  \VAR{SI} ) ) )
\end{align*}$$


  $$\FUNREF{bind-to-forward-links}
    (  \VAR{SI} )$$ binds each identifier in the set $$\VAR{SI}$$ to a
  freshly allocated link.


$$\begin{align*}
  \KEY{Auxiliary Funcon} \quad
  & \FUNDEC{set-forward-links}(
                     \VAR{M} : \FUNHYP{../../../Values/Composite}{Maps}{maps}
                               (  \FUNREF{identifiers}, 
                                      \FUNHYP{../.}{Linking}{links} )) 
    :  \TO \FUNHYP{../../../Values/Primitive}{Null}{null-type} \\&\quad
    \leadsto \FUNHYP{../.}{Flowing}{effect}
               ( \\&\quad\quad\quad\quad \FUNHYP{../.}{Giving}{interleave-map}
                       ( \\&\quad\quad\quad\quad\quad \FUNHYP{../.}{Linking}{set-link}
                               (  \FUNHYP{../../../Values/Composite}{Maps}{map-lookup}
                                       (  \VAR{M}, 
                                              \FUNHYP{../.}{Giving}{given} ), 
                                      \FUNREF{bound-value}
                                       (  \FUNHYP{../.}{Giving}{given} ) ), \\&\quad\quad\quad\quad\quad
                              \FUNHYP{../../../Values/Composite}{Sets}{set-elements}
                               (  \FUNHYP{../../../Values/Composite}{Maps}{map-domain}
                                       (  \VAR{M} ) ) ) )
\end{align*}$$


  For each identifier $$\VAR{I}$$ in the domain of $$\VAR{M}$$, $$\FUNREF{set-forward-links}
    (  \VAR{M} )$$ sets the 
  link to which $$\VAR{I}$$ is mapped by $$\VAR{M}$$ to the current bound value of $$\VAR{I}$$.




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
[Binding.cbs]: https://github.com/plancomps/CBS-beta/blob/math/Funcons-beta/Computations/Normal/Binding/Binding.cbs
  "CBS SOURCE FILE ON GITHUB"
[PLAIN]: /CBS-beta/docs/Funcons-beta/Computations/Normal/Binding
  "CBS SOURCE WEB PAGE"
 [PRETTY]: /CBS-beta/math/Funcons-beta/Computations/Normal/Binding
  "CBS-KATEX WEB PAGE"
[PDF]: /CBS-beta/math/Funcons-beta/Computations/Normal/Binding/Binding.pdf
  "CBS-LATEX PDF FILE"
[PLanCompS Project]: https://plancomps.github.io
  "PROGRAMMING LANGUAGE COMPONENTS AND SPECIFICATIONS PROJECT HOME PAGE"
{::comment}{% endraw %}{:/}
