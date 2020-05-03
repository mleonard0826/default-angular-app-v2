const protractorFlake = require('protractor-flake');
const AgentJasmine = require('agent-js-jasmine');
const reportportalConfig = require('./reportportalConf');
const agent = new AgentJasmine(reportportalConfig);

agent.getLaunchStartPromise().then((launchData) => {
    protractorFlake({
        maxAttempts: 1,
        protractorArgs: [
            './multiThreadConf.js',
            '--params.id',
            launchData.id
        ]
    }, (status) => {
        agent.getExitPromise().then(() => {
            process.exit(status);
        });
    });
});