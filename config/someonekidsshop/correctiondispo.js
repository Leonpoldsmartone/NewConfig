let linkColor = decodeURI(location.href.split('#')[1]); 
let dispo = [];
let resultat = [];
function getAllSize() {
    let sizes = [];
    let results = document.evaluate("//*[contains(@class, 'product-detail')]//*[contains(@data-index, 'option')]/legend[contains(., 'SIZE') or contains(., 'Size')]/following-sibling::div/label", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < results.snapshotLength; i++) {
        sizes.push(results.snapshotItem(i).textContent);
    }
    return sizes;
}
let allSizes = getAllSize();
function getAllData() {
    let xhr = new XMLHttpRequest();
    let getLoc = location.href.split('#')[0] + '.js';
    xhr.open("GET", getLoc, false); 
    xhr.send();

    let res = [];
    if (xhr.status === 200) {
        let resp = JSON.parse(xhr.responseText);
        res = resp.variants;
    }
    return res;
}
let allData = getAllData();
function getAllColor() {
    let colors = [];
    let results = document.evaluate("//*[contains(@class, 'product-detail')]//*[contains(@data-index, 'option')]/legend[contains(., 'COLOR ') ]/following-sibling::div/label", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < results.snapshotLength; i++) {
        colors.push(results.snapshotItem(i).textContent);
    }
    return colors;
}
let allcolor =getAllColor()
let currentColorArray =decodeURI(document.location.href.split('#')[1]); 
function getDataFilteredByCurrentColor(currentColorArray) {
    if (allcolor.length === 0) {
        return allData;
    } else {
        let dataFilteredByCurrentColor = allData.filter(element => {
            let title = element.option1;
            return title.includes(currentColorArray);
        });
        return dataFilteredByCurrentColor;
    }
}
if(allSizes.length===0){
    for (let i = 0; i < allData.length; i++){
        if(allcolor.length === 0){
            dispo.push(allData[i].available)
        } else {
            let color=allData[i].option1;
            if (linkColor==color) {
                dispo.push(allData[i].available);
            }   
        }
    }
} else {
    let filteredData = getDataFilteredByCurrentColor(currentColorArray);
        for (let i = 0; i < allSizes.length; i++) {
          let filteredElements = filteredData.filter((element) => element.title.includes(allSizes[i]));
          resultat = resultat.concat(filteredElements);
        }
    }
    let disponibilite=[];
    for (let i = 0; i < resultat.length; i++){
        if(allcolor.length === 0){
            disponibilite.push(resultat[i].available)
        } else {
            let color=resultat[i].option1;
            if (linkColor==color) {
                disponibilite.push(resultat[i].available);
            }   
        }
    }
    for (let i = 0; i < getAllSize().length; i++) {
        if (i < disponibilite.length) {
            dispo.push(disponibilite[i]);
        } else {
            dispo.push(false);
        }
    }     
dispo