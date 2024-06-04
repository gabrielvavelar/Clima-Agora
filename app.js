const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = 3000;

app.use(express.json());

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handlebars
app.set("views", path.join(__dirname, "src/views"));
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// static folder
app.use(express.static(path.join(__dirname, "/public")));

app.listen(PORT, function () {
  console.log(`O express está rodando na porta ${PORT}`);
});

//Direcionamento para o handlebars index
app.get("/", (req, res) => {
  res.render("index");
});

//app routes
app.use("/routes", require("./src/routes/routes"));
