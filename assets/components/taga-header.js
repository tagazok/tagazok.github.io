const template = document.createElement('template');

template.innerHTML = `
    <style>
        @import "assets/components/taga-header.css";
    </style>
    <header class="header">
    <div class="menu">
        <a href="/" title="talks">Talks</a>
        <a href="/videos.html" title="videos">Videos</a>
        <a href="https://www.linkedin.com/in/olivierleplus/" title="linkedin" target="_blank">LinkedIn</a>
    </div>
        <div class="container">
            <a href="/"><img class="avatar" src="assets/avatar.jpeg" /></a>
            <h1 class="title">Olivier Leplus</h1>
            <p class="text">
                Hi! I'm Olivier, and I am looking forward to see what is going to amaze me today.
            </p>
            <p class="text">Developer Relations
                <a href="https://aws.amazon.com/" target="_blank">@AWS</a>
            </p>
            <p class="text">
                <a href="https://developers.google.com/community/experts/directory/profile/profile-olivier-leplus" target="_blank">Google Developer Expert</a> in web technologies
            </p>

            <div class="twitter-widget">
                <a href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Ftagazok.github.io%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Eolivierleplus&region=follow_link&screen_name=olivierleplus" 
                class="twitter-follow-button"
                target="_blank">
                <i></i>
                <span class="label">Follow @olivierleplus</span></a>
            </div>
        </div>
    </header>
`;

class TagaHeader extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'closed' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('taga-header', TagaHeader);