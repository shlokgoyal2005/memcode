// getting access token by sending github authorization code that will prove to github that we are the application (client_id, client_secret) that user gave access to
const githubFetchAccessToken = async (oauthId, oauthSecret, code) => {
  // 'access_token=0bc4d5757978a90d8e9bc96fac795c876179f2ba&scope=&token_type=bearer'
  const stringWithAccessToken = await
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: oauthId,
      client_secret: oauthSecret,
      code,
      scope: "user:email"
    }),
  })
    .then((response) => response.json());

  // {"error":"bad_verification_code","error_description":"The code passed is incorrect or expired.",
  if (stringWithAccessToken.error) {
    return Promise.reject(stringWithAccessToken.error_description);
  } else {
    const accessToken = stringWithAccessToken.access_token;
    return accessToken;
  }
};

export { githubFetchAccessToken };
