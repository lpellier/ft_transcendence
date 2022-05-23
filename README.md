# API Documentation

## Route /auth

### /auth 		GET 
Redirection from 42 API, redirects to front homepage (/home) if authentication is successful. 

## Route /users

### /users		GET
Returns list of objects of all users:
```
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
```
{
    id:	int,
    username: string,
    ...
}
```

### /users/:id 		GET
Returns object of specified user (username, avatar, stats and match_history, etc.) Verify ~/backend/prisma/schema.prisma for more information. 
```
{
    id: int,
    username: string, 
    avatar: string,
    stats: []
    ...
}
```
