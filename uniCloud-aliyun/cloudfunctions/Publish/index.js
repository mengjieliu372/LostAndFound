'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const collection = db.collection("goods");

	let res = await collection.add({
		category: event.category,
		name: event.name,
		details: event.details,
		contact: event.contact,
		person: event.username,
		time: event.time,
		imgurl: event.imgList
	})
	//返回success给客户端
	return {
		status: 'success'
	}
};
