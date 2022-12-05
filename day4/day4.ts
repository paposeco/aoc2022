const prepareFileDay4 = function (file: string) {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const pairs: string[] = fileToString.split("\n");
    pairs.pop();
    let cleanPairs = [];
    for(let i = 0; i < pairs.length; i++){
        const pair = pairs[i].split(",");
        const withoutDash = [pair[0].split("-"), pair[1].split("-")];
        const singlearray = withoutDash.flat();
        cleanPairs.push(singlearray.map(s => Number(s)));
    }
    return cleanPairs
};


const findFullyContainedRange = function(sections: number[]):boolean{
    if(sections[0] < sections[2] && sections[1] < sections[3]){
        return false;
    }
    else if(sections[0]> sections[2] && sections[1] > sections[3]){
        return false;
    }
    else{
        return true;
    }
}

const checkPairs = function(file:string):number{
    const pairs = prepareFileDay4(file);
    let countPairs = 0;
    pairs.forEach((pair) => {
        const isContained = findFullyContainedRange(pair);
        if(isContained){
            ++countPairs;
        }
    });
    return countPairs
}

const findOverlaps = function(sections: number[]):boolean{
    if(sections[0] === sections[2] || sections[1] === sections[2] || sections[3] === sections[0] || sections[1] === sections[3]){
        return true;
    }
     if(sections[0]<= sections[2] && sections[1]>= sections[2]){
        return true;
    }else if(sections[0] >=sections[2] && sections[0] <= sections[3]){
        return true;
    }else{
        return false;
    }
}

const checkOverlaps = function(file:string):number{
    const pairs = prepareFileDay4(file);
    let overlaps = 0;
    pairs.forEach((pair) => {
        const isContained = findOverlaps(pair);
        if (isContained) {
            ++overlaps;
        }else{
        }
    });
    return overlaps;
}

console.log(checkOverlaps("input.txt"));
