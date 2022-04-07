https://dbdiagram.io/d

```table Users { 
  id        int [pk, increment] 
  username  string 
  avatar    string 
  tfa       boolean 
  stats_id  int 
} 

table Stats { 
  id      int 
  wins    int 
  losses  int 
  level   number 
} 

table Matches { 
  id  int   [pk, increment] 
  winner  int 
  loser   int 
  ladder  int 
} 

table Room { 
  id int [pk, increment] 
  name  string 
} 

table Room_History { 
    id int [pk, increment] 
    room_id int 
    message_id int 
} 

table Room_Members { 
    id int [pk, increment] 
    room_id int 
    user_id int 
} 

table Message { 
  id int [pk, increment] 
  time timestamp 
  user_id int 
  content string 
} 

  
  

Ref: "Users"."stats_id" < "Stats"."id" 

Ref: "Room"."id" < "Room_History"."room_id" 

Ref: "Room_History"."message_id" < "Message"."id" 

Ref: "Message"."user_id" < "Users"."id" 

Ref: "Room_Members"."room_id" < "Room"."id" 

Ref: "Room_Members"."user_id" < "Users"."id" 
```
