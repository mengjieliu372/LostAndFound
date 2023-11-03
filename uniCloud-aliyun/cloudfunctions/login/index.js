'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("users");


	const user = await collection.where({
		username: event.username
	}).get()
	

	//查无此用户
	if (user.data.length === 0){
		return {
			status: 'fail'
		}
	}
	//有该用户
	//判断密码是否正确
	if (user.data[0].password === event.password)
	{
		return {
			status: 'success',
			username: event.username
		}
	}
	else{
		return {
			status: 'fail'
		}
	}
}
