const request = require("request");

const geocode = (term, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		term
	)}.json?access_token=pk.eyJ1Ijoic2JlbnRsZXl3ZCIsImEiOiJja2lhbXNqa3kwcjc1MnlvOW5wM21nOGVzIn0.uLN7FkdW-Va18Kwau7_Brw&limit=1`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to location services", undefined);
		} else if (body.features.length === 0) {
			callback(
				"Unable to find location period try another search",
				undefined
			);
		} else {
			callback(undefined, {
				location: body.features[0].place_name,
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
			});
		}
	});
};

module.exports = geocode;
