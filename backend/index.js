const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.post('/bfhl', (req, res) => {
    console.log(req.body);
    const { data } = req.body;

    // Initialize arrays for numbers and alphabets
    const numbers = [];
    const alphabets = [];

    // Iterate through the input array
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);  // It's a number
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);  // It's an alphabet
        }
    });

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(char => /[a-z]/.test(char));
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().slice(-1);

    // Create the response object
    const response = {
        "is_success": true,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet
    };

    // Send the response
    res.json(response);
  });


  app.get('/bfhl', (req, res) => {
    const response = {
      operation_code: 1
    };
  
    res.json(response);
  });

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server started on port 5000")
    else 
        console.log("Error occurred, server can't start", error);
    }
);