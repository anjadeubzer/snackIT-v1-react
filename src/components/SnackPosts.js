// Import libraries
import axios from "axios";

// Import components
import { render as SnackPost, editLink, deleteLink } from "./SnackPost";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "./HelperFunctions/jwthelpers";
import { main } from "../config";

/**
 * Get posts from the REST API
 *
 * @param {Object} event - The event object
 */
export function init(event) {
  // If coming from an event, prevent default behavior
  if (event) event.preventDefault();

  // Make API request with Axios
  axios
    // Set the url to request posts
    .get(state.restUrl + "wp/v2/snackposts", {
      params: {
        // Set number of posts to get
        per_page: 5
      }
    })
    .then(({ data: snackposts }) => {
      // Set the state for posts
      setState("snackposts", snackposts);
      // Map over the posts and render to page
      render();
    });
}

/**
 * render - Renders the posts to the page from state.posts object
 *
 */
export function render() {
  // Clear the current posts from the page
  clear();
  // Map through the posts
  state.posts.map(snackpost => {
    // Setup the post article element
    const article = createEl("article");
    article.classList.add("snackpost");
    article.innerHTML = `
        <h2 class="entry-title">
          <a href="#${snackpost.slug}">${snackpost.title.rendered}</a>
        </h2>
        <div class="entry-content">${snackpost.excerpt.rendered}</div>
      `;

    // Attach an event listenr on the post link
    article.querySelector(".entry-title a").addEventListener("click", event => {
      // Prevent the link from going to link
      event.preventDefault();
      // Set the state for post to display
      setState("snackpost", snackpost);
      // Render single post
      SnackPost();
    });

    // If logged in, display edit link
    if (state.loggedIn) {
      article.append(editLink(snackpost));
      article.append(deleteLink(snackpost));
    }

    // Append the post to the page
    getEl(main).append(article);
  });
}

/**
 * clear - Clears the posts from the main content area
 *
 */
export function clear() {
  // Set the inner html of the main content area to emptu=y==y
  getEl(main).innerHTML = "";
}
