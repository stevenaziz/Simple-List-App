const fs = require("fs");
const fsPromises = require('fs').promises;

async function ReadData() {
  try {
    const items = await fsPromises.readFile('./listdata.json','utf-8');
    const listItems =  items.split('\n');
    return listItems;
  } catch (error) {
    console.log(error);
  }
}

async function WriteData(dataOut) {
  try {
    fsPromises.writeFile('./listdata.json', JSON.stringify(dataOut));
  } catch (error) {
    console.log(error);
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;