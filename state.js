// Set state object with values that are changed programatically
const state = {
  loggedIn: false,
  restUrl: "https://snackit-v1.ritapbest.io/wp-json/",
  token: "wp-token",
  siteName: "Site Name",
  siteDescription: "SnackIT React App",
  snack_posts: null,
  snack_post: null,
  editorPost: null
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
