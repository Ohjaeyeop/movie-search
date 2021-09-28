import { api } from "./api.js";
import { SearchInput } from "./searchInput.js";
import { SearchResult } from "./searchResult.js";

class App {
  constructor(target) {
    this.target = target;
    this.movies = [];
    this.searchList = [];

    this.searchInput = new SearchInput({
      target,
      onSearch: async (actor) => {
        const { Data } = await api.movieInfo(actor);
        const { Result: movies } = Data[0];
        this.setState(movies, actor);
      },
      chkInput: (actor) => {
        return this.searchList.includes(actor);
      },
    });

    this.searchResult = new SearchResult({
      deleteElement: (actor) => {
        const index = this.searchList.indexOf(actor);
        this.searchList.splice(index, 1);
      },
    });
  }

  setState(movies, actor) {
    this.movies = movies;
    this.searchList.push(actor);
    this.searchResult.setState(actor);
  }
}

window.onload = () => new App(document.getElementById("app"));
