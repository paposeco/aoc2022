const prepareFileDay7 = function (file: string) {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const text: string[] = fileToString.split("\n");
    text.pop();
    console.log(text);
    return text;
}


//console.log(prepareFileDay7("inputmini.txt"));

interface Directory{
    size: number,
    parentDirectory: string[],
    childrenDirectories: string[],
}

interface Directory2 {
    size: number,
    parentDirectory: string,
    childrenDirectories: string[],
}

interface RepeatedDir{
    counter: number
}

interface RepeatedDir2{
    newnames: string[],
    counter: number
}

interface Directory3{
    size: number,
    childrenDirectories: string[]
}


interface Directory3{
    size: number,
    childrenDirectories: string[]
}


const analyseDirectories2 = function(file: string): Map<string, Directory3>{
    const rawInput = prepareFileDay7(file);
    const directoryMap: Map<string, Directory3> = new Map();
    const repeatedDirectories: Map<string, RepeatedDir> = new Map();
    for (let i = 0; i < rawInput.length; i++) {
        const cmd = rawInput[i];
        if (cmd.includes("$ cd") && (cmd.includes("$ cd ..") === false)) {
            // inside cd
            const newInput = rawInput.slice(i + 1);

            const endOfLs = newInput.findIndex((element) => element.includes("$ cd"));
            let dirLS;
            if (endOfLs === -1) {
                // last cd
                dirLS = newInput;
            } else {
                dirLS = newInput.slice(0, endOfLs);
            }
            console.log(dirLS);
            const dirName = cmd.slice(5);
            let dirDirectories:string[] = [];
            let filesSize: number = 0;
            // what happens after cd up to the next ls 
            for (let j = 0; j < dirLS.length; j++){
                const subcmd = dirLS[j];
                console.log('subcmd: ' + subcmd);
                if(subcmd.includes("dir")){
                    const subDirName = subcmd.slice(4);
                    if(directoryMap.has(subDirName)){
                        console.log("entry exists on map repeat");
                        const repeatedDirectory = repeatedDirectories.get(subDirName);
                        if(repeatedDirectory !== undefined){
                            const newcounter: number = Number(repeatedDirectory.counter+1);
                            const newSubDirName: string = subDirName+newcounter;
                            repeatedDirectories.set(subDirName, {counter: newcounter});
                            dirDirectories.push(newSubDirName);
                            console.log("new name: "+ subDirName);
                        }

                    }else{
                        dirDirectories.push(subDirName);
                    }
                }
                if ((Number(subcmd[0]) / Number(subcmd[0])) === 1) {
                    const endOfNumber = subcmd.indexOf(" ");
                    const currentSize = Number(subcmd.slice(0, endOfNumber));
                    filesSize += currentSize;
                }
            }

            if(directoryMap.has(dirName)){
                console.log("exists on directory map");
                // not sure if the counter should only be updated on subs or here too.  seclahar so nos subs porque ]e sempre filho de alguem
                    const repeatedDirectory = repeatedDirectories.get(dirName);
                    if(repeatedDirectory !== undefined){
                        const currcounter = repeatedDirectory.counter+1;
                        const newDirName = dirName + currcounter;
                        repeatedDirectories.set(dirName, {counter: currcounter});
                        console.log("new name on directory name: "+newDirName);
                        directoryMap.set(newDirName, {size: filesSize, childrenDirectories: dirDirectories});
                        console.log(newDirName, filesSize, dirDirectories);
                    }
            }else{
                console.log("doesn-t exist already");
                directoryMap.set(dirName, {size: filesSize, childrenDirectories: dirDirectories});
                console.log(dirName, filesSize, dirDirectories);
                repeatedDirectories.set(dirName, {counter:0});
            }
        }
    }
    return directoryMap;
}

//console.log(analyseDirectories2("input.txt"));


const countDirectories = function(file: string){
    const directoryMap:Map<string, Directory3> = analyseDirectories2(file);
    const iterator1 = directoryMap.entries();
    let sumDirectories = 0;
    for(const item of iterator1){
        console.log("sum directories: "+sumDirectories);
        const itemSize = item[1].size;
        const children = item[1].childrenDirectories;
        console.log("current dir: " + item[0] + ", size: " + itemSize + ", children: " + children);
        if(itemSize <= 100000){
            sumDirectories += countSizeChildren(directoryMap, children, itemSize);
        }else{
            console.log("current dir too large")
        }
    }
     return sumDirectories;
}

const countSizeChildren = function(map: Map<string, Directory3>, childrenDirectories: string[], directorySize: number){
    console.log("count size of children");
    let currentDirSize = directorySize;
    console.log("initial directory size: " + currentDirSize);
    console.log("children directories: " + childrenDirectories);
    if(childrenDirectories.length === 0){
        console.log("no children. return currentdirsize");
        return currentDirSize;///////////////////////
    }




    for(let i = 0; i < childrenDirectories.length; i++){
        console.log("inside for loop")
        const childDirectory = childrenDirectories[i];
        const mapEntry = map.get(childDirectory);
        if(mapEntry !== undefined){
            console.log("current child: " + childDirectory + ", size: " + mapEntry.size + ", children: " + mapEntry.childrenDirectories);
            if(mapEntry.size > 100000){
                console.log("child too large");
                return 0;
            }
            currentDirSize += mapEntry.size;
            console.log("dir size increased to: "+ currentDirSize);
            if(currentDirSize > 100000){
                console.log("dir size inside 0: "+ currentDirSize);
                console.log("no point in continuing. more than 100000");
                return 0;
            }else{
                console.log("we go again");
                countSizeChildren(map, mapEntry.childrenDirectories, currentDirSize);
            }
        }else{console.log("undefined")}
    }
    //console.log(directorySize);
    return currentDirSize;
}

console.log(countDirectories("input.txt"));
