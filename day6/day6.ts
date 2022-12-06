const prepareFileDay6 = function (file: string) {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const text: string[] = fileToString.split("\n");
    text.pop();
    return text[0];
}


// lazy version

const findMarker = function(buffer:string):number{
    let markCounter = 0;
    let currentstring = "";
    for(let i = 0; i < buffer.length; i++){
        ++markCounter;
        if(markCounter <= 4){
            currentstring += buffer[i];
            continue;
        }
        const newstring = currentstring.slice(1)+buffer[i];
        currentstring = newstring;
        const firstLetter = newstring[0];
        const secondLetter = newstring[1];
        const thirdLetter = newstring[2];
        const fourthLetter = newstring[3];
        if ((firstLetter !== secondLetter) && (firstLetter !== thirdLetter) && (firstLetter !== fourthLetter) && (secondLetter !== thirdLetter) && (secondLetter !== fourthLetter) && (thirdLetter !== fourthLetter)){
            break;
        }
    }
    return markCounter;
}

//console.log(findMarker(prepareFileDay6("input.txt")));

const findMessage = function(buffer:string){
    let markCounter = 0;
    let currentstring = "";
    for (let i = 0; i < buffer.length; i++) {
        ++markCounter;
        if (markCounter <= 14) {
            currentstring += buffer[i];
            continue;
        }
        const newstring = currentstring.slice(1) + buffer[i];
        currentstring = newstring;
        const letterMap = new Map();
        let found = false;
        for(let j = 0; j<currentstring.length; j++){
            if(letterMap.has(currentstring[j])){
                break;
            }else{
                letterMap.set(currentstring[j], 1);
                if(j===currentstring.length-1){
                    found=true;
                }
            }
        }
        if(found){
            return markCounter
        }
    }
}

console.log(findMessage(prepareFileDay6("input.txt")));
