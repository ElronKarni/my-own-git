import { addAllFilesInCurrentDirectory } from './functions';

type HandleAddCommandParams = {
  files: string[];
};

export function handleAddCommand({ files }: HandleAddCommandParams) {
  const isUserDidntPassedSpecificFilePath = files.length === 0 || files.includes('.');

  if (isUserDidntPassedSpecificFilePath) {
    addAllFilesInCurrentDirectory();
  } else {
    files.forEach((file: string) => {
      //Todo: create a function that get only the files that the user passed
      console.log(`Adding file: ${file}`);
    });
  }
}
