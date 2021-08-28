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
  \KEY{Type} \quad & \FUN@environments \\
  \KEY{Alias} \quad & \FUN@envs \\
  \KEY{Datatype} \quad & \FUN@identifiers \\
  \KEY{Alias} \quad & \FUN@ids \\
  \KEY{Funcon} \quad & \FUN@identifier@tagged \\
  \KEY{Alias} \quad & \FUN@id@tagged \\
  \KEY{Funcon} \quad & \FUN@fresh@identifier \\
  \KEY{Entity} \quad & \FUN@environment \\
  \KEY{Alias} \quad & \FUN@env \\
  \KEY{Funcon} \quad & \FUN@initialise@binding \\
  \KEY{Funcon} \quad & \FUN@bind@value \\
  \KEY{Alias} \quad & \FUN@bind \\
  \KEY{Funcon} \quad & \FUN@unbind \\
  \KEY{Funcon} \quad & \FUN@bound@directly \\
  \KEY{Funcon} \quad & \FUN@bound@value \\
  \KEY{Alias} \quad & \FUN@bound \\
  \KEY{Funcon} \quad & \FUN@closed \\
  \KEY{Funcon} \quad & \FUN@scope \\
  \KEY{Funcon} \quad & \FUN@accumulate \\
  \KEY{Funcon} \quad & \FUN@collateral \\
  \KEY{Funcon} \quad & \FUN@bind@recursively \\
  \KEY{Funcon} \quad & \FUN@recursive
  \ ]
\end{align*}$$

$$\begin{align*}
  \KEY{Meta-variables} \quad
  & \VAR{T} <: \FUN@values
\end{align*}$$

#### Environments
               


$$\begin{align*}
  \KEY{Type} \quad 
  & \FUNDEC{environments}  
    \leadsto \FUN@maps
               (  \FUN@identifiers, 
                      \FUN@values\QUERY )
\\
  \KEY{Alias} \quad
  & \FUNDEC{envs} = \FUN@environments
\end{align*}$$


  An environment represents bindings of identifiers to values.
  Mapping an identifier to $$(   \  )$$ represents that its binding is hidden.
  
  Circularity in environments (due to recursive bindings) is represented using
  bindings to cut-points called $$\FUN@links$$. Funcons are provided for making
  declarations recursive and for referring to bound values without explicit
  mention of links, so their existence can generally be ignored.


$$\begin{align*}
  \KEY{Datatype} \quad 
  \FUNDEC{identifiers} 
  \ ::= \ &
  \{ \_ : \FUN@strings \} \mid \FUNDEC{identifier-tagged}(
                   \_ : \FUN@identifiers, \_ : \FUN@values)
\end{align*}$$

$$\begin{align*}
  \KEY{Alias} \quad
  & \FUNDEC{ids} = \FUN@identifiers
\\
  \KEY{Alias} \quad
  & \FUNDEC{id-tagged} = \FUN@identifier@tagged
\end{align*}$$


  An identifier is either a string of characters, or an identifier tagged with
  some value (e.g., with the identifier of a namespace).


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{fresh-identifier} 
    :  \TO \FUN@identifiers 
\end{align*}$$


  $$\FUN@fresh@identifier$$ computes an identifier distinct from all previously
  computed identifiers.


$$\begin{align*}
  \KEY{Rule} \quad
    & \FUN@fresh@identifier \leadsto 
        \FUN@identifier@tagged
          (  \STRING{generated}, 
                 \FUN@fresh@atom )
\end{align*}$$

#### Current bindings
               


$$\begin{align*}
  \KEY{Entity} \quad
  & \FUNDEC{environment}(\_ : \FUN@environments) \vdash \_ \TRANS  \_
\\
  \KEY{Alias} \quad
  & \FUNDEC{env} = \FUN@environment
\end{align*}$$


  The environment entity allows a computation to refer to the current bindings
  of identifiers to values.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{initialise-binding}(
                     \VAR{X} :  \TO \VAR{T}) 
    :  \TO \VAR{T} \\&\quad
    \leadsto \FUN@initialise@linking
               (  \FUN@initialise@generating
                       (  \FUN@closed
                               (  \VAR{X} ) ) )
\end{align*}$$


  $$\FUN@initialise@binding
    (  \VAR{X} )$$ ensures that $$\VAR{X}$$ does not depend on non-local bindings.
  It also ensures that the linking entity (used to represent potentially cyclic
  bindings) and the generating entity (for creating fresh identifiers) are 
  initialised.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bind-value}(
                     \VAR{I} : \FUN@identifiers, \VAR{V} : \FUN@values) 
    :  \TO \FUN@environments \\&\quad
    \leadsto \{ \VAR{I} \mapsto 
                  \VAR{V} \}
\\
  \KEY{Alias} \quad
  & \FUNDEC{bind} = \FUN@bind@value
\end{align*}$$


  $$\FUN@bind@value
    (  \VAR{I}, 
           \VAR{X} )$$ computes the environment that binds only $$\VAR{I}$$ to the value
  computed by $$\VAR{X}$$.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{unbind}(
                     \VAR{I} : \FUN@identifiers) 
    :  \TO \FUN@environments \\&\quad
    \leadsto \{ \VAR{I} \mapsto 
                  (   \  ) \}
\end{align*}$$


  $$\FUN@unbind
    (  \VAR{I} )$$ computes the environment that hides the binding of $$\VAR{I}$$.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bound-directly}(
                     \_ : \FUN@identifiers) 
    :  \TO \FUN@values 
\end{align*}$$

 
  $$\FUN@bound@directly
    (  \VAR{I} )$$ returns the value to which $$\VAR{I}$$ is currently bound, if any,
  and otherwise fails.

  $$\FUN@bound@directly
    (  \VAR{I} )$$ does *not* follow links. It is used only in connection with
  recursively-bound values when references are not encapsulated in abstractions.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
        \FUN@lookup
          (  \VAR{\ensuremath{\rho}}, 
                 \VAR{I} ) \leadsto 
          (  \VAR{V} : \FUN@values )
      }{
        \FUN@environment (  \VAR{\ensuremath{\rho}} ) \vdash \FUN@bound@directly
                      (  \VAR{I} : \FUN@identifiers ) \TRANS 
          \VAR{V}
      }
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
        \FUN@lookup
          (  \VAR{\ensuremath{\rho}}, 
                 \VAR{I} ) \leadsto 
          (   \  )
      }{
        \FUN@environment (  \VAR{\ensuremath{\rho}} ) \vdash \FUN@bound@directly
                      (  \VAR{I} : \FUN@identifiers ) \TRANS 
          \FUN@fail
      }
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bound-value}(
                     \VAR{I} : \FUN@identifiers) 
    :  \TO \FUN@values \\&\quad
    \leadsto \FUN@follow@if@link
               (  \FUN@bound@directly
                       (  \VAR{I} ) )
\\
  \KEY{Alias} \quad
  & \FUNDEC{bound} = \FUN@bound@value
\end{align*}$$

 
   $$\FUN@bound@value
    (  \VAR{I} )$$ inspects the value to which $$\VAR{I}$$ is currently bound, if any,
   and otherwise fails. If the value is a link, $$\FUN@bound@value
    (  \VAR{I} )$$ returns the
   value obtained by following the link, if any, and otherwise fails. If the 
   inspected value is not a link, $$\FUN@bound@value
    (  \VAR{I} )$$ returns it. 
   
   $$\FUN@bound@value
    (  \VAR{I} )$$ is used for references to non-recursive bindings and to
   recursively-bound values when references are encapsulated in abstractions.


#### Scope
               


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{closed}(
                     \VAR{X} :  \TO \VAR{T}) 
    :  \TO \VAR{T} 
\end{align*}$$


  $$\FUN@closed
    (  \VAR{X} )$$ ensures that $$\VAR{X}$$ does not depend on non-local bindings.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
        \FUN@environment (  \FUN@map
                        (   \  ) ) \vdash \VAR{X} \TRANS 
          \VAR{X}'
      }{
        \FUN@environment (  \_ ) \vdash \FUN@closed
                      (  \VAR{X} ) \TRANS 
          \FUN@closed
            (  \VAR{X}' )
      }
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \FUN@closed
        (  \VAR{V} : \VAR{T} ) \leadsto 
        \VAR{V}
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{scope}(
                     \_ : \FUN@environments, \_ :  \TO \VAR{T}) 
    :  \TO \VAR{T} 
\end{align*}$$


  $$\FUN@scope
    (  \VAR{D}, 
           \VAR{X} )$$ executes $$\VAR{D}$$ with the current bindings, to compute an environment
  $$\VAR{\ensuremath{\rho}}$$ representing local bindings. It then executes $$\VAR{X}$$ to compute the result,
  with the current bindings extended by $$\VAR{\ensuremath{\rho}}$$, which may shadow or hide previous
  bindings.
  
  $$\FUN@closed
    (  \FUN@scope
            (  \VAR{\ensuremath{\rho}}, 
                   \VAR{X} ) )$$ ensures that $$\VAR{X}$$ can reference only the bindings
  provided by $$\VAR{\ensuremath{\rho}}$$.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
        \FUN@environment (  \FUN@map@override
                        (  \VAR{\ensuremath{\rho}}\SUB{1}, 
                               \VAR{\ensuremath{\rho}}\SUB{0} ) ) \vdash \VAR{X} \TRANS 
          \VAR{X}'
      }{
        \FUN@environment (  \VAR{\ensuremath{\rho}}\SUB{0} ) \vdash \FUN@scope
                      (  \VAR{\ensuremath{\rho}}\SUB{1} : \FUN@environments, 
                             \VAR{X} ) \TRANS 
          \FUN@scope
            (  \VAR{\ensuremath{\rho}}\SUB{1}, 
                   \VAR{X}' )
      }
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \FUN@scope
        (  \_ : \FUN@environments, 
               \VAR{V} : \VAR{T} ) \leadsto 
        \VAR{V}
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{accumulate}(
                     \_ : (   \TO \FUN@environments )\STAR) 
    :  \TO \FUN@environments 
\end{align*}$$


  $$\FUN@accumulate
    (  \VAR{D}\SUB{1}, 
           \VAR{D}\SUB{2} )$$ executes $$\VAR{D}\SUB{1}$$ with the current bindings, to compute an
  environment $$\VAR{\ensuremath{\rho}}\SUB{1}$$ representing some local bindings. It then executes $$\VAR{D}\SUB{2}$$ to
  compute an environment $$\VAR{\ensuremath{\rho}}\SUB{2}$$ representing further local bindings, with the
  current bindings extended by $$\VAR{\ensuremath{\rho}}\SUB{1}$$, which may shadow or hide previous
  current bindings. The result is $$\VAR{\ensuremath{\rho}}\SUB{1}$$ extended by $$\VAR{\ensuremath{\rho}}\SUB{2}$$, which may shadow
  or hide the bindings of $$\VAR{\ensuremath{\rho}}\SUB{1}$$.
  
  $$\FUN@accumulate
    (  \_, 
           \_ )$$ is associative, with $$\FUN@map
    (   \  )$$ as unit, and extends to any
  number of arguments.


$$\begin{align*}
  \KEY{Rule} \quad
    & \RULE{
         \VAR{D}\SUB{1} \TRANS 
          \VAR{D}\SUB{1}'
      }{
         \FUN@accumulate
                      (  \VAR{D}\SUB{1}, 
                             \VAR{D}\SUB{2} ) \TRANS 
          \FUN@accumulate
            (  \VAR{D}\SUB{1}', 
                   \VAR{D}\SUB{2} )
      }
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \FUN@accumulate
        (  \VAR{\ensuremath{\rho}}\SUB{1} : \FUN@environments, 
               \VAR{D}\SUB{2} ) \leadsto 
        \FUN@scope
          (  \VAR{\ensuremath{\rho}}\SUB{1}, 
                 \FUN@map@override
                  (  \VAR{D}\SUB{2}, 
                         \VAR{\ensuremath{\rho}}\SUB{1} ) )
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \FUN@accumulate
        (   \  ) \leadsto 
        \FUN@map
          (   \  )
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \FUN@accumulate
        (  \VAR{D}\SUB{1} ) \leadsto 
        \VAR{D}\SUB{1}
\end{align*}$$

$$\begin{align*}
  \KEY{Rule} \quad
    & \FUN@accumulate
        (  \VAR{D}\SUB{1}, 
               \VAR{D}\SUB{2}, 
               \VAR{D}\PLUS ) \leadsto 
        \FUN@accumulate
          (  \VAR{D}\SUB{1}, 
                 \FUN@accumulate
                  (  \VAR{D}\SUB{2}, 
                         \VAR{D}\PLUS ) )
\end{align*}$$

$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{collateral}(
                     \VAR{\ensuremath{\rho}}\STAR : \FUN@environments\STAR) 
    :  \TO \FUN@environments \\&\quad
    \leadsto \FUN@checked \ 
               \FUN@map@unite
                 (  \VAR{\ensuremath{\rho}}\STAR )
\end{align*}$$

 
  $$\FUN@collateral
    (  \VAR{D}\SUB{1}, 
           \cdots )$$ pre-evaluates its arguments with the current bindings,
  and unites the resulting maps, which fails if the domains are not pairwise
  disjoint.

  $$\FUN@collateral
    (  \VAR{D}\SUB{1}, 
           \VAR{D}\SUB{2} )$$ is associative and commutative with $$\FUN@map
    (   \  )$$ as unit, 
  and extends to any number of arguments.


#### Recurse
               


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{bind-recursively}(
                     \VAR{I} : \FUN@identifiers, \VAR{E} :  \TO \FUN@values) 
    :  \TO \FUN@environments \\&\quad
    \leadsto \FUN@recursive
               (  \{  \VAR{I} \}, 
                      \FUN@bind@value
                       (  \VAR{I}, 
                              \VAR{E} ) )
\end{align*}$$


  $$\FUN@bind@recursively
    (  \VAR{I}, 
           \VAR{E} )$$ binds $$\VAR{I}$$ to a link that refers to the value of $$\VAR{E}$$, 
  representing a recursive binding of $$\VAR{I}$$ to the value of $$\VAR{E}$$.
  Since $$\FUN@bound@value
    (  \VAR{I} )$$ follows links, it should not be executed during the
  evaluation of $$\VAR{E}$$.


$$\begin{align*}
  \KEY{Funcon} \quad
  & \FUNDEC{recursive}(
                     \VAR{SI} : \FUN@sets
                               (  \FUN@identifiers ), \VAR{D} :  \TO \FUN@environments) 
    :  \TO \FUN@environments \\&\quad
    \leadsto \FUN@re@close
               (  \FUN@bind@to@forward@links
                       (  \VAR{SI} ), 
                      \VAR{D} )
\end{align*}$$


  $$\FUN@recursive
    (  \VAR{SI}, 
           \VAR{D} )$$ executes $$\VAR{D}$$ with potential recursion on the bindings of 
  the identifiers in the set $$\VAR{SI}$$ (which need not be the same as the set of
  identifiers bound by $$\VAR{D}$$).


$$\begin{align*}
  \KEY{Auxiliary Funcon} \quad
  & \FUNDEC{re-close}(
                     \VAR{M} : \FUN@maps
                               (  \FUN@identifiers, 
                                      \FUN@links ), \VAR{D} :  \TO \FUN@environments) 
    :  \TO \FUN@environments \\&\quad
    \leadsto \FUN@accumulate
               (  \FUN@scope
                       (  \VAR{M}, 
                              \VAR{D} ), 
                      \FUN@sequential
                       (  \FUN@set@forward@links
                               (  \VAR{M} ), 
                              \FUN@map
                               (   \  ) ) )
\end{align*}$$


  $$\FUN@re@close
    (  \VAR{M}, 
           \VAR{D} )$$ first executes $$\VAR{D}$$ in the scope $$\VAR{M}$$, which maps identifiers
  to freshly allocated links. This computes an environment $$\VAR{\ensuremath{\rho}}$$ where the bound
  values may contain links, or implicit references to links in abstraction
  values. It then sets the link for each identifier in the domain of $$\VAR{M}$$ to
  refer to its bound value in $$\VAR{\ensuremath{\rho}}$$, and returns $$\VAR{\ensuremath{\rho}}$$ as the result.


$$\begin{align*}
  \KEY{Auxiliary Funcon} \quad
  & \FUNDEC{bind-to-forward-links}(
                     \VAR{SI} : \FUN@sets
                               (  \FUN@identifiers )) 
    :  \TO \FUN@maps
                     (  \FUN@identifiers, 
                            \FUN@links ) \\&\quad
    \leadsto \FUN@map@unite
               ( \\&\quad\quad\quad\quad \FUN@interleave@map
                       ( \\&\quad\quad\quad\quad\quad \FUN@bind@value
                               (  \FUN@given, 
                                      \FUN@fresh@link
                                       (  \FUN@values ) ), \\&\quad\quad\quad\quad\quad
                              \FUN@set@elements
                               (  \VAR{SI} ) ) )
\end{align*}$$


  $$\FUN@bind@to@forward@links
    (  \VAR{SI} )$$ binds each identifier in the set $$\VAR{SI}$$ to a
  freshly allocated link.


$$\begin{align*}
  \KEY{Auxiliary Funcon} \quad
  & \FUNDEC{set-forward-links}(
                     \VAR{M} : \FUN@maps
                               (  \FUN@identifiers, 
                                      \FUN@links )) 
    :  \TO \FUN@null@type \\&\quad
    \leadsto \FUN@effect
               ( \\&\quad\quad\quad\quad \FUN@interleave@map
                       ( \\&\quad\quad\quad\quad\quad \FUN@set@link
                               (  \FUN@map@lookup
                                       (  \VAR{M}, 
                                              \FUN@given ), 
                                      \FUN@bound@value
                                       (  \FUN@given ) ), \\&\quad\quad\quad\quad\quad
                              \FUN@set@elements
                               (  \FUN@map@domain
                                       (  \VAR{M} ) ) ) )
\end{align*}$$


  For each identifier $$\VAR{I}$$ in the domain of $$\VAR{M}$$, $$\FUN@set@forward@links
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
