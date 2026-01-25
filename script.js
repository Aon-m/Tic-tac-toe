// TIC TAC TOE LOGIC
// CREATE PLAYERS

const player = (function () {
  let startingScore = 0;

  function human(name, avatar, marker) {
    this.name = name;
    this.avatar = avatar;
    this.score = startingScore;
    this.gainScore = function () {
      this.score++;
    };
    this.marker = marker || "x";
    this.isComputer = false;
  }
  function computer(avatar, marker) {
    this.avatar = avatar || "🤖";
    this.score = startingScore;
    this.gainScore = function () {
      this.score++;
    };
    this.marker = marker || "o";
    this.isComputer = true;
  }
  return {
    human,
    computer,
  };
})();

// CREATE GAME

const createGame = (function () {
  function playGame(player1, player2) {
    let gameboard = Array(9).fill(undefined);

    let gameActive = true;
    let turn = 0;

    // Human Turn
    const squares = document.querySelectorAll(".gameboard__button");

    squares.forEach((square, index) => {
      square.addEventListener("click", (e) => {
        if (!gameActive) return;

        if (gameboard[index]) return;

        const currentPlayer = turn % 2 === 0 ? player1 : player2;

        if (currentPlayer.isComputer) return;

        humanTurn(index, currentPlayer.marker);
        turn++;
        computerTurn();
      });
    });
    computerTurn();
    function humanTurn(index, marker) {
      placeMarker(index, marker);
    }

    function placeMarker(index, marker) {
      if (gameboard[index]) return;
      gameboard[index] = marker;
      squares[index].textContent = marker;
      winCheck();
    }

    function computerTurn() {
      if (!gameActive) return;

      const currentPlayer = turn % 2 === 0 ? player1 : player2;

      if (!currentPlayer.isComputer) return;

      const availableSquares = gameboard
        .map((square, index) => (square === undefined ? index : null))
        .filter((index) => index !== null);

      if (availableSquares.length === 0) return;

      const randomIndex =
        availableSquares[Math.floor(Math.random() * availableSquares.length)];

      setTimeout(() => {
        placeMarker(randomIndex, currentPlayer.marker);
        turn++;

        computerTurn();
      }, 300);
    }

    function winStatus() {
      const wins = [
        [0, 1, 2], // row 1
        [3, 4, 5], // row 2
        [6, 7, 8], // row 3
        [0, 3, 6], // col 1
        [1, 4, 7], // col 2
        [2, 5, 8], // col 3
        [0, 4, 8], // diagonal
        [2, 4, 6], // diagonal
      ];

      for (const [a, b, c] of wins) {
        if (
          gameboard[a] &&
          gameboard[a] === gameboard[b] &&
          gameboard[a] === gameboard[c]
        ) {
          return gameboard[a];
        }
      }

      if (!gameboard.includes(undefined) && gameboard.length == 9)
        return "draw";

      return false;
    }

    function winCheck() {
      const winner = winStatus();

      if (winner === "draw") {
        setTimeout(() => {
          alert("draw");
        }, 300);
      } else if (winner) {
        gameActive = false;
        setTimeout(() => {
          alert(`${winner} wins!`);
        }, 200);

        setTimeout(() => {
          clearGameboard();
        }, 300);
      }
    }

    function clearGameboard() {
      gameboard = Array(9).fill(undefined);
      squares.forEach((square) => (square.textContent = ""));
      turn = 0;
      gameActive = false;
      domGameboard.hide();
    }
  }

  const domGameboard = (function () {
    const selectionScreen = document.querySelector(
        ".character-selection-screen",
      ),
      gameboardScreen = document.querySelector(".gameboard-screen");

    function show() {
      selectionScreen.style.display = "none";
      gameboardScreen.style.display = "flex";
    }

    function hide() {
      selectionScreen.style.display = "flex";
      gameboardScreen.style.display = "none";
    }
    return {
      show,
      hide,
    };
  })();

  function PvP(name1, name2, marker1, marker2, avatar1, avatar2) {
    let player1 = new player.human(name1, avatar1, marker1);
    let player2 = new player.human(name2, avatar2, marker2);

    playGame(player1, player2);
  }

  function PvE(name1, marker1, marker2, avatar1, avatar2) {
    let humanPlayer = new player.human(name1, avatar1, marker1);
    let computer = new player.computer(avatar2, marker2);

    playGame(humanPlayer, computer);
  }
  function EvE(marker1, marker2, avatar1, avatar2) {
    let computer1 = new player.computer(avatar1, marker1);
    let computer2 = new player.computer(avatar2, marker2);

    playGame(computer1, computer2);
  }
  function EvP(name2, marker1, marker2, avatar1, avatar2) {
    let computer = new player.computer(avatar1, marker1);
    let playerHuman = new player.human(name2, avatar2, marker2);

    playGame(computer, playerHuman);
  }

  return {
    PvP,
    PvE,
    EvE,
    EvP,
    domGameboard,
  };
})();

// SELECT MARKER
const marker = (function changeMarker() {
  let currentMarker = "x",
    otherMarker = "o";

  const domMarker1 = document.querySelector("#marker-1");
  const domMarker2 = document.querySelector("#marker-2");

  function swap() {
    [currentMarker, otherMarker] = [otherMarker, currentMarker];

    domMarker1.textContent = currentMarker;
    domMarker2.textContent = otherMarker;
  }

  function status() {
    let marker1 = domMarker1.textContent,
      marker2 = domMarker2.textContent;

    return {
      marker1,
      marker2,
    };
  }

  return {
    swap,
    status,
  };
})();

const chosenMarker = document.querySelectorAll(".marker");

chosenMarker.forEach((btn) => {
  btn.addEventListener("click", marker.swap);
});

// CHANGE CHARACTER

const move1 = (function () {
  let currentIndex = 0;

  // Elements
  const currentPreview1 = document.querySelector("#current-preview-1"),
    previousPreview1 = document.querySelector("#previous-preview-1"),
    nextPreview1 = document.querySelector("#next-preview-1");

  // Data arrays
  const previousPreviews = [
    "./characters/human/character-human-7.png",
    "./characters/human/character-human-1.png",
    "./characters/human/character-human-2.png",
    "./characters/human/character-human-3.png",
    "./characters/human/character-human-4.png",
    "./characters/human/character-human-5.png",
    "./characters/human/character-human-6.png",
  ];
  const currentPreviews = [
    "./characters/human/character-human-1.png",
    "./characters/human/character-human-2.png",
    "./characters/human/character-human-3.png",
    "./characters/human/character-human-4.png",
    "./characters/human/character-human-5.png",
    "./characters/human/character-human-6.png",
    "./characters/human/character-human-7.png",
  ];
  const nextPreviews = [
    "./characters/human/character-human-2.png",
    "./characters/human/character-human-3.png",
    "./characters/human/character-human-4.png",
    "./characters/human/character-human-5.png",
    "./characters/human/character-human-6.png",
    "./characters/human/character-human-7.png",
    "./characters/human/character-human-1.png",
  ];

  // Internal function to update content
  function update() {
    previousPreview1.src = previousPreviews[currentIndex];
    currentPreview1.src = currentPreviews[currentIndex];
    nextPreview1.src = nextPreviews[currentIndex];
  }

  // Move forward
  function goForward() {
    currentIndex = (currentIndex + 1) % currentPreviews.length;
    update();
  }

  // Move back
  function goBack() {
    currentIndex =
      (currentIndex - 1 + currentPreviews.length) % currentPreviews.length;
    update();
  }

  // Initialize first slide
  update();

  return {
    next: goForward,
    prev: goBack,
  };
})();
const move2 = (function () {
  let currentIndex = 0;

  // Elements
  const currentPreview2 = document.querySelector("#current-preview-2"),
    previousPreview2 = document.querySelector("#previous-preview-2"),
    nextPreview2 = document.querySelector("#next-preview-2");

  // Data arrays
  const previousPreviews = [
    "./characters/human/character-human-7.png",
    "./characters/human/character-human-1.png",
    "./characters/human/character-human-2.png",
    "./characters/human/character-human-3.png",
    "./characters/human/character-human-4.png",
    "./characters/human/character-human-5.png",
    "./characters/human/character-human-6.png",
  ];
  const currentPreviews = [
    "./characters/human/character-human-1.png",
    "./characters/human/character-human-2.png",
    "./characters/human/character-human-3.png",
    "./characters/human/character-human-4.png",
    "./characters/human/character-human-5.png",
    "./characters/human/character-human-6.png",
    "./characters/human/character-human-7.png",
  ];
  const nextPreviews = [
    "./characters/human/character-human-2.png",
    "./characters/human/character-human-3.png",
    "./characters/human/character-human-4.png",
    "./characters/human/character-human-5.png",
    "./characters/human/character-human-6.png",
    "./characters/human/character-human-7.png",
    "./characters/human/character-human-1.png",
  ];

  // Internal function to update content
  function update() {
    previousPreview2.src = previousPreviews[currentIndex];
    currentPreview2.src = currentPreviews[currentIndex];
    nextPreview2.src = nextPreviews[currentIndex];
  }

  // Move forward
  function goForward() {
    currentIndex = (currentIndex + 1) % currentPreviews.length;
    update();
  }

  // Move back
  function goBack() {
    currentIndex =
      (currentIndex - 1 + currentPreviews.length) % currentPreviews.length;
    update();
  }

  // Initialize first slide
  update();

  return {
    next: goForward,
    prev: goBack,
  };
})();

const fowardBtn1 = document.querySelector("#forward-1");
const fowardBtn2 = document.querySelector("#forward-2");
const backBtn1 = document.querySelector("#back-1");
const backBtn2 = document.querySelector("#back-2");

fowardBtn1.addEventListener("click", move1.next);
backBtn1.addEventListener("click", move1.prev);
fowardBtn2.addEventListener("click", move2.next);
backBtn2.addEventListener("click", move2.prev);

// SELECT CHARACTER

const playerBtn = document.querySelectorAll(".card__button--player");

const humanBtn1 = document.querySelector("#human-1");
const computerBtn1 = document.querySelector("#computer-1");
const humanBtn2 = document.querySelector("#human-2");
const computerBtn2 = document.querySelector("#computer-2");

playerBtn.forEach((btn) => btn.addEventListener("click", (e) => {}));

humanBtn1.addEventListener("click", (e) => {
  domPlayer.select(humanBtn1, computerBtn1, e);
});
computerBtn1.addEventListener("click", (e) => {
  domPlayer.select(humanBtn1, computerBtn1, e);
});
humanBtn2.addEventListener("click", (e) => {
  domPlayer.select(humanBtn2, computerBtn2, e);
});
computerBtn2.addEventListener("click", (e) => {
  domPlayer.select(humanBtn2, computerBtn2, e);
});

const domPlayer = (function () {
  function select(element1, element2, e) {
    let btn = e.currentTarget;

    if (btn.classList.contains("card__button--selected")) return;

    element1.classList.remove("card__button--selected");
    element2.classList.remove("card__button--selected");

    btn.classList.add("card__button--selected");
  }

  function mode() {
    const playerBtn = document.querySelectorAll(".card__button--player");

    let players = [];

    playerBtn.forEach((btn) => {
      if (btn.classList.contains("card__button--selected")) {
        players.push(btn.id);
      }
    });

    let player1 = players[0],
      player2 = players[1];

    switch (true) {
      case player1.includes("human") && player2.includes("human"):
        return "PvP";

      case player1.includes("computer") && player2.includes("computer"):
        return "EvE";

      case player1.includes("human") && player2.includes("computer"):
        return "PvE";

      case player1.includes("computer") && player2.includes("human"):
        return "EvP";

      default:
        alert("No mode was selected??!");
        break;
    }
  }

  return {
    select,
    mode,
  };
})();

// SELECT NAME
const playerName1 = document.querySelector("#player-name-1"),
  playerName2 = document.querySelector("#player-name-2");

const playerName = (function () {
  let name1, name2;

  function get(e) {
    let input = e.currentTarget;
    switch (true) {
      case input.id.includes("1"):
        name1 = input.value;
        return name1;

      case input.id.includes("2"):
        name2 = input.value;
        return name2;
    }
  }

  function status() {
    return {
      name1,
      name2,
    };
  }

  return {
    get,
    status,
  };
})();

playerName1.addEventListener("input", playerName.get);
playerName2.addEventListener("input", playerName.get);

// START GAME

function startGame() {
  let { name1, name2 } = playerName.status();
  let { marker1, marker2 } = marker.status();
  let mode = domPlayer.mode();

  createGame.domGameboard.show();

  switch (mode) {
    case "PvP":
      createGame.PvP(name1, name2, marker1, marker2, "Hi", "Hi");
      break;

    case "PvE":
      createGame.PvE(name1, marker1, marker2, "Hi", "Hi");
      break;

    case "EvE":
      createGame.EvE(marker1, marker2, "Hi", "Hi");
      break;

    case "EvP":
      createGame.EvP(name2, marker1, marker2, "Hi", "Hi");
      break;
  }
}

const startGameBtn = document.querySelector("#start-button");

startGameBtn.addEventListener("click", startGame);

// GAMEBOARD
// CLICKING SQUARES
