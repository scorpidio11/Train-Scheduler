
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyA8HNW2WePCw7eGAIL7Av9iOW1AK2OhYIo",
  authDomain: "train-1ea5c.firebaseapp.com",
  databaseURL: "https://train-1ea5c.firebaseio.com",
  projectId: "train-1ea5c",
  storageBucket: "train-1ea5c.appspot.com",
  messagingSenderId: "194604634464"
};
firebase.initializeApp(config);

     // Create a variable to reference the database
     var database = firebase.database();



// 2. Button for adding Train Schedule
$("#submitbtn").on("click", function(event) {
event.preventDefault();

// Grabs user input
var trainName = $("#train_name").val().trim();
var destination = $("#destination").val().trim();
var firstTrain = $("#first_train").val().trim();
var frequency = $("#frequency").val().trim();
frequency = parseInt(frequency);

// Creates local "temporary" object for holding user input data
var newTrain = {
  trainName: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency
};

// Uploads employee data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.trainName);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);

//alert("Train successfully added");

// Clears all of the text-boxes
$("#train_name").val("");
$("#desitination").val("");
$("#first_train").val("");
$("#frequency").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());


  
// Store everything into a variable.
var trainName = childSnapshot.val().trainName;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;


var firstTimeConverted = moment(firstTrain, "HH:mm");
console.log(firstTimeConverted);

var currentTime = moment().format("HH:mm");
console.log("CURRENT TIME: " + currentTime);

// store difference between currentTime and fisrt train converted in a variable.
var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

console.log("Difference in Time: " + timeDiff);
// find Remainder of the time left and store in a variable
var timeRemainder = timeDiff % frequency;
console.log("Time Till Train: " + timeRemainder);
// to calculate minutes till train,we store it in a variable
var minToTrain = frequency - timeRemainder;
console.log("Minutes to Train: " + minToTrain);
// next train
var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");


// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destination),
  $("<td>").text(frequency),
  $("<td>").text(nxTrain),
  $("<td>").text(minToTrain),

);

// Append the new row to the table
$(".table > tbody").append(newRow);

});
