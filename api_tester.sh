#!/bin/bash

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
		1)		curl -sL -b cookie.txt -c cookie.txt http://127.0.0.1:3001/auth
				;;
		2)		read -p "Key in one-time password:" otp
				curl -H "Authorization: Bearer `grep jwt- cookie.txt | cut -d "	" -f 7`" -c cookie.txt -b cookie.txt -d "value=$otp" "http://127.0.0.1:3001/auth/google-authenticator" 
				;;
		3)		curl -H "Authorization: Bearer `grep 'jwt[^-]' cookie.txt | cut -d "	" -f 7`" "http://127.0.0.1:3001/users/me"
				;;
		4)		curl -X PATCH -H "Authorization: Bearer `grep 'jwt[^-]' cookie.txt | cut -d "	" -f 7`" -d "tfa=true" "http://127.0.0.1:3001/users/me"
				;;
		5)		curl -X PATCH -H "Authorization: Bearer `grep 'jwt[^-]' cookie.txt | cut -d "	" -f 7`" -d "tfa=false" "http://127.0.0.1:3001/users/me"
				;;
		6)		read -p "Key in new username: " newUserName
				curl -X PATCH -H "Authorization: Bearer `grep 'jwt[^-]' cookie.txt | cut -d "	" -f 7`" -d "username=$newUserName" "http://127.0.0.1:3001/users/me"
				;;
		7)		read -p "Key in route to test:" route
				curl -H "Authorization: Bearer `grep 'jwt[^-]' cookie.txt | cut -d "	" -f 7`" "http://127.0.0.1:3001/$route"
				;;
		9)		exit
				;;
	esac
	read
done

# To enable 2fa and get secret
# curl -H "Authorization: Bearer `grep 'jwt' cookie.txt | cut -d "	" -f 7`" "http://127.0.0.1:3001/users/enable-two-factor-authentication"
