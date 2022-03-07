const noOfPeople = document.getElementById('peopleIcon');
const billAmount = document.getElementById('billIcon');
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const fifteen = document.getElementById("fifteen");
const twentyFive = document.getElementById("twentyFive");
const fifty = document.getElementById("fifty");

let solve = () => {
    console.log('function');
}


noOfPeople.addEventListener('keydown', solve);
billAmount.addEventListener('keydown', solve);
five.addEventListener('click',solve);
ten.addEventListener('click',solve);
fifteen.addEventListener('click',solve);
twentyFive.addEventListener('click',solve);
fifty.addEventListener('click',solve);