/**
 * @module grid-l
 * @description
 * A custom element for creating a responsive grid full of elements of identical size.
 * @property {string} min=250px A CSS length - the minimum size of individual columns
 * @property {string} space=var(--s1) A CSS length - the space between grid cells
 */
export default class Grid extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Grid-${[this.min, this.space].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            grid-gap: ${this.space};
          }

          @supports (width: min(${this.min}, 100%)) {
            [data-i="${this.i}"] {
              grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
            }
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  static get observedAttributes() {
    return ['min', 'space'];
  }

  get min() {
    return this.getAttribute('min') || '250px';
  }
  set min(val) {
    return this.setAttribute('min', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }
  set space(val) {
    return this.setAttribute('space', val);
  }

  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('grid-l', Grid);
}
