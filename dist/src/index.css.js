import { createHotContext, updateStyle, removeStyle } from '../node_modules/vite/dist/client/client.mjs.js';

import.meta.hot = createHotContext("/src/index.css.js");const __vite__id = "D:/Dev/extensions/bkmks_0.1/src/index.css";
const __vite__css = "\nbody {\n  margin: 0;\n  font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n";
updateStyle(__vite__id, __vite__css);
import.meta.hot.accept();
import.meta.hot.prune(() => removeStyle(__vite__id));

export { __vite__css as default };
