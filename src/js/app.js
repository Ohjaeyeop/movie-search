import { api } from "./api.js";
import { SearchInput } from "./searchInput.js";
import { SearchResult } from "./searchResult.js";

class App {
  constructor(target) {
    this.movies = [];

    this.searchInput = new SearchInput({
      target,
      onSearch: async (actor) => {
        if (actor === "") {
          this.setState([]);
          return true;
        }
        const { Data } = await api.movieInfo(actor);
        const { Result: movies } = Data[0];
        if (movies === undefined) {
          return false;
        }
        this.setState(movies);
        return true;
      },
    });

    this.searchResult = new SearchResult(target);
  }

  setState(movies) {
    this.movies = movies;
    this.searchResult.render(this.movies);
  }
}

new App(document.getElementById("app"));
