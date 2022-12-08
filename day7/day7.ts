const prepareFileDay7 = function (file: string) {
    const fs = require("fs");
    const fileToString: string = fs.readFileSync(file).toString();
    const text: string[] = fileToString.split("\n");
    text.pop();
    return text;
}


//console.log(prepareFileDay7("inputmini.txt"));

interface Directory{
    size: number,
    parentDirectory: string[],
    childrenDirectories: string[],
}



const analyseDirectoryStructure = function(file:string){
    const rawInput = prepareFileDay7(file);
    const directoryMap:Map<string, Directory> = new Map();
    for(let i = 0; i < rawInput.length; i++){
        const cmd = rawInput[i];
        if (cmd.includes("$ cd") && (cmd.includes("$ cd ..") === false)){
            const newInput = rawInput.slice(i+1);
            const endOfLs = newInput.findIndex((element) => element.includes("$ cd"));
            const dirLS = newInput.slice(0,endOfLs);
            const dirName = cmd.slice(5);
            let dirDirectories:string[] = [];
            let filesSize: number = 0;
            for (let j = 0; j < dirLS.length; j++){
                const subcmd = dirLS[j];
                if(subcmd.includes("dir")){
                    const subDirName = subcmd.slice(4);
                    dirDirectories.push(subDirName);
                    const subDirNameEntry = directoryMap.get(subDirName);
                    if(subDirNameEntry !== undefined){
                        directoryMap.set(subDirName, { size: subDirNameEntry.size, parentDirectory: subDirNameEntry.parentDirectory.concat(dirName), childrenDirectories: subDirNameEntry.childrenDirectories })
                    }else{
                        directoryMap.set(subDirName, { size: 0, parentDirectory: [dirName], childrenDirectories: [] });
                    }

                }
                if((Number(subcmd[0])/Number(subcmd[0])) === 1){
                    const endOfNumber = subcmd.indexOf(" ");
                    const currentSize = Number(subcmd.slice(0, endOfNumber));
                    filesSize += currentSize;
                }
            }

            // if the dir already exists on map, keep parent directory
            // se calhar s+o devo ter um parent 
            if(directoryMap.has(dirName)){
                const dirNameEntry = directoryMap.get(dirName);
                if(dirNameEntry !== undefined){
                    directoryMap.set(dirName, { size: filesSize + dirNameEntry.size, parentDirectory: dirNameEntry.parentDirectory, childrenDirectories: dirDirectories });
                    dirNameEntry.parentDirectory.forEach((parentDir) =>{
                        const parentDirMapEntry = directoryMap.get(parentDir);
                        if(parentDirMapEntry !== undefined){
                            directoryMap.set(parentDir,{ size: parentDirMapEntry.size+filesSize, parentDirectory: parentDirMapEntry.parentDirectory, childrenDirectories: parentDirMapEntry.childrenDirectories});
                        }
                        //recursive?
                    })
                }
            }else{
                    directoryMap.set(dirName, { size: filesSize, parentDirectory: [], childrenDirectories: dirDirectories });
            }

        }

    }
    return directoryMap;
}


interface Directory2 {
    size: number,
    parentDirectory: string,
    childrenDirectories: string[],
}



// faço a conta do size depois e só tem um parent 

const analyseDirectoryStructure2 = function(file:string){
    const rawInput = prepareFileDay7(file);
    const directoryMap:Map<string, Directory2> = new Map();
    for(let i = 0; i < rawInput.length; i++){
        const cmd = rawInput[i];
        if (cmd.includes("$ cd") && (cmd.includes("$ cd ..") === false)){
            const newInput = rawInput.slice(i+1);
            const endOfLs = newInput.findIndex((element) => element.includes("$ cd"));
            const dirLS = newInput.slice(0,endOfLs);
            const dirName = cmd.slice(5);
            let dirDirectories:string[] = [];
            let filesSize: number = 0;
            for (let j = 0; j < dirLS.length; j++){
                const subcmd = dirLS[j];
                if(subcmd.includes("dir")){
                    const subDirName = subcmd.slice(4);
                    dirDirectories.push(subDirName);
                    const subDirNameEntry = directoryMap.get(subDirName);
                    if(subDirNameEntry !== undefined){
                        directoryMap.set(subDirName, { size: subDirNameEntry.size, parentDirectory: dirName, childrenDirectories: subDirNameEntry.childrenDirectories })
                    }else{
                        directoryMap.set(subDirName, { size: 0, parentDirectory: dirName, childrenDirectories: [] });
                    }

                }
                if((Number(subcmd[0])/Number(subcmd[0])) === 1){
                    const endOfNumber = subcmd.indexOf(" ");
                    const currentSize = Number(subcmd.slice(0, endOfNumber));
                    filesSize += currentSize;
                }
            }

            // if the dir already exists on map, keep parent directory
            // se calhar s+o devo ter um parent 
            if(directoryMap.has(dirName)){
                const dirNameEntry = directoryMap.get(dirName);
                if(dirNameEntry !== undefined){
                    directoryMap.set(dirName, { size: filesSize + dirNameEntry.size, parentDirectory: dirNameEntry.parentDirectory, childrenDirectories: dirDirectories });
                }
            }else{
                    directoryMap.set(dirName, { size: filesSize, parentDirectory: "", childrenDirectories: dirDirectories });
            }

        }

    }
    return directoryMap;
}





const countDirectories = function(file: string){
    const directoryMap = analyseDirectoryStructure2(file);
    console.log(directoryMap);
    const iterator1 = directoryMap.entries();
    let sumDirectories = 0;
    for(const item of iterator1){
        const itemSize = item[1].size;
        const children = item[1].childrenDirectories;
        const parent = item[1].parentDirectory;
        if(itemSize < 100000){
            sumDirectories += countSizeChildren(directoryMap, children, itemSize);
        }
    }

    // let sumDirectories = 0;
    // for (const item of iterator1) {
    //     if(item[1].size < 100000){
    //         console.log(item[1].size);
    //         sumDirectories += item[1].size;
    //     }
    // }
     return sumDirectories;
}

const countSizeChildren = function(map: Map<string, Directory2>, childrenDirectories: string[], directorySize: number){
    console.log("back at the top");
    let currentDirSize = directorySize;
    console.log("dir size inside top: " + currentDirSize);
    if(childrenDirectories.length === 0){
        return currentDirSize;
    }
    for(let i = 0; i < childrenDirectories.length; i++){
        const childDirectory = childrenDirectories[i];
        const mapEntry = map.get(childDirectory);
        if(mapEntry !== undefined){
            currentDirSize += mapEntry.size;
            if(currentDirSize > 100000){
                console.log("dir size inside 0: "+ currentDirSize);
                console.log("return 0");
                return 0;
            }else{
                countSizeChildren(map, mapEntry.childrenDirectories, currentDirSize);
            }
        }
    }
    //console.log(directorySize);
    return currentDirSize;
}

console.log(countDirectories("input.txt"));

