import { lazyLoad } from "./lazyLoad.js";

export class SearchResult {
  constructor(target) {
    this.searchResult = document.createElement("div");
    this.searchResult.className = "searchResult";
    target.appendChild(this.searchResult);

    const handleClick = ({ target }) => {
      let modal = document.querySelector(".visibleModal");
      if (modal) {
        if (target !== modal) {
          modal.style.display = "none";
          modal.classList.remove("visibleModal");
          clearInterval(this.timerId);
        }
      } else if (target.className === "poster") {
        this.showModal(target.alt, target.dataset.stlls);
      }
    };

    window.addEventListener("click", handleClick);
  }

  render(movies) {
    this.searchResult.innerHTML = movies
      .map((movie) => {
        return `<div><img class="poster lazy" width=240px height=320px data-src="${this.getImageUrl(
          movie
        )}" data-stlls="${movie.stlls}" alt="${movie.title}" /></div>`;
      })
      .join("");

    this.createModal(movies);
    lazyLoad();
  }

  getImageUrl(movie) {
    const imageUrl = movie.posters.split("|");
    const index = Math.floor(Math.random() * imageUrl.length);
    return imageUrl[index];
  }

  createModal(movies) {
    this.searchResult.innerHTML += movies
      .map((movie) => {
        return `<div class="modal" id="${movie.title}"><h4>${movie.title}</h4><img class="stlls" alt="이미지 없음"/></div>`;
      })
      .join("");
  }

  showModal(title, stlls) {
    let modal = document.getElementById(title);
    let modalImage = modal.querySelector("img");
    modal.style.display = "block";
    modal.classList.add("visibleModal");

    const getStlls = stlls.split("|");
    modalImage.src = getStlls[0];
    const n = getStlls.length;

    const getRandomStll = () => {
      const index = Math.floor(Math.random() * n);
      modalImage.src = getStlls[index];
    };

    this.timerId = setInterval(getRandomStll, 1000);
  }
}
