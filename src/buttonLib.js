let alternativeButtonsArray =
[["ё","1","2","3","4","5","6","7","8","9","0","-","=","<-Back"],
["Tab", "й","ц","у","к","е","н","г","ш","щ","з","х","ъ","Del"],
["CapsLock","ф","ы","в","а","п","р","о","л","д","ж","э","\\", "Enter"],
["Shift","я","ч","с","м","и","т","ь","б","ю",".","&#9650;","Shift"],
["Ctrl","","Alt","Space","Alt","&#9668;","&#9660;","&#9658;","Ctrl"]]

let buttonsArray =  [["`","1","2","3","4","5","6","7","8","9","0","-","=","<-Back"],
["Tab", "q","w","e","r","t","y","u","i","o","p","[","]","Del"],
["CapsLock","a","s","d","f","g","h","j","k","l",";","'","\\","Enter"],
["Shift","z","x","c","v","b","n","m",",",".","/","&#9650;","Shift"],
["Ctrl","","Alt","Space","Alt","&#9668;","&#9660;","&#9658;","Ctrl"]]

let buttonsCodeArray =
[[192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187,8],
[9,81,87,69,82,84,89,85,73,79,80,219, 221, 46],
[20,65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220, 13],
[16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38,16],
[17, 91, 18, 32, 18, 37,40,39, 17]]

const specialButton = new Map();
specialButton.set(13, "enter");
specialButton.set(8,  "backspace");
specialButton.set(9,  "tab")
specialButton.set(46, "del")
specialButton.set(20, "caps-lock")
specialButton.set(16, "shift")
specialButton.set(17, "ctrl")
specialButton.set(18, "alt")
specialButton.set(32, "space")
specialButton.set(91, "win")
specialButton.set(38, "up")
specialButton.set(37, "left")
specialButton.set(40, "down")
specialButton.set(39, "right")


const upperSymbols = new Map()
upperSymbols.set(192,"~")
upperSymbols.set(49,"!")
upperSymbols.set(50,"@")
upperSymbols.set(51,"#")
upperSymbols.set(52,"$")
upperSymbols.set(53,"%")
upperSymbols.set(54,"^")
upperSymbols.set(55,"&")
upperSymbols.set(56,"*")
upperSymbols.set(57,"(")
upperSymbols.set(48,")")
upperSymbols.set(189,"_")
upperSymbols.set(187,"+")
upperSymbols.set(220,"|")
upperSymbols.set(186,":")
upperSymbols.set(222,'"')
upperSymbols.set(221,"}")
upperSymbols.set(219,"{")
upperSymbols.set(188,"<")
upperSymbols.set(190,">")
upperSymbols.set(191,"?")


const upperSymbolsAlternative = new Map()
upperSymbolsAlternative.set(49,"!")
upperSymbolsAlternative.set(50,'"')
upperSymbolsAlternative.set(51,"№")
upperSymbolsAlternative.set(52,";")
upperSymbolsAlternative.set(53,"%")
upperSymbolsAlternative.set(54,":")
upperSymbolsAlternative.set(55,"?")
upperSymbolsAlternative.set(56,"*")
upperSymbolsAlternative.set(57,"(")
upperSymbolsAlternative.set(48,")")
upperSymbolsAlternative.set(189,"_")
upperSymbolsAlternative.set(187,"+")
upperSymbolsAlternative.set(220,"|")
upperSymbolsAlternative.set(191,",")


export function hasSpecialUpperSymbol(key) {
    return upperSymbols.has(key)
}

export function hasSpecialUpperSymbolAlternative(key) {
    console.log(key+" "+upperSymbolsAlternative.has(key))
    return upperSymbolsAlternative.has(key)
}

export function getButtonUpperText(key) {
    return upperSymbols.get(key)

}

export function getButtonUpperTextAlternative(key) {
    return upperSymbolsAlternative.get(key)
}


export function getButtonAlternativeText(key) {
    for (let i = 0; i < buttonsCodeArray.length; i++) {
        for (let j = 0 ; j < buttonsCodeArray[i].length; j++) {
            if(buttonsCodeArray[i][j]==key) {
                return(alternativeButtonsArray[i][j])
            }
        }
    }
}

export function getButtonText(key) {
    for (let i = 0; i < buttonsCodeArray.length; i++) {
        for (let j = 0 ; j < buttonsCodeArray[i].length; j++) {
            if(buttonsCodeArray[i][j]==key) {
                return(buttonsArray[i][j])
            }
        }
    }
}

export function isSpecialButton(key) {
    return specialButton.has(key)
}

export function getSpecialButtonAction(key) {
    return specialButton.get(key)
}