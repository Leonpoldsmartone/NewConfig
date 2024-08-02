let xhr = new XMLHttpRequest();
let getLoc = location.href.split('#')[0] + '.js';
xhr.open("GET", getLoc, false); 
xhr.send();
let resultat = [];
let img = [];
if (xhr.status === 200) {
  let reponse = JSON.parse(xhr.responseText);
  resultat.push(reponse.images);
}
let resp=resultat[0]
for (let i = 0; i < resp.length; i++) {
  let res = resp[i].split('?')[0];
  img.push("https:" + res)
}
img;