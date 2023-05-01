export function fillButtons(isShiftPress,isCapsEnable,isAlternative) {
    const keyboard = document.getElementsByClassName('keyboard');
    keyboard[0].innerHTML=""
    const useAlternative = isAlternative

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

    let alternativeButtonsArray =
                        [["ё","1","2","3","4","5","6","7","8","9","0","-","=","<-Back"],
                        ["Tab", "й","ц","у","к","е","н","г","ш","щ","з","х","ъ","Del"],
                        ["CapsLock","ф","ы","в","а","п","р","о","л","д","ж","э","\\", "Enter"],
                        ["Shift","я","ч","с","м","и","т","ь","б","ю",".","Up","Shift"],
                        ["Ctrl","Win","Alt","Space","Alt","Left","Down","Right","Ctrl"]]

    let buttonsArray =  [["`","1","2","3","4","5","6","7","8","9","0","-","=","<-Back"],
                        ["Tab", "q","w","e","r","t","y","u","i","o","p","[","]","Del"],
                        ["CapsLock","a","s","d","f","g","h","j","k","l",";","'","\\","Enter"],
                        ["Shift","z","x","c","v","b","n","m",",",".","/","Up","Shift"],
                        ["Ctrl","Win","Alt","Space","Alt","Left","Down","Right","Ctrl"]]

    let buttonsKodArray =
                        [[192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187,8],
                        [9,81,87,69,82,84,89,85,73,79,80,219, 221, 46],
                        [20,65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220, 13],
                        [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38,16],
                        [17, 91, 18, 32, 18, 37,40,39, 17]]

    for (let i = 0; i < buttonsKodArray.length; i++) {
        let keysLine = document.createElement('div');
        keysLine.classList.add('line');
        for (let j = 0 ; j < buttonsKodArray[i].length; j++) {
            let button = document.createElement('div');
            let code = buttonsKodArray[i][j]
            button.classList.add("Key"+code)
            button.classList.add('key')
            if (specialButton.has(code)){
                button.classList.add('letter-key')
                button.classList.add(specialButton.get(code));
                let s = getSpecialClass(i,j)
                if (s != null) {
                    button.classList.add(s);
                }
            }
            if (useAlternative) {
                button.innerHTML = alternativeButtonsArray[i][j];
            } else {
                button.innerHTML = buttonsArray[i][j];
            }
            keysLine.append(button);
        }
        keyboard[0].appendChild(keysLine)
    }
}

function getSpecialClass(l,n){

    const specialClass = new Map();
     //Shift
    specialClass.set("3:0", "left-shift");
    specialClass.set("3:12","right-shift");
    //Ctrl
    specialClass.set("4:0","left-ctrl");
    specialClass.set("4:8","right-ctrl");
    //alt
    specialClass.set("4:2","left-alt");
    specialClass.set("4:4","right-alt");

    let key = l+":"+n

    if (specialClass.has(key)){
        return(specialClass.get(key))
    }
    return null
}
