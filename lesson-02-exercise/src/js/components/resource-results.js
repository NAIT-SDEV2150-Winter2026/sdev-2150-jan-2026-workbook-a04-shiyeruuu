import ResourceItem from './resource-item.js';

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">

  <section>
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary"></span>
      </div>

        <!-- Resource Items go here -->
    </div>
  </section>
`;

class ResourceResults extends HTMLElement
{
  #resourceItems = null;
  constructor()
  {
    super();
    this.attachShadow({ mode: 'open' });

    this.#resourceItems =
    [
      {
        active: true,
        title: 'Peer Tutoring Centre',
        category: 'Academic',
        description: 'Drop-in tutoring and study support.',
        location: 'Building W, Room W101'
      },
      {
        title: 'Counselling Services',
        category: 'Wellness',
        description: 'Confidential mental health supports.',
        location: 'Virtual and in-person'
      },
      {
        title: 'Student Awards and Bursaries',
        category: 'Financial',
        description: 'Funding options and application help.',
        location: 'Student Services, Main Floor CAT'
      },
      {
        title: 'IT Service Desk',
        category: 'Tech',
        description: 'Account access, Wi-Fi, BYOD support.',
        location: 'Library'
      }
    ];
  }

  connectedCallback()
  {
    this.shadowRoot.innerHTML = '';
    const el = template.content.cloneNode(true);
    
    const fragment = document.createDocumentFragment();

    for (const resourceItem of this.#resourceItems)
    {
      const ri = new ResourceItem();
      ri.data = resourceItem;

      fragment.appendChild(ri); // siblings inside fragment
    }
    el.querySelector(".card-header").after(fragment);

    
    
    this.shadowRoot.appendChild(el);
  }
}
customElements.define('resource-results', ResourceResults);