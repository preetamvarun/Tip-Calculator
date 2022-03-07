const noOfPeople = document.getElementById('peopleIcon');
const billAmount = document.getElementById('billIcon');
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const fifteen = document.getElementById("fifteen");
const twentyFive = document.getElementById("twentyFive");
const fifty = document.getElementById("fifty");
const customPercentage = document.getElementById("custom-percentage");
const tA = document.getElementById("tipAmount");
const totalAmount = document.getElementById("total");
const resetBtn = document.getElementById('reset-btn');
const peopleDiv = document.getElementById("people");

const err = Array.from(peopleDiv.children)[1];

const num = Array.from(document.getElementsByClassName("num"));

let tip, people, bill, tipAmount, total;

let solve = () => {

    if(!isNaN(billAmount.value) && !isNaN(noOfPeople.value)){
        bill = Number(billAmount.value);        
        people = Number(noOfPeople.value); 
        if(people >= 1 && tip != undefined){

            if(err.classList.contains("err")){
                err.classList.remove("err");
            }
            noOfPeople.style.border = '0px';
            tipAmount = Number(((bill * (tip/100)) / people).toFixed(2));
            total = Number(bill + tipAmount).toFixed(2);
            tA.innerHTML = `<span>$${tipAmount}</span>` 
            totalAmount.innerHTML = `<span>$${total}</span>`;
        }
        else{
            err.classList.add("err");
            noOfPeople.style.border = '1px solid red';
            tA.innerHTML = `<span>$0.00</span>` 
            totalAmount.innerHTML = `<span>$0.00</span>`;
        }
    }

}

noOfPeople.addEventListener('keyup', () => solve());
billAmount.addEventListener('keyup', () => solve());

customPercentage.addEventListener('keyup',() => {
    num.forEach((n) => {
        if(n.classList.contains("clickClass")) n.classList.remove("clickClass");
    });
    tip = Number(customPercentage.value);
    solve();
});

let x = (value) => {

    customPercentage.value = "";

    tip = Number(value);

    let str;

    num.forEach((n) => {
        str = n.textContent.slice(0,-1);
        if(str != value){
            if(n.classList.contains("clickClass")){
                n.classList.remove("clickClass");
            }
        }
    });

}

five.addEventListener('click',() =>{
    five.classList.toggle('clickClass');
    x("5");
    if(!five.classList.contains('clickClass')) tip = 0;
    solve();
});

ten.addEventListener('click',() => {
    ten.classList.toggle('clickClass');
    x("10");
    if(!ten.classList.contains('clickClass')) tip = 0;
    solve();
});

fifteen.addEventListener('click',() => {
    fifteen.classList.toggle('clickClass');
    x("15");
    if(!fifteen.classList.contains('clickClass')) tip = 0;
    solve();
});

twentyFive.addEventListener('click',() => {
    twentyFive.classList.toggle('clickClass');
    x("25");
    if(!twentyFive.classList.contains('clickClass')) tip = 0;
    solve();
});

fifty.addEventListener('click',() => {
    fifty.classList.toggle('clickClass');
    x("50");
    if(!fifty.classList.contains('clickClass')) tip = 0;
    solve();
});

resetBtn.addEventListener('click', ()=>{
    tip = 0.00;
    billAmount.value = "";
    noOfPeople.value = "";
    customPercentage.value = "";
    tA.innerHTML = `<span>$0.00</span>` 
    totalAmount.innerHTML = `<span>$0.00</span>`;
    num.forEach((n) => {
        if(n.classList.contains("clickClass")) n.classList.remove("clickClass");
    });
    if(err.classList.contains("err")){
        err.classList.remove("err");
    }
    noOfPeople.style.border = '0px';
});


