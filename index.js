async function fetchPublications() {
    const publicationsResponse = await fetch('data/publications.json');
    const publicationsData = await publicationsResponse.json();
    const selectedPublications = publicationsData.filter(p => p.selected);
    return selectedPublications;
}

async function publishPublications() {
    publications = await fetchPublications();
    publicationsList = document.querySelector("#pub-list");
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

        // publishYearMonth
        // authorship
        // conference
        // location
        // doi
        // pdf
        // otherMaterials

        // <li>
        // <a href="https://dl.acm.org/doi/10.1145/3568294.3580171" class="pub-title">The Influence of a Robot Recommender System on Impulse Buying Tendency</a> 
        // <br>
        // <span class="pub-author"><span class="highlight">Ching-Chih Tsao</span>, Cheng-Yi Tang, Yu-Wen Chang, Yin-Hsuan Sung, Shih-Yi Chien, Szu-Yin Lin</span>
        // <br>
        // <span class="pub-conf">ACM/IEEE HRI 2023</span>&nbsp;
        // <a href="files/HRI23.pdf" target="_blank" class="pub-tag">DOI</a>
        // <a href="files/HRI23.pdf" target="_blank" class="pub-tag">PDF</a>
        // <a href="files/HRI_Poster.pdf" target="_blank" class="pub-tag">Poster</a>
        // <a href="https://github.com/cctsao2000/EEG-ImpulseBuying" target="_blank" class="pub-tag">Code</a>
        // </li>


        // var review_block = document.createElement("div");
        // review_block.className = "column";
        // var link = document.createElement("img");
        // image.className = "review_image";

        // var rev = document.createElement("p");
        // rev.textContent = publications[publication].review;
        // rev.className = "small";
        // var r_time = document.createElement("p");
        // r_time.textContent = publications[publication].time;
        // r_time.className = "small";
        // review_block.appendChild(image);
        // review_block.appendChild(uid);
        // review_block.appendChild(rev);
        // review_block.appendChild(r_time);


        publicationsList.appendChild(publicationBlock);
    }
}

var mql = window.matchMedia("(min-width: 600px)");
function responsive() {
    responsiveLogo();
    responsiveNavList();
    responsiveHome();
}

function responsiveLogo() {
    var logo = document.getElementById("logo");
    var logoName = document.getElementById("logo-name");
    var sectionHome = document.getElementById("home");
    logo.style.paddingTop = mql.matches ? "3vw" : "7vw";
    logo.style.paddingLeft = mql.matches ? "6vw" : "11vw";
    sectionHome.style.paddingTop = mql.matches ? "150px" : "100px";
    logoName.innerHTML = mql.matches ? "Ching-Chih Amber Tsao" : "C. Amber Tsao";
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

function responsiveHome() {
    var name = document.getElementById("name");
    var intro = document.getElementById("intro-content");
    var profilePic = document.getElementById("profile-pic");
    name.style.fontSize = mql.matches ? "32px" : "24px";
    intro.style.fontSize = mql.matches ? "18px" : "14px";
    intro.parentElement.style.paddingLeft = mql.matches ? "0vw" : "8vw";;
    profilePic.style.maxWidth = mql.matches ? "320px" : "240px";
    var linkTagList = document.getElementsByClassName("link-tag");
    linkTagList[0].innerHTML = mql.matches ? "CV" : "<span style='color: black;'>CV</span>";
    linkTagList[1].innerHTML = mql.matches ? "GitHub" : "<img src='icon/github.png' width='24px' style='transform: translateY(10%);'>";
    linkTagList[2].innerHTML = mql.matches ? "LinkedIn" : "<img src='icon/linkedin.png' width='24px' style='transform: translateY(10%);'>";
    linkTagList[3].innerHTML = mql.matches ? "Google Scholar" : "<img src='icon/google-scholar.png' width='22px' style='transform: translateY(10%);'>";
}

mql.onchange = responsive;
responsive();
fetchPublications();
publishPublications();