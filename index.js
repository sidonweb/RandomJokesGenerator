import express from "express";
import https from "https"
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const url = "https://v2.jokeapi.dev/joke/Any?type=single";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.get("/getjoke", (req, res) => {
    https.get(url, (response) => {
        let data = "";

        // Concatenate the data chunks as they are received
        response.on("data", function (chunk) {
            data += chunk;
        });

        // Handle the end of the response
        response.on("end", () => {
            try {
                // Check if the data is empty
                if (data.trim() === "") {
                    throw new Error("Empty response");
                }

                // Parse the JSON data
                const jokedata = JSON.parse(data);

                res.json(jokedata);// Send the JSON data as the response
            } catch (error) {
                // Handle parsing error or empty response
                console.error('Error processing response:', error);

                // Send an error response
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    });
});


app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
})