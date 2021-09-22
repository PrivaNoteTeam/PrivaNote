import express from "express";
import cors from "cors";

const main = async () => {
    const app = express();

    const HTTP_PORT = 8080;

    app.use(cors);

    app.get('/', (_, __) => {
        console.log("Root thing");
    })

    app.listen(HTTP_PORT, () => {
        console.log("Listening on port " + HTTP_PORT);
    });
}

main().catch((error) => {
    console.error(error);
})