async function fetchPublications() {
    const publicationsResponse = await fetch('data/publications.json');
    const publicationsData = await publicationsResponse.json();
    return publicationsData;
}

async function publishPublications() {
    publications = await fetchPublications();
    publicationsList = document.querySelector("#full-pub-list");
    for (publication in publications) {
        var publicationBlock = document.createElement("li");
        var title = document.createElement("p");
        title.textContent = publications[publication].title;
        title.className = "pub-title";
        publicationBlock.appendChild(title);

        var author = document.createElement("p");
        author.textContent = publications[publication].authorship;
        author.className = "pub-author";
        publicationBlock.appendChild(author);

        var conference = document.createElement("p");
        conference.textContent = publications[publication].conference;
        conference.className = "pub-conf";
        publicationBlock.appendChild(conference);

        var doiTag = document.createElement("a");
        doiTag.textContent = "DOI";
        doiTag.href = publications[publication].doi;
        doiTag.className = "pub-tag blue";
        publicationBlock.appendChild(doiTag);

        var pdfTag = document.createElement("a");
        pdfTag.textContent = "PDF";
        pdfTag.href = publications[publication].pdf;
        pdfTag.className = "pub-tag red";
        publicationBlock.appendChild(pdfTag);

        var materialsList = publications[publication].otherMaterials;
        for (material in materialsList) {
            var materialTag = document.createElement("a");
            materialTag.textContent = materialsList[material].name;
            materialTag.href = materialsList[material].link;
            materialTag.className = "pub-tag";
            publicationBlock.appendChild(materialTag);
        }

        publicationsList.appendChild(publicationBlock);
    }
}

var mql = window.matchMedia("(min-width: 600px)");
function responsive() {
    responsiveLogo();
    responsiveNavList();
}

function responsiveLogo() {
    var logo = document.getElementById("logo");
    logo.style.paddingTop = mql.matches ? "3vw" : "7vw";
    logo.style.paddingLeft = mql.matches ? "6vw" : "11vw";
}

function responsiveNavList() {
    var homeNav = document.getElementById("home-nav");
    var pubNav = document.getElementById("pub-nav");
    var proNav = document.getElementById("pro-nav");
    var blogNav = document.getElementById("blog-nav");
    homeNav.innerHTML = mql.matches ? "Home" : "<i class='fi fi-sr-home'></i>";
    pubNav.innerHTML = mql.matches ? "Publications" : "<i class='fi fi-sr-pen-nib'></i>";
    // proNav.innerHTML = mql.matches ? "Projects" : "<i class='fi fi-sr-hammer'></i>";
    blogNav.innerHTML = mql.matches ? "Blog" : "<img src='icon/medium.png' width='18px'>";
}

mql.onchange = responsive;
responsive();
fetchPublications();
publishPublications();