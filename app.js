const express = require("express");
const { Http2ServerRequest } = require("http2");
const { request } = require("https");
require('dotenv').config();

const port = process.env.PORT ;
const path = require("path");

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

// // Middleware 1
// app.use(function (req, res, next) {
//   console.log("Middleware 1 called");
//   next();
// });

// // Middleware 2
// app.use(function (req, res, next) {
//   console.log("Middleware 2 called");
//   next();
// });

var contactList = [
  {
    name: "Butcher",
    phone: "1111111111",
  },
  {
    name: "Homelander",
    phone: "1234567890",
  },
  {
    name: "Hughie",
    phone: "231274501",
  },
];

app.get("/", function (req, res) {
  // console.log(__dirname);
  // res.send("<h1>Cool, It is running or is it?</h1>");

  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetchong contacts from db");
      return;
    }
    return res.render("home", {
      title: "Contacts List",
      contact_list: contacts,
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Let us play with EJS" });
});

app.post("/create-contact", function (req, res) {
  // console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.phone);
  // contactList.push({
  //   name: req.body.my_name,
  //   phone: req.body.my_phone,
  // });
  // console.log(req.body);
  // contactList.push(req.body);
  // return res.redirect("back");

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating a contact!");
        return;
      }
      console.log("******", newContact);
      return res.redirect("back");
    }
  );
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }
  console.log("My server is running on port", port);
});

app.get("/delete-contact/", function (req, res) {
  console.log(req.query);
  let phone = req.query.phone;

  let contactindex = contactList.findIndex((contact) => contact.phone == phone);

  if (contactindex != -1) {
    contactList.splice(contactindex, 1);
  }

  return res.redirect("back");
});
