export class SearchResult {
  constructor({ deleteElement }) {
    this.actorResult = document.createElement("div");
    this.actorResult.className = "actorResult";

    this.inputDiv = document.querySelector(".inputDiv");
    this.inputDiv.appendChild(this.actorResult);

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
    this.actorResult.appendChild(div);

    deleteIcon.addEventListener("click", (event) => {
      this.handleDelete(event.target.parentNode);
    });
  }
}
