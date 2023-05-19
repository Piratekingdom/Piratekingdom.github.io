class PirateKingdom 

{
  constructor() {
    this.year = 1700;
    this.pirates = 50;
    this.boats = 5;
    this.cannons = 25;
    this.fish = 150;
    this.doubloons = 25;
    this.events = ["disease", "kraken", "storms"];
    this.boatCost = 100; // Added cost to build a boat
    this.piratesFishing = 0; // Initialize piratesFishing
    this.piratesTreasureHunting = 0; // Initialize piratesTreasureHunting
    this.piratesBuildingBoats = 0; // Initialize piratesBuildingBoats
    this.prices = {
      fish: Math.floor(Math.random() * 6) + 5,
      boats: Math.floor(Math.random() * 100) + 200,
      cannons: Math.floor(Math.random() * 20) + 40,
    };
    this.royalNavyDifficultyModifier = 1;
  }

  advanceYear() {
    // Check if enough fish to feed pirates
    if (this.fish >= this.pirates * 5) {
      this.fish -= this.pirates * 5;
    } else {
      // Pirates die due to lack of food
      const piratesToDie = this.pirates - Math.floor(this.fish / 5);
      this.pirates -= piratesToDie;
      this.fish = 0;

      // Check if more than 50% pirates died, if so, game over
      if (piratesToDie > this.pirates) {
        this.gameOver();
        return;
      }
    }

    // Pirates go fishing
    this.fish += this.piratesFishing * (Math.floor(Math.random() * 3) + 1);

    // Pirates go treasure hunting
    if (this.piratesTreasureHunting >= 5) {
      this.doubloons += this.piratesTreasureHunting * (Math.floor(Math.random() * 6) + 5);
    }

    // Pirates build boats
    if (this.piratesBuildingBoats >= 10) {
      const numBoats = Math.floor(this.piratesBuildingBoats / 10);
      const boatCost = numBoats * this.boatCost;
      if (this.doubloons >= boatCost) {
        this.doubloons -= boatCost;
        this.boats += numBoats;
      }
    }
    this.pirates += this.piratesFishing + this.piratesTreasureHunting + this.piratesBuildingBoats;
    this.piratesFishing = 0;
    this.piratesTreasureHunting = 0;
    this.piratesBuildingBoats = 0;

    // Random event
    const randomEvent = this.events[Math.floor(Math.random() * this.events.length)];
    this.handleRandomEvent(randomEvent);

    // Update game state
    this.year++;

    // Add new pirates
    this.pirates += Math.floor(Math.random() * 10) + 1;
  }

  assignPirates(job, numPirates) {
    if (numPirates <= this.pirates) {
      this.pirates -= numPirates;

      switch (job) {
        case 'fishing':
          this.piratesFishing += numPirates;
          break;
        case 'treasureHunting':
          this.piratesTreasureHunting += numPirates;
          break;
        case 'buildingBoats':
          this.piratesBuildingBoats += numPirates;
          break;
      }
    }
  }



  battle(opponent) {
    const battleResult = Math.random() > 0.5;

    if (opponent === "finalBoss") {
        if(this.boats >= 10 && this.cannons >= 50 && this.pirates >= 100){
                this.winGame();
        }else{
            this.gameOver();
        }
//      if (battleResult) {
//        this.winGame();
//      } else {
//        this.gameOver();
    } else if (opponent === "royalNavy") {
      if (battleResult) {
        this.pirates += Math.floor(Math.random() * 10) + 1;
        this.fish += Math.floor(Math.random() * 50) + 50;
        this.doubloons += Math.floor(Math.random() * 25) + 25;
        this.royalNavyDifficultyModifier += 0.1;
      } else {
        this.pirates -= Math.floor(Math.random() * this.pirates * 0.2 * this.royalNavyDifficultyModifier);
        this.boats -= Math.floor(Math.random() * this.boats * 0.2 * this.royalNavyDifficultyModifier);
        this.cannons -= Math.floor(Math.random() * this.cannons * 0.2 * this.royalNavyDifficultyModifier);
        this.fish -= Math.floor(Math.random() * this.fish * 0.2 * this.royalNavyDifficultyModifier);
      }
    }
  }

market(action, item, quantity) {
  if (action === "buy") {
    switch (item) {
      case "fish":
        if (this.doubloons >= this.prices.fish * quantity) {
          this.doubloons -= this.prices.fish * quantity;
          this.fish += quantity;
        }
        break;
      case "boats":
        if (this.doubloons >= this.prices.boats * quantity) {
          this.doubloons -= this.prices.boats * quantity;
          this.boats += quantity;
        }
        break;
      case "cannons":
        if (this.doubloons >= this.prices.cannons * quantity) {
          this.doubloons -= this.prices.cannons * quantity;
          this.cannons += quantity;
        }
        break;
    }
  } else if (action === "sell") {
    switch (item) {
      case "fish":
        if (this.fish >= quantity) {
          this.doubloons += this.prices.fish * quantity;
          this.fish -= quantity;
        }
        break;
      case "boats":
        if (this.boats >= quantity) {
          this.doubloons += this.prices.boats * quantity;
          this.boats -= quantity;
        }
        break;
      case "cannons":
        if (this.cannons >= quantity) {
          this.doubloons += this.prices.cannons * quantity;
          this.cannons -= quantity;
        }
        break;
    }
  }
}


  handleRandomEvent(event) {
    switch (event) {
      case "disease":
        this.pirates -= Math.floor(this.pirates * 0.1);
        break;
      case "kraken":
        this.boats -= Math.floor(this.boats * 0.1);
        break;
      case "storms":
        this.fish -= Math.floor(this.fish * 0.1);
        break;
    }
  }

  gameOver() {
    // Reset game state
    this.year = 1700;
    this.pirates = 50;
    this.boats = 5;
    this.cannons = 25;
    this.fish = 150;
    this.doubloons = 25;
    alert("Game Over! You have been thrown overboard!");
  }

  winGame() {
    alert("Congratulations! You have defeated the final boss and become the Pirate Lord!");
    this.saveScore(this.year);
    this.showLeaderboard();
  }

  saveScore(score) {
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.push(score);
    scores.sort((a, b) => a - b);
    localStorage.setItem("leaderboard", JSON.stringify(scores));
  }

  showLeaderboard() {
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardText = "Leaderboard:\n";
    scores.forEach((score, index) => {
      leaderboardText += `${index + 1}. ${score}\n`;
    });
    alert(leaderboardText);
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const game = new PirateKingdom();

  const updateUI = () => {
    document.querySelector("#year").textContent = game.year;
    document.querySelector("#pirates").textContent = game.pirates;
    document.querySelector("#boats").textContent = game.boats;
    document.querySelector("#cannons").textContent = game.cannons;
    document.querySelector("#fish").textContent = game.fish;
    document.querySelector("#doubloons").textContent = game.doubloons;
    
  };
const updateMarketPrices = () => {
  game.prices = {
      fish: Math.floor(Math.random() * 6) + 5,
      boats: Math.floor(Math.random() * 100) + 200,
      cannons: Math.floor(Math.random() * 20) + 40,
    };
  document.querySelector("#price-fish").textContent = game.prices.fish;
  document.querySelector("#price-boats").textContent = game.prices.boats;
  document.querySelector("#price-cannons").textContent = game.prices.cannons;
};





// Other event listeners for buttons

  // Add event listeners and game logic
  document.querySelector("#advance-year").addEventListener("click", () => {
    game.advanceYear();
    updateUI();
    updateMarketPrices();
  });
  document.querySelector("#assign-pirates").addEventListener("click", () => {
    const job = document.querySelector("#job").value;
    const numPirates = parseInt(document.querySelector("#num-pirates").value, 10);
    game.assignPirates(job, numPirates);
    updateUI();
  });
  document.querySelector("#battle-royal-navy").addEventListener("click", () => {
    game.battle("royalNavy");
    updateUI();
  });
  document.querySelector("#challenge-final-boss").addEventListener("click", () => {
    game.battle("finalBoss");
    updateUI();
  });
document.querySelector("#buy").addEventListener("click", () => {
  const item = document.querySelector("#item").value;
  const quantity = parseInt(document.querySelector("#quantity").value, 10);
  game.market("buy", item, quantity);
  updateUI();
});
document.querySelector("#sell").addEventListener("click", () => {
  const item = document.querySelector("#item").value;
  const quantity = parseInt(document.querySelector("#quantity").value, 10);
  game.market("sell", item, quantity);
  updateUI();
  
});

const buttons = document.querySelectorAll("button");
const clickSound = document.getElementById("click-sound");
const muteUnmuteBtn = document.getElementById("mute-unmute");

let isMuted = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isMuted) {
      clickSound.play();
    }
  });
});

muteUnmuteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  muteUnmuteBtn.textContent = isMuted ? "Unmute" : "Mute";
});

updateUI();
updateMarketPrices();

});
