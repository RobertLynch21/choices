// Define the criteria and corresponding weights
const criteria = {
    salary: 10,
    job_security: 8,
    work_life_balance: 6,
    job_satisfaction: 4,
    skills_development: 2
  };
  
  // Define the pros and cons for each choice
  const choices = [
    {
      name: 'Working on the road as an iron worker',
      pros: {
        salary: 8,
        job_security: 6,
        work_life_balance: 2,
        job_satisfaction: 5,
        skills_development: 9
      },
      cons: {
        salary: 3,
        job_security: 5,
        work_life_balance: 8,
        job_satisfaction: 3,
        skills_development: 4
      }
    },
    {
      name: 'Working at a prison as a security guard',
      pros: {
        salary: 7,
        job_security: 9,
        work_life_balance: 4,
        job_satisfaction: 6,
        skills_development: 3
      },
      cons: {
        salary: 4,
        job_security: 4,
        work_life_balance: 9,
        job_satisfaction: 2,
        skills_development: 2
      }
    },
    {
      name: 'Working from home as a software engineer',
      pros: {
        salary: 9,
        job_security: 7,
        work_life_balance: 9,
        job_satisfaction: 9,
        skills_development: 7
      },
      cons: {
        salary: 5,
        job_security: 6,
        work_life_balance: 2,
        job_satisfaction: 4,
        skills_development: 2
      }
    }
  ];
  
  // Calculate the total score for each choice
  choices.forEach((choice) => {
    let prosTotal = 0;
    let consTotal = 0;
    for (const criterion in criteria) {
      prosTotal += choice.pros[criterion] * criteria[criterion];
      consTotal += choice.cons[criterion] * criteria[criterion];
    }
    choice.prosTotal = prosTotal;
    choice.consTotal = consTotal;
    choice.total = prosTotal - consTotal;
  });
  
  // Sort the choices based on the total score
  choices.sort((a, b) => b.total - a.total);
  
  // Display the choices and their total scores on a webpage
  const container = document.querySelector('#choices-container');
  choices.forEach((choice) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <h2>${choice.name}</h2>
      <p>Pros score: ${choice.prosTotal}</p>
      <p>Cons score: ${choice.consTotal}</p>
      <p>Total score: ${choice.total}</p>`;
    container.appendChild(element);
  });
  

  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");
  const particles = [];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
      ctx.fillStyle = "#00ff00";
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].size <= 0.2) {
        particles.splice(i, 1);
        i--;
      }
    }
  }

  document.addEventListener("mousemove", (e) => {
    const xPos = e.clientX;
    const yPos = e.clientY;

    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(xPos, yPos));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
  }

  animate();