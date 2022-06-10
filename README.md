# API Documentation

## Route /auth

### /auth 		GET 
Redirection from 42 API, redirects to front homepage (/home) if authentication is successful. 

## Route /users

### /users		GET
Returns list of objects of all users:
```js
[
  {
    id: int,
    username:   string,
    ...
  }
]
```

### /users/me  		 GET 
Returns object of self: 
```js
{
  id:	int,
  username: string,
  ...
}
```

### /users/me  		 PATCH 
Update with one of the optional elements (only one). Return string if successful. 
```js
{
  username: string,
  tfa: boolean
}
```

### /users/:id 		GET
Returns object of specified user (username, avatar, stats and match_history, etc.) Verify ~/backend/prisma/schema.prisma for more information. 
```js
{
  id: int,
  username: string, 
  avatar: string,
  stats: []
  ...
}
```
