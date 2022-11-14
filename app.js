// Get NPM modules
const express = require("express");
// Get App modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define static and middleware
app.use(express.static("./Client"));
app.use(express.json());

app.get("/api", async (req,res) => {
  const data = await fm.ReadData();
  res.status(200).send(data);
})

app.post("/api", async (req,res) => {
  let data = await fm.ReadData();
  data[data.length] = String(req.body);
  await fm.WriteData(JSON.stringify(data));
  res.status(200).send();
})

// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

const appName = "My List";
const port = 8030;
app.listen(port, () => {
  console.log(`App ${appName} is running on port ${port}`);
})