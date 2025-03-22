import fs from 'fs';

export function createStorageFile() {
  const configFileName = 'myowngitconfig.txt';
  const isInitialMyOwnGitConfigFileExist = fs.existsSync(configFileName);

  if (!isInitialMyOwnGitConfigFileExist) {
    console.log(`Creating initial ${configFileName} file....`);
    try {
      fs.appendFileSync(configFileName, 'data to append');
      console.log(`${configFileName} created successfully`);
    } catch (error) {
      console.log(`Error creating ${configFileName} file:`, error);
    }
  }
}
