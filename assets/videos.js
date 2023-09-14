const dom_videos = document.querySelector('#videos');

const videos = [];

function generateVideoTemplate(video) {
  console.log(video);
  const tmpl = `
    <div class="video-item">
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

function generateCategoryTemplate(category) {

  let tmpl = `
    <div class="category">
      <h2 id="${category.title}">${category.title}</h2>
      <div class="videos flex flex-row">`;
  for (let video of category.videos) {
    if (video.type !== "conference") {
      tmpl += generateVideoTemplate2(video);
    }
  }
  tmpl += "</div></div>"

  const range = document.createRange();
  const fragment = range.createContextualFragment(tmpl);

  return fragment;
}

function generateVideoTemplate2(video) {
  console.log(video);
  const tmpl = `
    <a href="https://www.youtube.com/watch?v=${video.youtubeId}" class="video-item flex flex-column" target="_blank" title="${video.title}">
      <div class="video-thumbnail">
        <div class="video-duration">${video.duration}</div>
        <img src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="${video.title} thumbnail" />
      </div>
      <div class="video-details flex flex-column flex-1">
        <h4 class="video-title">${video.title}</h4>
        <div class="flex flex-row justify-content-space-between video-description">
          <div class="event-name">${video.event.name}</div>
          <div>${video.date}</div>
        </div>
      </div>
    </a>`;

  return tmpl;
}

async function getVideos2() {
  const raw_data = await fetch('assets/data/videos2.json');
  const data = await raw_data.json();

  if (data) {
    for (let category of data) {
      if (category.display !== "undefined" && category.display !== false) {
        dom_videos.insertBefore(generateCategoryTemplate(category), dom_videos.lastChild);
      }
    }
  }
}

(async function () { // async function expression used as an IIFE
  getVideos2()
})();