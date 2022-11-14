const fs = require("fs");
const fsPromises = require("fs").promises;

async function ReadData() {
  try {
    const items = await fsPromises.readFile('./listdata.json','utf-8');
    listItems =  JSON.parse(items);
    return listItems;
  } catch (error) {
    console.log(error);
  }
}

async function WriteData(dataOut) {
  try {
    fsPromises.writeFile('./listdata.json', dataOut);
  } catch (error) {
    console.log(error);
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;