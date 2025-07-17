document.addEventListener('DOMContentLoaded', function() {
    loadStory();
});

function loadStory() {
    try {
        const storyData = sessionStorage.getItem('currentStory');
        
        if (storyData) {
            const story = JSON.parse(storyData);
            displayStory(story);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Error loading story:', error);
        showError();
    }
}

function displayStory(story) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('story-title').textContent = story.title;
    document.getElementById('story-genre').textContent = story.genre;
    document.getElementById('story-date').textContent = `Created: ${story.dateCreated}`;
    document.getElementById('story-content').innerHTML = story.description;
    document.getElementById('story-display').style.display = 'block';

    document.title = `${story.title} - Art Blog`;
}

function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

function goBack() {
    if (window.opener) {
        window.close();
    } else {
        window.history.back();
    }
}

function printStory() {
    window.print();
}

window.addEventListener('message', function(event) {
    if (event.data && event.data.title) {
        displayStory(event.data);
    }
});