# <b> Users Service API </b>

## <b> 📜 URL API base</b>

This API its only for local tests on port 3000. but you can change this from the code.<br>
URL base: http://localhost:3000

#### Framework

- Express.js

#### Libraries

- bcrypt <br>
- dotenv <br>
- jsonwebtoken <br>
- uuid <br>
- yup <br>
- nodemon

<br>

## 🛠 install

<p>If you want to use this API for local tests follow the path:</p>

1 - Install all the dependences from it by use this command:

```sh
$ yarn intall
```

2 - Next on the terminal you can run nodemon:

```
$ yarn dev
```

<br>

## <b> 💻 API init </b>

This API can be acess by acess URL from softwares like Insomnia or thunder client, you can acess by past URL with one of the four endpoints of this API, keep scrolling to see some examples.
<br>
<hr>
<br>

<br>

## <b> 🚦 Endpoints </b>

this application has 4 endpoints. keep scrolling to see all them

<br>

<br>

## <b> > User </b>

<br>

## <b> > Login </b>

<i> POST /login </i>

Here is a login route, you will need a user registered to post here, on the body of this requisition need to have username and password, there is an example:


```json
{
  "username": "kenzinho",
  "password": "abcde"
}
```

From this request you will expect as return an acess token to useres, like this one:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.
yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
}
```

<br>

### <b> Signup </b>

<i> POST /signup </i>


Here you will have the classic route to register a new user, all the informations are required, "age = int,username = str , email = email Format, password = str"

Essa rota serve para registrar um novo usuário no banco de dados, sendo obrigatório passar no corpo da requisição o username, email, age e password do usuário a registrar. <br>
Exemplo de requisição:

```json
{
  "age": 18,
  "username": "daniel",
  "email": "daniel@kenzie.com",
  "password": "abcd"
}
```

Dessa requisição é esperado um retorno com os dados do usuário cadastrado, como mostrado a seguir:

```json
{
  "uuid": "5f6fd342-3f7e-45d4-a836-3a2838f1b3e9",
  "createdOn": "2022-03-16T02:18:53.029Z",
  "email": "daniel@kenzie.com",
  "age": 18,
  "username": "daniel"
}
```

<br>

### <b> All user Get </b>

<i> GET /user </i>

this route its only to get all the users on the DB, you will need only a valid token from login, the body of this requisition need to be clear, there is an example awnser form requisition:

```json
[
  {
    "uuid": "5f6fd342-3f7e-45d4-a836-3a2838f1b3e9",
    "createdOn": "2022-03-31T02:20:16.025Z",
    "email": "kenzinho@kenzie.com",
    "age": 30,
    "username": "Kenzinho"
  }
]
```

<br>

### <b> Update Password </b>

<i> PUT /user/:uuid/password </i>

This route exists to update password, to do this you will need to be loged in and a valid token that recive from login, on the URL select user by UUID and the body has to have the new password you want, here is an example:

```json
{
  "password": "abcde"
}
```