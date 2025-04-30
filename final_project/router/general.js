const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {

    const { username, password } = req.body;
    
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            //return res.status(404).json(users);
            return res.status(404).json({message: "User already exists!"});
        }
    } else {
        // Return error if username or password is missing
        return res.status(404).json({message: "Unable to register user."});
    }
    
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    return res.status(200).json(books);

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    
    const { isbn } = req.params;

    const book = books[isbn];

    if (book) {
        return res.status(200).json(book);
    } else {
        return res.status(404).json({message: "Book not found!"});
    }
    
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
    const { author } = req.params;

    const keys = Object.keys(books);

    filteredKeys = keys.filter( ( key ) => books[key].author === author);

    if (filteredKeys.length > 0) {
        
        let filteredBooks = {};

        filteredKeys.forEach( ( key ) => {
            filteredBooks[key] = books[key];
        });

        return res.status(200).json(filteredBooks);

    } else {
        return res.status(404).json({message: "Author not found!"});
    }
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
    const { title } = req.params;

    const keys = Object.keys(books);

    filteredKeys = keys.filter( ( key ) => books[key].title === title);

    if (filteredKeys.length > 0) {
        
        let filteredBooks = {};

        filteredKeys.forEach( ( key ) => {
            filteredBooks[key] = books[key];
        });

        return res.status(200).json(filteredBooks);

    } else {
        return res.status(404).json({message: "Title not found!"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    
    const { isbn } = req.params;

    const book = books[isbn];

    if (book) {
        return res.status(200).json(book.reviews);
    } else {
        return res.status(404).json({message: "Book not found!"});
    }

});

let baseurl = "https://vitorforrequ-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai"

async function task10() {
    let url = baseurl;
    const result = await axios.get(url);
    console.log("task10:")
    console.log(result.data);
}

async function task11(){
    let isbn = "5";
    let url = baseurl + "/isbn/" + isbn;
    const result = await axios.get(url);
    console.log("task11:")
    console.log(result.data);
}

async function task12(){
    let author = "Unknown";
    let url = baseurl + "/author/" + author;
    const result = await axios.get(url);
    console.log("task12:")
    console.log(result.data);
}

async function task13(){
    let title = "Fairy tales";
    let url = baseurl + "/title/" + title;
    const result = await axios.get(url);
    console.log("task13:")
    console.log(result.data);
}

module.exports.general = public_users;
