# API Documentation

## Route /auth

### /auth 		GET 
Redirects to 42 API for authentication, then redirects to localhost:3000/auth?token=<TOKEN> 

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

## Route /chat

### /chat	GET
`{ 
}`
