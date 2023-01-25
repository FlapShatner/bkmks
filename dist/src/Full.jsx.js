import { createHotContext } from '../node_modules/vite/dist/client/client.mjs.js';
import exports from '../vendor/react-refresh.js';
import react_jsx_dev_runtime_default from '../node_modules/.vite/deps/react_jsx-dev-runtime.js';

import.meta.hot = createHotContext("/src/Full.jsx.js");let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    exports.register(type, "D:/Dev/extensions/bkmks_0.1/src/Full.jsx " + id);
  };
  window.$RefreshSig$ = exports.createSignatureFunctionForTransform;
}
var _jsxFileName = "D:\\Dev\\extensions\\bkmks_0.1\\src\\Full.jsx";
 const _jsxDEV = react_jsx_dev_runtime_default["jsxDEV"];
function Full() {
  return /* @__PURE__ */ _jsxDEV("div", {
    children: "Full"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
_c = Full;
var _c;
$RefreshReg$(_c, "Full");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept();
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      exports.performReactRefresh();
    }, 30);
  }
}

export { Full as default };
