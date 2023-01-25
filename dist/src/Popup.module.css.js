import { createHotContext, updateStyle, removeStyle } from '../node_modules/vite/dist/client/client.mjs.js';

import.meta.hot = createHotContext("/src/Popup.module.css.js");const __vite__id = "D:/Dev/extensions/bkmks/src/Popup.module.css";
const __vite__css = ":root{\r\n    \r\n    --clr-dark:#282c34;\r\n    --clr-text:hsl(0, 0%, 89%);\r\n    --clr-purp:rgb(189, 147, 249);\r\n}\r\n\r\n._popup_1z115_15{\r\n    padding: 1rem 0 ;\r\n    background: var(--clr-dark);\r\n    color:var(--clr-text);\r\n}\r\n\r\n._popup_1z115_15 h1{\r\n    font-size: 2rem;\r\n    margin-bottom: 0;\r\n    color:var(--clr-purp)\r\n}\r\n\r\n._popup_1z115_15 p{\r\n    margin-top: .25rem;\r\n}\r\n\r\n._popup_1z115_15 button{\r\n    margin: 1rem 0;\r\n    background: var(--clr-dark);\r\n    font-size: medium;\r\n    font-weight: 700;\r\n    color: var(--clr-text);\r\n    font-family: 'Inter' sans-serif;\r\n    border: 2px dashed var(--clr-purp);\r\n    padding: .5rem .75rem;\r\n    border-radius: .5rem;\r\n    cursor: pointer;\r\n    opacity: .7;\r\n    transition: .125s all ease-in-out;\r\n}\r\n\r\n._popup_1z115_15 button:hover{\r\n    opacity: 1;\r\n    border-color: var(--clr-text);\r\n}";
updateStyle(__vite__id, __vite__css);
const popup = "_popup_1z115_15";
var s = {
	popup: popup
};

import.meta.hot.prune(() => removeStyle(__vite__id));

export { s as default, popup };
