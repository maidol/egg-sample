'use strict;'

module.exports = agent => {
  agent.workerPids = []; // alive pids
  agent.workers = {}; // alive 
  agent.eggReady = false; // 整个egg服务启动完成的标志
  agent.logger.info('agent running..');

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
      // 有appworker start/exit
      // 更新 alive workers, workerPids列表
      console.info('hi, agent, update alive egg-pids', data);
      agent.workerPids = data;
      agent.workerPids.forEach(pid=>{
        for (let key in agent.workers) {
          if (agent.workers.hasOwnProperty(`w_${pid}`)) {
            agent.workers[key] = agent.workers[key];
          } else {
            let ele = agent.workers[key];
            delete agent.workers[key];
            agent.workers[`w_${pid}`] = ele;
            agent.messenger.sendTo(pid, 'allocation-workid', ele);
          }
        }
      });
      console.log('appworker start/exit, update agent.workers', agent.workers);
    };
  });

  agent.messenger.on('app-readyfor-workerid', data => {
    if(!agent.eggReady){
      agent.workerPids.push(data.pid);
      console.log('hi, agent, on app-readyfor-workerid', data);
    }
  });
};