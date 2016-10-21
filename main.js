const Router = require("./router.js");
const Inbox = require("./inbox.js");
const Sent = require("./sent.js");
const Compose = require("./compose.js");

let routes = {
  inbox: Inbox,
  sent: Sent,
  compose: Compose
};

document.addEventListener("DOMContentLoaded", () => {

  let sideBar = document.querySelectorAll(".sidebar-nav li");
  for(let i = 0; i < sideBar.length; i++) {
    sideBar[i].addEventListener("click", () => {
      window.location.hash = sideBar[i].innerText.toLowerCase();
    });
  }
  let content = document.querySelector(".content");
  let router = new Router(content, routes);
  router.start();

  window.location.hash = "#inbox";

});
