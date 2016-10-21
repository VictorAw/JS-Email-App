const MessageStore = require("./message_store.js");

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
