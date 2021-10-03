import { api } from "./api.js";
import { SearchInput } from "./searchInput.js";
import { SearchList } from "./searchList.js";
import { SearchResult } from "./searchResult.js";

class App {
  constructor(target) {
    this.target = target;
    this.movies = {};
    this.actors = [];

    this.searchInput = new SearchInput({
      target,
      onSearch: async (actor) => {
        const { Data } = await api.movieInfo(actor);
        const { Result: movies } = Data[0];
        this.setState(movies, actor);
      },
      chkInput: (actor) => {
        return this.actors.includes(actor);
      },
    });

    this.searchList = new SearchList({
      deleteElement: (actor) => {
        const index = this.actors.indexOf(actor);
        this.actors.splice(index, 1);
        delete this.movies[actor];
      },
    });
  }

  setState(movies, actor) {
    if (movies !== undefined) {
      this.searchInput.setErrorMessage("");
      this.movies[actor] = movies;
      this.actors.push(actor);
      this.searchList.setState(actor);
    } else {
      this.searchInput.setErrorMessage("영화배우를 검색해주세요.");
    }
  }
}

new App(document.getElementById("app"));
