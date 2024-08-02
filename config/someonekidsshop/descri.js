let xhr = new XMLHttpRequest();
let getLoc = location.href.split('#')[0] + '.js';
xhr.open("GET", getLoc, false);
xhr.send();
let res = [];
if (xhr.status === 200) {
    let reponse = JSON.parse(xhr.responseText);
    res.push(reponse.description);
    
}
res