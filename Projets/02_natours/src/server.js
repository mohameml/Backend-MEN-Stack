const app = require('./app');

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`App running on port ${PORT} ... `);
});
