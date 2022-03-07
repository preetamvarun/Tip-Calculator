const noOfPeople = document.getElementById('peopleIcon');
const billAmount = document.getElementById('billIcon');
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const fifteen = document.getElementById("fifteen");
const twentyFive = document.getElementById("twentyFive");
const fifty = document.getElementById("fifty");
const customPercentage = document.getElementById("custom-percentage");
const num = Array.from(document.getElementsByClassName("num"));

let tip = 0, people, bill;

let solve = () => {

    if(!isNaN(billAmount.value) && !isNaN(noOfPeople.value) && (tip !== 0)){
        bill = Number(billAmount.value);        
        people = Number(noOfPeople.value); 
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
    solve();
});

ten.addEventListener('click',() => {
    ten.classList.toggle('clickClass');
    x("10");
    solve();
});

fifteen.addEventListener('click',() => {
    fifteen.classList.toggle('clickClass');
    x("15");
    solve();
});

twentyFive.addEventListener('click',() => {
    twentyFive.classList.toggle('clickClass');
    x("25");
    solve();
});

fifty.addEventListener('click',() => {
    fifty.classList.toggle('clickClass');
    x("50");
    solve();
});




