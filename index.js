import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const url = "https://v2.jokeapi.dev/joke/Any?type=single";



app.get("/", async (req, res) => {
    try {
        const result = await axios.get(url);
        res.render("index.ejs", {content: JSON.stringify(result.data.joke)})
    } catch (error) {
        console.log(error.response.data);
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }
})


app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
})