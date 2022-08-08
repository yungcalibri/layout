/**
 * @module stack-l
 * @description
 * A custom element which injects white space (margin) between block elements along a vertical axis. 
 * @property {string} space=var(--s1) A CSS length for the injected space.
 * @property {boolean} recursive=false Whether the space applies to grandchildren and other deeply nested elements.
 * @property {number} splitAfter=null Applies an auto margin after this index to split the stack into two parts.
 */
export default class Stack extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      const watched = [this.space, this.recursive, this.splitAfter].join('');
      this.i = `Stack-${watched}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"]${this.recursive ? '' : ' >'} * + * {
            margin-block-start: ${this.space};
          }

          ${this.splitAfter ? `
          [data-i="${this.i}"]:only-child {
            block-size: 100%;
          }

          [data-i="${this.i}"] > :nth-child(${this.splitAfter}) {
            margin-block-end: auto;
          }
          ` : ''}
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  static get observedAttributes = () => ['space', 'recursive', 'splitAfter'];
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }
  set space(val) {
    return this.setAttribute('space', val);
  }

  get recursive() {
    return this.hasAttribute('recursive');
  }
  set recursive(val) {
    return this.setAttribute(val ? 'recursive' : '');
  }

  get splitAfter() {
    return this.getAttribute('splitAfter') || null;
  }
  set splitAfter(val) {
    return this.setAttribute('splitAfter', val);
  }
};

if ('customElements' in window) {
  customElements.define('stack-l', Stack);
}
