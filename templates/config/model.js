let Mock = require('mockjs')
let Random = Mock.Random

let entity = 'book'

//必须包含字段id
let properties = [
	{
		key: 'id',
		title: 'id',
		value: function() {
			return Random.id()
		}
	},
	{
		key: 'applyNo',
		title: 'applyNo',
		value: function() {
			return Random.id()
		}
	},
	{
		key: 'applyTitle',
		title: 'applyTitle',
		value: function() {
			return Random.cname()
		}
	},
	{
		key: 'starterUid',
		title: 'starterUid',
		value: function() {
			return Random.id()
		}
	},
	{
		key: 'starterName',
		title: 'starterName',
		value: function() {
			return Random.cname()
		}
	},
	{
		key: 'orgCode',
		title: 'orgCode',
		value: function() {
			return Random.string('lower', 5)
		}
	},
	{
		key: 'orgName',
		title: 'orgName',
		value: function() {
			return Random.county()
		}
	},
	{
		key: 'roleCode',
		title: 'roleCode',
		value: function() {
			return Random.string('lower', 5)
		}
	},
	{
		key: 'roleName',
		title: 'roleName',
		value: function() {
			return Random.ctitle(5)
		}
	},
	{
		key: 'avatarUrl',
		title: 'avatarUrl',
		value: function() {
			return Random.image('200x200')
		}
	},
	{
		key: 'startTime',
		title: 'startTime',
		value: function() {
			let randomTime = Random.datetime()
			return new Date(randomTime).getTime() + 100000
		}
	},
	{
		key: 'status',
		title: 'status',
		value: function() {
			return Random.natural(1, 3)
		}
	},
	{
		key: 'createdAt',
		title: 'createdAt',
		value: function() {
			let randomTime = Random.datetime()
			return new Date(randomTime).getTime() + 100000
		}
	}
]

let buildMockDataList = function() {
	let dataList = []
	for (let i = 0; i < 100; i++) {
		let data = {}
		for (let property of properties) {
			data[property.key] = property.value()
		}
		dataList.push(data)
	}
	return dataList
}

export default {
	name: entity,
	Name: entity.charAt(0).toUpperCase() + entity.slice(1),
	properties: properties,
	buildMockData: buildMockDataList //不需要生成设为false
}
