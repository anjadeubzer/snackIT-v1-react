const state = {
  loggedIn: false,
  restUrl: "https://snackit-v1.ritapbest.io/wp-json/",
  token: "wp-token",
  siteName: "Site Name",
  siteDescription: "Another React App",
  posts: null,
  post: null
};
/**
 * Handles updating the state
 *
 * @param {string} toSet The property from state to set
 * @param {*} newValue The new value to set
 */
const setState = (toSet, newValue) => {
  state[toSet] = newValue;
};
export { state, setState };
