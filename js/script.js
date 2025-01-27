function removeAllChildren(element) {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}

function loadRepositories() {
    const user = window.location.hostname.split(".")[0];
    const repositoriesElement = document.getElementById("repositories");
    removeAllChildren(repositoriesElement);
    const loadingElement = document.createElement("h5");
    loadingElement.textContent = "Loading…";
    repositoriesElement.appendChild(loadingElement);
    fetch(`https://api.github.com/users/${user}/repos`)
        .then((response) => response.json())
        .then((data) => {
            removeAllChildren(repositoriesElement);
            const olElement = document.createElement("ol");
            for (const repo of data) {
                const liElement = document.createElement("li");
                const aElement = document.createElement("a");
                aElement.href = repo.html_url;
                aElement.target = "_blank";
                aElement.innerText = repo.name;
                liElement.appendChild(aElement);
                olElement.appendChild(liElement);
            }
            repositoriesElement.appendChild(olElement);
        })
        .catch((err) => {
            removeAllChildren(repositoriesElement);
            const errorMessageElement = document.createElement("h5");
            errorMessageElement.textContent = err.message;
            errorMessageElement.style.color = "Red";
            repositoriesElement.appendChild(errorMessageElement);
            const retryButtonElement = document.createElement("button");
            retryButtonElement.textContent = "Retry";
            retryButtonElement.onclick = loadRepositories;
            repositoriesElement.appendChild(retryButtonElement);
        });
}

document.addEventListener("DOMContentLoaded", loadRepositories);