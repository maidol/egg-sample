'use strict;'

module.exports = app =>{
  class NewsService extends app.Service {
    async list(page = 1) {
      const ctx = this.ctx;
      const { serverUrl, pageSize } = app.config.news;
      const { data: idList } = await ctx.curl(`${serverUrl}/topstorie.json`, { data: { 
        orderBy: '"$key"',
        startAt: `"${pageSize * (page -1)}"`,
        endAt: `"${pageSize * page -1}"`
       },
      dataType: 'json' });
      const newsList = await Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return ctx.curl(url, { dataType: 'json' });
      });
    }
  }
  return NewsService;
}