# API Documentation

## Route /auth

### /auth 		GET 
Redirects to 42 API for authentication, then redirects to localhost:3000/auth?token=<TOKEN> 

## Route /users

### /users	GET
Returns list of basic identity objects of all users:
```
[
	{
		id:	int;
		username: string; 
	}
]
```

### /users/me   GET 
Returns basic identity object of self: 
```
{
	id:	int;
	username: string; 
}
```

### /users/:id	  GET
Returns object with username, avatar, stats and match_history. 
```
{
	username: string; 
	avatar: string; 
	stats: { 
		wins: int; 
		losses: int; 
		level: int; 
   } 
   match_history: Match[ 
   	{
		winner: string;
		loser: string;
		ladder: int; 
    }
  ] 
}

## Route /chat

### /chat   GET
`{ 
}`
