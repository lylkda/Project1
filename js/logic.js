// $("#searchFood").on("click", function() {
//     event.preventDefault();
//     $("#recipe").html("");
//     var foodSearch = $("#query-input").val().trim();
//     var ingr = $("#ingr-input").val().trim();
//     var allergyVal = $("#type-input").val().trim();
//     var ingrNum = ""
//     var allergy = ""
//     console.log(foodSearch);
    
//     if (ingr){
//         var ingrNum = "&ingr=" + ingr;
//     }
//     if (allergyVal){
//         var allergy = "&health=" + allergyVal;
//     }
//     var queryURL = "https://api.edamam.com/search?app_id=6891053a&app_key=850e0cd22232d2c3a43600cea1277a5f&q=" + foodSearch + ingrNum + allergy + "&from=0&to=100"
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).done(function(response) {
//         var results = response.hits;
//         var randomStart = Math.floor(Math.random()*100);
//         console.log(response);
//         // $("#recipe").html("<img src=" + results[rand].recipe.image + ">");
//         var recipeName = results[randomStart].recipe.label;
//         var recipePic = results[randomStart].recipe.image;
//         var recipeDirections = results[randomStart].recipe.url;
//         var recipeIngredients = results[randomStart].recipe.ingredientLines;
//         var totalIngredients = recipeIngredients.length;
//         // $("#recipe").html("<img src=" + recipePic + ">");
//         $("#recipe").html("<h3>Recipe Name: " + recipeName +"</h3>" + 
//             "<p><img src=" + recipePic + "></p>" +
//             "<p>Contains: " + totalIngredients + " ingredients</p>" +
//             "<p><a href=" + recipeDirections + ">Go to Recipe Directions</a></p>");
//     })
//             }); //ends on click function

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
                    var recipeDiv = $("<div class='newItem' style='border-style:double;'>");
                    var displayImg = $("<img>");
                    displayImg.attr("src", recipePic);
                    var titleP = $("<p>").html("<h2>Recipe Name: " + recipeName + "<br>");
                    var ingredientDetails = $("<p>").html("Contains: " + totalIngredients + " ingredients");
                    for ( i = 0; i < recipeIngredients.length; i++) {
                        var ingredientList = $("<ul />")
                        var singleItem = $("<li />").text(recipeIngredients[i]);
                        ingredientList.append(singleItem);
                        console.log(ingredientList)
                        recipeDiv.prepend(ingredientList);
                    }
                    
                    recipeDiv.prepend(ingredientDetails);
                    recipeDiv.prepend(recipeDirections);
                    recipeDiv.prepend(displayImg);
                    recipeDiv.prepend(titleP);
                    $("#recipe").empty();
                    $("#recipe").prepend(recipeDiv);
                    $("#saveItem").on('click', function() {
                        event.preventDefault(); 
                        database.ref().push({
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