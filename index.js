const express = require('express');
const config = require('./config/config');
const router = require('./routes');
const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(router);
app.listen(config.PORT, () => console.log(`Server is loading on port ${config.PORT}...`))