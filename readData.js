const fs = require('fs');
var text = fs.readFileSync('output.txt','utf8')
var data = text.split("\r\n");

for (var i = 0; i < data.length; i=i+2) {
  var line = data[i].split(" ");
  var date = line[0];
  var time = line[1];
  var numSteps = line[2];

  
}
