interface Directions {
    quantity: number,
    fromStack: string,
    toStack: string
}

const prepareFileDay5 = function (file: string): [Map<string,string[]>, Directions[]] {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const text: string[] = fileToString.split("\n");
    text.pop();

    const endOfStacks = text.indexOf((""));
    const movements = text.slice(endOfStacks+1);
    const stacks = text.slice(0, endOfStacks);
    const base = stacks[stacks.length-1];
    const stackMap:Map<string, string[]> = new Map();
    for(let i = 0; i < base.length; i++){
        if(base[i] === " "){
            continue;
        }
        const verticalStack: string[] = [];
        for(let j = stacks.length-2; j >= 0; j--){
            if(stacks[j][i] === " "){
                continue;
            }
            verticalStack.push(stacks[j][i]);
        }
        stackMap.set(base[i], verticalStack);
    }
    let movementDirections:Directions[] = [];
    for(let k = 0; k < movements.length; k++){
        const indexofF = movements[k].indexOf("f");
        const quantityToMove = Number(movements[k].slice(4, indexofF));
        const indexofT = movements[k].indexOf("t");
        const fromStack = movements[k].slice(indexofF+5,indexofT).trim();
        const toStack = movements[k].slice(indexofT+3).trim();
        movementDirections.push({quantity: quantityToMove, fromStack: fromStack, toStack: toStack});
    }
    return [stackMap, movementDirections];
};


//prepareFileDay5("inputmini.txt");


const moveStacks = function(file:string){
    const prepFile:[Map<string,string[]>, Directions[]] = prepareFileDay5(file);
    const directions: Directions[] = prepFile[1];
    const stacks:Map<string,string[]> = prepFile[0];
    for(let i = 0; i < directions.length; i++){
        const quantity = directions[i].quantity;
        const fromStackDirections = directions[i].fromStack;
        const toStackDirections = directions[i].toStack;
        for(let j = 0 ; j < quantity; j++){
            const currentFromStack = stacks.get(fromStackDirections);
            if (currentFromStack !== undefined) {
                const crateToMove: string = currentFromStack[currentFromStack.length - 1];
                const updateFromCurrentStack = currentFromStack.slice(0, currentFromStack.length - 1);
                stacks.set(fromStackDirections, updateFromCurrentStack);
                const currentToStack = stacks.get(toStackDirections);
                if (currentToStack !== undefined) {
                    currentToStack.push(crateToMove);
                    stacks.set(toStackDirections, currentToStack);
                }
            }
        }   
        }
    console.log(createMessage(stacks));
}

const createMessage = function(stacks: Map<string, string[]>){
    const entireStacks = stacks.values();
    let message = "";
    for (const stack of entireStacks) {
        message += stack[stack.length-1];
    }
    return message;
}



const moveStacksInMultiples = function(file:string){
    const prepFile:[Map<string,string[]>, Directions[]] = prepareFileDay5(file);
    const directions: Directions[] = prepFile[1];
    const stacks:Map<string,string[]> = prepFile[0];
    for(let i = 0; i < directions.length; i++){
        const quantity = directions[i].quantity;
        const fromStackDirections = directions[i].fromStack;
        const toStackDirections = directions[i].toStack;
            const currentFromStack = stacks.get(fromStackDirections);
            if (currentFromStack !== undefined) {
                const crateToMove: string[] = currentFromStack.slice(currentFromStack.length - quantity, currentFromStack.length);
                const updateFromCurrentStack = currentFromStack.slice(0, currentFromStack.length - quantity);
                stacks.set(fromStackDirections, updateFromCurrentStack);
                const currentToStack = stacks.get(toStackDirections);
                if (currentToStack !== undefined) {
                    const cratemoved = currentToStack.concat(crateToMove);
                    stacks.set(toStackDirections, cratemoved);
                } 
            }
        }
    console.log(createMessage(stacks));
}


moveStacksInMultiples("input.txt");
