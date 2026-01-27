const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush">
        <!-- buttons go here -->
      </div>
    </div>
  </section>`;

class ResourceResults extends HTMLElement {
  #results = [];
  constructor() {
    super();
    this._handleResultClick = this._handleResultClick.bind(this);
    this.attachShadow({ mode: 'open' });
  }

  set results(data) {
    this.#results = data;
    this.render();
  }

  _handleResultClick(event) {
    const clickedElement = event.target.closest('button[data-id]');
    if (clickedElement) {
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      clickedElement.classList.add('active');

      const selectedId = clickedElement.getAttribute('data-id');
      // search the results for the data that corresponds to the data-id
      const resource = this.#results.find(r => r.id === selectedId);

      const selectedEvent = new CustomEvent('resource-selected', {
        detail: { resource },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(selectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  render() {
    const node = template.content.cloneNode(true);
    const listGroup = node.querySelector('.list-group');
    if (!this.#results || this.#results.length === 0) {
      ;
    } else {
      for (const result of this.#results) {
        const listGroupContent = `
          <button data-id="${result.id}"type="button" class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h2 class="h6 mb-1">${result.title}</h2>
              <small>${result.category}</small>
            </div>
            <p class="mb-1 small text-body-secondary">${result.summary}</p>
            <small class="text-body-secondary">${result.location}</small>
          </button>
        `;
        listGroup.innerHTML += listGroupContent;
      }
    }
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(node);
  }
}

customElements.define('resource-results', ResourceResults);
