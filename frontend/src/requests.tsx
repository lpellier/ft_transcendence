import axios from 'axios';

function getUser(setter: any) {

	axios.get(process.env.REACT_APP_BACK_URL + '/users/me',{
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

	axios.get(process.env.REACT_APP_BACK_URL + '/auth/logout',
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