export class SearchInput {
  constructor({ target, onSearch, chkInput }) {
    this.inputDiv = document.createElement("div");
    this.inputDiv.className = "inputDiv";
    target.appendChild(this.inputDiv);

    this.errorMessage = document.createElement("div");
    this.errorMessage.className = "errorMessage";
    this.inputDiv.appendChild(this.errorMessage);

    this.searchInput = document.createElement("input");
    this.searchInput.placeholder = "영화배우를 검색하세요.";
    this.inputDiv.appendChild(this.searchInput);
    this.searchInput.focus();

    const handleSubmit = async (event) => {
      const { value } = event.target;
      if (event.code === "Enter") {
        if (value !== "") {
          if (value.length < 2) {
            this.setErrorMessage("두 글자 이상 입력해주세요.");
          } else if (chkInput(value)) {
            this.setErrorMessage("이미 검색하신 이름입니다.");
          } else {
            this.searchInput.disabled = true;
            await onSearch(value);
            this.searchInput.disabled = false;
            this.searchInput.focus();
          }
          event.target.value = "";
        }
      }
    };

    this.searchInput.addEventListener("keyup", handleSubmit);
  }

  setErrorMessage(message) {
    this.errorMessage.innerText = message;
  }
}
