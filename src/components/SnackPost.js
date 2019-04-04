// Import components
import { loadSnackPost } from "./Editor";
import { render as SnackPosts, clear as clearSnackPosts } from "./SnackPosts";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "./HelperFunctions/jwthelpers";
import { deleteSnackPost } from "../crud";
import { main, backBtn } from "../config";

/**
 * Displays a snackpost on the page from state.post
 *
 * @param {Object} event - Event object
 */
export function render(event) {
  // Setup the post article element
  const article = createEl("article");
  article.classList.add("snackpost");
  article.innerHTML = `
      <p><a id="${backBtn}" href="#">&lt; Back to Snacks</a></p>
      <h1 class="entry-title">${state.snackpost.title.rendered}</h1>
      <div class="entry-content">${state.snackpost.content.rendered}</div>
    `;

  // Attach event listeners to back button
  article.querySelector(`#${backBtn}`).addEventListener("click", event => {
    event.preventDefault();
    setState("snackpost", null);
    SnackPosts();
  });

  // If logged in, display edit link
  if (state.loggedIn) {
    article.append(editLink(state.snackpost));
    article.append(deleteLink(state.snackpost));
  }

  // Clear the posts from the page
  clearSnackPosts();

  // Add the post to the page
  getEl(main).append(article);
}

/**
 * Creates an edit link for a post bound to it
 *
 * @param {Object} post The post to be edited
 */
export function editLink(snackpost) {
  // Setup the edit link
  const link = document.createElement("a");
  link.href = "#edit-snackpost";
  link.classList.add("edit");
  link.innerText = "Edit";

  // Add event listener for the post edit link
  link.addEventListener("click", () => {
    setState("editorSnackPost", snackpost.id);
    loadSnackPost();
  });

  // Return the link element
  return link;
}

export function deleteLink(snackpost) {
  // Setup the delete link
  const link = document.createElement("a");
  link.href = "#delete-snackpost";
  link.classList.add("delete-snackpost");
  link.innerText = "Delete";

  // Add the event listener to delete the post
  link.addEventListener("click", event => {
    event.preventDefault();
    deleteSnackPost(snackpost);
  });

  // Return the delete link
  return link;
}
