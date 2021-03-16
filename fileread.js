const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
input: fs.createReadStream('Read.txt')
});
let line_no = 0;
rl.on('line', function(line) {
line_no++;
console.log(line);
});
rl.on('close', function(line) {
console.log('Total lines : ' + line_no);
});