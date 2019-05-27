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
        data: [5147, 7050, 6398, 3244, 4325, 3067, 2568],
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

var ctx2 = document.getElementById('chartjs-2').getContext('2d');
var myBarChart = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
      labels: ['Steps'],
      datasets: [{
        label: "Today's Distance",
        data: [8000],
        fill: false,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
            ticks: {
                beginAtZero: true,
                max: 9000
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

/*[myChart.data.datasets[0].data[data.length-1]*/
function updateRandomData(data) {
  data[data.length-1] = data[data.length-1] + 10
  return data
}

setInterval(function() {
  myChart.data.datasets[0].data =      updateRandomData(myChart.data.datasets[0].data)
  myChart.update()
  console.log("Updated!")
}, 5000);

function saveEdits() {
  //get the editable element
  var editElem = document.getElementById("edit");
  //get the edited element content
  var userVersion = editElem.innerHTML;
  //save the content to local storage
  localStorage.userEdits = userVersion;
}

function checkEdits() {
  //find out if the user has previously saved edits
  if(localStorage.userEdits!=null)
  document.getElementById("edit").innerHTML = localStorage.userEdits;
}
