# API Documentation

## Route /auth

### /auth 		GET 
Redirection from 42 API, redirects to front homepage (/home) if authentication is successful. 

## Route /users

### /users		GET (NOT READY)
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
Returns object of self, with settings. 
```js
{
  id: number;
  username: string;
  tfa: boolean;
  victories: number;
  losses: number;
  level: number;
  progression: number;
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
  id: number;
  username: string;
  victories: number;
  losses: number;
  level: number;
  progression: number;
}
```
