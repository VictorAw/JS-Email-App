const MessageStore = require("./message_store.js");

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
