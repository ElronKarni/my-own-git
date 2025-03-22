import fs from 'fs';
import path from 'path';

type GetAllFilesFromDirectoryPathParams = {
  directoryPath: any;
  relativeTo?: null;
  recursive?: boolean;
};

function getIgnoredFilePaths(): string[] {
  if (fs.existsSync('.gitignore')) {
    const defaultIgnoredFiles = ['.git'];
    const ignoredFilePaths = fs.readFileSync('.gitignore', 'utf8');
    const ignoredFilePathsList = ignoredFilePaths.split('\n');

    return [...defaultIgnoredFiles, ...ignoredFilePathsList];
  }

  return [];
}

function checkForIgnorePaths(path: string) {
  const ignoredPaths = getIgnoredFilePaths();
  return ignoredPaths.some((ignorePath) => {
    const normalizedSubstr = ignorePath.startsWith('/') ? ignorePath.substring(1) : ignorePath;

    return (
      path === normalizedSubstr ||
      normalizedSubstr.includes(path) ||
      path.includes(normalizedSubstr)
    );
  });
}

function getAllFilesPathsFromDirectoryPath({
  directoryPath,
  relativeTo = null,
  recursive = true,
}: GetAllFilesFromDirectoryPathParams) {
  let results: string[] = [];

  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const fullPath = path.join(directoryPath, item);
    const stats = fs.statSync(fullPath);

    // If it's a directory and we're in recursive mode, explore it
    if (stats.isDirectory() && recursive) {
      results = results.concat(
        getAllFilesPathsFromDirectoryPath({
          directoryPath: fullPath,
          relativeTo: relativeTo || directoryPath,
          recursive,
        }) || []
      );
    }
    // If it's a file, add it to our results
    else if (stats.isFile()) {
      // If relativeTo is specified, make the path relative
      const relativePath = relativeTo
        ? path.relative(relativeTo, fullPath)
        : path.basename(fullPath);

      const isRelativePathInIgnoreList = checkForIgnorePaths(relativePath);

      if (isRelativePathInIgnoreList) {
        continue;
      }

      results.push(relativePath);
    }
  }

  return results;
}

export function addAllFilesInCurrentDirectory() {
  const currentWorkingDir = process.cwd();

  const filesPaths = getAllFilesPathsFromDirectoryPath({ directoryPath: currentWorkingDir });
  for (const filePath of filesPaths ?? []) {
    console.log(`\x1b[32m         ${filePath}`);
  }
  console.log('\n');
}
