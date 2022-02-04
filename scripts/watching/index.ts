let movies = ["Power of the Dog", "Azor"];

// we don't import d3 because it's imported as a third-party script on the page
d3.select("#viz-root")
  .selectAll("p")
  .data(movies)
  .join("p")
  .text((d) => d);
