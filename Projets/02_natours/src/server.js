require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

// console.log(process.env);
// console.log(app.get('env'));
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB Connection successful !'));

const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
    console.log(`App running on port ${port} ... `);
});
