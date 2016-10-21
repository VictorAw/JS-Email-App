/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);
	const Sent = __webpack_require__(4);
	const Compose = __webpack_require__(5);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {

	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    window.addEventListener("hashchange", () => {
	      this.render();
	    });
	    this.render();
	  }

	  activeRoute() {
	    return this.routes[window.location.hash.slice(1)];
	  }

	  render() {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    if (component) {
	      this.node.innerHTML = "";
	      this.node.appendChild(component.render());
	    } else {
	      this.node.innerHTML = "";
	    }
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let Inbox = {
	  render() {
	    let ul = document.createElement("ul");
	    ul.className = "messages";
	    let msgs = MessageStore.getInboxMessages();
	    for (let i=0; i<msgs.length; i++) {
	      ul.appendChild(this.renderMessage(msgs[i]));
	    }
	    return ul;
	  },
	  renderMessage(msg) {
	    let li = document.createElement("li");
	    li.className = "message";
	    li.innerHTML += `<span class="from">${msg.from}</span>`;
	    li.innerHTML += `<span class="subject">${msg.subject} - </span>`;
	    li.innerHTML += `<span class="body">${msg.body}</span>`;
	    return li;
	  }
	};

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	class Message {
	  constructor(fr="", to="", subject="", body="") {
	    this.from = fr;
	    this.to = to;
	    this.subject = subject;
	    this.body = body;
	  }
	}
	let messageDraft = new Message;

	let MessageStore = {
	  getInboxMessages() {
	    return messages.inbox;
	  },
	  getSentMessages() {
	    return messages.sent;
	  },
	  updateDraftField(field, value) {
	    messageDraft[`${field}`] = value;
	  },
	  sendDraft() {
	    messages.sent.push(messageDraft);
	    messageDraft = new Message;
	  },
	  getMessageDraft() {
	    return messageDraft;
	  }
	};

	module.exports = MessageStore;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let Sent = {
	  render() {
	    let ul = document.createElement("ul");
	    ul.className = "messages";
	    let msgs = MessageStore.getSentMessages();
	    for (let i=0; i<msgs.length; i++) {
	      ul.appendChild(this.renderMessage(msgs[i]));
	    }
	    return ul;
	  },
	  renderMessage(msg) {
	    let li = document.createElement("li");
	    li.className = "message";
	    li.innerHTML += `<span class="to">${msg.to}</span>`;
	    li.innerHTML += `<span class="subject">${msg.subject} - </span>`;
	    li.innerHTML += `<span class="body">${msg.body}</span>`;
	    return li;
	  }
	};

	module.exports = Sent;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let Compose = {
	  render() {
	    let div = document.createElement("div");
	    div.className = "new-message";
	    div.innerHTML = this.renderForm();

	    div.addEventListener("change", (evt) => {
	      let target = evt.target;
	      let name = target.name;
	      let val = target.value;
	      console.log(name);
	      console.log(val);
	      MessageStore.updateDraftField(name, val);
	    });

	    div.addEventListener("submit", (evt) => {
	      evt.preventDefault();

	      MessageStore.sendDraft();
	      window.location.hash = "#inbox";
	    });

	    return div;
	  },
	  renderForm() {
	    let msg = MessageStore.getMessageDraft();
	    return `<p class="new-message-header">New Message<form class="compose-form">
	              <input placeholder="Recipeint" name="to" type="text" value=${msg.to}>
	              <input placeholder="Subject" name="subject" type="text" value=${msg.subject}>
	              <textarea name="body" rows="20">${msg.body}</textarea>
	              <button type="submit" class="btn btn-primary submit-message">Send</button>
	              </p>`;
	  }
	};

	module.exports = Compose;


/***/ }
/******/ ]);