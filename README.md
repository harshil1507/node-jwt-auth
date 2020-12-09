# node-jwt-auth
A minimal repo to show the use of authentication using JWT


POST `http://localhost:3000/public/signup` to signup. Pass `email` and `password` in body
<br>
POST `http://localhost:3000/public/login` to login. Pass `email` and `password` in body
<br>
GET `http://localhost:3000/protected/profile` to access protected route. Pass `secret_token` in params.
<br>
GET `http://localhost:3000/public/` to access unprotected route.
