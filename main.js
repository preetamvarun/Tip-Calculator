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
        
        localStorage.setItem("totalBill", billAmount.value);
        localStorage.setItem("noOfPeople", noOfPeople.value);

        people = Number(localStorage.getItem("noOfPeople"));
        bill = Number(localStorage.getItem("totalBill"));
        tip = Number(localStorage.getItem("tip"));

        if(tip === 0){
            tip = Number(localStorage.getItem("custom-tip"));
        }

        if(people >= 1){

            if(err.classList.contains("err")){
                err.classList.remove("err");
            }
            noOfPeople.style.border = '0px';

            if(tip === undefined) tip = 0;

            tipAmount = Number(((bill * (tip/100)) / people).toFixed(2));
            
            /* PLACE TIP AMOUNT IN LOCAL STORAGE */
            localStorage.setItem("tipAmount",JSON.stringify(tipAmount));

            total = Number((bill + tipAmount).toFixed(2));

            /* TOTAL = BILL + TIPAMOUNT  PLACE THIS IN LOCAL STORAGE*/
            localStorage.setItem("total",JSON.stringify(total));

            tA.innerHTML = `<span>$${tipAmount}</span>` 
            totalAmount.innerHTML = `<span>$${total}</span>`;
        }

        else{
            err.classList.add("err");
            noOfPeople.style.border = '1px solid red';
        }
    }

}

noOfPeople.addEventListener('keyup', () => solve());
billAmount.addEventListener('keyup', () => solve());

customPercentage.addEventListener('keyup',() => {
    num.forEach((n) => {
        if(n.classList.contains("clickClass")) n.classList.remove("clickClass");
    });
    
    /* SET TIP(SELECTIVE TIPS FROM THE BUTTONS) VALUE TO 0*/
    localStorage.setItem("tip","0");

    /*SET USER ENTERED CUSTOM TIP TO THE LOCAL STORAGE*/
    localStorage.setItem("custom-tip", customPercentage.value);

    tip = Number(customPercentage.value);
    solve();
});

let x = (value) => {

    customPercentage.value = "";
    localStorage.setItem("tip",value);

    /* IF THE USER SELECTS ANY OF THE GIVEN TIPS THEN SET THE CUSTOM-TIP TO ZERO*/
    localStorage.setItem("custom-tip","0");

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
    if(!five.classList.contains('clickClass')){
        tip = 0;
        localStorage.setItem("tip","0");
    }
    solve();
});

ten.addEventListener('click',() => {
    ten.classList.toggle('clickClass');
    x("10");
    if(!ten.classList.contains('clickClass')){
        tip = 0;
        localStorage.setItem("tip","0");
    }
    solve();
});

fifteen.addEventListener('click',() => {
    fifteen.classList.toggle('clickClass');
    x("15");
    if(!fifteen.classList.contains('clickClass')){
        tip = 0;
        localStorage.setItem("tip","0");
    };
    solve();
});

twentyFive.addEventListener('click',() => {
    twentyFive.classList.toggle('clickClass');
    x("25");
    if(!twentyFive.classList.contains('clickClass')){
        tip = 0;
        localStorage.setItem("tip","0");
    }
    solve();
});

fifty.addEventListener('click',() => {
    fifty.classList.toggle('clickClass');
    x("50");
    if(!fifty.classList.contains('clickClass')){
        tip = 0;
        localStorage.setItem("tip","0");
    };
    solve();
});

resetBtn.addEventListener('click', ()=>{

    localStorage.setItem("tip",""); // 5 10 15 25 50
    localStorage.setItem("custom-tip",""); // custom tip percentage
    localStorage.setItem("tipAmount", "0.00"); // tip Amount
    localStorage.setItem("total","0.00"); // tip + bill
    localStorage.setItem("totalBill",""); // bill
    localStorage.setItem("noOfPeople",""); // noOfPeople

    /* EMPTY ALL THE INPUT FIELDS */
    billAmount.value = "";
    noOfPeople.value = "";
    customPercentage.value = "";

    /* MAKE FINAL RESULTS TO ZEROS */
    tA.innerHTML = `<span>$0.00</span>` 
    totalAmount.innerHTML = `<span>$0.00</span>`;

    /* RESET HIGHTLIGHTS FOR PERCENTAGE BUTTONS */
    num.forEach((n) => {
        if(n.classList.contains("clickClass")) n.classList.remove("clickClass");
    });

    /* NO NEED TO DISPLAY ERROR MESSAGES */
    if(err.classList.contains("err")) err.classList.remove("err");
    noOfPeople.style.border = '0px';
});

let populateUI = () => {

    tA.innerHTML = localStorage.getItem("tipAmount") !== null ? 
    `<span>$${localStorage.getItem("tipAmount")}</span>` : `<span>$0.00</span>`;

    totalAmount.innerHTML = localStorage.getItem("total") !== null ? 
    `<span>$${localStorage.getItem("total")}</span>` : 
    totalAmount.innerHTML = `<span>$0.00</span>`

    billAmount.value = localStorage.getItem("totalBill") != null ? 
    localStorage.getItem("totalBill") : "";

    noOfPeople.value = localStorage.getItem("noOfPeople") != null ? 
    localStorage.getItem("noOfPeople") : "";

    if(noOfPeople.value === "0" || noOfPeople.value === ""){
        err.classList.add("err");
        noOfPeople.style.border = "1px solid red";
    }


    if(localStorage.getItem("custom-tip") != null){
        if(localStorage.getItem("tip") === null || localStorage.getItem("tip") === "0"){
            customPercentage.value = localStorage.getItem("custom-tip");
        }
    } else{
        customPercentage.value = "";
    }

    if(localStorage.getItem("tip") !== null){
        if(localStorage.getItem("custom-tip") === null || localStorage.getItem("custom-tip") === "0"){
            num.forEach((n) => {
                if(localStorage.getItem("tip") === n.textContent.slice(0,-1)){
                    n.classList.add("clickClass");
                }
            });
        }
    }

    /* CHECK FOR ERRORS WHILE RELOADING */
}

document.addEventListener('DOMContentLoaded', populateUI);