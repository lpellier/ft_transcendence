#!/bin/bash

read -p "Add the token: " TOKEN

while [ true ]; do
	read -p "Enter route: " route
	if [ -z route ]; then
		break
	fi
	curl -H "Authorization: Bearer ${TOKEN}" "http://localhost:3001/$route"
done