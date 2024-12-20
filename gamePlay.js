
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

function sortResults(score) {
    const scoreFiltered = score.filter((i) => i>0)
    const scoreSorted = scoreFiltered.sort()

    return scoreSorted;
}

function playRound(actual, predicted) {
    progress = scoreExact(actual, predicted)
    score = scorePartial(progress)
    scoreSorted = sortResults(score)

    return scoreSorted
}