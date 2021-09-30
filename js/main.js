// write your javascript code here.
// feel free to change the preset attributes as you see fit

let margin = {
  top: 60,
  left: 50,
  right: 30,
  bottom: 35
},
width = 500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// first visualization
let svg1 = d3.select('#vis1')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
.attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
.style('background-color', '#ccc') // change the background color to light gray
.attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

// second visualization
let svg2 = d3.select('#vis2')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
.attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
.style('background-color', '#ccc') // change the background color to light gray
.attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))






// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 20, left: 50},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#vis1")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",`translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv").then( function(data) {

// List of subgroups = header of the csv files = soil condition here
const subgroups = data.columns.slice(1)

// List of groups = species here = value of the first column called group -> I show them on the X axis
const groups = data.map(d => d.group)

console.log(groups)

// Add X axis
const x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickSize(0));

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 40])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

// Another scale for subgroup position?
const xSubgroup = d3.scaleBand()
  .domain(subgroups)
  .range([0, x.bandwidth()])
  .padding([0.05])

// color palette = one color per subgroup
const color = d3.scaleOrdinal()
  .domain(subgroups)
  .range(['#e41a1c','#377eb8','#4daf4a'])

// Show the bars
svg.append("g")
  .selectAll("g")
  // Enter in data = loop group per group
  .data(data)
  .join("g")
    .attr("transform", d => `translate(${x(d.group)}, 0)`)
  .selectAll("rect")
  .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
  .join("rect")
    .attr("x", d => xSubgroup(d.key))
    .attr("y", d => y(d.value))
    .attr("width", xSubgroup.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", d => color(d.key));

})