export class SearchList {
  constructor(target, onSearch) {
    this.searchListBox = document.createElement("div");
    this.searchListBox.className = "searchList";
    this.onSearch = onSearch;

    target.appendChild(this.searchListBox);

    this.actors = [];

    this.handleDelete = (ele) => {
      this.deleteElement(ele.querySelector("span").innerText);
      ele.remove();
    };
  }

  setState(actor) {
    this.actors.push(actor);
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

  deleteElement(actor) {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
    this.onSearch("");
  }
}
