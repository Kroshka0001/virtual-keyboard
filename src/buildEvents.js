import * as buttonLib from   './buttonLib.js';
import * as cookiesLib from  './cookiesLib.js';
import * as fillButtons from './fillButtons.js';

let isCapsLock = false
let isCtrl     = false
let isShift    = false

export function buildKeyEvents() {
    const keys = document.getElementsByClassName('key');
    for (let i = 0; i < keys.length; i++) {
        let button = keys[i]
       button.addEventListener("mousedown", clickedButton);
       button.addEventListener("mouseup", removeActive);
      // button.addEventListener("click", removeActive);
    }
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

function removeActive(event) {
    let buttonKeys = document.getElementsByClassName('key')
    for (let i = 0; i < buttonKeys.length; i++){
        //if (!buttonKeys[i].classList.contains("letter-key")) {
            buttonKeys[i].classList.remove("active")
        //}
    };
}

function clickedButton(event) {

    let buttonClasses = event.srcElement.classList
    event.srcElement.classList.add("active")
    let buttonKey = 0
    const regex = /^Key\d+$/g
    let specialButton = false
    const textarea = document.getElementsByClassName("textarea")[0];
    for (let i = 0; i < buttonClasses.length; i++) {
        if(regex.test(buttonClasses[i])) {
            buttonKey=parseInt(buttonClasses[i].replace("Key",""))
            specialButton=isSpecialButton(buttonKey)
            if(specialButton) {
                specialButtonAction(buttonKey, buttonClasses)
            } else {
                let buttonText = ""
                if (cookiesLib.getCookie('isAlternative') == "true") {
                    buttonText = buttonLib.getButtonAlternativeText(buttonKey)
                    if(buttonLib.hasSpecialUpperSymbolAlternative(buttonKey) && cookiesLib.getCookie('isShift') == "true")
                        buttonText = buttonLib.getButtonUpperTextAlternative(buttonKey)
                } else {
                    buttonText = buttonLib.getButtonText(buttonKey)
                    if(buttonLib.hasSpecialUpperSymbol(buttonKey) && cookiesLib.getCookie('isShift') == "true")
                        buttonText = buttonLib.getButtonUpperText(buttonKey)

                }
                if (cookiesLib.getCookie('isShift') == "true") {
                    textarea.innerHTML+=buttonText.toLocaleUpperCase();
                } else {
                    textarea.innerHTML+=buttonText;
                }
                cookiesLib.setCookie('isShift', false)
                if (cookiesLib.getCookie("isCapsLock") != "true") {
                    setUpperCase(false)
                }
                setActiveShift("")
                setActiveAlt("")
                setActiveCtrl("")
                cookiesLib.setCookie('isShift', false)
                cookiesLib.setCookie('isAlt',false)
                cookiesLib.setCookie('isCtrl',false)
            }
        }
    }
}

function isSpecialButton(key) {
    return buttonLib.isSpecialButton(key)
}

function specialButtonAction(key,buttonClasses) {
    console.log(key)
    const textarea = document.getElementsByClassName("textarea")[0];
    switch (key) {
        case 40: textarea.innerHTML+="&#9660;";break;
        case 39: textarea.innerHTML+="&#9658;";break;

        //Left
        case 37:
            textarea.innerHTML+="&#9668;"
            break;
        //Up
        case 38:
            textarea.innerHTML+="&#9650;"
            break;
        //Enter
        case 13:
            textarea.innerHTML+="\n"
            break;
        //Space
        case 32:
            textarea.innerHTML+=" "
            break;
        //Tab
        case 9:
            textarea.innerHTML+="\t"
            break;
        //Shift
        case 16:
            let buttonKey81 = document.getElementsByClassName('Key81')[0]
            if (buttonKey81.style.textTransform == "uppercase") {
                setUpperCase(false)
                cookiesLib.setCookie('isShift', false)
            } else {
                setUpperCase(true)
                cookiesLib.setCookie('isShift', true)
                setActiveShift(buttonClasses)
            };
            break;
        //Alt
        case 18:
            if(cookiesLib.getCookie('isAlt') == "true"){
                setActiveAlt("")
                cookiesLib.setCookie('isAlt',false)
            } else {
                setActiveAlt(buttonClasses)
                cookiesLib.setCookie('isAlt',true)
            }
            break;
        //Ctrl
        case 17:
            if(cookiesLib.getCookie('isCtrl') == "true"){
                setActiveCtrl("")
                cookiesLib.setCookie('isCtrl',false)
            } else {
                setActiveCtrl(buttonClasses)
                cookiesLib.setCookie('isCtrl',true)
            }
            break;
    }
    changeLanguage()
}

function changeLanguage() {
    if (cookiesLib.getCookie('isCtrl') == "true" && cookiesLib.getCookie('isAlt') == "true" ) {
        if(cookiesLib.getCookie('isAlternative') == "true") {
            cookiesLib.setCookie('isAlternative', false)
            fillButtons.fillButtons(false,false,false)
        } else {
            fillButtons.fillButtons(false,false,true)
            cookiesLib.setCookie('isAlternative', true)
        }

        buildKeyEvents()
        setActiveAlt("")
        setActiveCtrl("")
        cookiesLib.setCookie('isAlt',false)
        cookiesLib.setCookie('isCtrl',false)
    }
}

function setUpperCase(value) {
    let isAlternative = false
    if (cookiesLib.getCookie('isAlternative') == "true"){
        isAlternative = true
    }
    let buttonKeys = document.getElementsByClassName('key')
    const regex = /^Key\d+$/g
    let buttonKey = 0
    for (let i = 0; i < buttonKeys.length; i++){
        let buttonClasses = buttonKeys[i].classList
        for (let j = 0; j < buttonClasses.length; j++) {
            if(regex.test(buttonClasses[j])) {
                buttonKey=parseInt(buttonClasses[j].replace("Key",""))
                if(isAlternative) {
                    if(buttonLib.hasSpecialUpperSymbolAlternative(buttonKey)) {
                        if (value) {
                            buttonKeys[i].innerHTML = buttonLib.getButtonUpperTextAlternative(buttonKey)
                        } else {
                            buttonKeys[i].innerHTML = buttonLib.getButtonAlternativeText(buttonKey)
                        }
                    }
                } else {
                    if(buttonLib.hasSpecialUpperSymbol(buttonKey)){
                        if(value) {
                            buttonKeys[i].innerHTML = buttonLib.getButtonUpperText(buttonKey)
                        } else {
                            buttonKeys[i].innerHTML = buttonLib.getButtonText(buttonKey)
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < buttonKeys.length; i++){
        if (!buttonKeys[i].classList.contains("letter-key")) {
            if(value==true) {
                buttonKeys[i].style.textTransform="uppercase"
            } else {
                buttonKeys[i].style.textTransform="lowercase"
            }
        }
    };
}

function setActiveShift(buttonClasses){
    let buttonKeysRS = document.getElementsByClassName('right-shift')[0]
    let buttonKeysLS = document.getElementsByClassName('left-shift')[0]
    buttonKeysRS.classList.remove('active')
    buttonKeysLS.classList.remove('active')
    if (buttonClasses != "") {
        if (buttonClasses.contains("right-shift")) {
            buttonKeysRS.classList.add('active')
        }
        if (buttonClasses.contains("left-shift")) {
            buttonKeysLS.classList.add('active')
        }
    }
}

function setActiveAlt(buttonClasses){
    let buttonKeysRS = document.getElementsByClassName('right-alt')[0]
    let buttonKeysLS = document.getElementsByClassName('left-alt')[0]
    buttonKeysRS.classList.remove('active')
    buttonKeysLS.classList.remove('active')
    if (buttonClasses != "") {
        if (buttonClasses.contains("right-alt")) {
            buttonKeysRS.classList.add('active')
        }
        if (buttonClasses.contains("left-alt")) {
            buttonKeysLS.classList.add('active')
        }
    }
}

function setActiveCtrl(buttonClasses){
    let buttonKeysRS = document.getElementsByClassName('right-ctrl')[0]
    let buttonKeysLS = document.getElementsByClassName('left-ctrl')[0]
    buttonKeysRS.classList.remove('active')
    buttonKeysLS.classList.remove('active')
    if (buttonClasses != "") {
        if (buttonClasses.contains("right-ctrl")) {
            buttonKeysRS.classList.add('active')
        }
        if (buttonClasses.contains("left-ctrl")) {
            buttonKeysLS.classList.add('active')
        }
    }
}

function addSymbolToTextArea(buttonKey) {
    const textarea = document.getElementsByClassName("textarea")[0];
    let specialButton=isSpecialButton(buttonKey)
    if(specialButton) {
        specialButtonAction(buttonKey)
    } else {
        let buttonText = ""
        if (cookiesLib.getCookie('isAlternative') == "true")
            buttonText = buttonLib.getButtonAlternativeText(buttonKey)
        else
            buttonText = buttonLib.getButtonText(buttonKey)
        if (cookiesLib.getCookie('isShift') == "true") {
            textarea.innerHTML+=buttonText.toLocaleUpperCase();
        } else {
            textarea.innerHTML+=buttonText;
        }
        cookiesLib.setCookie('isShift', false)
        if (cookiesLib.getCookie("isCapsLock") != "true") {
            setUpperCase(false)
        }
        setActiveShift("")
        setActiveAlt("")
        setActiveCtrl("")
        cookiesLib.setCookie('isShift', false)
        cookiesLib.setCookie('isAlt',false)
        cookiesLib.setCookie('isCtrl',false)
    }
}

function setActiveKeyByCode(status=false,code,location=1) {

    if (location==2 && buttonLib.isSpecialButton(code)){
        console.log("right-"+buttonLib.getSpecialButtonAction(code))
        const key = document.getElementsByClassName("right-"+buttonLib.getSpecialButtonAction(code))[0];
        if(status)
            key.classList.add("active")
        else
            key.classList.remove("active")
    } else {
        const key = document.getElementsByClassName("Key"+code)[0];
        if(status)
            key.classList.add("active")
        else
            key.classList.remove("active")
    }
    changeLanguage()
}


function keyDown(event) {
    let keyCode = event.keyCode
    setActiveKeyByCode(true,keyCode,event.location)
    if(!buttonLib.isSpecialButton(event.keyCode)) {
        console.log(keyCode)
        addSymbolToTextArea(keyCode)

    } else {
        switch (keyCode) {
            //Shift
            case 16:
                cookiesLib.setCookie('isShift', true)
                setUpperCase(true)
                break;
            //Alt
            case 18:
                cookiesLib.setCookie('isAlt',true)
                break;
            //Ctrl
            case 17:
                cookiesLib.setCookie('isCtrl',true)
                break;
            //Down
            case 40:
            //Right
            case 39:
            //Up
            case 38:
            //Enter
            case 13:
            //Space
            case 32:
            //Left
            case 37:
                addSymbolToTextArea(keyCode)
                break;
        }
    }
}

function keyUp(event) {
    let keyCode = event.keyCode
    setActiveKeyByCode(false,keyCode,event.location)
    if(buttonLib.isSpecialButton(event.keyCode)) {
        switch (keyCode) {
            case 16:
                cookiesLib.setCookie('isShift', false)
                setUpperCase(false)
                break;
            //Alt
            case 18:
                cookiesLib.setCookie('isAlt',true)
                break;
            //Ctrl
            case 17:
                cookiesLib.setCookie('isCtrl',true)
                break;
        }
    }
}