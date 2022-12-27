import express from 'express';
import { renderToString } from 'react-dom/server';
// import MyApp from './Root.js';

const app = express();

app.get('/', (req, res) => {
    // const rendered = renderToString(MyApp);
    const rendered = '<h1>hola</h1>';

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

export default app;