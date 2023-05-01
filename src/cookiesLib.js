export function init() {
    let initValues = new Map()
    initValues.set("isShift",false)
    initValues.set("isAlt",false)
    initValues.set("isCtrl",false)
    initValues.set("isCapsLock",false)
    initValues.set("isAlternative",false)
    console.log("Init")
    initValues.forEach(setIfNotExist)

}

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setIfNotExist(value, key, map) {
    if (getCookie(key) == "")  {
         setCookie(key, value, 30);
    }
}

export {getCookie, setCookie}