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
  
      // fine-tune if you like:
      utterance.rate  = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
  
      // pick an English voice (if available)
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        const en = voices.find(v => v.lang.startsWith('en'));
        if (en) utterance.voice = en;
      }
      // some browsers fire voiceschanged after page load:
      window.speechSynthesis.onvoiceschanged = () => {
        const en = window.speechSynthesis.getVoices()
                     .find(v => v.lang.startsWith('en'));
        if (en) utterance.voice = en;
      };
  
      window.speechSynthesis.speak(utterance);
    });
  });  