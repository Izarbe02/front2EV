<template>
  <div class="heart-container">
    <canvas
      ref="flamingHeart"
      width="250"
      height="500"
      class="heart-canvas"
      @mousemove="onMouseMove"
      @mouseleave="resetFlame"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Corazón en llamas Canvas
const flamingHeart = ref(null);
let flameSize = ref(1.0);
let calendarSize = ref(1.0);

const drawFlamingHeart = () => {
  const darkHeartSize = 70; // Tamaño del corazón oscuro
  const darkHeartColor = '#8B0000'; // Color rojo oscuro
  const canvas = flamingHeart.value;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const drawLayer = (x, y, size, color, strokeColor, scaleFactor) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(
      x - size * scaleFactor * 0.8,
      y - size / 2,
      x - size * scaleFactor * 0.8,
      y + size / 2,
      x,
      y + size * 1.3
    );
    ctx.bezierCurveTo(
      x + size * scaleFactor * 0.8,
      y + size / 2,
      x + size * scaleFactor * 0.8,
      y - size / 2,
      x,
      y + size / 4
    );
    ctx.fill();
    ctx.stroke();
  };

  const drawDarkHeart = (x, y, size) => {
    ctx.fillStyle = darkHeartColor;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(
      x - size, y - size / 2, x - size, y + size / 2, x, y + size * 1.3
    );
    ctx.bezierCurveTo(
      x + size, y + size / 2, x + size, y - size / 2, x, y + size / 4
    );
    ctx.fill();
  };

  const drawCalendar = (x, y, width, height) => {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, width * calendarSize.value, height * calendarSize.value);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, width * calendarSize.value, height * calendarSize.value);
    
    // Líneas del calendario
    ctx.beginPath();
    for (let i = 1; i < 4; i++) {
      ctx.moveTo(x, y + (i * height / 4) * calendarSize.value);
      ctx.lineTo(x + width * calendarSize.value, y + (i * height / 4) * calendarSize.value);
    }
    for (let j = 1; j < 5; j++) {
      ctx.moveTo(x + (j * width / 5) * calendarSize.value, y);
      ctx.lineTo(x + (j * width / 5) * calendarSize.value, y + height * calendarSize.value);
    }
    ctx.stroke();

    // Día marcado
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      x + width * 0.75 * calendarSize.value,
      y + height * 0.6 * calendarSize.value + Math.sin(Date.now() / 200) * 3, // Movimiento animado
      (8 * calendarSize.value) + Math.sin(Date.now() / 200) * 1.5, // Cambio de tamaño animado

      x + width * 0.75 * calendarSize.value,
      y + height * 0.6 * calendarSize.value,
      8 * calendarSize.value,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLayer(125, 200, 80 * flameSize.value, "red", "#C04100", 1.2);
    drawLayer(125, 200, 65 * flameSize.value, "white", "#C04100", 1.0);
    drawLayer(125, 200, 55 * flameSize.value, "red", "#C04100", 0.8);
    drawDarkHeart(125, 240, darkHeartSize); // Corazón oscuro detrás del calendario
    drawCalendar(100, 275, 50, 40); // Calendario ajustado y centrado
    setTimeout(animate, 150);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLayer(125, 200, 80 * flameSize.value, "red", "#C04100", 1.2);
    drawLayer(125, 200, 65 * flameSize.value, "white", "#C04100", 1.0);
    drawLayer(125, 200, 55 * flameSize.value, "red", "#C04100", 0.8);
    drawCalendar(100, 275, 50, 40); // Calendario ajustado y centrado
    setTimeout(animate, 150);
  };
  animate();
};

const onMouseMove = () => {
  flameSize.value = 1.2;
  calendarSize.value = 1.1;
};

const resetFlame = () => {
  flameSize.value = 1.0;
  calendarSize.value = 1.0;
};

onMounted(() => {
  drawFlamingHeart();
});
</script>

<style scoped>
.heart-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-canvas {
  background-color: transparent;
}
</style>
