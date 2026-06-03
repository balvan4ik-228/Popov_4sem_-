const express = require('express');
const towersRouter = require('./routes/towers');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'Cell Towers API работает'
    });
});

app.use('/towers', towersRouter);

app.use((req, res) => {
    res.status(404).json({
        message: 'Маршрут не найден'
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: 'Внутренняя ошибка сервера'
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
