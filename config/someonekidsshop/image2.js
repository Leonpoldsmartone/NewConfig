let link = decodeURI(document.location.href.split("#")[1]);
let xhr = new XMLHttpRequest();
let getLoc = location.href.split("#")[0] + ".js";
xhr.open("GET", getLoc, false);
xhr.send();
let resultat = [];
let img = [];
if (xhr.status === 200) {
  let response = JSON.parse(xhr.responseText);
  resultat.push(response.images);
}
let resp = resultat[0];

if (link==='undefined') {
  for (let i = 0; i < resp.length; i++) {
    let res = resp[i].split("?")[0];
    img.push("https:" + res);
  }
} else {
  for (let i = 0; i < resp.length; i++) {
    if (resp[i].includes(link)) {
      let res = resp[i].split("?")[0];
      img.push("https:" + res);
    }
  }
}
img;
