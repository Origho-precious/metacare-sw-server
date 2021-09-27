const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/films", async (req, res) => {
	try {
		const result = await axios.get("https://swapi.dev/api/films");
		res.status(200).send(result?.data);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Something went wrong!");
	}
});

app.get("/people/:id", async (req, res) => {
	if (req?.params?.id) {
		try {
			const result = await axios.get(
				`https://swapi.dev/api/people/${req.params.id}`
			);
			res.status(200).send(result?.data);
		} catch (error) {
			console.log(error.message);
			res.status(404).send("Something went wrong!");
		}
	} else {
		res.status(400).send("Bad Request No Id found!");
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}!`);
});
