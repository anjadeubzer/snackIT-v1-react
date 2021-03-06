// Import configs
import { state } from "../state";
import { getEl, createEl, isRendered } from "..jwthelpers.js";
import { UserLoginForm, username, password } from "./config";

/**
 * Displays the LoginForm on the page
 *
 */
export function render() {
  // Make sure logged out and form is not rendered already
  if (state.UserloggedIn === true || isRendered(UserLoginForm)) {
    return;
  }

  // Setup the login form
  const form = createEl("form");
  form.id = UserLoginForm;
  form.innerHTML = `
    <h3>Login</h3>
    <p><label for="username">Username:</label></p>
    <p><input id="${username}" class="username" type="text" name="username" value=""></p>
    <p><label for="password">Password:</label></p>
    <p><input id="${password}" class="password" type="password" name="password" value=""></p>
    <p><button class="button submit">Login</button></p>
  ;
}
