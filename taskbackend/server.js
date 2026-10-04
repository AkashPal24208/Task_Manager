require('dotenv').config();
/**
 * @app connection 
 */
const app = require('./src/app');
 
/**
 * @database connection 
 */
const connectToDB = require('./src/config/database');

/**
 * @port declaration and server connection 
 */
const PORT = process.env.PORT || 3000;
connectToDB()
  .then(() => {
    app.listen(PORT,"0.0.0.0", () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1); 
  });

