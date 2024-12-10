require('dotenv').config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);
// console.log(app.get('env'));

const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
    console.log(`App running on port ${port} ... `);
});
