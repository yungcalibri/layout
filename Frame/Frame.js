/**
 * @module frame-l
 * @description
 * A custom element for configuring the aspect ratio of an image or video
 * @property {string} ratio=16:9 The element's aspect ratio
 */
export default class Frame extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      if (this.children.length !== 1) {
        console.warn('<frame-l> elements should have exactly one child');
      }
      if (!this.ratio.includes(':')) {
        console.warn ('<frame-l> elements\' `ratio` attribute should be of the form `16:9`');
      }
      this.i = `Frame-${this.ratio}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        const [numerator, denominator] = this.ratio.split(':');
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            aspect-ratio: ${numerator} / ${denominator};
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  static get observedAttributes = () => ['ratio'];

  get ratio() {
    return this.getAttribute('ratio') || '16:9';
  }
  set ratio(val) {
    return this.setAttribute('ratio', val);
  }

  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('frame-l', Frame);
}
