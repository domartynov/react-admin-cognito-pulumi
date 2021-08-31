import * as path from "path";
import * as fs from "fs";

export const readAllFiles = (dirPath: string, subDir: string = "", files: string[] = []): string[] => {
    const subDirPath = path.join(dirPath, subDir);
    const names = fs.readdirSync(subDirPath)

    names.forEach(function (name) {
        if (fs.statSync(path.join(subDirPath, name)).isDirectory()) {
            files = readAllFiles(dirPath, path.join(subDir, name), files)
        } else {
            files.push(path.join(subDir, name))
        }
    })

    return files
}

export function publicReadPolicyForBucket(bucketName: string) {
    return JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow", Principal: "*", Action: ["s3:GetObject"], Resource: [`arn:aws:s3:::${bucketName}/*`]
        }]
    })
}
