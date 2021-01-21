import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    (async () => {
      const headers = new Headers();
      const url = process.env.NODE_ENV === "development" ? "/api/products" : "https://nest-azure-sample.azurewebsites.net/api/products"
      const token = window.sessionStorage.getItem("msal.f8448b53-2326-4c77-911d-343d80d393e7.idtoken");
      headers.append("Authorization", `Bearer ${token}`)
      let { message } = await (await fetch(url, { headers, mode: "cors" })).json();
      setText(message);
    })();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {text}
        </div>
      </header>
    </div>
  );
}

export default App;
