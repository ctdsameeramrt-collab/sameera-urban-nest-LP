import path from 'path';
import fs from 'fs';

// Dynamically import the server compiled by your build script
const serverApp = require('../dist/server.cjs');

export default serverApp;
