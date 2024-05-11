const username = document.querySelector(".repos-input input");
const getButton = document.querySelector(".get-button");
const reposOutput = document.querySelector(".repos-output");

getButton.onclick = function () {
  getrepos();
};

function getrepos() {
  // text validation
  if (username.value == "") {
    reposOutput.innerHTML = `<span>Please Write Your GitHub UserName</span>`;
  } else {
    reposOutput.innerHTML = "";
    fetch(`https://api.github.com/users/${username.value}/repos`)
      .then((result) => {
        const reposData = result.json();
        return reposData;
      })
      .then((reposData) => {
        reposData.forEach((repo) => {
          // Main Repo Container
          const mainDiv = document.createElement("div");
          // Add repo names to the main div
          const repoName = document.createElement("span");
          repoName.classList.add("repo-name");
          repoName.appendChild(document.createTextNode(repo.name));
          mainDiv.appendChild(repoName);
          // Add Stars Num to the main div
          let starsNum = document.createElement("span");
          starsNum.appendChild(
            document.createTextNode(`Stars: ${repo.stargazers_count}`)
          );
          starsNum.classList.add("stars-num");
          // Add repo URL
          const repoUrl = document.createElement("a");
          repoUrl.href = repo.html_url;
          repoUrl.innerHTML = "Visit";
          repoUrl.classList.add("visit-repo");
          repoUrl.setAttribute("target", "_blank");
          let buttons = document.createElement("div");
          buttons.classList.add("buttons");

          // Appending
          mainDiv.classList.add("repo");
          buttons.appendChild(starsNum);
          buttons.appendChild(repoUrl);
          mainDiv.appendChild(buttons);
          reposOutput.appendChild(mainDiv);
        });
        // Number Of Repos
        const reposNum = document.createElement("span");
        reposNum.appendChild(
          document.createTextNode(`Number Of Repositories: ${reposData.length}`)
        );
        reposOutput.appendChild(reposNum);
      });
  }
}
