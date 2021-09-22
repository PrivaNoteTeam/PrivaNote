import express from "express";

const main = async () => {
    const app = express();

    const HTTP_PORT = 8080;

    app.listen(HTTP_PORT, () => {
        console.log("Listening on port " + HTTP_PORT);
    })
}

main().catch((error) => {
    console.error(error);
})