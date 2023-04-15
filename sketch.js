const {VerletPhysics2D, VerletParticle2D, VerletSpring2D} = toxi.physics2d

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom

let physics;
let particleA, particleB, particleC;
let spring, spring2;
let particles = []

function setup() {
  createCanvas(innerWidth, innerHeight);
  
  physics = new VerletPhysics2D();
  let v = new Vec2D(0, 1)
  let gravity = new GravityBehavior(v)
  physics.addBehavior(gravity)
  
  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds)
  
  particleA = new VerletParticle2D(320,100)
  physics.addParticle(particleA)
  
  particleB = new VerletParticle2D(310,200)
  physics.addParticle(particleB)
  
  particleC = new VerletParticle2D(210,50)
  physics.addParticle(particleC)
  
  spring = new VerletSpring2D(particleA, particleB, 100, 0.5)
  physics.addSpring(spring)
  
  spring2 = new VerletSpring2D(particleC, particleB, 100, 0.5)
  physics.addSpring(spring2)
}

function draw() {
  background(255);
  
  physics.update();
  
  if(mouseIsPressed){
    particleA.lock()
    particleA.x = mouseX
    particleA.y = mouseY
    particleA.unlock()
  }
  
  fill(0)
  circle(particleA.x, particleA.y, 16)
  
  fill(0)
  circle(particleB.x, particleB.y, 16)
  
  fill(0)
  circle(particleC.x, particleC.y, 16)


  if(particles.length < 500)
    {
    particles.push({
      x: particleC.x,
      y: particleC.y,
      randomColor: [Math.random() * 255, Math.random() * 255, Math.random() * 255]
                  })
    } else { particles.splice(0,1)}
  particles.map((particle, i) => {
    fill(particle.randomColor[0],particle.randomColor[1], particle.randomColor[2])
    circle(particle.x, particle.y, 8)
    particles.length -1 > i && line(particle.x, particle.y, particles[i  +1].x, particles[i  +1].y)
  })
    
  
  
  line(particleC.x, particleC.y,  particleB.x, particleB.y)
  
  line(particleA.x, particleA.y,  particleB.x, particleB.y)
}
