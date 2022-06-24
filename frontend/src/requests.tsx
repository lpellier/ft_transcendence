import axios from 'axios';

function getUser(setter: any) {

	axios.get('http://127.0.0.1:3001/users/me',{
		withCredentials: true
	})
	.then(res => {
		console.log("Get user request success")
		const resUser = res.data;
		setter(resUser);
	})
	.catch(function (err) {
		console.log("Get user request failed : ", err)
	});
}

function reqLogout() {

	axios.get('http://127.0.0.1:3001/auth/logout',
	{
	    withCredentials: true,
	})
	.then(res => {
	  console.log("Logout")
	})
	.catch(function (err) {
	  console.log("Get request failed : ", err)
	});
}


export {getUser, reqLogout}