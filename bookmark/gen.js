const fs = require('fs');
const path = require('path');

function listAllHTM(dir){
  const result = [];

  const files = [dir];
  do {
    const filepath = files.pop();
    const stat = fs.lstatSync(filepath);
    if (stat.isDirectory()) {
      fs
        .readdirSync(filepath)
        .forEach(f => files.push(path.join(filepath, f)));
    } else if (stat.isFile()) {
      if(filepath.endsWith('htm')) result.push(path.relative(dir, filepath));
      if(filepath.endsWith('mhtml')) result.push(path.relative(dir, filepath));
      if(filepath.endsWith('pdf')) result.push(path.relative(dir, filepath));
    }
  } while (files.length !== 0);

  return result;
};

let htmlStr = '';
let listOfHTM = listAllHTM('.');
let tempTitle = '';

htmlStr += '<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">'

console.log(listOfHTM)
for(var i=0;i<listOfHTM.length;i++){
    listOfHTM[i] = listOfHTM[i].replace('\\','/');
    let cat = listOfHTM[i].replace('\\','/').split('/').shift();
    if(tempTitle == '' || tempTitle != cat) {
        htmlStr += '</ul>\n';
        tempTitle = cat;
        htmlStr += '<h2>' + tempTitle + '</h2>\n';
        htmlStr += '<ul>\n';
    }
    htmlStr += '<li><a href="./bookmark/' + listOfHTM[i] + '">' + listOfHTM[i] + '</a></li>\n';
}
htmlStr += '</ul>\n';

fs.writeFile("./../index.html", htmlStr, function(err) {
    if(err) 
        return console.log(err);

    console.log("The file was saved!");
}); 
