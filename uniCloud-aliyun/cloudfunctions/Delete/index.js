'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("goods");
	
	let res = await collection.where({
		_id: event._id
	}).remove()
	
	return {
		status: 'success'
	}
};
