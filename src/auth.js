// Function to retrieve the access token from the cookie
function getAccessTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('access_token=')) {
        return cookie.substring('access_token='.length, cookie.length);
      }
    }
    return null; // Return null if the access token cookie is not found
  }
  
  export function isAuthenticated() {
    // Check if the user is authenticated (e.g., by validating the access token)
    const accessToken = getAccessTokenFromCookie();
    return !!accessToken; // Return true if the access token exists, or false otherwise
  }
  