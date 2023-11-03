'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(event.data);
	const collection = db.collection("goods");
	const all = await collection.where({
		person: event.username
	}).orderBy('time', 'desc').get()
	return all
};
