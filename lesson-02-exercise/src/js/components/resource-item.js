const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">

  <button type="button" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h2 class="h6 mb-1 resource-title"></h2>
      <small class="resource-category"></small>
    </div>
    <p class="mb-1 small text-body-secondary resource-description"></p>
    <small class="text-body-secondary resource-location"></small>
  </button>
`;

class ResourceItem extends HTMLElement {
  #data = null;

  constructor(){
    super();
    this.#data = null;
    this.attachShadow({ mode: 'open' });
  }

  set data(obj){
    this.#data = obj;
  }

  renderFromResourceItem() {
    if(!this.#data) return;
    else {
      const el = template.content.cloneNode(true);
      if(this.#data.active){
        el.querySelector('button').classList.add('active');
      }
      el.querySelector('.resource-title').textContent = this.#data.title;
      el.querySelector('.resource-category').textContent = this.#data.category;
      el.querySelector('.resource-description').textContent = this.#data.description;
      el.querySelector('.resource-location').textContent = this.#data.location;

      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(el);
    }
    
  }

  connectedCallback(){
    this.classList.add('list-group', 'list-group-flush');
    if(this.#data){
      this.renderFromResourceItem();
    }
  }
}


customElements.define('resource-item', ResourceItem);
export default ResourceItem;