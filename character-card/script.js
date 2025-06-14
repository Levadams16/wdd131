const character = {
      name: "Blazetongue",
      class: "Infernal Warden",
      level: 5,
      health: 100,
      image: 'frog_breathing_fire.png',
      attacked() {
        if (this.health >= 20) {
          this.level -= 1;
          this.health -= 20;
        } else {
            alert('Character Died');
        }
      },
      levelUp() {
        this.level += 1;
        this.health += 20;
      }
    };

const nameDiv = document.querySelector(".name");
const classSpan = document.getElementById("class");
const levelSpan = document.getElementById("level");
const healthSpan = document.getElementById("health");
const logId = document.getElementById("log");

const attackedButton = document.getElementById("attacked");
const levelUpButton = document.getElementById("levelup");

function updateCard() {
  nameDiv.textContent = character.name;
  classSpan.textContent = character.class;
  levelSpan.textContent = character.level;
  healthSpan.textContent = character.health;
}

attackedButton.addEventListener("click", () => {
  character.attacked();
  updateCard();
  logId.textContent = `Oh no! ${character.name} got attacked!`;
});

levelUpButton.addEventListener("click", () => {
  character.levelUp();
  updateCard();
  logId.textContent = `Oh yeah! ${character.name} leveled up!`;
})

updateCard();