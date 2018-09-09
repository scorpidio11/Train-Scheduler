



// SETUP VARIABLES





//1. Retrieve user inuts and conver to variables

//2. 3use those variables to run on Ajax call 
//3. Break down the NYT object into usable fields
//4. Dynamically generate html contents



// search parameter
var authKey    = "2b2863fbe8174574aea2929d0e2be4a9";
var queryTerm  = "";
var numResults = 0;
var startYear  = 0;
var endYear = 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

var articleCounter = 0;

// FUNCTIONS When you click search button
//========================================


function runQuery(numArticles, queryURL) {

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).done(function (NYTData) {
    console.log(queryURL);
    console.log(NYTData);
  })



}

// MAIN PROCESSES
//========================================
$('#searchBtn').on('click', function(){

  var queryTerm = $('#search').val().trim();
  console.log(queryTerm);

  var newURL = queryURLBase + "&q" + queryTerm;

  console.log(newURL);


// Get the year
startYear = $('#startYear').val().trim() + "0101";
endYear = $('#endYear').val().trim() + "0101";

if (parseInt(startYear)) {

  newURL = newURL + "&begin_date" + startYear;

};

if (parseInt(endYear)) {

  newURL = newURL + "&end_date" + endYear;

};






runQuery(10,newURL);

return false;


})


// This button clears the top articles section
$('#clearAll').on('click', function(){
	articleCounter = 0;
	$("#wellSection").empty();
})



  // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  // url += '?' + $.param({
  //   'api-key': "2b2863fbe8174574aea2929d0e2be4a9",
  //   'q': "headline article body",
  //   'begin_date': "19900101",
  //   'end_date': "20181231",
  //   'sort': "newest",
  //   'hl': "yes",
  //   'page': 5
  // });
  

  // var article = result;







