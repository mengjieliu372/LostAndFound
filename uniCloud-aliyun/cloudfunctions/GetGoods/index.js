'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("goods");
	
	// const all = await collection.where({
	// 	category: event.category
	// }).get()
	const all = await collection.where({
		category: event.category
	}).orderBy('time', 'desc').get()

	return all
};
