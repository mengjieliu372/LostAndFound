'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("goods", "users");
	const dbCmd = db.command
	const all = await collection.where(dbCmd.or({
		name: new RegExp(`${event.keyword}`)
	}, {
		details: new RegExp(`${event.keyword}`)
	})).get()
	//返回数据给客户端
	return all.data
};
