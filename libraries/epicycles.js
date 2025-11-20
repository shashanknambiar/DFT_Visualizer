class Epicycles
{
  constructor()
  {
    this.path = []
  }

  ResetPath()
  {
    this.path = []
  }
  
  Draw(x,y, rotation, fourier, time)
  {
    for(const element of fourier)
      { 
        let prevX = x;
        let prevY = y;
        let freq = element.freq;
        let radius = element.amp;
        let phase = element.phase;
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);

        stroke(255, 100);
        noFill();
        ellipse(prevX, prevY, radius * 2);
        stroke(255);
        line(prevX, prevY, x, y);
      }
    this.path.unshift(createVector(x, y))
    beginShape();
    noFill();
    strokeWeight(2);
    stroke(255, 0, 255);
    line(x, y, this.path[0].x+300, this.path[0].y);
    for (const element of this.path) {
      vertex(element.x+ 300, element.y);
    }
    endShape();
  }
}
