const express = require('express');
const path = require('path');
const app = express();

// Run the app by serving the static dist files
app.use(express.static(__dirname + '/build'));

// Start the app 
app.listen(process.env.PORT || 8080);