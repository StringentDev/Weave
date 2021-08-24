read = async (PathName) => {
	response = await fetch(PathName)

	if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' +
			response.status);
		return;
	}

	// Examine the text in the response
	return response.text()
}