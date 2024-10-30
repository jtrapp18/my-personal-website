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

// function scoreExact(actual, predicted) {
//     const actual_tracked = [...actual]
//     const pred_tracked = [...predicted]
//     const score = []
//     const progress = {'score': score, 'actual': actual_tracked, 'predicted': pred_tracked}
    
//     for (let p = 0; p <pred_tracked.length; p++) {
//         if (pred_tracked[p] === actual_tracked[p]) {
//             score[p] = 2
//             actual_tracked.splice(p, 1, 0) //remove match from consideration for next round
//             pred_tracked.splice(p, 1, 0) //remove match from consideration for next round
//         }
//         else {score[p] = 0}
//     }
//     return progress

// }

// function scorePartial(progress) {
//     const score = progress['score']
//     const actual_tracked = progress['actual']
//     const pred_tracked = progress['predicted']
    
//     for (let p = 0; p <pred_tracked.length; p++) {
//         for (let a = 0; a<actual_tracked.length; a++) {
//             if (pred_tracked[p] != 0) { // 0 indicates item has already been checked
//                 if (pred_tracked[p] === actual_tracked[a]) {
//                     score[p] = 1
//                     actual_tracked.splice(a, 1, 0)
//                     break
//                 }
//                 else {
//                     score[p] = 0
//                 }
//             }
//         }
//         pred_tracked[p] = 0 // mark that item has been checked (no impact)
//     }

//     return score

// }

// function sortResults(score) {
//     const scoreFiltered = score.filter((i) => i>0)
//     const scoreSorted = scoreFiltered.sort()

//     return scoreSorted;
// }

// function playRound(actual, predicted) {
//     progress = scoreExact(actual, predicted)
//     score = scorePartial(progress)
//     scoreSorted = sortResults(score)

//     return scoreSorted
// }

const game = document.querySelector("#play")
const score_code = {1: "Partial Match", 2: "Exact Match"}

// import gameThemes from './game_themes.json';

function loadGamePage() {
    const dropdown = document.getElementById("myDropdown")
    const themeList = ["animals", "ice-cream"]
    themeList.forEach(theme => {
        const newTheme = document.createElement("a")
        newTheme.textContent = theme
        newTheme.href = "#"
        dropdown.append(newTheme)

        newGameClasses = document.getElementById("new-game").classList

        newTheme.addEventListener("click", function() {
            document.getElementById("theme").textContent = theme

            newGameClasses.remove("hide-button")
            newGameClasses.add("show-button")
        })
    })
}

function addUserKeys() {
    const theme = document.querySelector("#theme").textContent
    optionsList = ["option1", "option2", "option3", "option4", "option5"]
    const choices = document.querySelector("#user-choices");

    const newLabel = document.createElement("h2")
    newLabel.textContent = "Options:"
    choices.append(newLabel)

    optionsList.forEach(option => {
        const newOption = document.createElement("img")
        newOption.src = `./img/game/${theme}/${option}.png`
        newOption.className = "game-icons"

        choices.append(newOption)

        newOption.addEventListener("mouseover", function() {
            // newOption.style.width = "50px";
            // newOption.style.height = "50px";
            newOption.style.maxWidth = "13%";
        });

        newOption.addEventListener("mouseout", function() {
            // newOption.style.width = "30px";
            // newOption.style.height = "30px";
            newOption.style.maxWidth = "10%";
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
}

function addRobotSelections() {
    const theme = document.querySelector("#theme").textContent
    const robotSelections = document.getElementById("robot-selections")
    // robotSelections.style.display = "none"
    // game.append(robotSelections)

    const newLabel = document.createElement("h2")
    newLabel.textContent = "Answer:"
    robotSelections.append(newLabel)

    let randomItem
    for (let a = 0; a < 4; a++) {
        randomItem = optionsList[Math.floor(Math.random() * optionsList.length)];

        const robotSelection = document.createElement("img")
        robotSelection.src = `./img/game/${theme}/${randomItem}.png`
        robotSelection.alt = randomItem
        robotSelection.className = "game-icons"
        robotSelections.append(robotSelection)
    }
}

function showHideAnswer(event) {
    const showAnsButton = document.getElementById("show-answer");
    showAnsButton.className = "show-button"

    curr = event.target.textContent
    if (curr === "Show Answer"){
        showAnsButton.textContent = "Hide Answer"
        // robotSelections.style.display = "flex"}
        document.getElementById("robot-selections").className="show-answer"
    }
    else {
        showAnsButton.textContent = "Show Answer"
        // robotSelections.style.display = "none"}
        document.getElementById("robot-selections").className=""
    }
}

function initiateNewGame() {

    resetGame()
    addUserKeys()
    addRobotSelections()
    initiateNewRound()

    document.getElementById("show-answer").className = "show-button"
    // document.getElementById("new-prediction").className = "show-button"
    document.getElementById("game-title").className = ""
    document.getElementById("theme").className = ""
    document.getElementById("new-game").className = "show-button"
}

function addOptionClickEvent(event) {
    // alert("something happened!")
    const currentRound = document.querySelector("#current-round");
    const newSelections = document.querySelector("#current-round .user-selections")
    const selections = document.querySelectorAll("#current-round .user-selections img");

    if (selections.length == 0) {
        document.querySelector("#clear-answer").className="show-button";
    }

    if (selections.length < 4) {
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

   if (selections.length === 3) {
        document.querySelector("#submit-answer").className="show-button";
    }
}

function initiateNewRound() {
    if (document.querySelectorAll("#current-round").length >0) {
        alert("Need to finish current round before starting a new round")
    }

    else {
        const currentRound = document.createElement("div")
        currentRound.className = "rounds"
        currentRound.id = "current-round"
        // gamePlay.insertBefore(currentRound, gamePlay.firstChild);
        const referenceElement = document.getElementById("gameplay-buttons")
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
    })}

    // document.querySelector("#new-prediction").className="hide-button";
}

function checkPredictions() {
    const theme = document.querySelector("#theme").textContent
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

    scoreSorted = playRound(actual, predicted)

    const newResults = document.createElement("div");
    newResults.className = "user-results"
    currentRound.append(newResults)

    const newLabel = document.createElement("h2");
    newLabel.textContent = "Results:"
    newResults.append(newLabel)
    
    scoreSorted.forEach(score => {
        const resultType = score_code[score]
        const fileName = resultType.toLowerCase().replace(/ /g, "_")

        const newResult = document.createElement("img");
        newResult.src = `./img/game/${theme}/${fileName}.png`
        newResult.alt = fileName
        newResult.className = "game-icons"

        newResults.append(newResult)
    })
    
    // document.querySelector("#new-prediction").className="show-button";
    const roundNum = resetRound()
    initiateNewRound()

    if (scoreSorted.filter(score => score === 2).length === 4) {
        winGame();
    }
    else if (roundNum == 10) {
        loseGame();
    }
}

function resetRound() {
    const clearButton = document.querySelector("#clear-answer");
    clearButton.removeEventListener("click", clearPredictions)
    clearButton.className = "hide-button"

    const submitButton = document.querySelector("#submit-answer");
    submitButton.removeEventListener("click", checkPredictions)
    submitButton.className = "hide-button"

    const currRound = document.querySelector(".rounds")
    const prevRound = currRound.nextElementSibling

    if (prevRound == null) {
        roundNum = 1
    }
    else {
        const prevRoundTxt = prevRound.querySelector(".user-selections h2").textContent
        const prevRoundNum = parseInt(prevRoundTxt.slice(-1))
        roundNum = prevRoundNum + 1
    } 

    currRound.querySelector(".user-selections h2").textContent = `Round ${roundNum}`
    currRound.id=""

    const choices = document.querySelectorAll("#user-choices img");

    choices.forEach(choice => {
        choice.removeEventListener("click", addOptionClickEvent); // Remove previous listeners to prevent duplicates
    });   

    return roundNum
}

function clearPredictions() {
    const selections = document.querySelectorAll("#current-round .user-selections img");

    selections.forEach(selection => {
        selection.remove()
    })

    document.querySelector("#clear-answer").className="hide-button";
    document.querySelector("#submit-answer").className="hide-button";
}

function resetGame() {
    const rounds = document.querySelectorAll(".rounds")

    rounds.forEach(round => {
        round.remove()
    })

    // remove child elements of specified parents
    const parentIds = ["robot-selections", "user-choices", "result-key"]

    parentIds.forEach(parentId => {
        const parentObj = document.getElementById(parentId)
        while (parentObj.firstChild) {
            parentObj.removeChild(parentObj.firstChild)
        }            
    })

    const buttonIds = ["show-answer", "clear-answer", "submit-answer"]

    buttonIds.forEach(buttonId => {
        document.getElementById(buttonId).className="hide-button"
    })
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showHideDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
    // alert('something happened')
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('#theme')) {
      const dropdowns = document.getElementById("myDropdown");
      dropdowns.classList.remove('show');
    }
  }

function winGame() {
    // document.querySelector("#new-prediction").className="hide-button"
    document.getElementById("show-answer").textContent = "Hide Answer"
    document.getElementById("robot-selections").className="show-answer"

    alert("YOU WIN!")
}

function loseGame() {
    // document.querySelector("#new-prediction").className="hide-button"
    document.getElementById("show-answer").textContent = "Hide Answer"
    document.getElementById("robot-selections").className="show-answer"

    alert("GAME OVER")
}

initializeTabs();
addingEventListener();
addDodgerEvents();
logoZoom();
loadGamePage();
// addUserPrediction();