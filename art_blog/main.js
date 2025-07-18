let quill;

document.addEventListener('DOMContentLoaded', function() {
    quill = new Quill('#editor-container', {
        theme: 'snow',
        placeholder: 'Write your story description here...',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'header': [1, 2, 3, false] }],
            ]
        }
    });

    const toolbar = quill.getModule('toolbar').container;
    toolbar.querySelector('.ql-bold')?.setAttribute('aria-label', 'Bold');
    toolbar.querySelector('.ql-italic')?.setAttribute('aria-label', 'Italic');
    toolbar.querySelector('.ql-underline')?.setAttribute('aria-label', 'Underline');
    toolbar.querySelector('.ql-link')?.setAttribute('aria-label', 'Insert Link');
    toolbar.querySelector('.ql-image')?.setAttribute('aria-label', 'Insert Image');
    toolbar.querySelector('.ql-list[value="ordered"]')?.setAttribute('aria-label', 'Ordered List');
    toolbar.querySelector('.ql-list[value="bullet"]')?.setAttribute('aria-label', 'Bullet List');
    toolbar.querySelector('.ql-picker-label')?.setAttribute('aria-label', 'Font Type Menu');

    quill.on('text-change', function() {
        var text = quill.getText().trim();
        var words = text.split(/\s+/).filter(word => word.length > 0);

        var wordCount = words.length;
        document.getElementById('word-count').textContent = wordCount;
    });

    document.getElementById('submit').addEventListener('click', function(e) {
        e.preventDefault();
        submitStory();
    });

    document.getElementById('title').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitStory();
        }
    });

    document.getElementById('back_to_top').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    loadSavedStories();
});

function checkGenre(selectElement) {
    if (selectElement.value === 'default') {
        alert('Bruh you got to choose a genre at least.');
    }

    if (selectElement.value === 'news') {
        alert('Make sure the news is accurate!');
    }

    if (selectElement.value === 'sports') {
        alert('Make sure the sports are entertaining!');
    }

    if (selectElement.value === 'family') {
        alert('Make sure that it follows the Family Proclamation!');
    }

    if (selectElement.value === 'art') {
        alert('Make sure that the art is captivating!');
    }
}

function submitStory() {
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value;
    const description = quill.root.innerHTML;
    const plainTextDescription = quill.getText().trim();

    if (!title) {
        alert('Please enter a title for your story.');
        document.getElementById('title').focus();
        return;
    }

    if (genre === 'default') {
        alert('Please select a genre for your story.');
        document.getElementById('genre').focus();
        return;
    }

    if (!plainTextDescription || plainTextDescription.length < 10) {
        alert('Please enter a description with at least 10 characters.');
        quill.focus();
        return;
    }

    const story = {
        id: Date.now(),
        title: title,
        genre: genre,
        description: description,
        plainText: plainTextDescription,
        dateCreated: new Date().toLocaleDateString()
    };

    saveStory(story);

    const storyWindow = window.open('story_display.html', '_blank');

    storyWindow.addEventListener('load', function() {
        storyWindow.postMessage(story, '*');
    });

    sessionStorage.setItem('currentStory', JSON.stringify(story));

    clearForm();

    loadSavedStories();
}

function saveStory(story) {
    let savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
    
    savedStories.unshift(story);

    if (savedStories.length > 10) {
        savedStories = savedStories.slice(0, 10);
    }

    localStorage.setItem('savedStories', JSON.stringify(savedStories));
}

function loadSavedStories() {
    const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
    const savedStoriesDiv = document.getElementById('saved_stories');

    const h2 = savedStoriesDiv.querySelector('h2');
    savedStoriesDiv.innerHTML = '';
    savedStoriesDiv.appendChild(h2);
    
    if (savedStories.length === 0) {
        const noStoriesMsg = document.createElement('p');
        noStoriesMsg.textContent = 'No saved stories yet. Create your first story above!';
        noStoriesMsg.style.fontStyle = 'italic';
        noStoriesMsg.style.color = '#666';
        savedStoriesDiv.appendChild(noStoriesMsg);
        return;
    }

    savedStories.forEach(story => {
        const storyLink = document.createElement('div');
        storyLink.className = 'saved-story-item';
        storyLink.innerHTML = `
            <h3><a href="#" onclick="viewStory(${story.id}); return false;">${story.title}</h3>
            <button onclick="deleteStory(${story.id})" class="delete-btn">Delete</button>
        `;
        savedStoriesDiv.appendChild(storyLink);
    });
}

function viewStory(storyId) {
    const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
    const story = savedStories.find(s => s.id === storyId);
    
    if (story) {
        sessionStorage.setItem('currentStory', JSON.stringify(story));

        window.open('story_display.html', '_blank');
    }
}

function deleteStory(storyId) {
    if (confirm('Are you sure you want to delete this story?')) {
        let savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
        savedStories = savedStories.filter(s => s.id !== storyId);
        localStorage.setItem('savedStories', JSON.stringify(savedStories));
        loadSavedStories();
    }
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('genre').value = 'default';
    quill.setContents([]);
}