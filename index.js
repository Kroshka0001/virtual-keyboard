
//import createBody from './src/createBody.js';
import * as createBody  from './src/createBody.js';
import * as fillButtons from './src/fillButtons.js';
import * as buildEvents from './src/buildEvents.js';
import * as cookiesLib  from './src/cookiesLib.js';

cookiesLib.init();
createBody.createBody();
if (cookiesLib.getCookie("isAlternative") == "true")
    fillButtons.fillButtons(true,true,true);
else
    fillButtons.fillButtons(true,true,false)

buildEvents.buildKeyEvents()
