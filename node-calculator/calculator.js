// calculator.js
const express = require('express');
const app = express();

// Define a route for the calculator
app.get('/calculate', (req, res) => {
    const { op, a, b } = req.query;
    
    // Convert 'a' and 'b' to numbers
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    // Check if 'a' and 'b' are valid numbers
    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).send('Invalid numbers provided.');
    }

    let result;
    switch(op) {
        case 'add':
            result = numA + numB;
            break;
        case 'subtract':
            result = numA - numB;
            break;
        case 'multiply':
            result = numA * numB;
            break;
        case 'divide':
            if (numB === 0) {
                return res.status(400).send('Cannot divide by zero.');
            }
            result = numA / numB;
            break;
        default:
            return res.status(400).send('Invalid operation.');
    }

    res.send(`The result of ${op} ${a} and ${b} is ${result}`);
});

// Start the server on port 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
