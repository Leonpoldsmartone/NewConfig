let getLoc = location.href.split('?')[0] ;



function getAllColorSelector() {
    let colors =[]
    let elements = document.querySelectorAll('[class*="product-detail"] fieldset[data-index="option1"] input')
    elements.forEach(elm=>{
        colors.push(elm.defaultValue)

    })
    return colors
}
let res =getAllColorSelector()

function combineColors(){
    let combinations = [];
    for (let j = 0; j < res.length; j++) {
        combinations.push(getLoc+"#"+`${encodeURIComponent(res[j])}`);
    }
    return combinations
}
let combinedResult = combineColors();
combineColors