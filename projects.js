async function fetchProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

async function publishProjects() {
    const projects = await fetchProjects();
    const projectsList = document.querySelector("#full-pro-list");
    const filterContainer = document.querySelector("#filter-container");

    projectsList.innerHTML = "";
    filterContainer.innerHTML = "";

    if (projects.length === 0) {
        projectsList.innerHTML = "<p>No projects found. Check back later!</p>";
        return;
    }

    /** Extract Unique Tags **/
    const uniqueTags = new Set();
    projects.forEach(project => {
        if (project.tags) {
            project.tags.forEach(tag => uniqueTags.add(tag));
        }
    });

    /** Create "All" Filter Button **/
    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.className = "project-tag filter-button active"; // Use the same CSS class
    allButton.dataset.tag = "all";
    filterContainer.appendChild(allButton);

    /** Create Buttons for Each Unique Tag **/
    uniqueTags.forEach(tag => {
        const tagButton = document.createElement("button");
        tagButton.textContent = tag;
        tagButton.className = "project-tag filter-button"; // Use project tag style
        tagButton.dataset.tag = tag;
        filterContainer.appendChild(tagButton);
    });
    
    projects.sort((a, b) => (b.pinned === true) - (a.pinned === true));

    /** Render Projects **/
    projects.forEach(project => {
        const projectBlock = document.createElement("li");
        projectBlock.className = "project";
        projectBlock.dataset.tags = project.tags ? project.tags.join(",") : ""; 

        // Cover Photo
        if (project.coverPhoto) {
            const coverPhoto = document.createElement("img");
            coverPhoto.src = project.coverPhoto;
            coverPhoto.alt = project.name;
            coverPhoto.className = "project-cover";
            projectBlock.appendChild(coverPhoto);
        }

        const titleContainer = document.createElement("div");
        titleContainer.className = "project-title-container";

        const overlay = document.createElement("div");
        overlay.className = "project-overlay";
        if (project.pinned) {
            const pinIcon = document.createElement("span");
            pinIcon.innerHTML = "<i class='fi fi-sr-thumbtack'></i>";
            pinIcon.className = "pinned-icon";
            overlay.appendChild(pinIcon);
        }

        // Title
        const title = document.createElement("h2");
        title.textContent = project.name;
        title.className = "project-title";
        titleContainer.appendChild(title);

        // Horizontal Line
        const hr = document.createElement("hr");
        hr.className = "project-separator";
        titleContainer.appendChild(hr);

        // Project Year Month
        const yearMonth = document.createElement("p");
        yearMonth.textContent = project.projectYearMonth;
        yearMonth.className = "project-year-month";
        titleContainer.appendChild(yearMonth);

        projectBlock.appendChild(titleContainer);
        projectBlock.appendChild(overlay);

        projectsList.appendChild(projectBlock);
    });

    /** Filtering Function **/
    document.querySelectorAll(".filter-button").forEach(button => {
        button.addEventListener("click", () => {
            const selectedTag = button.dataset.tag;

            // Remove "active" class from all buttons and highlight selected
            document.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            document.querySelectorAll(".project").forEach(project => {
                const projectTags = project.dataset.tags.split(",");
                project.style.display = (selectedTag === "all" || projectTags.includes(selectedTag)) ? "block" : "none";
            });
        });
    });
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
    blogNav.innerHTML = mql.matches ? "Blog" : "<img src='icon/medium.png' width='18px' style='margin-right:0px'>";
}

mql.onchange = responsive;
responsive();
publishProjects();