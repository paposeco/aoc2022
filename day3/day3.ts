const prepareFile = function (file: string): string[] {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const plays: string[] = fileToString.split("\n");
    plays.pop();
    return plays;
};

const identifyItem = function(rucksack: string): number{
    const numberItems = rucksack.length;
    const firstCompartment = rucksack.substring(0, numberItems/2);
    const secondCompartment = rucksack.substring(numberItems/2);
    let item: string = "";
    for(let i = 0; i < firstCompartment.length; i++){
        if(secondCompartment.includes(firstCompartment[i])){
            item = firstCompartment[i];
            break;
        }
    }
    if(item.toUpperCase() === item){
        return item.charCodeAt(0) - 38;
    }else{
        return item.charCodeAt(0) - 96;
    }
}

const checkRucksacks = function(file: string): number{
    const rucksacks = prepareFile(file);
    let prioritySum: number = 0;
    for(let i = 0; i < rucksacks.length; i++){
         prioritySum += identifyItem(rucksacks[i]);
    }
    return prioritySum;
} 


const checkGroup = function(elves: [string, string, string]): string{
    let elfToCheck:string = "";
    const firstElfLength = elves[0].length;
    const secondElfLength = elves[1].length;
    const thirdElfLength = elves[2].length;
    let otherElf: string = "";
    let otherotherElf: string = "";
    if((firstElfLength < secondElfLength) && (firstElfLength < thirdElfLength)){
        elfToCheck = elves[0];
        otherElf = elves[1];
        otherotherElf = elves[2];
    }else if((secondElfLength < firstElfLength) && (secondElfLength < thirdElfLength)){
        elfToCheck = elves[1];
        otherElf = elves[0];
        otherotherElf = elves[2];
    }else{
        elfToCheck = elves[2];
        otherElf = elves[0];
        otherotherElf = elves[1];
    }
    let badge: string = "";
    for(let i = 0; i < elfToCheck.length; i++){
        if(otherElf.includes(elfToCheck[i])){
            if(otherotherElf.includes(elfToCheck[i])){
                badge = elfToCheck[i]; 
            }
        }
    }
    return badge;
}

const identifyBadge = function (file:string) {
    const prepFile = prepareFile(file);
    let prioritySum: number = 0;
    for(let i = 0; i < prepFile.length; i++){
        const badge = checkGroup([prepFile[i], prepFile[i+1], prepFile[i+2]]);
        i += 2;
        if(badge.toUpperCase() === badge){
        prioritySum += badge.charCodeAt(0) - 38;
        }else{
        prioritySum += badge.charCodeAt(0) - 96;
        }
    }
    return prioritySum;
}

// a 97 | 1
// z 122 | 26

// A 64 | 27
// Z 90 | 52

console.log(identifyBadge("input.txt"));
