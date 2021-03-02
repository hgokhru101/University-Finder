const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
input: fs.createReadStream('Read.txt')
});
let line_no = 0;
// event is emitted after each line
rl.on('line', function(line) {
line_no++;
console.log(line);
});
// end
rl.on('close', function(line) {
console.log('Total lines : ' + line_no);
});