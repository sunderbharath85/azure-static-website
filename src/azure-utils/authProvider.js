import { MsalAuthProvider, LoginType } from "react-aad-msal";
const tenant = "collegehubapp.onmicrosoft.com";
const signInPolicy = "B2C_1_sign_in_sign_up";
const applicationID = "f8448b53-2326-4c77-911d-343d80d393e7";
const reactRedirectUri = "http://localhost:3000";
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
    storeAuthStateInCookie: false
  }
};
// Authentication Parameters
const authenticationParameters = {
  scopes: [
    "demo.read"
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