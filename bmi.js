// js/bmi.js
document.getElementById("bmiForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const height = parseFloat(document.getElementById("height").value) / 100;
  const weight = parseFloat(document.getElementById("weight").value);

  if (height <= 0 || weight <= 0) return;

  const bmi = weight / (height * height);
  const result = document.getElementById("bmiResult");
  result.innerText = `Your BMI is ${bmi.toFixed(1)} (${getBMICategory(bmi)})`;
  drawGauge(bmi);
});

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal";
  else if (bmi < 30) return "Overweight";
  else return "Obese";
}

function drawGauge(bmi) {
  const canvas = document.getElementById("bmiGauge");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 300, 150);

  const ranges = [
    { color: "#fbbf24", min: 0, max: 18.5 },
    { color: "#10b981", min: 18.5, max: 24.9 },
    { color: "#f59e0b", min: 25, max: 29.9 },
    { color: "#ef4444", min: 30, max: 40 }
  ];

  const startAngle = Math.PI;
  const endAngle = 0;
  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  // Draw segmented arc
  ranges.forEach(range => {
    const sa = Math.PI * ((range.min - 10) / 30);
    const ea = Math.PI * ((range.max - 10) / 30);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI - sa, Math.PI - ea, true);
    ctx.strokeStyle = range.color;
    ctx.lineWidth = 20;
    ctx.stroke();
  });

  // Draw pointer
  const angle = Math.PI * ((bmi - 10) / 30);
  const pointerX = centerX + radius * Math.cos(Math.PI - angle);
  const pointerY = centerY + radius * Math.sin(Math.PI - angle);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(pointerX, pointerY);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Tick marks
  const ticks = [16, 17, 18.5, 25, 30, 35, 40];
  ticks.forEach(t => {
    const tickAngle = Math.PI * ((t - 10) / 30);
    const tx = centerX + (radius - 15) * Math.cos(Math.PI - tickAngle);
    const ty = centerY + (radius - 15) * Math.sin(Math.PI - tickAngle);
    ctx.fillStyle = "#333";
    ctx.font = "10px sans-serif";
    ctx.fillText(t.toString(), tx - 8, ty);
  });
}
