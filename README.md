# Noise Controller API

## Introduction

[https://noise-controller.herokuapp.com/](https://noise-controller.herokuapp.com/)

You're a funny guy, but you keep losing your list of jokes and forgetting which ones had the best reactions! Well worry no more- Dad (or bad??) jokes app to the rescue.

## Table of Contents

- [Overview](#overview)
  - [Installation](#Installation)
  * [API URL](#api-url)
  * [SCHEMA](#SCHEMA)
  * [Test accounts](#Test-Accounts)
  * [API endpoints](#API-ENDPOINTS)
- [Auth routes](#AUTH-ROUTES)
  - [Register](#REGISTER)
  - [Login](#Login)

---

# Overview

This repository holds all back-end files and resources for the noise controller application and its readme documentation. This repository was made during Lambda School's build week where students join a team that consists other students from different cohorts. This repository is for the Back end side.

---

## API URL

https://jokr.herokuapp.com/api

[Back to Table of Contents](#table-of-contents)

---

## Installation

Fork/Clone the repository. In the same directory as the package.json, in your terminal:

```
yarn install
```

This is to install all needed packages. To start the server, in your terminal, type:

```
yarn server
```

To test the repository:

```
yarn test
```

[Back to Table of Contents](#table-of-contents)

---

## SCHEMA

`user`

```
    {
        "id": 1,                            // Integer [Primary key]
        "username": "test",                // String [Required, Unique]
        "password": "password",             // String [Required]
    }
```

`classrooms`

```
    {
        "id": 1,                                            // Integer [Primary Key]
        "classroom_name": "Reading",                               // String [Max 50 characters, Required]
        "score": 0,                               // Integer [Default 0]
        "highest_score": 0,                               // Integer [Default 0]
    }
```

`noise_controller_account`

```
    {
        "id": 1,
        "user_id": 1,
        "classroom_id": 1
    }

```

[Back to Table of Contents](#table-of-contents)

## Test Accounts

```

  username: 'test',
  password: 'password'


  username: 'admin',
  password: 'password'


  username: 'teacher',
  password: 'password'

```

[Back to Table of Contents](#table-of-contents)

## API ENDPOINTS

| name | method | endpoint | description |
| ---- | ------ | -------- | ----------- |


**Main Endpoint - User (/auth)**

| Register | POST | /auth/register | Creates a new `user` to the users table in the database |
| Login | POST | /auth/login | Checks whether payload from the `body` matches with a user in the database. On Succesful login, returns a message and a `JWT Token` |
| Get all users | GET | /auth | `PROTECTED ROUTE` - Returns an array of user objects of all users |
| Get all Classrooms by User Logged In | GET | /auth/:id/classrooms | `PROTECTED ROUTE` - Returns an array of the user information with nested classroom objects of the user |

**Main Endpoint - Classrooms (/classrooms)**

| Get all classrooms by the User logged in | GET | /classrooms | `PROTECTED ROUTE` - Returns an array of classroom objects for the user logged in only |
| Get a classroom by ID | GET | /classrooms/:id | `PROTECTED ROUTE` - Returns an a classroom object by ID | |
| Add a new classroom | POST | /classrooms | `PROTECTED ROUTE` - Adds the classroom object created |
| Edit a classroom | PUT | /classrooms/:id | `PROTECTED ROUTE` - Edits the classroom object created | |
| Delete from wallet | DELETE | /classrooms/:id | `PROTECTED ROUTE` - Deletes a specific classroom by ID |

[Back to Table of Contents](#table-of-contents)

---

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/auth/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description    |
| ---------- | ------ | -------- | -------------- |
| `username` | String | Yes      | Must be unique |
| `password` | String | Yes      |

_example:_

```
{
  username: "test",
  password: "password",
}
```

#### Response

##### 200 (OK)

> If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id":1,
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NTkwNzM1NzEsImV4cCI6MTU1OTE1OTk3MX0.VOSCz4cQGhP4L060griaArXi2D3Ut7b6nB1JGFVbJj0"
}
```

##### 400 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
  "msg": "Bad request, please make sure all required field are supplied and correct"
}
```

[Back to Table of Contents](#table-of-contents)

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/auth/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                           |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| `username` | String | Yes      | Must match a username in the database                                 |
| `password` | String | Yes      | Must match a password in the database corresponding to above username |

_example:_

```
{
  username: "test",
  password: "password"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0"
}
```

##### 400 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
  "msg": "Bad request, please make sure all required field are supplied and correct"
}
```

## **CLASSROOMS**

### **Registers a user**

_Method Url:_ `/classrooms`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name             | type    | required | description |
| ---------------- | ------- | -------- | ----------- |
| `classroom_name` | String  | Yes      |
| `score`          | Integer | No       |
| `highest_score`  | Integer | No       |

_example:_

```
{
        "id": 1,
        "classroom_name": "Reading",
        "score": 0,
        "highest_score": 0,
    }
```

#### Response

##### 200 (OK)

> If you successfully login and go to the endpoint, the endpoitn will return an HTTP response with a status code `200`.

##### 401 (Unauthorized)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "msg": "unauthorized"
}
```

##### 404 (Not Found)

> If you hit an endpoint that does not exist (for example, /classrooms/:id with an id that does not exist, the endpoint will return an HTTP response with a status code `404` and a body as below. )

```
{
  "msg": "The requested information is not found"
}
```

[Back to Table of Contents](#table-of-contents)
