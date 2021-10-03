export class SearchList {
  constructor({ deleteElement }) {
    this.searchListBox = document.createElement("div");
    this.searchListBox.className = "searchList";

    this.inputDiv = document.querySelector(".inputDiv");
    this.inputDiv.appendChild(this.searchListBox);

    this.handleDelete = (ele) => {
      deleteElement(ele.querySelector("span").innerText);
      ele.remove();
    };
  }

  setState(actor) {
    const div = document.createElement("div");
    div.className = "actor";

    const actorName = document.createElement("span");
    actorName.innerText = actor;
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-times";

    div.appendChild(actorName);
    div.appendChild(deleteIcon);
    this.searchListBox.appendChild(div);

    deleteIcon.addEventListener("click", (event) => {
      this.handleDelete(event.target.parentNode);
    });
  }
}
