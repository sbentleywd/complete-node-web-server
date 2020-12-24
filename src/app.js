const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// sets up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// serve static files from public directory
app.use(express.static(publicPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Simon Bentley",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Simon Bentley",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		message: "This is a help message",
		title: "Help",
		name: "Simon Bentley",
	});
});

app.get("/weather", async (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		message: "Help article not found",
		title: "404",
		name: "Simon Bentley",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		message: "Page not found",
		title: "404",
		name: "Simon Bentley",
	});
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
