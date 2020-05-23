'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      console.log('ContributorsView', contributors);

      this.container.innerText = '';
      const contributorHeader = createAndAppend('p', this.container, {
        class: 'contributor-top'
      });
      contributorHeader.innerText = 'Contributions';


      const ul = createAndAppend('ul', this.container);

      contributors.forEach((contributor) => {
        const li = createAndAppend('li', ul);
        const div = createAndAppend('div', li, {
          class: 'contributor'
        });
        createAndAppend('img', div, {
          src: contributor.avatar_url
        });
        createAndAppend('a', div, {
          text: contributor.login,
          href: contributor.html_url
        });
        createAndAppend('span', li, {
          text: contributor.contributions,
          class: 'contribution-counts'
        });
      });
    }
  }

  window.ContributorsView = ContributorsView;
}
