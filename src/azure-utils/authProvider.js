import { MsalAuthProvider, LoginType } from "react-aad-msal";
const tenant = "collegehubapp.onmicrosoft.com";
const signInPolicy = "B2C_1_sign_in_sign_up";
const applicationID = "f8448b53-2326-4c77-911d-343d80d393e7";
const reactRedirectUri = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://icy-sky-063a5dc1e.azurestaticapps.net/";
const tenantSubdomain = tenant.split(".")[0];
const instance = `https://${tenantSubdomain}.b2clogin.com/tfp/`;
const signInAuthority = `${instance}${tenant}/${signInPolicy}`;
// Msal Configurations
const signInConfig = {
  auth: {
    authority: signInAuthority,
    clientId: applicationID,
    redirectUri: reactRedirectUri,
    validateAuthority: false
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  }
};
// Authentication Parameters
const authenticationParameters = {
  scopes: [
    "https://graph.microsoft.com/Directory.Read.All"
  ]
};
// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + "/auth.html"
};
export const signInAuthProvider = new MsalAuthProvider(
  signInConfig,
  authenticationParameters,
  options
);