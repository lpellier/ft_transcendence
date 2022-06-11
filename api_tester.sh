#!/bin/bash

BACKEND_URL="http://127.0.0.1:3001"

if [  `grep user.id cookie.txt > /dev/null; echo $?` != 0 ]
then
	echo "Authenticate to 42:"
	read -p "Username: " username
	read -s -p "Password: " password
	echo

	while [ `grep user.id cookie.txt > /dev/null; echo $?` != 0 ]
	do
		token=`curl -s -c cookie.txt https://signin.intra.42.fr/users/sign_in | grep csrf-token | cut -d \" -f 4`
		curl -sL -b cookie.txt -c cookie.txt -d "authenticity_token=$token&user[login]=$username&user[password]=$password&commit=Sign+in" -o /dev/null https://signin.intra.42.fr/users/sign_in
		if [ `grep _mkra_stck cookie.txt > /dev/null; echo $?` != 0 ]
		then
			echo "Wrong credentials."
			exit
		fi
	done
	echo "Authenticated."
else
	echo "Already authenticated to 42."
fi

auth_otp="Authorization: Bearer `grep jwt-otp cookie.txt | cut -d "	" -f 7`"
auth_jwt="Authorization: Bearer `grep jwt[^-] cookie.txt | cut -d "	" -f 7`"

while [ 1 ]
do
	cat << EOF
What do you want to do?
1. Authenticate
2. Authenticate with Google-Authenticator
3. Get your profile
4. Activate TFA
5. Disable TFA
6. Change username
7. Test a custom route with GET
9. Exit
EOF
	read
	case $REPLY in
		1)		curl -sL -b cookie.txt -c cookie.txt $BACKEND_URL/auth
				auth_otp="Authorization: Bearer `grep jwt-otp cookie.txt | cut -d "	" -f 7`"
				auth_jwt="Authorization: Bearer `grep jwt[^-] cookie.txt | cut -d "	" -f 7`"
				;;
		2)		read -p "Key in one-time password:" otp
				curl -H $auth_otp -c cookie.txt -b cookie.txt -d "value=$otp" "$BACKEND_URL/auth/google-authenticator" 
				auth_jwt="Authorization: Bearer `grep jwt[^-] cookie.txt | cut -d "	" -f 7`"
				;;
		3)		curl -H "$auth_jwt" "$BACKEND_URL/users/me"
				;;
		4)		curl -X PATCH -H "Content-Type: application/json" -H "$auth_jwt" -d '{"tfa": true}' "$BACKEND_URL/users/me"
				;;
		5)		curl -X PATCH -H "Content-Type: application/json" -H "$auth_jwt" -d '{"tfa": false}' "$BACKEND_URL/users/me"
				;;
		6)		read -p "Key in new username: " newUserName
				curl -X PATCH -H "$auth_jwt" -d "username=$newUserName" "$BACKEND_URL/users/me"
				;;
		7)		read -p "Key in route to test:" route
				curl -H "$auth_jwt" "$BACKEND_URL/$route"
				;;
		9)		exit
				;;
	esac
	read
done

# To enable 2fa and get secret
# curl -H "Authorization: Bearer `grep 'jwt' cookie.txt | cut -d "	" -f 7`" "http://127.0.0.1:3001/users/enable-two-factor-authentication"
