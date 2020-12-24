const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "Hello";

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const location = searchElement.value;

	messageOne.textContent = "Loading";
	messageTwo.textContent = "";
	fetch(`http://localhost:3000/weather?address=${location}`).then(
		(response) => {
			if (response.ok) {
				response.json().then((jsonResponse) => {
					if (jsonResponse.error) {
						messageOne.textContent = jsonResponse.error;
					} else {
						messageOne.textContent = jsonResponse.location;
						messageTwo.textContent = jsonResponse.forecast;
					}
				});
			}
		}
	);
});
