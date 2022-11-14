export const AwsConfigAuth = {
  region: "eu-west-1",
  userPoolId: "eu-west-1_nDvO1n5xR",
  userPoolWebClientId: "2b0ona62mjh0aug2t0i4pchcq1",
  mandatorySignIn: false,
  cookieStorage: {
    domain: "localhost",
    path: "/",
    expires: 365,
    sameSite: "strict",
    secure: false,
  },
  authenticationFlowType: "USER_SRP_AUTH",
  oauth: {
    domain: "synergy-dev.auth.eu-west-1.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "http://localhost:3001/",
    redirectSignOut: "http://localhost:3001/",
    responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
};
