# Noise Controller API

## Introduction

[https://noise-controller.herokuapp.com/api](https://noise-controller.herokuapp.com/api)

## Table of Contents

- [Overview](#overview)
  - [Installation](#Installation)
  * [API URL](#api-url)
  * [SCHEMA](#SCHEMA)
  * [Test accounts](#Test-Accounts)
  * [API endpoints](#API-ENDPOINTS)
- [Auth/User Endpoint routes](#AUTH-ROUTES)
  - [Register](#REGISTER)
  - [Login](#LOGIN)
  - [Pull List of Users](#PULL-LIST-OF-USERS)
  - [Pull User Information by Id](#PULL-USER-INFORMATION-BY-ID)
  - [Pull Classrooms by User (/auth/:id/classrooms endpoint)](#PULL-CLASSROOMS-BY-USER)
- [Classroom Endpoint routes](#DATA-ROUTES)
  - [Pull list of Classrooms by User (/classrooms endpoint)](#LIST-OF-CLASSROOMS)
  - [Pull Individual Classroom (/classrooms/:id endpoint)](#CLASSROOM-BY-ID)

---

# Overview

This repository holds all back-end files and resources for the noise controller application and its readme documentation. This repository was made during Lambda School's build week where students join a team that consists other students from different cohorts. This repository is for the Back end side.

---

## API URL

https://noise-controller.herokuapp.com/api

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

| name                                     | method | endpoint             | description                                                                                                                         |
| ---------------------------------------- | ------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Register                                 | POST   | /auth/register       | Creates a new `user` to the users table in the database                                                                             |
| Login                                    | POST   | /auth/login          | Checks whether payload from the `body` matches with a user in the database. On Succesful login, returns a message and a `JWT Token` |
| Get all users                            | GET    | /auth                | `PROTECTED ROUTE` - Returns an array of user objects of all users                                                                   |
| Get all Classrooms by User Logged In     | GET    | /auth/:id/classrooms | `PROTECTED ROUTE` - Returns an array of the user information with nested classroom objects of the user by the user ID               |
| Get all classrooms by the User logged in | GET    | /classrooms          | `PROTECTED ROUTE` - Returns an array of classroom objects for the user logged in only                                               |
| Get a classroom by ID                    | GET    | /classrooms/:id      | `PROTECTED ROUTE` - Returns an a classroom object by classroom ID                                                                   |  |
| Add a new classroom                      | POST   | /classrooms          | `PROTECTED ROUTE` - Adds the classroom object created                                                                               |
| Edit a classroom                         | PUT    | /classrooms/:id      | `PROTECTED ROUTE` - Edits the classroom object created by classroom ID                                                              |  |
| Delete a classroom                       | DELETE | /classrooms/:id      | `PROTECTED ROUTE` - Deletes a specific classroom by classroom ID                                                                    |

[Back to Table of Contents](#table-of-contents)

---

# AUTH ROUTES

---

## _USERS_

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

---

## **PULL LIST OF USERS**

### **Pulls list of users who have registered**

_Method Url:_ `/auth`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type    | required | description           |
| ---------- | ------- | -------- | --------------------- |
| `id`       | Integer | Yes      | PRIMARY KEY           |
| `username` | String  | Yes      |
| `password` | String  | Yes      | Encrypted after login |

_example:_

```
[
  {
    "id": 1,
    "username": "test",
    "password": "$2a$10$D7aSCe7SyKYZgpx36ycT.eYuSN/sFqoWgiGF/kfvRRn82pUD/fXu2"
  },
  {
    "id": 2,
    "username": "admin",
    "password": "$2a$10$pyGO3WnnCQUAK51iiW7BH.G1a8kTuyGsElv6wJODffknK8EGXyjQC"
  },
  {
    "id": 3,
    "username": "teacher",
    "password": "$2a$10$mueD83uzIF3L9UNLxOHTf.h.3sZ1Z.PjBmHQh.4tMebFpKjrSQDAq"
  }
]
```

#### Response

##### 200 (OK)

> If you successfully login and go to the endpoint, the endpoint will return an HTTP response with a status code `200`.

##### 401 (Unauthorized)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "msg": "unauthorized"
}
```

##### 404 (Not Found)

> If you hit an endpoint that does not exist, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "msg": "The requested information is not found"
}
```

---

## **PULL USER INFORMATION BY ID**

### **Pulls individual user information by ID**

_Method Url:_ `/auth/:id`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type    | required | description           |
| ---------- | ------- | -------- | --------------------- |
| `id`       | Integer | Yes      | PRIMARY KEY           |
| `username` | String  | Yes      |
| `password` | String  | Yes      | Encrypted after login |

_example:_

```
{
  "id": 1,
  "username": "test",
  "password": "$2a$10$D7aSCe7SyKYZgpx36ycT.eYuSN/sFqoWgiGF/kfvRRn82pUD/fXu2"
}

```

#### Response

##### 200 (OK)

> If you successfully login and go to the endpoint, the endpoint will return an HTTP response with a status code `200`.

##### 401 (Unauthorized)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "msg": "unauthorized"
}
```

##### 404 (Not Found)

> If you hit an endpoint that does not exist, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "msg": "The requested information is not found"
}
```

---

## **PULL CLASSROOMS BY USER**

### **Pulls classrooms by the User logged in (FROM THE /auth ENDPOINT)**

_Method Url:_ `/auth/:id/classrooms`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name             | type    | required | description                      |
| ---------------- | ------- | -------- | -------------------------------- |
| `id`             | Integer | Yes      | PRIMARY KEY                      |
| `username`       | String  | Yes      |
| `user_id`        | Integer | N/A      | pulled from the users table      |
| `classroom_id`   | Integer | N/A      | pulled from the classrooms table |
| `classroom_name` | String  | N/A      | pulled from the classrooms table |
| `score`          | Integer | N/A      | pulled from the classrooms table |
| `highest_score`  | Integer | N/A      | pulled from the classrooms table |

_example:_
Live example API Endpoint: https://noise-controller.herokuapp.com/api/auth/1/classrooms

```
{
  "id": 1,
  "username": "test",
  "classrooms": [
    {
      "user_id": 1,
      "classroom_id": 1,
      "classroom_name": "Reading",
      "score": 0,
      "highest_score": 0
    },
    {
      "user_id": 1,
      "classroom_id": 2,
      "classroom_name": "Math",
      "score": 0,
      "highest_score": 0
    },
    {
      "user_id": 1,
      "classroom_id": 3,
      "classroom_name": "Science",
      "score": 0,
      "highest_score": 0
    },
    {
      "user_id": 1,
      "classroom_id": 4,
      "classroom_name": "Labs",
      "score": 0,
      "highest_score": 0
    },
    {
      "user_id": 1,
      "classroom_id": 5,
      "classroom_name": "Free Study Period",
      "score": 0,
      "highest_score": 0
    },
    {
      "user_id": 1,
      "classroom_id": 6,
      "classroom_name": "Free Study Period I",
      "score": 0,
      "highest_score": 0
    },
    {
      "user_id": 1,
      "classroom_id": 7,
      "classroom_name": "Free Study Period",
      "score": 0,
      "highest_score": 0
    }
  ]
}

```

#### Response

##### 200 (OK)

> If you successfully login and go to the endpoint, the endpoint will return an HTTP response with a status code `200`.

##### 401 (Unauthorized)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "msg": "unauthorized"
}
```

##### 404 (Not Found)

> If you hit an endpoint that does not exist (for example, /:id/classrooms with an id that does not exist), the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "msg": "The requested information is not found"
}
```

---

[Back to Table of Contents](#table-of-contents)

# DATA ROUTES

---

## _CLASSROOMS_

## **LIST OF CLASSROOMS**

### **Pulls classrooms by the User logged in**

_Method Url:_ `/classrooms`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name             | type    | required | description                                                    |
| ---------------- | ------- | -------- | -------------------------------------------------------------- |
| `classroom_name` | String  | Yes      |
| `score`          | Integer | No       |
| `highest_score`  | Integer | No       |
| `user_id`        | Integer | N/A      | pulled from the users table (id from /auth/:id or /auth)       |
| `teacher`        | String  | N/A      | pulled from the users table (username from /auth/:id or /auth) |

_example:_
Live example API Endpoint: https://noise-controller.herokuapp.com/api/classrooms

```
[
  {
    "id": 1,
    "classroom_name": "Reading",
    "score": 0,
    "highest_score": 0,
    "user_id": 1,
    "teacher": "test"
  },
  {
    "id": 2,
    "classroom_name": "Math",
    "score": 0,
    "highest_score": 0,
    "user_id": 1,
    "teacher": "test"
  },
  {
    "id": 3,
    "classroom_name": "Science",
    "score": 0,
    "highest_score": 0,
    "user_id": 1,
    "teacher": "test"
  },
  {
    "id": 4,
    "classroom_name": "Labs",
    "score": 0,
    "highest_score": 0,
    "user_id": 1,
    "teacher": "test"
  },
  {
    "id": 5,
    "classroom_name": "Free Study Period",
    "score": 0,
    "highest_score": 0,
    "user_id": 1,
    "teacher": "test"
  },
  {
    "id": 6,
    "classroom_name": "Free Study Period I",
    "score": 0,
    "highest_score": 0,
    "user_id": 1,
    "teacher": "test"
  },
  {
    "id": 7,
    "classroom_name": "Free Study Period",
    "score": 0,
    "highest_score": 0,
    "user_id": 1,
    "teacher": "test"
  }
]
```

#### Response

##### 200 (OK)

> If you successfully login and go to the endpoint, the endpoint will return an HTTP response with a status code `200`.

##### 401 (Unauthorized)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "msg": "unauthorized"
}
```

##### 404 (Not Found)

> If you hit an endpoint that does not exist, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "msg": "The requested information is not found"
}
```

---

## **CLASSROOM BY ID**

### **Pulls specific classroom by the classroom id**

_Method Url:_ `/classrooms/:id`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name             | type    | required | description                                                    |
| ---------------- | ------- | -------- | -------------------------------------------------------------- |
| `classroom_name` | String  | Yes      |
| `score`          | Integer | No       |
| `highest_score`  | Integer | No       |
| `user_id`        | Integer | N/A      | pulled from the users table (id from /auth/:id or /auth)       |
| `teacher`        | String  | N/A      | pulled from the users table (username from /auth/:id or /auth) |

_example:_
Live example API Endpoint: https://noise-controller.herokuapp.com/api/classrooms/1

```
{
  "id": 1,
  "classroom_name": "Reading",
  "score": 0,
  "highest_score": 0,
  "user_id": 1,
  "teacher": "test"
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

> If you hit an endpoint that does not exist (for example, /classrooms/:id with an id that does not exist), the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "msg": "The requested information is not found"
}
```

[Back to Table of Contents](#table-of-contents)
