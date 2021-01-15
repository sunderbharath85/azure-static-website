import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    (async () => {
      const headers = new Headers();
      const token = window.sessionStorage.getItem("msal.f8448b53-2326-4c77-911d-343d80d393e7.idtoken");
      console.log(token);
      headers.append("Authorization", `Bearer ${token}`)
      let { message } = await (await fetch(`/api/GetMessages`, { headers })).json();
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
