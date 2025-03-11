async function fetchProjectData() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

async function loadProject() {
    const projects = await fetchProjectData();
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");

    const project = projects.find(proj => proj.id === projectId);
    if (!project) {
        document.querySelector("#project-details").innerHTML = "<p>Project not found.</p>";
        return;
    }
    document.querySelector("title").textContent = `${project.name} | Ching-Chih Amber Tsao`;

    document.querySelector("#project-title").textContent = project.name;
    document.querySelector("#project-date").textContent = project.projectYearMonth;
    document.querySelector("#project-image").src = project.coverPhoto;
    document.querySelector("#project-image").alt = project.name;
    document.querySelector("#project-description").textContent = project.description;

    const tagsContainer = document.querySelector("#project-tags");
    project.tags.forEach(tag => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagElement.className = "tag is-info";
        tagsContainer.appendChild(tagElement);
    });
}

document.addEventListener("DOMContentLoaded", loadProject);


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
    blogNav.innerHTML = mql.matches ? "Blog" : "<img src='icon/medium.png' width='18px' style='margin-right:0px'>";
}

mql.onchange = responsive;
responsive();
publishProjects();