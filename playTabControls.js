// const game = document.querySelector("#play")
const scoreCode = {1: "Partial Match", 2: "Exact Match"}

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
            themeButton = document.getElementById("theme")
            themeButton.textContent = theme
            themeButton.classList.add("selected")

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
            newOption.style.maxWidth = "18%";
        });

        newOption.addEventListener("mouseout", function() {
            newOption.style.maxWidth = "12%";
        });

    })

    const resultKey = document.querySelector("#result-key");
    const allScores = [1, 2]
    allScores.forEach(score => {
        const resultType = scoreCode[score]
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
        document.getElementById("robot-selections").className="show-answer"
    }
    else {
        showAnsButton.textContent = "Show Answer"
        document.getElementById("robot-selections").className=""
    }
}

function initiateNewGame() {

    resetGame()
    addUserKeys()
    addRobotSelections()
    initiateNewRound()

    document.getElementById("show-answer").textContent = "Show Answer"
    document.getElementById("robot-selections").className=""

    document.getElementById("game-title").className = ""
    document.getElementById("theme").classList.remove("opening-page")
    document.getElementById("myDropdown").className = ""
    document.getElementById("show-answer").className = "show-button"    
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

    const currentRound = document.createElement("div")
    currentRound.className = "rounds"
    currentRound.id = "current-round"

    const referenceElement = document.getElementById("gameplay-buttons")
    referenceElement.insertAdjacentElement('afterend', currentRound)

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

    const newResults = document.createElement("div");
    newResults.className = "user-results"
    currentRound.append(newResults)     
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

    const newResults = document.querySelector("#current-round div.user-results");

    const newLabel = document.createElement("h2");
    newLabel.textContent = "Results:"
    newResults.append(newLabel)
    
    scoreSorted.forEach(score => {
        const resultType = scoreCode[score]
        const fileName = resultType.toLowerCase().replace(/ /g, "_")

        const newResult = document.createElement("img");
        newResult.src = `./img/game/${theme}/${fileName}.png`
        newResult.alt = fileName
        newResult.className = "game-icons"

        newResults.append(newResult)
    })
    
    const roundNum = resetRound()

    if (scoreSorted.filter(score => score === 2).length === 4) {
        winGame();
    }
    else if (roundNum == 10) {
        loseGame();
    }
    else {
        initiateNewRound()
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
  
function winGame() {
    document.getElementById("show-answer").textContent = "Hide Answer"
    document.getElementById("robot-selections").className="show-answer"

    alert("YOU WIN!")
}

function loseGame() {
    document.getElementById("show-answer").textContent = "Hide Answer"
    document.getElementById("robot-selections").className="show-answer"

    alert("GAME OVER")
}

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('#theme')) {
      const dropdowns = document.getElementById("myDropdown");
      dropdowns.classList.remove('show');
    }
  }

loadGamePage();