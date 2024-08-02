let linkColor = decodeURI(location.href.split('#')[1]); 
let prixbrut = [];
function getAllSize() {
    let sizes = [];
    let results = document.evaluate("//*[contains(@class, 'product-detail')]//*[contains(@data-index, 'option')]/legend[contains(., 'SIZE') or contains(., 'Size')]/following-sibling::div/label", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < results.snapshotLength; i++) {
        sizes.push(results.snapshotItem(i).textContent);
      }
      
    return sizes;
}
let allSizes = getAllSize();



if(allSizes.length===0){
let selectprice=document.querySelector('[class*="product-detail"] [class*="price product-price"] span[class*="money"]:not([class*="compare"])')
prixbrut.push(selectprice.textContent)
}else{
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
          let filteredElements = filteredData.filter((element) => element.title.includes(allSizes[i]));
          result = result.concat(filteredElements);
        }
        return result;
      }
    let prices=trie();
      for (let i = 0; i < prices.length; i++){
        let brut=prices[i].compare_at_price / 100;
        if(brut==0){
            if(allcolor.length === 0){
                prixbrut.push(prices[i].price / 100);
               }else{
                let color=trie()[i].option1;
                if (linkColor==color) {
                prixbrut.push(prices[i].price / 100);
                }   
            }
        }else{
            if(allcolor.length === 0){
                prixbrut.push(prices[i].compare_at_price / 100);
               }else{
                let color=trie()[i].option1;
                if (linkColor==color) {
                prixbrut.push(prices[i].compare_at_price / 100);
                }   
            }
        }
        
      }
       let result = [];
    for (let i = 0; i < getAllSize().length; i++) {
        if (i < prixbrut.length) {
            result.push(prixbrut[i]);
          } else {
            result.push(0);
          }
        }
     
}
prixbrut
