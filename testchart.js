// This week's steps taken graph
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [5147, 6050, 6398, 3244, 4325, 3067, 2568],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#7E35A6',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      }
    }
});

// Today's Distance Bar Graph
var ctx2 = document.getElementById('chartjs-2').getContext('2d');
var myBarChart = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
      labels: ['Steps'],
      datasets: [{
        label: "Today's Distance",
        data: [2568],
        fill: false,
        backgroundColor: ["rgba(87, 178, 101, 0.5)"],
        borderColor: ["rgb(87, 178, 101)"],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
            ticks: {
                beginAtZero: true,
                max: parseInt(localStorage.userEdits)
            },
            barPercentage: 0.5,
            barThickness: 10,
            maxBarThickness: 2,
            minBarLength: 2,
            gridLines: {
                offsetGridLines: true
            },
        }],
        yAxes: [{
          barPercentage: 1.2
        }]
      },
      legend: {
        display: false
      },
    }
});

/***
 * Function Name: updateData
 * Parameters: data - the data list in myChart to update
 * Description: This function takes the most recent element in the parametrized
 *   chart's list of data and updates its value.
 * Return value: the updated data
 ***/
function updateData(data) {
  data[data.length-1] = data[data.length-1] + 10
  return data
}

/***
 * Function Name: setInterval
 * Parameters: function, 5000
 * Description: This function runs every 5000 milliseconds (5 seconds) and
 *   updates the data in the line graph, as well as the text above it stating
 *   today's number of steps taken. Also updates the value of today's step
 *   number in the bar graph under "Today's Distance".
 * Return value: None
 ***/
setInterval(function() {
  let data = myChart.data.datasets[0].data;
  // update the data so it represents the current day's number of steps
  myChart.data.datasets[0].data = updateData(data)
  // reload the graph
  myChart.update()

  // update text stating current steps for today
  document.getElementById("currSteps").innerHTML = data[data.length-1] + " steps";

  // update bar graph showing today's number of steps
  myBarChart.data.datasets[0].data = [data[data.length-1]]
  // reload the graph
  myBarChart.update()

}, 5000);

/***
 * Function Name: saveEdits
 * Parameters: None
 * Description: This function is run when the button "Save new goal" is
 *   clicked. Updates the text stating the current goal based on user input,
 *   updates the local storage, and resets the maximum x-axis value on the
 *   horizontal bar graph. If the patient has reached their goal, the window
 *   pops up with an alert telling them so.
 * Return value: None
 ***/
function saveEdits() {
  //get the editable element
  var editElem = document.getElementById("edit");
  //get the edited element content
  var userVersion = editElem.innerHTML;
  //save the content to local storage
  localStorage.userEdits = userVersion;
  // update the max count on the goal graph
  myBarChart.options.scales.xAxes[0].ticks.max = parseInt(userVersion);
  myBarChart.update()

  // Give a friendly alert if you reached your goal
  let userGoal = myBarChart.options.scales.xAxes[0].ticks.max;
  let stepsMade = myBarChart.data.datasets[0].data;
  if ( stepsMade >= userGoal ) {
    //await delay(2000);
    window.alert("You have reached your goal for the day!");
  }
}

/***
 * Function Name: checkEdits
 * Parameters: None
 * Description: This function is run upon page load. Checks the local storage
 *   for the value of user's input, and updates the editable content.
 * Return value: None
 ***/
function checkEdits() {
  //find out if the user has previously saved edits
  if(localStorage.userEdits!=null)
  document.getElementById("edit").innerHTML = localStorage.userEdits;
}
