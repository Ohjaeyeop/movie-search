export class SearchInput {
  constructor({ target, onSearch, chkInput }) {
    const inputDiv = document.createElement("div");
    inputDiv.className = "inputDiv";
    target.appendChild(inputDiv);

    this.searchInput = document.createElement("input");
    this.searchInput.placeholder = "영화배우를 검색하세요.";
    inputDiv.appendChild(this.searchInput);
    this.searchInput.focus();

    const handleSubmit = async (event) => {
      const { value } = event.target;
      if (event.code === "Enter") {
        if (value !== "" && !chkInput(value)) {
          this.searchInput.disabled = true;
          await onSearch(value);
          this.searchInput.disabled = false;
          this.searchInput.focus();
        }
        event.target.value = "";
      }
    };

    this.searchInput.addEventListener("keyup", handleSubmit);
  }
}
