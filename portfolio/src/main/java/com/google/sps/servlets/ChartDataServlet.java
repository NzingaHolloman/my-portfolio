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

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/destination-data")
public class ChartDataServlet extends HttpServlet {
  private Map<String, Long> destinationVotes = new HashMap<>();
    @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Votes"); 
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    Map<String, Long> updateVote = new HashMap<>();
        for (Entity entity : results.asIterable()) {
      String trip = (String) entity.getProperty("destination");
      long currentVotes = updateVote.containsKey(trip) ? updateVote.get(trip) : 0;
      long pls = (long) entity.getProperty("total votes");

      updateVote.put(trip,pls+currentVotes);
     }
    //destinationVotes =updateVote;
    response.setContentType("application/json;");
    String json = new Gson().toJson(updateVote);
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String trip = request.getParameter("destination");
    long currentVotes = destinationVotes.containsKey(trip) ? destinationVotes.get(trip) : 0;
    destinationVotes.put(trip, currentVotes);

    long timestamp = System.currentTimeMillis();
    Entity taskEntity = new Entity("Votes");
    taskEntity.setProperty("destination", trip);
    taskEntity.setProperty("total votes", currentVotes + 1);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(taskEntity);
    response.sendRedirect("AboutMe.html");
  }
}