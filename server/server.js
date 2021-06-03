const express = require('express');
const path = require('path');
const routes = require('./routes');

/**
 * @description - Create application through Express (nodejs library)
 */ 
const app = express();

/**
 * @description - Serve application on port 5000 (optional)
 */
app.set('port', 5000);

/**
 * @description - Routes for API Endpoints
 */
 app.use('/api', routes);

/** 
 * @description - Serve static files from the React app (Podexpress frontend)
 */
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', function(req, res, next) {
  if(req.url === '/api') return next();
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


/**
 * @description - Parse incoming requests as JSON-object and match the header 'Content-Type'
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/**
 * @description - Serve the application
 */
app.listen(process.env.PORT || 5000, () => console.log(`Server running on localhost:${5000}`));


