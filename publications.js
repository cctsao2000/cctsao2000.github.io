async function fetchPublications(publicationType) {
    const publicationsResponse = await fetch('data/publications.json');
    const publicationsData = await publicationsResponse.json();
    const publications = publicationsData.filter(p => p.publicationType === publicationType);
    return publications;
}

async function publishPublications() {
    publications = await fetchPublications("conference");
    publicationsList = document.querySelector("#full-pub-list");
    abstracts = await fetchPublications("abstract");
    abstractsList = document.querySelector("#full-abs-list");
    
    for (publication in publications) {
        var publicationBlock = document.createElement("li");
        publicationBlock.className = "pub-item";
        
        var coverImage = document.createElement("img");
        coverImage.src = publications[publication].coverImage;
        coverImage.alt = "Cover Image";
        coverImage.className = "pub-cover";
        publicationBlock.appendChild(coverImage);
        
        var contentBlock = document.createElement("div");
        contentBlock.className = "pub-content";
        
        var title = document.createElement("p");
        title.textContent = publications[publication].title;
        title.className = "pub-title";
        contentBlock.appendChild(title);
        
        var author = document.createElement("p");
        author.textContent = publications[publication].authorship;
        author.className = "pub-author";
        contentBlock.appendChild(author);
        
        var conference = document.createElement("p");
        conference.textContent = publications[publication].conference;
        conference.className = "pub-conf";
        contentBlock.appendChild(conference);
        
        var doiTag = document.createElement("a");
        doiTag.textContent = "DOI";
        doiTag.href = publications[publication].doi;
        doiTag.className = "pub-tag blue";
        contentBlock.appendChild(doiTag);
        
        var pdfTag = document.createElement("a");
        pdfTag.textContent = "PDF";
        pdfTag.href = publications[publication].pdf;
        pdfTag.className = "pub-tag red";
        contentBlock.appendChild(pdfTag);
        
        var materialsList = publications[publication].otherMaterials;
        for (material in materialsList) {
            var materialTag = document.createElement("a");
            materialTag.textContent = materialsList[material].name;
            materialTag.href = materialsList[material].link;
            materialTag.className = "pub-tag";
            contentBlock.appendChild(materialTag);
        }
        
        publicationBlock.appendChild(contentBlock);
        publicationsList.appendChild(publicationBlock);
    }
    
    for (abstract in abstracts) {
        var abstractBlock = document.createElement("li");
        abstractBlock.className = "pub-item";
        
        var coverImage = document.createElement("img");
        coverImage.src = abstracts[abstract].coverImage;
        coverImage.alt = "Cover Image";
        coverImage.className = "pub-cover";
        abstractBlock.appendChild(coverImage);
        
        var contentBlock = document.createElement("div");
        contentBlock.className = "pub-content";
        
        var title = document.createElement("p");
        title.textContent = abstracts[abstract].title;
        title.className = "pub-title";
        contentBlock.appendChild(title);
        
        var author = document.createElement("p");
        author.textContent = abstracts[abstract].authorship;
        author.className = "pub-author";
        contentBlock.appendChild(author);
        
        var conference = document.createElement("p");
        conference.textContent = abstracts[abstract].conference;
        conference.className = "pub-conf";
        contentBlock.appendChild(conference);
        
        if (abstracts[abstract].pdf != null) {
            var pdfTag = document.createElement("a");
            pdfTag.textContent = "PDF";
            pdfTag.href = abstracts[abstract].pdf;
            pdfTag.className = "pub-tag red";
            contentBlock.appendChild(pdfTag);
        }
        
        var materialsList = abstracts[abstract].otherMaterials;
        for (material in materialsList) {
            var materialTag = document.createElement("a");
            materialTag.textContent = materialsList[material].name;
            materialTag.href = materialsList[material].link;
            materialTag.className = "pub-tag";
            contentBlock.appendChild(materialTag);
        }
        
        abstractBlock.appendChild(contentBlock);
        abstractsList.appendChild(abstractBlock);
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
    proNav.innerHTML = mql.matches ? "Projects" : "<i class='fi fi-sr-hammer'></i>";
    blogNav.innerHTML = mql.matches ? "Blog" : "<img src='icon/medium.png' width='18px'>";
}

mql.onchange = responsive;
responsive();
publishPublications();