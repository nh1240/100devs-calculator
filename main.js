const maxDisplay = 15 // prevents text from overflowing io display

let display = document.querySelector('.io').innerText // number to display
let stored = '0' // variable for stored number after an operator is clicked
let hasDecimal = false
let operatorSelect = '' // variable for operator selected
let operatorClicked = false // logical to check if operator clicked recently
let lastEquals = false // logical to check if last button clicked was equal, allows user to start over after clicking a number immediately after clicking equal
let lastChoice = '0' // change if one keeps clicking equal

document.querySelectorAll('.number').forEach(button => {button.addEventListener('click',appendNumber)}) //adds eventlistener to all number buttons that call appendNumber
document.querySelectorAll('.operator').forEach(button => {button.addEventListener('click',operatorChoice)}) //adds eventlistener to all operator buttons that call operatorchocie
document.querySelector('#equal').addEventListener('click',performOperation) // adds eventlistener to equal button


function appendNumber(){
    console.log(lastEquals)
    if(lastEquals){ // reset after clicking equal and a number
        stored = '0'
        display = '0'
        operatorSelect = ''
        lastChoice = '0'
    }

    lastEquals = false
    decimalCheck()
    if(hasDecimal & this.innerText === '.'){ // prevents multiple decimals being added 
        return
    }

    if(display === '0'){ // check if starting fresh
        if(this.innerText === '.'){
            display = '0'.concat(this.innerText)
        }
        else{
            display = this.innerText
        }
    }
    else if(operatorClicked){ // check if operator was clicked, to allow 2nd input to be displayed
        display = this.innerText
        operatorClicked = false
    }
    else if(display.length < maxDisplay){ // keep adding numbers until max display is exceeded
        display = display.concat(this.innerText)
    }
    document.querySelector('.io').innerText = display //shows current input
}

function operatorChoice(){
    operatorClicked = true
    if(stored !== '0' & !lastEquals){
        performOperation()
    }
    else{
        stored = display
    }
    operatorSelect = this.innerText
    lastEquals = false
}

function performOperation(){

    //if(lastEquals){
     //   operatorSelect = ''
    //}
    lastChoice = lastEquals ? lastChoice : display
    

    switch(operatorSelect){
        case '+':
            display = String(Number(stored) + Number(display))
            break;
        case '-':
            display = !lastEquals ? String(Number(stored) - Number(display)) : String(Number(display) - Number(lastChoice))
            break;
        case 'x':
            display = String(Number(stored) * Number(display))
            break;
        case '/':
            display = String(Number(stored) / Number(display))
            break;
        default:
            display = display
    }

    if(this.innerText === '='){
        lastEquals = true
    }

    lengthChecker()
    stored = lastEquals ? lastChoice : display // if one keeps clicking =, continue operating on first input
    document.querySelector('.io').innerText = display
}

function decimalCheck(){ // function to check if there is a decimal, prevents multiple decimal points being added
    if(parseInt(display) === Number(display)){
            hasDecimal = display.length == 2 ? true : false
    }
    else{
        hasDecimal = true
    }
}

function lengthChecker(){ // functions checks if output exceeds max display, then it will show exponential form instead 
    let exp = 1
    if(display.length > maxDisplay){
        if(Number(display) > 1){
            let check = Number(display)
            while(check > 10){
                check = Number(display) / Math.pow(10,exp)
                exp++
            }
            exp--
            check = String(Number(String(check)))
            display = exp < 10 ? check.substr(0,11).concat('e','+',exp) : check.substr(0,10).concat('e','+',exp)
        }
        else{
            let check = Number(display)
            while(check < 1){
                check = Number(display) * Math.pow(10,exp)
                exp++
            }
            exp--
            check = String(Number(String(check)))
            display = exp < 10 ? check.substr(0,11).concat('e','-',exp) : check.substr(0,10).concat('e','-',exp)
            console.log(display)
        }
    }
}


