function formatProjectDate(dateString) {
    const monthMap = {
        'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
        'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
        'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
    };
    
    const [monthAbbr, year] = dateString.split(' ');
    return `${monthMap[monthAbbr]}, ${year}`;
}

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
    document.querySelector("#project-date").textContent = formatProjectDate(project.projectYearMonth);
    
    const images = [`images/${project.id}/cover`, `images/${project.id}/image1`, `images/${project.id}/image2`];
    images.forEach(src => {
        const img = document.createElement("img");
        img.src = `${src}.jpeg`;
        img.alt = "Project Image";
        img.style.height = "300px";
        img.style.marginRight = "15px";
        document.getElementById("project-gallery").appendChild(img);
        img.onerror = () => {
            img.src = `${src}.gif`;
            img.onerror = () => {
                img.src = `${src}.png`;
                img.onerror = () => {
                    document.getElementById("project-gallery").removeChild(img);
                }
            };
        };
    });

    if (project.collaborator != ""){
        const collaboratorContainer = document.getElementById("project-author");
        collaboratorContainer.textContent = `Collaborator: ${project.collaborator}`;
    }

    document.querySelector("#project-description").textContent = project.intro;
    document.querySelector("#project-detail-description").innerHTML = project.details;

    if (project.video != ""){
        document.querySelector("#project-video").src = project.video;
        if (project.shorts) {
            document.querySelector("#project-video").width = 315;
            document.querySelector("#project-video").height = 560;
        }
    }
    else {
        document.querySelector("#project-video").style.display = "none";
    }

    const tagsContainer = document.querySelector("#project-tags");
    project.tags.forEach(tag => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagElement.className = "project-tag";
        tagsContainer.appendChild(tagElement);
    });

    var otherMaterials = project.otherMaterials;

    if (otherMaterials) {
        otherMaterials.forEach(material => {
            if (material.name === "PDF") {
                var pdfLink = document.createElement("a");
                pdfLink.href = material.link;
                pdfLink.target = "_blank";
                
                var pdfIcon = document.createElement("img");
                pdfIcon.src = "icon/pdf.png";
                pdfIcon.width = 50;
                pdfIcon.alt = "PDF";
                pdfIcon.style.position = "absolute";
                pdfIcon.style.right = "0";
                pdfIcon.style.zIndex = 10;
                pdfLink.appendChild(pdfIcon);
                document.getElementById("project-date").appendChild(pdfLink);
            }

            if (material.name === "Instructables") {
                var instructablesLink = document.createElement("a");
                instructablesLink.href = material.link;
                instructablesLink.target = "_blank";
                
                var instructablesIcon = document.createElement("img");
                instructablesIcon.src = "icon/instructables.png";
                instructablesIcon.width = 180;
                instructablesIcon.alt = "Instructables";
                instructablesIcon.style.position = "absolute";
                instructablesIcon.style.right = "0";
                instructablesIcon.style.zIndex = 10;
                instructablesLink.appendChild(instructablesIcon);
                document.getElementById("project-date").appendChild(instructablesLink);
            }
        });
    }
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