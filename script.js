const tabs = document.querySelectorAll('.tab-names h2');

// const h2 = document.createElement("h2");
// h2.textContent = "This content added by JavaScript";

// document.querySelector("body").appendChild(h2);
const header = document.querySelector('header');
const height = header.offsetHeight;

function initializeTabs() {
    // Set the "Home" tab as default
    const defaultTabName = "HOME";

    // Update styles and content for the default tab
    updateTabStyles(tabs, defaultTabName);
    updateTabContent(defaultTabName);
}

function updateTabStyles(tabs, selectedTabName) {
    tabs.forEach(tab => {
        const tabName = tab.textContent;

        if (tabName === selectedTabName) {
            tab.style.textDecoration = "underline"; // Highlight the selected tab
            tab.style.color = "black";
        } else {
            tab.style.textDecoration = "none"; // Reset other tabs
            tab.style.color = "rgb(31, 49, 31)";
        }
    });
}

function updateTabContent(selectedTabName) {
    const tabContents = document.querySelectorAll('.tab-content');

    tabContents.forEach(tabContent => {
        const tabName = tabContent.id;
        // const tabName = selectedTabName.replace(/ /g, "-");
        if (tabName === selectedTabName.toLowerCase().replace(/ /g, "-")) {
            tabContent.style.display = "block"; // Highlight the selected tab
        } else {
            tabContent.style.display = "none"; // Reset other tabs
        }
    });
}

function addingEventListener() {
    // Select all <h2> elements inside elements with the class "tab_names"
    // const tabs = document.querySelectorAll('.tab_names h2');

    // Loop through each <h2> element and attach an event listener
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const tabName = tab.textContent;
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active-tab'));

            // Add active class to the clicked tab
            tab.classList.add('active-tab');

            // Call the function to update tab styles
            updateTabStyles(tabs, tabName);
            updateTabContent(tabName)
        });
        
        tab.addEventListener("mouseover", function() {
            if (!tab.classList.contains('active-tab')) {
                // Apply hover styles only if the tab is not active
                tab.style.color = "rgb(188, 71, 71)";
                tab.style.size = "40px";
                tab.style.textDecoration = "underline";
            }
        });

        tab.addEventListener("mouseout", function() {
            if (!tab.classList.contains('active-tab')) {
                // Revert hover styles only if the tab is not active
                tab.style.color = "";
                tab.style.size = "";
                tab.style.textDecoration = "";
            }
        });

    });
}

function logoZoom() {
    const logos = document.querySelectorAll('footer img');

    // Loop through each <h2> element and attach an event listener
    logos.forEach(logo => {
        
        logo.addEventListener("mouseover", function() {
            logo.style.width = "40px";
        });

        logo.addEventListener("mouseout", function() {
            logo.style.width = "30px";
        });

    });
}

// // Your code here
const dodger = document.getElementById("dodger")

function moveDodgerLeft() {
        const leftNumbers = dodger.style.left.replace("px", "");
        const left = parseInt(leftNumbers, 10);
        
        dodger.style.left = `${left-1}px`
}

function moveDodgerRight() {
        const leftNumbers = dodger.style.left.replace("px", "");
        const left = parseInt(leftNumbers, 10);

        dodger.style.left = `${left+1}px`
}

function addDodgerEvents() {
    document.addEventListener("keydown", function (event) {
        if (event.key === 'ArrowLeft') {
            moveDodgerLeft()}
        else if (event.key === 'ArrowRight') {
            moveDodgerRight()
        } 
    })
}

let images = ['winter', 'spring', 'fall', 'summer'];

let index = 0;
const imgElement = document.querySelector('#view');

function change() {
    imgElement.src = `./img/view/${images[index]}.jpg`;
    index > 2 ? index = 0 : index++;
}

window.onload = function () {
    setInterval(change, 5000);
};

document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
  
    if (scrollPosition > 100) { // Adjust the threshold as needed
      header.classList.add('minimized');
    } else {
      header.classList.remove('minimized');
    }
  });

  

initializeTabs();
addingEventListener();
addDodgerEvents();
logoZoom();