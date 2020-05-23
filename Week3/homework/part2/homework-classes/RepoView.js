"use strict";

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      console.log("RepoView", repo);
      this.container.innerText = "";

      const table = createAndAppend("table", this.container, {
        class: "repo-table",
      });

      const trRepository = createAndAppend("tr", table);
      createAndAppend("th", trRepository, {
        text: "Repository: ",
      });

      const tdRepository =createAndAppend("td", trRepository);


      createAndAppend("a", tdRepository, {
        href: repo.git_url,
        target: "_blank",
        text : repo.name
      });

      const repoMap = [
        {
          key: "Description: ",
          value: repo.description,
        },
        {
          key: "Forks: ",
          value: repo.forks,
        },
        {
          key: "Updated:",
          value: new Date(repo.updated_at).toDateString(),
        },
      ];
      repoMap.forEach((item) => {
        const tr = createAndAppend("tr", table);
        createAndAppend("th", tr, {
          text: item.key,
        });
        createAndAppend("td", tr, {
          text: item.value,
        });
      });
    }
  }

  window.RepoView = RepoView;
}
