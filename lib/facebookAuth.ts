export const getFacebookAuthToken = async (appId?: string, redirectUri?: string) => {
  console.log("Mock Facebook Auth call");
  return { accessToken: "mock_facebook_token" };
};
