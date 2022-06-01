#!/bin/bash

token=`curl -s --cookie-jar cookie.txt https://signin.intra.42.fr/users/sign_in | grep csrf-token | cut -d \" -f 4`

read -p "Username: " username
read -s -p "Password: " password

echo "authenticity_token=$token&user[login]=$username&user[password]=$password"
curl -sLv --cookie cookie.txt --cookie-jar cookie.txt -d "authenticity_token=$token&user[login]=$username&user[password]=$password&commit=Sign+in" https://signin.intra.42.fr/users/sign_in > file1

echo "before auth"
curl -Lv --cookie cookie.txt --cookie-jar cookie.txt http://127.0.0.1:3001/auth  > file2

echo "before me"
curl -Lv --cookie cookie.txt "http://127.0.0.1:3001/users/me"

# read -p "Add the token: " TOKEN

# while [ true ]; do
# 	read -p "Enter route: " route
# 	if [ -z route ]; then
# 		break
# 	fi
# 	curl -H "Authorization: Bearer ${TOKEN}" "http://127.0.0.1:3001/$route"
# done