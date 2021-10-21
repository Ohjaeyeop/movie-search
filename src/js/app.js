import { api } from "./api.js";
import { SearchInput } from "./searchInput.js";
import { SearchList } from "./searchList.js";
import { SearchResult } from "./searchResult.js";

class App {
  constructor(target) {
    this.movies = [];

    this.searchInput = new SearchInput({
      target,
      onSearch: async (actors) => {
        if (actors === "") {
          this.setState([]);
          sessionStorage.clear();
          return true;
        }
        const { Data } = await api.movieInfo(actors);
        const { Result: movies } = Data[0];
        if (movies === undefined) {
          return false;
        }
        sessionStorage.setItem("actors", JSON.stringify(actors));
        sessionStorage.setItem("movies", JSON.stringify(movies));
        this.setState(movies);
        return true;
      },
    });

    this.searchResult = new SearchResult(target);

    this.setInitialState();
  }

  setInitialState() {
    const initial_actors = JSON.parse(sessionStorage.getItem("actors"));
    const initial_movies = JSON.parse(sessionStorage.getItem("movies"));
    if (initial_actors !== null) {
      const actors = initial_actors.split(",");
      for (let i = 0; i < actors.length; i++) {
        this.searchInput.searchList.setState(actors[i]);
      }
      this.setState(initial_movies);
    }
  }

  setState(movies) {
    this.movies = movies;
    this.searchResult.render(this.movies);
    console.log(this.movies);
  }
}

new App(document.getElementById("app"));
