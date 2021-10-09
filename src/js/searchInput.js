import { SearchList } from "./searchList.js";

export class SearchInput {
  constructor({ target, onSearch }) {
    this.inputDiv = document.createElement("div");
    this.inputDiv.className = "inputDiv";
    target.appendChild(this.inputDiv);

    this.onSearch = async (actor) => {
      this.searchInput.disabled = true;
      const response = await onSearch(
        this.searchList.actors.join() + `,${actor}`
      );
      if (response) {
        actor && this.searchList.setState(actor);
        this.setErrorMessage("");
      } else {
        this.setErrorMessage("만족하는 검색결과가 없습니다.");
      }
      this.searchInput.disabled = false;
      this.searchInput.focus();
    };

    this.errorMessage = document.createElement("div");
    this.errorMessage.className = "errorMessage";
    this.inputDiv.appendChild(this.errorMessage);

    this.searchInput = document.createElement("input");
    this.searchInput.placeholder = "영화배우를 검색하세요.";
    this.inputDiv.appendChild(this.searchInput);
    this.searchInput.focus();

    this.searchList = new SearchList(this.inputDiv, this.onSearch);

    const handleSubmit = async (event) => {
      const { value } = event.target;
      if (event.code === "Enter") {
        if (value !== "") {
          if (value.length < 2) {
            this.setErrorMessage("두 글자 이상 입력해주세요.");
          } else if (this.chkInput(value)) {
            this.setErrorMessage("이미 검색하신 이름입니다.");
          } else {
            this.onSearch(value);
          }
          event.target.value = "";
        }
      }
    };

    this.searchInput.addEventListener("keyup", handleSubmit);
  }

  chkInput(actor) {
    return this.searchList.actors.includes(actor);
  }

  setErrorMessage(message) {
    this.errorMessage.innerText = message;
  }
}
