let linkColor = decodeURI(location.href.split('#')[1]); 
let dispo = [];
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

let filteredData = getDataFilteredByCurrentColor(currentColorArray);

function trie() {
    let result = [];
    for (let i = 0; i < allSizes.length; i++) {
      const filteredElements = filteredData.filter((element) => element.title.includes(allSizes[i]));
      result = result.concat(filteredElements);
    }
    return result;
  }
 
  for (let i = 0; i < trie().length; i++){
    if(allcolor.length === 0){
        dispo.push(trie()[i].available)
       }else{
        let color=trie()[i].option1;
        if (linkColor==color) {
            dispo.push(trie()[i].available);
        }   
    }
  }
  let availability = [];
  for (let i = 0; i < getAllSize().length; i++) {
      if (i < dispo.length) {
        availability.push(dispo[i]);
        } else {
            availability.push(false);
        }
      }
      availability