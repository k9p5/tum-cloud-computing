// require express and other modules
const express = require("express");
const documentation = require("./docs");
const app = express();
// Express Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + "/public"));

/************
 * DATABASE *
 ************/

const db = require("./models");

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get("/", function homepage(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/*
 * JSON API Endpoints
 */

app.get("/api", (req, res) => {
  res.json(documentation);
});

app.get("/api/profile", (req, res) => {
  res.json({
    name: "John Doe",
    homeCountry: "UK",
    degreeProgram: "Electronics",
    email: "johndoe-electronics-tum@gmail.com",
    deployedURLLink: "", //leave this blank for the first exercise
    apiDocumentationURL: "", //leave this also blank for the first exercise
    currentCity: "",
    hobbies: [],
  });
});
/*
 * Get All books information
 */
app.get("/api/books/", (req, res) => {
  /*
   * use the books model and query to mongo database to get all objects
   */
  db.books.find({}, function (err, books) {
    if (err) throw err;
    /*
     * return the object as array of json values
     */
    res.json(books);
  });
});
/*
 * Add a book information into database
 */
app.post("/api/books/", async (req, res) => {
  /*
   * New Book information in req.body
   */
  try {
    const book = await db.books.create(req.body);
    res.status(201).json(book);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
});

/*
 * Update a book information based upon the specified ID
 */
app.put("/api/books/:id", async (req, res) => {
  try {
    await db.books.updateOne({ _id: req.params.id }, req.body);
    const updatedBook = await db.books.findOne({ _id: req.params.id });
    res.json(updatedBook);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
});

/*
 * Delete a book based upon the specified ID
 */
app.delete("/api/books/:id", async (req, res) => {
  /*
   * Send the deleted book information as a JSON object
   */
  try {
    const book = await db.books.findOne({ _id: req.params.id });
    await db.books.deleteOne({ _id: req.params.id });
    res.json(book);
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
});

/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 80, () => {
  console.log("Express server is up and running on http://localhost:80/");
});
