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

  // Game play ****************************************************************************************************

function scoreExact(actual, predicted) {
    const actual_tracked = [...actual]
    const pred_tracked = [...predicted]
    const score = []
    const progress = {'score': score, 'actual': actual_tracked, 'predicted': pred_tracked}
    
    for (let p = 0; p <pred_tracked.length; p++) {
        if (pred_tracked[p] === actual_tracked[p]) {
            score[p] = 2
            actual_tracked.splice(p, 1, 0) //remove match from consideration for next round
            pred_tracked.splice(p, 1, 0) //remove match from consideration for next round
        }
        else {score[p] = 0}
    }
    return progress

}

function scorePartial(progress) {
    const score = progress['score']
    const actual_tracked = progress['actual']
    const pred_tracked = progress['predicted']
    
    for (let p = 0; p <pred_tracked.length; p++) {
        for (let a = 0; a<actual_tracked.length; a++) {
            if (pred_tracked[p] != 0) { // 0 indicates item has already been checked
                if (pred_tracked[p] === actual_tracked[a]) {
                    score[p] = 1
                    actual_tracked.splice(a, 1, 0)
                    break
                }
                else {
                    score[p] = 0
                }
            }
        }
        pred_tracked[p] = 0 // mark that item has been checked (no impact)
    }

    return score

}

function shuffle(score) {
    const score_shuffled = score.filter((i) => i>0)

    for (let i = score_shuffled.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at index i and j
        [score_shuffled[i], score_shuffled[j]] = [score_shuffled[j], score_shuffled[i]];
    }
    return score_shuffled;
}

function playRound(actual, predicted) {
    progress = scoreExact(actual, predicted)
    score = scorePartial(progress)
    scoreShuffled = shuffle(score)

    return scoreShuffled
}

const game = document.querySelector("#play")
const theme = document.querySelector("#theme").textContent
const score_code = {1: "Partial Match", 2: "Exact Match"}

// import gameThemes from './game_themes.json';

function initiateNewGame() {
    optionsList = ["option1", "option2", "option3", "option4", "option5"]
    const choices = document.querySelector("#user-choices"); 

    optionsList.forEach(option => {
        const newOption = document.createElement("img")
        newOption.src = `./img/game/${theme}/${option}.png`
        newOption.className = "game-icons"

        choices.append(newOption)

        newOption.addEventListener("mouseover", function() {
            newOption.style.width = "50px";
            newOption.style.height = "50px";
        });

        newOption.addEventListener("mouseout", function() {
            newOption.style.width = "30px";
            newOption.style.height = "30px";
        });

    })

    const resultKey = document.querySelector("#result-key");
    const allScores = [1, 2]
    allScores.forEach(score => {
        const resultType = score_code[score]
        const fileName = resultType.toLowerCase().replace(/ /g, "_")

        const newLabel = document.createElement("h2");
        newLabel.textContent = `${resultType}:`
        resultKey.append(newLabel)
 
        const newResult = document.createElement("img");
        newResult.src = `./img/game/${theme}/${fileName}.png`
        newResult.alt = fileName
        newResult.className = "game-icons"

        resultKey.append(newResult)
    })

    const robotSelections = document.getElementById("robot-selections")
    robotSelections.style.display = "none"
    game.append(robotSelections)

    let randomItem
    for (let a = 0; a < 5; a++) {
        randomItem = optionsList[Math.floor(Math.random() * optionsList.length)];

        const robotSelection = document.createElement("img")
        robotSelection.src = `./img/game/${theme}/${randomItem}.png`
        robotSelection.alt = randomItem
        robotSelection.className = "game-icons"
        robotSelections.append(robotSelection)
    }

    // add events to buttons
    const newPredButton = document.getElementById("new-prediction");
    newPredButton.addEventListener("click", initiateNewRound)

    const showAnsButton = document.getElementById("show-answer");
    showAnsButton.addEventListener("click", function(event) {
        curr = event.target.textContent
        if (curr === "Show Answer"){
            showAnsButton.textContent = "Hide Answer"
            robotSelections.style.display = "flex"}
        else {
            showAnsButton.textContent = "Show Answer"
            robotSelections.style.display = "none"}
        })
}

function addOptionClickEvent(event) {
    // alert("something happened!")
    const currentRound = document.querySelector("#current-round");
    const newSelections = document.querySelector("#current-round .user-selections")
    const selections = document.querySelectorAll("#current-round .user-selections img");

    if (selections.length < 5) {
        // const itm = choice.textContent;
        const itm = event.target.src;

        const newSelection = document.createElement("img");
        newSelection.src = itm
        newSelection.className = "game-icons"
        newSelections.appendChild(newSelection)
        }

    else {
        alert("reached maximum selections")
   }

   if (selections.length === 4) {
        const submitButton = document.querySelector("#submit-button");
        submitButton.addEventListener("click", checkPredictions)
        submitButton.style.display = "flex"
    }
}

function initiateNewRound() {
    const currentRound = document.createElement("div")
    currentRound.className = "rounds"
    currentRound.id = "current-round"
    // gamePlay.insertBefore(currentRound, gamePlay.firstChild);
    const referenceElement = document.getElementById("robot-selections")
    referenceElement.insertAdjacentElement('afterend', currentRound)
    // game.append(currentRound)

    // const currentRound = document.querySelector("#current-round");
    const newSelections = document.createElement("div");
    newSelections.className = "user-selections"
    currentRound.append(newSelections)

    const newLabel = document.createElement("h2");
    newLabel.textContent = "New Prediction:"
    newSelections.append(newLabel)

    const choices = document.querySelectorAll("#user-choices img");

    choices.forEach(choice => {
        choice.addEventListener("click", addOptionClickEvent);
})
}

function checkPredictions() {
    const currentRound = document.querySelector("#current-round");
    const predicted = []

    const selections = document.querySelectorAll("#current-round .user-selections img");
    selections.forEach(selection => {
        const itm = selection.src
        const filePred = itm.substring(itm.lastIndexOf('/') + 1)
        predicted.push(filePred)
    })

    const actual = []

    const actuals = document.querySelectorAll("#robot-selections img");
    actuals.forEach(selection => {
        const act = selection.src
        const fileAct = act.substring(act.lastIndexOf('/') + 1)
        actual.push(fileAct)
    })

    scoresShuffled = playRound(actual, predicted)

    const newResults = document.createElement("div");
    newResults.className = "user-results"
    currentRound.append(newResults)

    const newLabel = document.createElement("h2");
    newLabel.textContent = "Results:"
    newResults.append(newLabel)
    
    scoresShuffled.forEach(score => {
        const resultType = score_code[score]
        const fileName = resultType.toLowerCase().replace(/ /g, "_")

        const newResult = document.createElement("img");
        newResult.src = `./img/game/${theme}/${fileName}.png`
        newResult.alt = fileName
        newResult.className = "game-icons"

        newResults.append(newResult)
    })

    // reset round
    const submitButton = document.querySelector("#submit-button");
    submitButton.removeEventListener("click", checkPredictions)
    submitButton.style.display = "none"

    currentRound.id = ''

    const choices = document.querySelectorAll("#user-choices img");

    choices.forEach(choice => {
        choice.removeEventListener("click", addOptionClickEvent); // Remove previous listeners to prevent duplicates
    });
}

initializeTabs();
addingEventListener();
addDodgerEvents();
logoZoom();
initiateNewGame();
// addUserPrediction();