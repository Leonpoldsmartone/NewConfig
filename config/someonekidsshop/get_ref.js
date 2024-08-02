let linkColor = decodeURI(location.href.split('#')[1]); 
function getAllColor() {
    let colors = [];
    let results = document.evaluate("//*[contains(@class, 'product-detail')]//*[contains(@data-index, 'option')]/legend[contains(., 'COLOR ') ]/following-sibling::div/label", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < results.snapshotLength; i++) {
        colors.push(results.snapshotItem(i).textContent);
      }
      
    return colors;
}
let allcolor =getAllColor()

let xhr = new XMLHttpRequest();
let getLoc = location.href.split('#')[0] + '.js';
xhr.open("GET", getLoc, false);
xhr.send();
let res = [];
if (xhr.status === 200) {
    let reponse = JSON.parse(xhr.responseText);
    let resultat = reponse.variants;
    for (let i = 0; i < resultat.length; i++) {
       
            res.push(resultat[i].handle);
        
    }
}
res

