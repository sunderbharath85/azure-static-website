const express = require("express");
import auth from "./auth";
import * as passport from "passport";
import { BearerStrategy } from "passport-azure-ad";

const createHandler = require("azure-function-express").createHandler;

const options = {
  identityMetadata: `https://${auth.tenantName}.b2clogin.com/${auth.tenantName}.onmicrosoft.com/${auth.policyName}/${auth.version}/${auth.discovery}`,
  clientID: auth.clientID,
  audience: auth.clientID,
  policyName: auth.policyName,
  isB2C: true,
  validateIssuer: false,
  loggingLevel: "info",
  passReqToCallback: false,
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
});

const app = express();

app.use(require("morgan")("combined"));

app.use(require("body-parser").urlencoded({ extended: true }));

app.use(passport.initialize());

passport.use(bearerStrategy);

// Enable CORS (for local testing only -remove in production/deployment)
app.use((req, res, next) => {
  console.log(req.headers.authorization);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Expose and protect API endpoint
app.get(
  "/api/getMessages",
  passport.authenticate("oauth-bearer", { session: false }),
  (req, res) => {
    console.log("Validated claims: ", req.authInfo);

    // Service relies on the name claim.
    res.status(200).json({
      name: req.authInfo["name"],
      "issued-by": req.authInfo["iss"],
      "issued-for": req.authInfo["aud"],
      "using-scope": req.authInfo["scp"],
    });
  }
);

module.exports = createHandler(app);
