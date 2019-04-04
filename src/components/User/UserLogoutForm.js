// Import configs
import { state } from "../state";
import { getEl, isRendered } from "./HelperFunctions/jwthelpers";
import { UserLogoutForm } from "./config";

/**
 * Display the logout form
 *
 * @export function
 * @returns
 */
export function render() {
  // Make sure logged in and form is not already rendered
  if (state.loggedIn === false || isRendered(UserLogoutForm)) {
    return;
  }
  // Setup the logout form
  const form = document.createElement("form");
  form.id = UserLogoutForm;
  form.innerHTML = `
    <button class="button submit">
      Logout
    </button>
  `;
}
