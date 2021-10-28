#### Setup

First, create a .env file in the root folder with these variables:

```bash
JWT_SECRET=a string that JWT dependency use to create tokens, I recommend using this URL to create it: https://www.allkeysgenerator.com/
JWT_LIFETIME=token expired time
PORT=port
NODE_ENV=environment name
MONGO_URI=URI that mongo atlas provided

```

Then

```bash
npm install && npm start
```

## API (version 1.0)

### Auth

- POST ​/auth​/register ==> Register User

```bash
  Example request body: {
  "name": "bob",
  "email": "bob@gmail.com",
  "password": "secret"
  }
```

- POST ​/auth​/login ==> login User

```bash
  Example request body: {
  "email": "susan@gmail.com",
  "password": "secret"
}
```

### Jobs

Before executing any of these requests, we needed to login or register a user.

- POST ​/jobs

```bash
  Example request body: {
  "company": "google",
  "position": "front-end developer"
}
```

- GET ​/jobs

- GET ​/jobs​/{id}

- PATCH ​/jobs​/{id}

```bash
  Example request body: {
  "company": "random",
  "position": "intern"
}
```

- DELETE ​/jobs​/{id}

## Functionalities

### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

### Security

- helmet
- cors ==> Ensures that our API it's accesible for different domains. If we haven't it, we can't access our API from frontends on differnets domains. Makes it accesible to the public.
- xss-clean ==> Sanitizes the user input (req.body, req.query, req.params ) as a result, the attackers can inject code on them.
- express-rate-limit
