import axios from 'axios';
import moment from 'moment';

export async function checkLoginStatus() {
    var data = {
        loginStatus: false,
		id: 0,
        username: "",
		email: "",
        background: "",
        biography: "",
        birthday: "",
        gender: "",
        job: "",
        location: "",
    };
    const response = await axios({
        url: "/api/user/isLogin",
        method: "get",
    }).then(response => {
        return response.data;
    });    
	data.loginStatus = response.status;
    if (response.status) {
		data.email = response.email;
        data.username = response.username;
		console.log("username", data.username);
        const res =  await axios({
            url: "/api/userProfile/" + response.email,
            method: "get",
        }).then(response => {
            data.background = response.data.background
            data.biography = response.data.biography
            data.birthday = response.data.birthday
            data.gender = response.data.gender
            data.job = response.data.job
            data.location = response.data.location
            data.id = response.data.id
            return data;
        })
		return res;
    } else {
        return data;
    }
}

export async function getUserId(email) {
	const response = await axios({
		url: "/api/user/" + email,
		method: "get",
	}).then(response => {
		return response.data;
	});
	return response;
}

export function formatDate(date, fmt='YYYY-MM-DD HH:mm:ss') {
	return moment(date).format(fmt)
}

export function generateFileName(prefix, extension) {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var fileName = prefix + "/" + year + pad(month)+ pad(day) + "_" + pad(hour) + pad(minute) + pad(second) + extension
    return fileName;
}

function pad(num) {
    return String(num).padStart(2, '0');
}