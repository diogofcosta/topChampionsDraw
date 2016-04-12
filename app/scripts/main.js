/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  function closeMenu() {
    body.classList.remove('open');
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    body.classList.toggle('open');
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
    navdrawerContainer.classList.add('opened');
  }

  main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' ||
       window.location.hostname === 'localhost' ||
       window.location.hostname.indexOf('127.') === 0)) {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: './'
    }).then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function () {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing service worker became redundant.');
            }
          };
        }
      };
    }).catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
  }

  var team1 = document.getElementById("team1Players");
  while (team1.firstChild) {
    team1.removeChild(team1.firstChild);
  }
  var team2 = document.getElementById("team2Players");
  while (team2.firstChild) {
    team2.removeChild(team2.firstChild);
  }
  var playersToDraft = {
    "players":[
      {"name":"(acmaia)\tAndré Maia", "skill":5.85},
      {"name":"(tonisedutor)\tAntónio 'Ceguinho' Soares",	"skill":4.93},
      {"name":"(jorge)\tJorge 'Buffon' Reis", "skill":5.75},
      {"name":"Diogo 'O Guia' Costa", "skill":5.67},
      {"name":"(aloisi)\tAndrea 'Pirlo' Aloisi", "skill":7.38},
      {"name":"João Costa", "skill":4.90},
      {"name":"(zao)\tJoão 'Jay-Z' Zão", "skill":9.73},
      {"name":"(marcos)\tMarcos 'Levezinho' Oliveira", "skill":6.33},
      {"name":"Miguel 'Quebra-Ossos' Oliveira", "skill":6.50},
      {"name":"Pedro 'Firefighter' Letra", "skill":7.46},
      {"name":"(lucy)\tLuciano 'Lenhador' Santos", "skill":6.08},
      {"name":"(luis)\tLuís Gomes", "skill":8.40},
      {"name":"Nelson 'O Boss' Pereira", "skill":9.20},
      {"name":"Nelson 'O Outro' Pereira", "skill":5.54},
      {"name":"(tiagoc)\tTiago '5 minutos' Coelho", "skill":7.79},
      {"name":"(wily93)\tWilson 'Willy93' Oliveira", "skill":4.64},
      {"name":"Factor 'X' Surpresa", "skill":5.00}
    ]
  };


  var countDraft = 0;

  var topPlayersList = document.getElementsByClassName("topPlayersList")[0];
  var draftPot = document.getElementsByClassName("draftingPot")[0];
  var draftPotBckp;
  for(var i = 0;  i < playersToDraft.players.length ; i++)
  {
    var entry = document.createElement('span');
    var button = document.createElement("button");
    button.innerHTML = "+";
    button.addEventListener("click",addToDraftList,true);
    entry.appendChild(button);
    var text = document.createTextNode(playersToDraft.players[i]["name"]);
    entry.appendChild(text);
    topPlayersList.appendChild(entry);
  }

  document.getElementById("resetPot").addEventListener("click",resetCurrentDraft,true);
  document.getElementById("draftTeams").addEventListener("click",draftTeams,true);
  document.getElementById("draftTeams").myCounter = 1;



  // Your custom JavaScript goes here
  function getRandomPlayer()
  {
    if(draftPot.childElementCount != 0)
    {
      var random = Math.floor((Math.random() * draftPot.childElementCount) );

      var playerSelected = draftPot.childNodes[random];
      if(playerSelected.childNodes[1])
        var playerName = playerSelected.childNodes[1];
      else
        var playerName = playerSelected.childNodes[0];

      if(countDraft % 2 == 0)
      {
        var span = document.createElement("span");
        span.appendChild(playerName);
        team1.appendChild(span);
        draftPot.removeChild(playerSelected);
        countDraft++;
      }
      else
      {
        var span = document.createElement("span");
        span.appendChild(playerName);
        team2.appendChild(span);
        draftPot.removeChild(playerSelected);
        countDraft++;
      }
      return false;
    }
    else
    {
      return true;
    }
  }

  function draftTeams(evt)
  {
    draftPot = document.getElementsByClassName("draftingPot")[0];
    var averageScoreDifference = 0;
    var playerSelected;
    for(var i = 0 ; i < draftPot.childNodes.length ; i++)
    {
      var currentPlayer = draftPot.childNodes[i];
      if(currentPlayer.childNodes[1])
      {
        playerSelected = getPlayerObjectWithName(currentPlayer.childNodes[1].textContent);
      }
      else
      {
        playerSelected = getPlayerObjectWithName(currentPlayer.childNodes[0].textContent);
      }
      averageScoreDifference += playerSelected.skill;
    }

    averageScoreDifference = (averageScoreDifference/2) * 0.05;

    draftPotBckp = draftPot.cloneNode(true);
    while(!getRandomPlayer())
    {
    }
    var scoreTeam1 = calculateScoreOfTeam(team1);
    var scoreTeam2 = calculateScoreOfTeam(team2);

    if(Math.abs(scoreTeam1-scoreTeam2) >= averageScoreDifference)
    {
        console.log("Equipas desiquilibradas, vamos refazer o draft!");
        resetDraft();
        draftPot.parentNode.replaceChild(draftPotBckp,draftPot);
        evt.target.myCounter++;
        draftTeams(evt);
    }
    else
    {
      var team1Array = createArrayOfNamesFromTeam(team1);
      var team2Array = createArrayOfNamesFromTeam(team2);
      var textToSend = "@all\nEquipas para a futebolada desta semana!\n\nTOP Team 1:\n";
      for(var i = 0 ; i < team1Array.length ; i++)
      {
        textToSend += (team1Array[i] + "\n");
      }
      textToSend += "\n Team 1 Estimated Score: "+scoreTeam1 +"\n";
      textToSend += "\nTOP Team 2:\n";
      for(var i = 0 ; i < team2Array.length ; i++)
      {
        textToSend += (team2Array[i] + "\n");
      }
      textToSend += "\n Team 2 Estimated Score: "+scoreTeam2 +"\n";
      textToSend += "\nFinal teams drafted after "+ evt.target.myCounter +" times! Good luck!\nPowered by topChampionsDraw app!\n(yey)";

      /*
      UNCOMMENT TO SEND TO SLACK

      var http = new XMLHttpRequest();
      var url = "https://hooks.slack.com/services/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";
      var payload = JSON.stringify({text:textToSend});

      http.open("POST", url, true);

      http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert("Final teams drafted after "+ evt.target.myCounter +" times! Good luck!");
        }
      }
      http.send(payload);
            */

      var http2 = new XMLHttpRequest();
      //url3 is testesRoom in hipchat:: url2 is office room in hipchat!
      var url3 = "https://topdox.hipchat.com/v2/room/2468884/notification?auth_token=CtBPkX4kb626xhockIUJbbMKphesVZ9uwm8Y1HZ9";
      var url2 = "https://topdox.hipchat.com/v2/room/2461171/notification?auth_token=8VTZFxlXzAm9XFKFZGdHcWRN3NpWd7ekhw0naTk7";
      var params = "color=green&message="+textToSend+"&notify=false&message_format=text";

      http2.open("POST", url2, true);

      http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http2.onreadystatechange = function() {
        if(http2.readyState == 4 && http2.status == 200) {
          alert("Final teams drafted after "+ evt.target.myCounter +" times! Good luck!");
        }
      }
      http2.send(params);

    }
  }

  function resetDraft()
  {
    while (team1.firstElementChild) {
      team1.firstElementChild.firstChild.innerHTML = "+";
      draftPot.appendChild(team1.firstElementChild);
    }
    while (team2.firstElementChild) {
      team2.firstElementChild.firstChild.innerHTML = "+";
      draftPot.appendChild(team2.firstElementChild);
    }
  }

  function calculateScoreOfTeam(team)
  {
    var score = 0;
    var players = team.childNodes;
    for(var i = 0 ; i < players.length ; i++)
    {
      var currentPlayer = players[i].textContent;
      var player = getPlayerObjectWithName(currentPlayer);
      score += player.skill;
    }
    return score;
  }

  function addToDraftList()
  {
    var name = this.parentNode;
    draftPot.appendChild(name);
    this.innerHTML = "-";
    this.addEventListener("click",removeFromDraftList,true);
  }

  function removeFromDraftList()
  {
    var name = this.parentNode;
    topPlayersList.appendChild(name);
    this.innerHTML = "+";
    this.addEventListener("click",addToDraftList,true);
  }

  function getPlayerObjectWithName(name)
  {
     for(var i = 0; i < playersToDraft.players.length; i++)
     {
       var player = playersToDraft.players[i];
       if(player.name == name)
       {
         return player;
       }
     }
    return null;
  }


  function clearDraftingList()
  {
    console.log("entrei no clear! this is the drafting pot: ",draftPot);
    while (draftPot.firstElementChild) {
      draftPot.firstElementChild.firstChild.innerHTML = "+";
      topPlayersList.appendChild(draftPot.firstElementChild);
    }
    while (team1.firstElementChild) {
      team1.firstElementChild.firstChild.innerHTML = "+";
      topPlayersList.appendChild(team1.firstElementChild);
    }
    while (team2.firstElementChild) {
      team2.firstElementChild.firstChild.innerHTML = "+";
      topPlayersList.appendChild(team2.firstElementChild);
    }
    countDraft = 0;
  }

  function resetCurrentDraft()
  {
    while (team1.firstElementChild) {
      team1.removeChild(team1.firstElementChild);
    }
    while (team2.firstElementChild) {
      team2.removeChild(team2.firstElementChild);
    }
    countDraft = 0;
    draftPot = draftPot.parentNode.replaceChild(draftPotBckp,draftPot);

    for(var i = 0 ; i < draftPotBckp.childNodes.length; i++)
    {
      draftPotBckp.childNodes[i].firstChild.addEventListener("click",removeFromDraftList,true);
    }
  }

  function createArrayOfNamesFromTeam(team)
  {
    var result = [];
    for(var i = 0 ; i < team.childNodes.length; i++)
    {
      result.push(team.childNodes[i].textContent);
    }
    return result;
  }

})();
