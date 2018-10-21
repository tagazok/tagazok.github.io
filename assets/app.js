document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded and parsed");
  const dom_conferences = document.querySelector('#conferences');
  const dom_nextConferences = document.querySelector('#next-conferences');
  const dom_btn_moreconferences = document.querySelector('#more-conferences');
  const dom_videos = document.querySelector('#videos');

  fetch('assets/data/conferences.json')
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      if (data) {
        const currentDate = new Date().getTime();

        for (let conference of data) {
          const d = new Date(conference.date).getTime();
          if (d > currentDate) {
            dom_nextConferences.insertBefore(generateConferenceTemplate(conference, false), dom_nextConferences.lastChild);
          } else {
            dom_conferences.insertBefore(generateConferenceTemplate(conference), dom_conferences.lastChild);
          }
        }
      }
    });

    fetch('assets/data/videos.json')
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      if (data) {

        for (let video of data) {
          dom_videos.insertBefore(generateVideoTemplate(video), dom_videos.lastChild);
        }
      }
    });

  dom_btn_moreconferences.addEventListener('click', event => {
    console.log("View more conferences");
    document.querySelector('.conferences__overlay').remove();
    dom_btn_moreconferences.remove();
    dom_conferences.classList.remove("conferences--small");
  });

  function generateVideoTemplate(video) {
    console.log(video);
    const tmpl = `
    <div>
      <a href="https://www.youtube.com/watch?v=${video.youtubeId}" class="video flex flex-column" target="_blank">
        <img src="https://img.youtube.com/vi/${video.youtubeId}/0.jpg" alt="${video.title} thumbnail" />
        <div class="video-title">${video.title}</div>
        <p class="video-description">${video.duration}<span>•</span>${video.event}</p>
      </a>
    </div>`;

    const range = document.createRange();
    const fragment = range.createContextualFragment(tmpl);

    return fragment;
  }

  function generateConferenceTemplate(conference, past = true) {
    console.log(conference);
    const tmpl = `
          <li class="conference">
            <div class="flex flex-row">
              <div>
                ${isPast(past)}
                <ul class="roles">
                  <li class="role speaker">${getRoles(conference)}</li>
                </ul>
                <a href="${conference.link}" class="host" target="_blank">${conference.name}</a>
                ${getTalk(conference)}
              </div>
              <div class="flex-1"></div>
              ${getVideo(conference)}
            </div>
            <div class="infos">
              <span class="location">${conference.location.name}</span>
                • 
              <span class="date">${conference.date}</span>
            </div>
          </li>
        `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(tmpl);

    return fragment;
  }

  function isPast(past) {
    if (!past) {
      return `<span class='soon'>Soon!</span>`
    }
    return '';
  }

  function getTalk(conference) {
    if (!conference.talk) return "";

    return `<span> • ${conference.talk.title}</span>`;
  }

  function getRoles(conference) {
    if (!conference.roles || conference.roles.length === 0) return "";

    let tpl = '';
    for (let role of conference.roles) {
      tpl += `<li class="role ${role}">[${role}]</li>`;
    }
    return tpl;
  }

  function getVideo(conference) {
    if (!conference.talk || !conference.talk.video) return "";
    return `
    <a target="_blank" title="See video" href="${conference.talk.video}">
      <i class="fas fa-video"></i>
    </a>`;
  }
});