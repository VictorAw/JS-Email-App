const MessageStore = require("./message_store.js");

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
