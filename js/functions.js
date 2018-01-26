function getFact(dataset,target_year) {

  dataset.forEach(function(d) {
    var fact = document.getElementById("fact");
    fact.classList.remove("smoky");
    if (target_year == d.year) {
      // grab co2 data for given year
      d3.select(".co2-fact").text(d.co2 + "(kt)");
      setTimeout(function(){
        fact.classList.add("smoky");
      },2000)
    }
  });

}

function iconSmoke() {

  var canvasIds = [
    "canvas1",
    "canvas2",
    "canvas3"
  ];

  for (var i = 0; i < canvasIds.length; i++) {

    var canvas = document.getElementById(canvasIds[i]);
    // grab context for each icon canvas
    var ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // from smoke.js
    var party = smokemachine(ctx, [54, 16.8, 18.2]);
    // create puff of smoke
    puffIt(party);

  }

}

function puffIt(party) {

  party.start(); // start animating

  // continous smoke - for testing placement/color/etc.
  // setInterval(function(){
  //   party.addsmoke(innerWidth/2.3, innerHeight,1)
  //   party.addsmoke(innerWidth/1.8, innerHeight,1)
  // }, 100)

  // starts and stops smoke to prevent continuous animation
  setTimeout(function() {

    party.stop() // stop animating

    party.addsmoke(innerWidth/2.3, innerHeight,7)
    party.addsmoke(innerWidth/1.8, innerHeight,4)

    setTimeout(function(){
      party.start()
    },500)

  },500)


}
