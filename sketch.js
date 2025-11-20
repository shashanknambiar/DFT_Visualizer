let img;
let time = 0;
let wave = [];
let dFT = [];
let epicycles;
let ready = false;
let points = [];
function preload() {
  img = loadImage('../assets/bf.jpg');
}

function setup() {
  createCanvas(1000, 600);
  background(0);
  epicycles = new Epicycles();
  img.resize(300, 0);
}

function draw() {
  background(255);
  if (!window.cv) { // Wait until OpenCV finishes loading
    text("Loading OpenCV...", 20, 20);
    return;
  }
  if (!ready) {
    extractContours();
    dFT = DFT.GetDFT(points);
    ready = true;
  }

  if (ready) {
    background(0);
    noFill();
    epicycles.Draw(width / 4 , height / 3, 0, dFT, time);

    const dt = TWO_PI / dFT.length;
    time += dt;

    if (time > TWO_PI) {
      time = 0;
      epicycles.ResetPath();

    }
  }

  function extractContours() {
let src = cv.imread(img.canvas);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  cv.threshold(src, src, 100, 255, cv.THRESH_BINARY_INV); 

  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(src, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_NONE);

  let bestContour = null;
  let bestArea = 0;

  for (let i = 0; i < contours.size(); i++) {
    let c = contours.get(i);
    let area = cv.contourArea(c);

    // Skip tiny noise
    if (area < 50) continue;

    // Skip borders (contours that touch image edges)
    let bounding = cv.boundingRect(c);
    if (
      bounding.x <= 1 ||
      bounding.y <= 1 ||
      bounding.x + bounding.width >= img.width - 1 ||
      bounding.y + bounding.height >= img.height - 1
    ) {
      continue;
    }

    if (area > bestArea) {
      bestArea = area;
      bestContour = c;
    }
  }

  points = [];
  if (bestContour) {
    for (let i = 0; i < bestContour.rows; i++) {
      let p = bestContour.intPtr(i);
      points.push(new Complex(p[0] - img.width/2, p[1] - img.height/2));
    }
  }

  src.delete(); contours.delete(); hierarchy.delete();
  }
}
