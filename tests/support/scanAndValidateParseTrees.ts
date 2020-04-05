import { File } from './infrastructure/File';
import { IParseTestRunner, VbParseTestRunner } from './ParseTestRunner';

function validateParseTrees(vb6InputFile: File): void {       
    const runner: IParseTestRunner = new VbParseTestRunner();
    runner.parseFile(vb6InputFile);
}

export default function scanAndValidateParseTrees(inputDirectory: File, exclusionFilter: (file: File) => boolean) {
    if (inputDirectory.isDirectory() && !exclusionFilter(inputDirectory)) {
        describe(inputDirectory.getName(), () => {
            // for each of the files in the directory
            inputDirectory.listFiles().forEach(inputDirectoryFile => {
                // if the file is a VB6 relevant file
                if (inputDirectoryFile.isFile() && inputDirectoryFile.getExtension().toLowerCase()===".html") {
                    validateParseTrees(inputDirectoryFile);
                }
                // else, if the file is a relevant directory
                else if (inputDirectoryFile.isDirectory()) {
                    const subInputDirectory: File = inputDirectoryFile;
                    const subInputDirectoryName: string = subInputDirectory.getName();

                    if ("."!==subInputDirectoryName && ".."!==subInputDirectoryName) {
                        scanAndValidateParseTrees(subInputDirectory, exclusionFilter);
                    }
                }
            });
        });
    }
}
