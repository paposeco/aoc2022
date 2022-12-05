const prepFile = function(file: string): string[] {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const plays: string[] = fileToString.split("\n");
    return plays;
};

// a rock
// b paper
// c scissors

// A > Z
// C > Y
// B > X



const countPoints = function(file: string) {
    const xPoints = 1; //rock
    const yPoints = 2; //paper
    const zPoints = 3; //scissors
    const moves = prepFile(file);
    console.log(moves)
    let points = 0;
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] === "") {
            continue;
        }
        console.log("starting points: " + points);
        const opponent = moves[i][0];
        const player = moves[i][2];
        if ((opponent === "A" && player === "X") || (opponent === "B" && player === "Y") || (opponent === "C" && player === "Z")) {
            // draws
            if (player === "X") {
                points = points + xPoints + 3;
            } else if (player === "Y") {
                points = points + yPoints + 3;
            } else {
                points = points + zPoints + 3;
            }
            //loses 
        } else if (opponent === "A" && player === "Z") {
            points = points + zPoints;
        } else if (opponent === "C" && player === "Y") {
            points = points + yPoints;
        } else if (opponent === "B" && player === "X") {
            points = points + xPoints;
        } else {
            //wins
            if (player === "X") {
                points = points + 6 + xPoints;
            } else if (player === "Y") {
                points = points + 6 + yPoints;
            } else {
                points = points + 6 + zPoints;
            }
        }
        console.log("after points: " + points);
    }
    return points;
}

//console.log(countPoints("input.txt"));

const countPointsFromEnd = function(file: string) {
    const moves = prepFile(file);
    const rock = 1; //rock
    const paper = 2; //paper
    const scissors = 3; //scissors
    let points = 0;
    //x loss
    //y draw
    //z win
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] === "") {
            continue;
        }
        const howItEnds = moves[i][2];
        const opponent = moves[i][0];
        if (howItEnds === "X") {
            if (opponent === "A") {
                points = points + scissors;
            } else if (opponent === "B") {
                points = points + rock;
            } else {
                points = points + paper;
            }
        } else if (howItEnds === "Y") {
            if (opponent === "A") {
                points = points + rock + 3;
            } else if (opponent === "B") {
                points = points + paper + 3;
            } else {
                points = points + scissors + 3;
            }
        } else {
            if (opponent === "A") {
                points = points + paper + 6;
            } else if (opponent === "B") {
                points = points + scissors + 6;
            } else {
                points = points + rock + 6;
            }
        }
    }
    return points;
}

console.log(countPointsFromEnd("input.txt"));
