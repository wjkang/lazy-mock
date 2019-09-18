module.exports = {
	server: {
		api: {
			target: '/src/routes/bookRoute.js',
			migrate: [
				{
					from: '/book/proxy',
					to: '/book/proxy123'
				},
				{
					from: '/book/paged',
					to: '/book/paged'
				},
				{
					from: '/book/:id',
					to: '/book/:id'
				},
				{
					from: '/book/del',
					to: '/book/del'
				},
				{
					from: '/book/batchdel',
					to: '/book/batchdel'
				},
				{
					from: '/book/save',
					to: '/book/save'
				}
			],
			prefix: '',
			suffix: ''
		},
		controller: {
			target: '/src/controllers/book.js',
			migrate: [
				{
					from: 'getBook',
					to: 'getBook'
				},
				{
					from: 'getBookPagedList',
					to: 'getBookPagedList'
				},
				{
					from: 'delBook',
					to: 'delBook'
				},
				{
					from: 'delBooks',
					to: 'delBooks'
				},
				{
					from: 'saveBook',
					to: 'saveBook'
				},
				{
					from: 'bookProxy',
					to: 'bookProxy'
				}
			],
			prefix: 'export let ',
			suffix: ' = async'
		}
	},
	frontEnd: {
		test: {
			target: '/wewew.txt',
			migrate: [
				{
					from: 'df',
					to: 'jjjjjjjjjjjj'
				}
			],
			prefix: '',
			suffix: ''
		}
	}
}
