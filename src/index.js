import React from 'react';
import ReactDOM from 'react-dom';
import AzureAD from "react-aad-msal";
import { signInAuthProvider } from "./azure-utils/authProvider";
import './index.css';
import App from './App';

ReactDOM.render(
  <AzureAD provider={signInAuthProvider} forceLogin={true}>
    <App />
  </AzureAD>,
  document.getElementById("root")
);