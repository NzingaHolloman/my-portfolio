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
function addRandomGreeting() {
  const greetings = [
    "Brazil!",
    "Bangkok, Thailand!",
    "Accra, Ghana!",
    "Botswana!",
    "Machu Picchu!",
    "Beijing, China!",
    "Chichen Itza, Mexico!"
  ];
  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById("greeting-container");
  greetingContainer.innerText = greeting;
}

function getHelloNzingaUsingAsyncAwait() {
  fetch("data")
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(myObject => {
      var quote = "";

      myObject.forEach(function(element) {
        console.log(element);
        var para = document.createElement("p");
        var node = document.createTextNode(element.toString());
        para.appendChild(node);

        var element = document.getElementById("HelloNzinga-container");
        element.appendChild(para);
      });
    });
}
