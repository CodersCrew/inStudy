import { readdirSync } from 'fs';

export default (path, omit, injectedObject) => {
  omit = typeof omit === 'string' ? [omit] : omit;
  let dirFiles = readdirSync(path).filter((singleFile) => !omit.find((singleOmittedFile) => singleOmittedFile === singleFile));
  dirFiles.forEach((singleFile) => {
    const module = require(`${path}/${singleFile}`);
    injectedObject && module(injectedObject);
  });
};
