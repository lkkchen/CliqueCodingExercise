import * as fs from 'fs';
import * as fsPath from 'path';



export interface LoadFileResult {
    filePath: string,
    name: string,
}

export function loadFiles(dirPath: string): Array<LoadFileResult> {
    const baseDir = process.cwd();
    console.log(baseDir);

    const startPath = fsPath.join(baseDir, dirPath);
    const from = fsPath.basename(startPath);
    console.log(startPath);
    console.log(from);

    let result: Array<LoadFileResult> = [];
    function finder(path, faDirName = "") {
        let files = fs.readdirSync(path);
        for(const name of files){
            let fPath = fsPath.join(path, name);
            let stats = fs.statSync(fPath);
            let ext = fsPath.extname(name);
            let noExtName = fsPath.basename(name, ext).toLowerCase();
            noExtName = noExtName.split(from).join("");

            const fpName = faDirName ? `${faDirName}.${noExtName}` : noExtName;
            if (stats.isDirectory()) {
                finder(fPath, fpName);
                continue;
            }

            result.push({
                filePath: fPath,
                name: noExtName,
            });
        }

    }
    finder(startPath, from);


    console.log(result)


    return result;
}



