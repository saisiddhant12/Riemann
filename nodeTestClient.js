var filecount = require('./fileCounter.js');
var split = require('string-split');
//var numberPattern = /\d+/g;
//var count = filecount.match(numberPattern);

client = require('riemann').createClient({
  host: '172.16.66.87',
  port: 5555
});

client.on('connect', function() {
console.log('connected!');
var numerify = split('/\d+/g',filecount);
console.log(numerify);
});

client.send(client.Event({
  service: 'dir-files-count',
  metric:  filecount,
  tags:    ['FullStackMonitoringHackathon']
}));

client.on('disconnect', function() {
  console.log('DISconnected!');
	client.disconnect();
});

