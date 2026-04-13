export const getGoogleAuthCode = (clientId?: string, redirectUri?: string) => {
  console.log("Mock Google Auth call", { clientId, redirectUri });
  return "mock_google_code";
};
