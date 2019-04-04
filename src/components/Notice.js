// Import configs
import { wrapper, message as messageEl } from "../config";
import { getEl, removeEl } from "./HelperFunctions/jwthelpers";

/**
 * Renders a notice on the page
 *
 * @export
 * @param {string} type The type of message to display
 * @returns
 */
export function render(type) {
  // Setup notice messages
  const messages = {
    saved: "Your snack has been saved!",
    loggedin: "Welcome! You are logged in!",
    updated: "Your snack has been updated!",
    required: "All fields are required!",
    failed: "This action failed :(",
    deleted: "Your snack has been deleted!"
  };

  // Setup the notice markup
  const message = document.createElement("div");
  message.id = messageEl;
  message.classList.add(type);
  message.innerHTML = `<p>${messages[type]}</p>`;

  // If there is already a notice rendered, remove it
  removeEl(getEl(messageEl));

  // Get the container for the page
  const container = getEl(wrapper);
  container.insertBefore(message, container.childNodes[0]);

  setTimeout(() => {
    removeEl(messageEl);
  }, 1600);
}
