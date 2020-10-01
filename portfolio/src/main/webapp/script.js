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
document.addEventListener("DOMContentLoaded", (event) => {
  loadTasks();
  //drawChart();
  firstImage();

});

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

//google.charts.load("current", { packages: ["corechart"] });
//google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  fetch("/destination-data")
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .then((tripVotes) => {
      var data = new google.visualization.DataTable(); //[
      data.addColumn("string", "Destination");
      data.addColumn("number", "Votes");
      Object.keys(tripVotes).forEach((trip) => {
        data.addRow([trip, tripVotes[trip]]);
        console.log(trip);
        console.log(tripVotes[trip]);
      });

      var options = {
        title: "",
        chartArea: { width: "50%" },
        hAxis: {
          title: "Votes",
        },
        vAxis: {
          title: "Destinations",
          minValue: 20,
        },
      };

      var chart = new google.visualization.BarChart(
        document.getElementById("chart-container")
      );
      chart.draw(data, options);
    });
}

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

function firstImage() {
  const imgUrl = "Nature/random-7.jpg";

  const imgElement = document.createElement("img");
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById("random-image-container");
  // Remove the previous image.
  imageContainer.innerHTML = "";
  imageContainer.appendChild(imgElement);
}

function randomizeImage() {
  // The images directory contains 13 images, so generate a random index between
  // 1 and 13.
  const imageIndex = Math.floor(Math.random() * 6) + 1;
  const imgUrl = "Nature/random-" + imageIndex + ".jpg";

  const imgElement = document.createElement("img");
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById("random-image-container");
  // Remove the previous image.
  imageContainer.innerHTML = "";
  imageContainer.appendChild(imgElement);
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function loadTasks() {
  const flexElement = document.getElementById('flex-container');
  fetch('/list-comment').then(response => response.json()).then((tasks) => {
    //const taskListElement = document.getElementById('task-list');
    const divElement = document.createElement('div'); 

    tasks.forEach((task) => {
    //   taskListElement.appendChild(createTaskElement(task));
      divElement.appendChild(createTaskElement(task));
      flexElement.appendChild(divElement);

    })
  });
}

/** Creates an element that represents a task, including its delete button. */
function createTaskElement(task) {
  const taskElement = document.createElement('li');
  taskElement.className = 'task';

  const titleElement = document.createElement('span');
  titleElement.innerText = task.title;

  taskElement.appendChild(titleElement);
  
  return taskElement;
}
