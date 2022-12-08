/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 */
export default class Box extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Box-${[this.padding, this.borderWidth].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            padding: ${this.padding};
            border: ${this.borderWidth} solid;
          }
          [data-i="${this.i}"] * {
            color: inherit;
            background-color: inherit;
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  static get observedAttributes() {
    return ['padding', 'borderWidth'];
  }

  get padding() {
    return this.getAttribute('padding') || 'var(--s1)'; 
  }
  set padding(val) {
    return this.setAttribute('padding', val);
  }

  get borderWidth() {
    return this.getAttribute('borderWidth') || 'var(--border-thin)';
  }
  set borderWidth(val) {
    return this.setAttribute('borderWidth', val);
  }

  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('box-l', Box);
}
