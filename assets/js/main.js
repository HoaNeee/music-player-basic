const song = {
  songs: [
    {
      name: "Body Back",
      author: "Gryffin",
      pathMusic: "assets/songs/song-1.mp3",
      image: "assets/images/song-image-1.png",
    },
    {
      name: "Epic",
      author: "The farat",
      pathMusic: "assets/songs/song-2.mp3",
      image: "assets/images/song-image-2.png",
    },
    {
      name: "Hidding In The Blue",
      author: "The farat",
      pathMusic: "assets/songs/song-3.mp3",
      image: "assets/images/song-image-3.png",
    },
    {
      name: "Skyline",
      author: "Lovan & Electro-light",
      pathMusic: "assets/songs/song-4.mp3",
      image: "assets/images/song-image-4.png",
    },
    {
      name: "Mang Chủng",
      author: "Âm Khuyết Thi Thính",
      pathMusic: "assets/songs/song-5.mp3",
      image: "assets/images/song-image-5.png",
    },
    {
      name: "Màu Xanh",
      author: "Trần Tuyết Ngưng",
      pathMusic: "assets/songs/song-6.mp3",
      image: "assets/images/song-image-6.png",
    },
    {
      name: "Road So Far",
      author: "TonyZ",
      pathMusic: "assets/songs/song-7.mp3",
      image: "assets/images/song-image-7.png",
    },
    {
      name: "Sunburt",
      author: "Tobu",
      pathMusic: "assets/songs/song-8.mp3",
      image: "assets/images/song-image-8.png",
    },
    {
      name: "Mashup The Farat",
      author: "The farat",
      pathMusic: "assets/songs/song-9.mp3",
      image: "assets/images/song-image-9.png",
    },
    {
      name: "Fire works",
      author: "Daoko",
      pathMusic: "assets/songs/song-10.mp3",
      image: "assets/images/song-image-10.png",
    },
    {
      name: "Walk Thru Fire",
      author: "Unknow",
      pathMusic: "assets/songs/song-11.mp3",
      image: "assets/images/song-image-11.png",
    },
    {
      name: "Windfall",
      author: "The farat",
      pathMusic: "assets/songs/song-12.mp3",
      image: "assets/images/song-image-12.png",
    },
  ],
  domElement: {
    audio: document.querySelector("audio"),
    progress: document.querySelector(".playing__progress"),
  },
  getListSongs: function () {
    const listSong = document.querySelector(".music-list");
    let htmls = ``;
    this.songs.forEach((item) => {
      htmls += `
        <div class="list__item">
            <div class="item__image">
                <img src="${item.image}" alt="">
            </div>
            <div class="item__content">
                <h3 class="item__title">${item.name}</h3>
                <p class="item__author">${item.author}</p>
            </div>

        </div>`;
    });
    listSong.innerHTML = htmls;
  },
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  indexRandom: 0,
  isLoop: false,
  loadSong: function () {
    const nameSong = document.querySelector(".playing__name");
    const imageSong = document.querySelector(".playing__image img");

    nameSong.innerHTML = this.songs[this.currentIndex].name;
    imageSong.setAttribute("src", this.songs[this.currentIndex].image);
    this.domElement.audio.setAttribute(
      "src",
      this.songs[this.currentIndex].pathMusic
    );
  },
  getCurrentSong: function () {
    return this.songs[this.currentIndex];
  },
  playEvent: function () {
    const _this = this;
    const btnPlay = document.querySelector("#control-play");
    const audio = this.domElement.audio;
    window.addEventListener("keypress", function (e) {
      e.preventDefault();
      if (e.key === " ") {
        if (!_this.isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    });
    btnPlay.addEventListener("click", function (e) {
      if (!_this.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }

      console.log("playing is ", _this.isPlaying);
    });
    const image = document.querySelector(".playing__image img");
    const animateImage = image.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    animateImage.pause();
    audio.onplay = function () {
      _this.isPlaying = true;
      btnPlay.classList.remove("fa-play");
      btnPlay.classList.add("fa-pause");
      animateImage.play();
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      btnPlay.classList.add("fa-play");
      btnPlay.classList.remove("fa-pause");
      animateImage.pause();
    };
  },
  progressEvent: function () {
    const _this = this;
    const progress = this.domElement.progress;
    const audio = this.domElement.audio;
    const duration = audio.duration;

    const progressUpdate = function () {
      progress.value = (audio.currentTime / duration) * 100;
      if (audio.currentTime === duration) {
        //priority loop
        if (_this.isLoop) {
          //nothing in this code...
          console.log(_this.isLoop);
        } else if (_this.isRandom) {
          do {
            let idxRandom = Math.floor(Math.random() * _this.songs.length);
            _this.indexRandom = idxRandom;
          } while (_this.indexRandom === _this.currentIndex);
          _this.currentIndex = _this.indexRandom;
        } else {
          _this.currentIndex++;
          if (_this.currentIndex >= _this.songs.length) {
            _this.currentIndex = 0;
          }
        }
        _this.loadSong();
        audio.play();
      }
    };
    audio.addEventListener("timeupdate", progressUpdate);

    //SEEK
    progress.oninput = function () {
      audio.removeEventListener("timeupdate", progressUpdate);
      audio.currentTime = (this.value * duration) / 100;
    };
    progress.onchange = function () {
      audio.addEventListener("timeupdate", progressUpdate);
    };
  },
  randomEvent: function () {
    const _this = this;
    const btnRandom = document.querySelector("#control-random");

    btnRandom.addEventListener("click", function (e) {
      _this.isRandom = !_this.isRandom;
      this.classList.toggle("active");
      console.log("random is ", _this.isRandom);
    });
  },
  nextAndPrevEvents: function () {
    const _this = this;
    const btnPrev = document.querySelector("#control-prev");
    const btnNext = document.querySelector("#control-next");

    btnNext.addEventListener("click", function (e) {
      if (_this.isRandom) {
        do {
          let idxRandom = Math.floor(Math.random() * _this.songs.length);
          _this.indexRandom = idxRandom;
        } while (_this.indexRandom === _this.currentIndex);
        _this.currentIndex = _this.indexRandom;
      } else {
        _this.currentIndex++;
        if (_this.currentIndex >= _this.songs.length) {
          _this.currentIndex = 0;
        }
      }

      _this.loadSong();
      if (_this.isPlaying) {
        _this.domElement.audio.play();
      } else {
        _this.domElement.audio.pause();
      }
    });
    btnPrev.addEventListener("click", function (e) {
      if (_this.currentIndex > 0) {
        _this.currentIndex--;
        _this.loadSong();
        if (_this.isPlaying) {
          _this.domElement.audio.play();
        } else {
          _this.domElement.audio.pause();
        }
      }
    });
  },
  loopEvent: function () {
    const _this = this;
    const btnLoop = document.querySelector("#control-loop");

    btnLoop.addEventListener("click", function (e) {
      _this.isLoop = !_this.isLoop;
      btnLoop.classList.toggle("active");
      console.log("loop is ", _this.isLoop);
    });
  },
  selectSongEvent: function () {
    const _this = this;
    const musicList = document.querySelector(".music-list");
    const listItem = musicList.querySelectorAll(".list__item");
    listItem.forEach((item, index) => {
      item.addEventListener("click", function () {
        _this.currentIndex = index;
        _this.loadSong();
        _this.isPlaying = true;
        _this.domElement.audio.play();
      });
    });
  },
  scrollList: function () {
    const image = document.querySelector(".playing__image img");
    let height = image.height;
    let width = image.width;

    window.addEventListener("scroll", function (e) {
      image.style.height = height - document.documentElement.scrollTop + "px";
      image.style.width = width - document.documentElement.scrollTop + "px";
      if (
        document.documentElement.scrollTop >= height ||
        document.documentElement.scrollTop >= width
      ) {
        image.style.height = 0;
        image.style.width = 0;
      }
    });
  },
  run: function () {
    const _this = this;
    this.getListSongs();
    this.loadSong();
    this.playEvent();
    this.domElement.audio.addEventListener("loadedmetadata", function () {
      _this.progressEvent();
    });

    this.nextAndPrevEvents();
    this.randomEvent();
    this.loopEvent();
    this.selectSongEvent();
    _this.scrollList();
  },
};

song.run();
