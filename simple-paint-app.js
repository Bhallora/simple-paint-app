let container = document.getElementById("app-container");
let stencil = container.getContext("2d");
let eraser = document.getElementById("clear-button");
let dragging = false,
  dragMode = false,
  angle = (30 * Math.PI) / 180,
  sides = 3,
  startPointOfDrag,
  drawingAreaImageData;
  polygons = [];

// for handling the mouse events we have used the addEventListener()

container.addEventListener("mousedown", e => {
  e.preventDefault();
  dragging = true;
  startPointOfDrag = getCoordinatesOfCanvas(e);
  saveDrawingArea();
});

container.addEventListener("mousemove", e => {
  e.preventDefault();
  if (dragging === true) {
    restoreDrawingArea();
    let coordinates = getCoordinatesOfCanvas(e);
    stencil.fillStyle = colorGenerator();
    drawTriangle(coordinates);
  }
});
container.addEventListener("mouseup", e => {
  e.preventDefault();
  dragging = false;
  restoreDrawingArea();
  stencil.fillStyle = colorGenerator();
  let coordinates = getCoordinatesOfCanvas(e);
  drawTriangle(coordinates);
});

eraser.addEventListener("click", e => {
  stencil.clearRect(0, 0, container.width, container.height);
});

/*****************************XXX*******************************/


let getCoordinatesOfCanvas = e => {
    let drawingBox = container.getBoundingClientRect();
  return {
    x: (x = e.clientX - drawingBox.left),  
    y: (y = e.clientY - drawingBox.top ),
  };
};

let saveDrawingArea=()=> imageData = stencil.getImageData(0, 0, container.width, container.height);
// for getting the pixel data of the entire drawing area, getImageData() method has been used.

let restoreDrawingArea=()=> stencil.putImageData(imageData, 0, 0);


function Point(x, y) {
  this.x = x;
  this.y = y;
}

let drawTriangle=(coordinates)=>{
  var points = [],
    radius = Math.sqrt(
      Math.pow(startPointOfDrag.x - coordinates.x, 2) +
        Math.pow(startPointOfDrag.x - coordinates.x, 2)
    ),
    index = 0;

  for (index = 0; index < sides; index++) {
    points.push(
      new Point(
        startPointOfDrag.x + radius * Math.cos(angle),
        startPointOfDrag.y + radius * Math.sin(angle)
      )
    );
    angle += (2 * Math.PI) / sides;
  }

  stencil.beginPath();
  stencil.moveTo(points[0].x, points[0].y);
  for (index = 1; index < sides; index++) {
    stencil.lineTo(points[index].x, points[index].y);
  }

  stencil.closePath();
  stencil.fill();
}

let colorGenerator = () => {
  let r = Math.round(Math.random() * 256);
  let g = Math.round(Math.random() * 256);
  let b = Math.round(Math.random() * 256);
  let a = 0.8;

  return "rgba( " + r + "," + g + "," + b + "," + a + ")";
}; // for multiple color generation we have used the Math.random() method and for getting an integer(rounded) we have used the Math.round() method.


let soundOn =()=>{
  let audio = new Audio('./assets/game-over.mp3');
  audio.play();
}