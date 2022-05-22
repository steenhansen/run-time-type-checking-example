[Run-Time-Type-Checking-Example](https://run-time-type-checking.herokuapp.com/) exists to highlight the use of the
[Type-Czech Javascript library](https://github.com/steenhansen/type-czech)
during development and testing.


There is only one function that is type checked in this program, async serverGetSqrt(), which fetches a 
square root from the server. Both parameters and the result are inspected for
correctness when Type-Czech is turned on.

The code to link-up the function to type-checking is

`
serverGetSqrt = type_czech.linkUp(serverGetSqrt, PRE_serverGetSqrt, POST_serverGetSqrt);
`

this line causes the function serverGetSqrt() to have its parameters checked before every
invocation by the function PRE_serverGetSqrt(). The function POST_serverGetSqrt() receives
and certifies that the results of serverGetSqrt() are valid.

The two type-checking functions reside in [/Type-Czech/type-checks_HAS-CZECH.js](/Type-Czech/type-checks_HAS-CZECH.js).

##Running program 

* Run on Heroku, no Proc file needed
  * npm run start

<br/>

* Local Dev with Type-Czech on
  * npm run dev-has-czech 

<br/>

* Local Dev with Type-Czech off
  * npm run dev-without-czech 

<br/>

* Local Prod with Type-Czech on
  * npm run prod-has-czech

<br/>

* Local Prod with Type-Czech off
  * npm run prod-without-czech 







