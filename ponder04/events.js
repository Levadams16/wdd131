function newTask() {
    const listElement = document.querySelector('#todos');
    const task = document.querySelector('#todo').value;

  listElement.innerHTML += `
    <li> ${task}
        <div>
            <span data-function="delete" tabindex="0" role="button" aria-label="Delete task">❎</span>
            <span data-function="complete" tabindex="0" role="button" aria-label="Delete task">✅</span>
        </div>
    </li>`;
}

function manageTasks(e) {
    console.log(e);

  const parent = e.target.closest("li");
  if (e.target.getAttribute("data-function") === "delete") {
    parent.remove();
  }
  if (e.target.getAttribute("data-function") === "complete") {
    parent.classList.toggle("strike");
  }
}

document.querySelector('#submitTask').addEventListener('click', newTask);
document.querySelector('#todos').addEventListener('click', manageTasks);