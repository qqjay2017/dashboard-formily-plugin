const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

import ReactDOM from "react-dom/client";
import App from "../src/client-pages/report-app/ReportApp";
import "../src/index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
