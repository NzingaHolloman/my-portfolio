// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  getHelloNzingaUsingAsyncAwait()
})

function addRandomGreeting() {
  const greetings = [
    "Brazil!",
    "Bangkok, Thailand!",
    "Accra, Ghana!",
    "Botswana!",
    "Machu Picchu!",
    "Beijing, China!",
    "Chichen Itza, Mexico!",
  ];
  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById("greeting-container");
  greetingContainer.innerText = greeting;
}

function getHelloNzingaUsingAsyncAwait() {
  fetch("data")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((myObject) => {
      var quote = "";
      myObject.forEach(function (element) {
        console.log(element);
        var para = document.createElement("p");
        var node = document.createTextNode(element.toString());
        para.appendChild(node);
        var element = document.getElementById("HelloNzinga-container");
        element.appendChild(para);
      });
    });
}

// // google.charts.load("current", { packages: ["corechart"] });
// // google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//   fetch("/destination-data")
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })

//     .then((tripVotes) => {
//       var data = new google.visualization.DataTable(); //[
//       data.addColumn("string", "Destination");
//       data.addColumn("number", "Votes");
//       Object.keys(tripVotes).forEach((trip) => {
//         data.addRow([trip, tripVotes[trip]]);
//         console.log(trip);
//         console.log(tripVotes[trip]);
//       });

//       var options = {
//         title: "",
//         chartArea: { width: "50%" },
//         hAxis: {
//           title: "Votes",
//         },
//         vAxis: {
//           title: "Destinations",
//           minValue: 20,
//         },
//       };

//       var chart = new google.visualization.BarChart(
//         document.getElementById("chart-container")
//       );
//       chart.draw(data, options);
//     });
// }

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
