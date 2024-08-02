//*[contains(@class, 'product-detail')]//*[contains(@data-index, 'option')]/legend[contains(., 'COLOR ') ]/following-sibling::div/label

function getAllColor() {
    let colors = [];
    let results = document.evaluate("//*[contains(@class, 'product-detail')]//*[contains(@data-index, 'option')]/legend[contains(., 'COLOR ') ]/following-sibling::div/label", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < results.snapshotLength; i++) {
        colors.push(results.snapshotItem(i).textContent);
      }
      
    return colors;
}