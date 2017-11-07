'use strict;'

module.exports = agent => {
  agent.workerPids = []; // alive pids
  agent.workers = {}; // 占位
  agent.eggReady = false; // 整个egg服务启动完成的标志

  agent.logger.info('agent running..');
  agent.initCWAgent();
  // agent.cwLogger.info('agent running..');
  // agent.consoleLogger.info('agent running..');

  // 在这里写你的初始化逻辑
  // 也可以通过 messenger 对象发送消息给 App Worker
  // 但需要等待 所有App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.on('egg-ready', (data) => {
    agent.eggReady = true;
    // 分配workerId
    let index = 1;
    agent.workerPids.forEach(pid=>{
      agent.workers[`w_${pid}`] = index;
      agent.messenger.sendTo(pid, 'allocation-workid', index);
      index++;
    });
    agent.logger.info('hi, agent, all egg app_worker are ready', agent.workerPids, agent.workers);
  });
  
  agent.messenger.on('egg-pids', (data) => {
    if(agent.eggReady){
      // appworker start/exit
      // 更新 alive workers, workerPids列表
      // console.info('hi, agent, update alive egg-pids', data, agent.workers);
      agent.logger.info('hi, agent, update alive egg-pids', data, agent.workers);
      let usedArr = []; // 已被分配的workerId
      let unusedArr = []; // 需重新分配的workerId
      let resW = {};
      let usedPids = []; //  已被分配了workerId的pid
      let unusedPids = []; //  等待分配workerId的pid

      let pidKeys = data.map(p=>`w_${p}`);
      let workersKeys = Object.keys(agent.workers);

      for (let key in agent.workers) {
        if(pidKeys.indexOf(key) > -1) {
          usedArr.push(agent.workers[key]);
          usedPids.push(key);
          resW[key] = agent.workers[key];
        }else{
          unusedArr.push(agent.workers[key]);
        }
      }

      pidKeys.forEach(pk=>{
        if(workersKeys.indexOf(pk) < 0){
          unusedPids.push(pk);
        }
      });

      unusedPids.forEach(pk=>{
        let ix = unusedArr.pop();
        resW[pk] = ix;
        agent.messenger.sendTo(pk.replace('w_', ''), 'allocation-workid', ix);
      });

      // resW{a,b,e,f} agent.workers{a,b,c,d}
      // resW{a,b,e} agent.workers{a,b,c,d}
      while (Object.keys(resW).length < Object.keys(agent.workers).length && unusedArr.length > 0) {
        // 取出占位
        let ix = unusedArr.pop();
        resW[`w_u_${ix}`] = ix;
      }

      agent.workerPids = data;
      agent.workers = resW;
      // console.log('appworker start/exit, update agent.workers result', agent.workers);
      agent.logger.info('appworker start/exit, update agent.workers result', agent.workers);
    };
  });

  agent.messenger.on('app-readyfor-workerid', data => {
    if(!agent.eggReady){
      agent.workerPids.push(data.pid);
      // console.log('hi, agent, on app-readyfor-workerid', data);
      agent.logger.info('hi, agent, on app-readyfor-workerid', data);
    }
  });
};