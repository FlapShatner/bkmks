import { createHotContext } from '../node_modules/vite/dist/client/client.mjs.js';
import exports from '../vendor/react-refresh.js';
import s from './Popup.module.css.js';
import { useNavigate } from '../node_modules/.vite/deps/react-router-dom.js';
import react_jsx_dev_runtime_default from '../node_modules/.vite/deps/react_jsx-dev-runtime.js';

import.meta.hot = createHotContext("/src/Popup.jsx.js");let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    exports.register(type, "D:/Dev/extensions/bkmks/src/Popup.jsx " + id);
  };
  window.$RefreshSig$ = exports.createSignatureFunctionForTransform;
}
var _jsxFileName = "D:\\Dev\\extensions\\bkmks\\src\\Popup.jsx", _s = $RefreshSig$();
 const _jsxDEV = react_jsx_dev_runtime_default["jsxDEV"];
function Popup() {
  _s();
  const navigate = useNavigate();
  const sendMessage = () => {
    navigate("/full");
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: s.popup,
    children: [/* @__PURE__ */ _jsxDEV("h1", {
      children: "BKMKS"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("p", {
      children: "Better bookmark manager"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("button", {
      onClick: sendMessage,
      children: "Explore Bookmarks"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
_s(Popup, "CzcTeTziyjMsSrAVmHuCCb6+Bfg=", false, function() {
  return [useNavigate];
});
_c = Popup;
var _c;
$RefreshReg$(_c, "Popup");
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

export { Popup as default };
