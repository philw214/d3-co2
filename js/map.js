function makeMap() {
  // d3 svg creation
  var width = 960,
      height = 560;

  var projection = d3.geo.satellite()
      .distance(1.6)
      .scale(1100)
      .rotate([93, -34.5, -4])
      .center([-6.712, 4])
      .tilt(10)
      .clipAngle(Math.acos(1 / 1.4) * 180 / Math.PI - -1.984e-7)
      .precision(.1);

  var graticule = d3.geo.graticule()
      .extent([[-178, 27], [-55 + 8.4e-7, 50 + 5.5680000000092e-7]])
      .step([2, 3]);


  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select(".map-container").append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

  d3.json("./us-land.json", function(error, us) {
    if (error) throw error;

    svg.append("path")
        .datum(topojson.feature(us, us.objects.land))
        .attr("class", "boundary")
        .attr("d", path);
  });

  d3.select(self.frameElement).style("height", height + "px");

}

function mapSmoke() {

  var canvasIds = [
    "map-smoke-left",
    "map-smoke-right"
  ];

  for (var i = 0; i < canvasIds.length; i++) {
    // grab context for each map canvas and canvas ID
    var cId = canvasIds[i];
    var canvas = document.getElementById(canvasIds[i]);

    var ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    var party = smokemachine(ctx, [54, 16.8, 18.2]);

    keepSmoking(party,cId);
  }
}

function keepSmoking(party,cId) {

  party.start(); // start animating
  // continous smoke
  // pass along canvas ID so smoke can rendered on each canvas independently
  if (cId == "map-smoke-right") {
    setInterval(function(){
      party.addsmoke(innerWidth/1.3, innerHeight, 1);
      party.addsmoke(innerWidth/3.6, innerHeight/1.2, 1);
    }, 100)
  } else {
    setInterval(function(){
      party.addsmoke(innerWidth/1.5, innerHeight,1);
      party.addsmoke(innerWidth/6, innerHeight,1);
    }, 100)
  }

}
