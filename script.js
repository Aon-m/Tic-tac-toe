// Pick the players
// Create players
const player = (function () {
  let startingScore = 0;

  function human(name, avatar, marker) {
    this.name = name;
    this.avatar = avatar;
    this.score = startingScore;
    this.gainScore = function () {
      startingScore++;
    };
    this.marker = marker || "x";
  }
  function computer(avatar, marker) {
    this.avatar = avatar || "🤖";
    this.score = startingScore;
    this.gainScore = function () {
      startingScore++;
    };
    this.marker = marker || "o";
  }
  return {
    human,
    computer,
  };
})();

// Play Game
// Create Game

const startGame = (function () {
  let gameboard = Array(9).fill(undefined);

  function playGame(player1, player2) {
    let turn = 0;

    while (gameboard.includes(undefined)) {
      if (turn >= 4) {
        const winner = winCheck();
        if (winner) {
          alert(`${winner} wins!`);
          break;
        } else if (winner === "draw") {
          alert("draw");
          break;
        }
      }

      let currentTurn = nextTurn();

      switch (currentTurn) {
        case "player1":
          enterMarker(player1.marker, player1.position);
          break;
        case "player2":
          enterMarker(player2.marker, player2.position);
          break;
      }
    }

    function enterMarker(marker, position) {
      let arrayPosition = Number(position) - 1;
      if (gameboard[arrayPosition]) return;
      if (!gameboard[arrayPosition]) {
        gameboard[arrayPosition] = marker;
      }
    }

    function winCheck() {
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

    function nextTurn() {
      const turns = ["player1", "player2"];

      const currentTurn = turns[turn % 2];
      turn++;
      return currentTurn;
    }
  }

  function PvP(player1, player2, marker1, marker2, avatar1, avatar2) {
    player1.marker = marker1;
    player2.marker = marker2;

    player1.avatar = avatar1;
    player2.avatar = avatar2;

    playGame(player1, player2);
  }
  function PvE(player1, marker1, marker2, avatar1, avatar2) {
    let computer = player.computer(avatar2, marker2);
    player1.marker = marker1;
    player1.avatar = avatar1;

    playGame(player1, computer);
  }
  return {
    PvP,
    PvE,
  };
})();
