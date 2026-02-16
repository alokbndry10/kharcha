import { writeFile, readFileSync } from 'fs';

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const randomId = makeId(5);

const content = readFileSync('package.json', { encoding: 'utf8' });
let jsonData = JSON.parse(content);
// change package version with new random id
jsonData.version = randomId;

console.log('Build Version', jsonData.version);
writeFile('package.json', JSON.stringify(jsonData, null, 2), (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
  } else {
    console.log('File updated successfully!');
  }
});
