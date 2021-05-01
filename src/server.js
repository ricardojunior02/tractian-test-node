const express = require('express');
require('dotenv/config');
require('./database');
require('express-async-errors');
const routes = require('./routes') ;
const cors = require('cors') ;

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));