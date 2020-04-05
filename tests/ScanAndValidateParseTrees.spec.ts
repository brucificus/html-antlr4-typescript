import { File } from './support/infrastructure/File';
import scanAndValidateParseTrees from './support/scanAndValidateParseTrees';

const INPUT_DIRECTORY: File = new File(__dirname, "resources");
const DIRECTORIES_EXCLUDED: File[] = [];

scanAndValidateParseTrees(INPUT_DIRECTORY, (directory) => Boolean(DIRECTORIES_EXCLUDED.find(d => d.equals(directory))));
