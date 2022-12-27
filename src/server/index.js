import { renderToString } from 'react-dom/server';
import express from 'express';
// import MyApp from './App.js';

const app = express();

app.get('/', (req, res) => {
    // const rendered = renderToString(MyApp);
    const rendered = '<h1>Hola</h1>'
    const output = `
        <!doctype html>
        <html>
            <head>
            <meta charset=utf-8>
            <title>Netflix Roulette</title>
            </head>
            <body>
                <div id="app">${rendered}</div>
                <script src="build.js"></script>
            </body>
        </html>
    `;
    res.send(output);
    res.end();
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.info(`Express listening on port ${port}`); // eslint-disable-line
});

