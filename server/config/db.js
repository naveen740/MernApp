const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });

const mongoose = require('mongoose');

const atlasUri = process.env.MONGODB_URI;

mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose;



















// const mongoose = require('mongoose');

// const atlasUri = 'mongodb+srv://navaneethan:Naveen14@mernapp.7nxq89f.mongodb.net/test?retryWrites=true&w=majority';

// mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB Atlas');
// });

// module.exports = mongoose;



