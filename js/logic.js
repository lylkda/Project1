// Initialize Firebase
var config = {
	apiKey: "AIzaSyCdZwpWLL4EpBOz2duyV93vKSADaYzW87o",
	authDomain: "wtfsic-b181a.firebaseapp.com",
	databaseURL: "https://wtfsic-b181a.firebaseio.com",
	projectId: "wtfsic-b181a",
	storageBucket: "wtfsic-b181a.appspot.com",
	messagingSenderId: "123595222927"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#searchFood").on("click", function() {
	event.preventDefault();
	$("#recipe").html("");
	var foodSearch = $("#query-input").val().trim();
	var ingr = $("#ingr-input").val().trim();
	var allergyVal = $("#choose").val();
	var ingrNum = ""
	var allergy = ""

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
		console.log("abc" + response);

		var results = response.hits;
                    // if statement for count=0, meaning no recipes were found
                    if (response == null) {
                        //modal placeholder
                        alert("No receipe");
                    }
                    
                    var randomStart = Math.floor(Math.random()*100);
                    console.log(randomStart);
                    var i = randomStart;
                    
                    var recipeName = results[i].recipe.label;
                    var recipePic = results[i].recipe.image;
                    var recipeDirections = results[i].recipe.url;
                    var recipeIngredients = results[i].recipe.ingredientLines;
                    var totalIngredients = recipeIngredients.length;
                    var recipeDiv = $("<div class='dump'>");
                    var link = $("<p>").html("<a href='"+recipeDirections+"'>I'M GOING TO FUCKING MAKE IT NOW!</a>");
                    var displayImg = $("<img>");
                    displayImg.attr("src", recipePic);
                    var titleP = $("<p>").html("<h2>Recipe Name: " + recipeName + "<br>");
                    var ingredientDetails = $("<p>").html("Contains: " + totalIngredients + " ingredients");
                    recipeDiv.prepend(link);
                    for ( i = 0; i < recipeIngredients.length; i++) {
                    	var ingredientList = $("<ul />")
                    	var singleItem = $("<li />").text(recipeIngredients[i]);
                    	ingredientList.append(singleItem);
                    	console.log(ingredientList)
                    	recipeDiv.prepend(ingredientList);
                    }
                    recipeDiv.prepend(ingredientDetails);
                    recipeDiv.prepend(displayImg);
                    recipeDiv.prepend(titleP);
                    var save=$('<input/>').attr({ type: 'button', name:'btn1', id:'saveItem', value:'FIRE AF'});
                    save.addClass('waves-effect waves-light red btn');
                    recipeDiv.append(save);
                    $("#recipe").empty();
                    $("#recipe").prepend(recipeDiv);



                    $("#saveItem").on('click', function() {
                    	event.preventDefault(); 
                    	database.ref().set({
                    		favoritedRecipe: recipeName,
                    		favoritedImg: recipePic,
                    		favoritedDirections: recipeDirections,
                    		favoritedIng: totalIngredients,
                    		favoritedIngList: recipeIngredients
                    	});
                    	database.ref().on("value", function(snapshot){
                    		console.log(snapshot.val());
                    	})
                    });                 
                })
            }); //ends submit button on click


$("#surprise").on("click", function(){
	event.preventDefault();
	$("#recipe").html("");
	database.ref().on("value", function(snapshot){


	var recipeName = snapshot.val().favoritedRecipe;
	console.log(snapshot.val());
	console.log(snapshot.val().favoritedImg);
	var recipePic = snapshot.val().favoritedImg;
	var recipeDirections = snapshot.val().favoritedDirections;
	var recipeIngredients = snapshot.val().favoritedIngList;
	var totalIngredients = snapshot.val().favoritedIng;
	var recipeDiv = $("<div class='dump'>");
	var link = $("<p>").html("<a href='"+recipeDirections+"'>I'M GOING TO FUCKING MAKE IT NOW!</a>");
	var displayImg = $("<img>");
	displayImg.attr("src", recipePic);
	var titleP = $("<p>").html("<h2>Recipe Name: " + recipeName + "<br>");
	var ingredientDetails = $("<p>").html("Contains: " + totalIngredients + " ingredients");
	recipeDiv.prepend(link);
	for ( i = 0; i < recipeIngredients.length; i++) {
		var ingredientList = $("<ul />")
		var singleItem = $("<li />").text(recipeIngredients[i]);
		ingredientList.append(singleItem);
		console.log(ingredientList)
		recipeDiv.prepend(ingredientList);
	}
	recipeDiv.prepend(ingredientDetails);
	recipeDiv.prepend(displayImg);
	recipeDiv.prepend(titleP);
	var save=$('<input/>').attr({ type: 'button', name:'btn1', id:'saveItem', value:'OTHER FUCKERS GET TO LOOK AT THIS'});
	save.addClass('waves-effect waves-light red btn');
	recipeDiv.append(save);
	$("#recipe").empty();
	$("#recipe").prepend(recipeDiv);

	})//end database value
})//Call firebase database

$("#searchIngredient").on("click", function() {
			event.preventDefault();
			var ingSearch = $("#ingInput").val().trim();
			console.log(ingSearch);
  			// ajax for pulling the national database number (ndbno)
  			var NBDqueryURL = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + ingSearch + "&ds=Standard%20Reference&sort=r&max=25&offset=0&api_key=cqWGlycVTfyAl1Z5nveyUUNpbpouRinLAJAbG8Sw"
  			$.ajax({
  				url: NBDqueryURL,
  				method: "GET"
  			}).done(function(response) {
  				var results = response.list.item;
					// the ndbno
					var firstNBDnum = results[1].ndbno;
					console.log(firstNBDnum);
					// ajax for using the ndbno to get nutrient data for fats, carbs, calories, and sugar
					var compQueryURL = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=cqWGlycVTfyAl1Z5nveyUUNpbpouRinLAJAbG8Sw&nutrients=204&nutrients=205&nutrients=208&nutrients=269&ndbno=" + firstNBDnum
					$.ajax({
						url: compQueryURL,
						method: "GET"
					}).done(function(response) {
						console.log(response);
						var ingWeight = response.report.foods[0].measure
						var nutrientResults = response.report.foods[0].nutrients
						console.log(nutrientResults);
						//always goes in order of: calories, sugars, fats, carbs
						//caloric data 
						var calTotal = nutrientResults[0].value;
						var calDisplay = $("<p>").html("Calories: " + calTotal + "kcal per " + ingWeight + " of " + ingSearch);
						//sugar data
						var sugarTotal = nutrientResults[1].value;
						var sugarDisplay = $("<p>").html("Sugars: " + sugarTotal + "g per " + ingWeight + " of " + ingSearch);
						//fats data
						var fatTotal = nutrientResults[2].value;
						var fatDisplay = $("<p>").html("Fats: " + fatTotal + "g per " + ingWeight + " of " + ingSearch);
						//carbs data
						var carbsTotal = nutrientResults[3].value;
						var carbDisplay = $("<p>").html("Carbohydrates: " + carbsTotal + "g per" + ingWeight + " of " + ingSearch);
						// display this nutrient info!
						var nutrientDiv = $("<div id='myNutrients' style='border-style:double; color=white; font-weight=bolder;'>");
						nutrientDiv.append(carbDisplay);
						nutrientDiv.append(fatDisplay);
						nutrientDiv.append(sugarDisplay);
						nutrientDiv.append(calDisplay);
						$("#nutrientDump").empty();
						$("#nutrientDump").append(nutrientDiv);
					}) //ends compQuery ajax call
				}); //ends NDBquery ajax call
  		});	//ends on click for searchIngredient				