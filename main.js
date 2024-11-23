

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos()
}

// Get Repos Function
function getRepos(){
    if(theInput.value == ""){
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    } else{

        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => {
            return response.json();
        }) 
        .then((data) => {
            // Empty The Container
            reposData.innerHTML = "";

            //  Loop on data
            data.forEach(repo => {
                
                // create main dev
                let mainDev = document.createElement("div");
                
                // create repo name text
                let repoName = document.createTextNode(repo.name)
                
                // Append The text in the Main div
                mainDev.appendChild(repoName)

                // Append Main div in The Container
                reposData.appendChild(mainDev)

                // Create Repo Url Anchor
                let theUrl = document.createElement("a");

                // Create Repo Url Text
                let theUrlText = document.createTextNode("Visit");

                // Append the repo url text  to Anchor Tag
                theUrl.appendChild(theUrlText);

                // Add the hypertext Reference "href"
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

                // Set Attribute Blank
                theUrl.setAttribute("target","_blank");

                // Append Url Anchor to main div
                mainDev.appendChild(theUrl);

                // Create Stars count Span
                let startsSpan = document.createElement("span");

                // Create the stars Count text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                
                // Add Stars Count Text To Stars Span
                startsSpan.appendChild(starsText);

                // Append Stars Count Span To main div
                mainDev.appendChild(startsSpan);

                // Add class on Main Div
                mainDev.className = 'repo-box'
                // Append the main div to container
                reposData.appendChild(mainDev);

            });
        })

    }
}