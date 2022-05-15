const dom_videos = document.querySelector('#videos');

const videos = [];

function generateVideoTemplate(video) {
    console.log(video);
    const tmpl = `
    <div class="video-container">
      <a href="https://www.youtube.com/watch?v=${video.youtubeId}" class="video flex flex-column" target="_blank" title="${video.title}">
        <div class="video-thumbnail">
          <img src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="${video.title} thumbnail" />
        </div>
        <div class="video-title">${video.title}</div>
        <p class="video-description">${video.duration}<span>•</span>${video.event.name}</p>
      </a>
    </div>`;

    const range = document.createRange();
    const fragment = range.createContextualFragment(tmpl);

    return fragment;
}

async function getVideos() {
    const raw_data = await fetch('assets/data/videos.json');
    const data = await raw_data.json();

    if (data) {
        for (let video of data) {
            if (video.type !== "conference") {
                dom_videos.insertBefore(generateVideoTemplate(video), dom_videos.lastChild);
            }
        }
    }
}

(async function () { // async function expression used as an IIFE
    getVideos()
})();