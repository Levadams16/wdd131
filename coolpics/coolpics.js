const menuButton = document.querySelector(".menu-button");

function toggleMenu() {
    const links = document.querySelectorAll(".links");
    links.forEach(link => link.classList.toggle("hide"));
}

menuButton.addEventListener("click", toggleMenu);

const gallery = document.querySelector('.gallery');

const modal = document.createElement('dialog');
modal.classList.add('image-modal');
modal.innerHTML = `
  <img>
  <button class="close-viewer">X</button>
`;
document.body.appendChild(modal);

const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

gallery.addEventListener('click', (event) => {
  const clickedImg = event.target.closest('img');

  if (clickedImg) {
    const smallSrc = clickedImg.getAttribute('src');
    const fullSrc = smallSrc.split('-')[0] + '-full.jpeg';

    modalImage.setAttribute('src', fullSrc);
    modalImage.setAttribute('alt', clickedImg.getAttribute('alt'));

    modal.showModal();
  }
});

closeButton.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});