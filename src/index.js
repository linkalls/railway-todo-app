// import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { store } from "./store"

// ReactDOM.render(
//   <Provider store={store}>
//     <CookiesProvider>
//       <App />
//     </CookiesProvider>
//   </Provider>,
//   document.getElementById("root")
// );
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
