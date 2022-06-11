var container = document.getElementById('hold');

// var bc = document.createElement('div');
// var h1 = document.createElement('h1');
// var img = document.createElement('img');

for(let i = 1; i < 176; i++){
    let bc = document.createElement('div');
    let h1 = document.createElement('h1');
    let img = document.createElement('img');
    let num = "-000";
    if(i < 10){
        num = "-00" + i;
    } else if(i < 100){
        num = "-0" + i;
    } else{
        num = "-" + i;
    }
    img.classList.add('bc'+i);
    h1.innerText = num;
    bc.appendChild(h1);
    bc.appendChild(img);
    bc.classList.add('box');
    container.appendChild(bc);

    JsBarcode(".bc"+i, num, {
                    height: 50,
                    displayValue: false
                });    
}
