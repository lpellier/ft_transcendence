# API Documentation

## Route /auth

### /auth 		GET 
Redirects to 42 API for authentication, then redirects to localhost:3000/auth?token=<TOKEN> 

## Route /users
  
### /users/me   GET 
Returns object: 
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
```

### /users/:id	  GET 
{ 
	username: string; 
	avatar: string; 
}
  
Returns object with username, avatar and stats. 

## Route /chat

### /chat   GET
`{ 
}`
