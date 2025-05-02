const themeSelector = document.querySelector('#mode-select');
const logo = document.querySelector(".logo")

function changeTheme() {
  if (themeSelector.value === "dark") {
    document.body.classList.add("dark");
    logo.src = "images/byui-logo_white.png";
  }
  else {
    document.body.classList.remove("dark");
    logo.src = "images/byui-logo_blue.webp";
  }
}

themeSelector.addEventListener("change", changeTheme);
changeTheme();

themeSelector.addEventListener('change', changeTheme);

document.addEventListener('DOMContentLoaded', () => {
    const missionEl = document.getElementById('mission');
    const readBtn   = document.getElementById('read-btn');
  
    if (!('speechSynthesis' in window)) {
      readBtn.disabled = true;
      readBtn.textContent = '🛑 Speech Not Supported';
      return;
    }
  
    readBtn.addEventListener('click', () => {
      const utterance = new SpeechSynthesisUtterance(missionEl.textContent);
  
      utterance.rate  = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
  
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        const en = voices.find(v => v.lang.startsWith('en'));
        if (en) utterance.voice = en;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        const en = window.speechSynthesis.getVoices()
                     .find(v => v.lang.startsWith('en'));
        if (en) utterance.voice = en;
      };
  
      window.speechSynthesis.speak(utterance);
    });
  });  