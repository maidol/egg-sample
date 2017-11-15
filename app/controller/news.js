'use strict';

module.exports = app => {
	return class NewsController extends app.Controller {
		async list() {
			const ctx = this.ctx;
			const dataList = {
				list: [{
					id: 1,
					title: 'news 1',
					url: '/news/1'
				},
				{
					id: 2,
					title: 'news 2',
					url: '/news/2'
				}
				]
			};
			const page = ctx.query.page || 1;
			const newsList = await ctx.service.news.list(page);
			ctx.body = [dataList, newsList];
		}
	};
};