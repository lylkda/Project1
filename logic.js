$("#searchFood").on("click", function() {
	event.preventDefault();
	$("#recipe").html("");
	var foodSearch = $("#query-input").val().trim();
	var ingr = $("#ingr-input").val().trim();
	var allergyVal = $("#type-input").val().trim();
	ingrNum = ""
	var allergy = ""
	console.log(foodSearch);
	
	if (ingr){
		var ingrNum = "&ingr=" + ingr;
	}
	if (allergyVal){
		var allergy = "&health=" + allergyVal;
	}


	var queryURL = "https://api.edamam.com/search?app_id=6891053a&app_key=850e0cd22232d2c3a43600cea1277a5f&q=" + foodSearch + ingrNum + allergy + "&from=0&to=100"
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.hits;
		var randomStart = Math.floor(Math.random()*100);


		console.log(response);
		// $("#recipe").html("<img src=" + results[rand].recipe.image + ">");

		var recipeName = results[randomStart].recipe.label;
		var recipePic = results[randomStart].recipe.image;
		var recipeDirections = results[randomStart].recipe.url;
		var recipeIngredients = results[randomStart].recipe.ingredientLines;
		var totalIngredients = recipeIngredients.length;

		// $("#recipe").html("<img src=" + recipePic + ">");

		$("#recipe").html("<h3>Recipe Name: " + recipeName +"</h3>" + 
			"<p><img src=" + recipePic + "></p>" +
			"<p>Contains: " + totalIngredients + " ingredients</p>" +
			"<p><a href=" + recipeDirections + ">Go to Recipe Directions</a></p>");



	})
			}); //ends on click function