$("#searchFood").on("click", function() {
	event.preventDefault();
	var foodSearch = $("#query-input").val().trim();
	var ingr = $("#ingr-input").val().trim();
	var allergy = $("#type-input").val().trim();
	console.log(foodSearch);
	var queryURL = "https://api.edamam.com/search?app_id=6891053a&app_key=850e0cd22232d2c3a43600cea1277a5f&q=" + allergy + foodSearch + ingr + "&from=0&to=10"
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.hits;
		var l = results.length;
		var rand = Math.floor(Math.random() * l) 

		console.log(response);
		// $("#recipe").html("<img src=" + results[rand].recipe.image + ">");

		var recipeName = results[rand].recipe.label;
		var recipeDirections = results[rand].recipe.url;
		var recipeIngredients = results[rand].recipe.ingredientLines;

		for (var i = 0; i>recipeIngredients.length; i++){
			$("#ingredients").html("<li>"+ recipeIngredients[i]+"</li>");

		}


	})
			}); //ends on click function