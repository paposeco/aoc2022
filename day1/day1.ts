const prepFile = function(file: string) {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const calories: string[] = fileToString.split("\n");
    return calories;
};

const countCalories = function(file: string) {
    let fattestElfCalories: number = 0;
    let caloriesSum: number = 0;
    const caloriesList: string[] = prepFile(file);
    for (let i = 0; i < caloriesList.length; i++) {
        if (caloriesList[i] === "") {
            if (fattestElfCalories < caloriesSum) {
                fattestElfCalories = caloriesSum;
                caloriesSum = 0;
                continue;
            } else if (fattestElfCalories >= caloriesSum) {
                caloriesSum = 0;
                continue;
            }
        }
        const currentcalories = Number(caloriesList[i]);
        caloriesSum = caloriesSum + currentcalories;
    }
    return fattestElfCalories;
};

const countCaloriesThreeElves = function(file: string) {
    let fattestElfCaloriesMap = new Map([
        [1, 0],
        [2, 0],
        [3, 0],
    ]);
    let caloriesSum: number = 0;
    const caloriesList: string[] = prepFile(file);
    for (let i = 0; i < caloriesList.length; i++) {
        if (caloriesList[i] === "") {
            const lastElf = fattestElfCaloriesMap.get(3);
            const firstElf = fattestElfCaloriesMap.get(1);
            const secondElf = fattestElfCaloriesMap.get(2);
            if (
                lastElf !== undefined &&
                firstElf !== undefined &&
                secondElf !== undefined
            ) {
                if (caloriesSum < lastElf) {
                    caloriesSum = 0;
                    continue;
                } else if (caloriesSum > firstElf) {
                    fattestElfCaloriesMap.set(3, secondElf);
                    fattestElfCaloriesMap.set(2, firstElf);
                    fattestElfCaloriesMap.set(1, caloriesSum);
                    caloriesSum = 0;
                    continue;
                } else if (caloriesSum > secondElf) {
                    fattestElfCaloriesMap.set(3, secondElf);
                    fattestElfCaloriesMap.set(2, caloriesSum);
                    caloriesSum = 0;
                    continue;
                } else if (caloriesSum > lastElf) {
                    fattestElfCaloriesMap.set(3, caloriesSum);
                    caloriesSum = 0;
                    continue;
                }
            }
        }
        const currentcalories = Number(caloriesList[i]);
        caloriesSum = caloriesSum + currentcalories;
    }
    const finalLastElf = fattestElfCaloriesMap.get(3);
    const finalFirstElf = fattestElfCaloriesMap.get(1);
    const finalMiddleElf = fattestElfCaloriesMap.get(2);
    if (
        finalLastElf !== undefined &&
        finalFirstElf !== undefined &&
        finalMiddleElf !== undefined
    ) {
        return finalLastElf + finalFirstElf + finalMiddleElf;
    }
    return "error";
};

console.log(countCaloriesThreeElves("input.txt"));
