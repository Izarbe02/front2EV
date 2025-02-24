<template>
  <!-- Canvas para el corazón en llamas -->
  <div class="heart-container">
    <canvas
      ref="flamingHeart"
      width="150"
      height="150"
      class="heart-canvas"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Corazón en llamas Canvas
const flamingHeart = ref(null);

const drawFlamingHeart = () => {
  const canvas = flamingHeart.value;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const drawHeart = (x, y, size) => {
    ctx.fillStyle = "#ffffff"; // Blanco
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(
      x - size,
      y - size / 2,
      x - size,
      y + size / 2,
      x,
      y + size * 1.5,
    );
    ctx.bezierCurveTo(
      x + size,
      y + size / 2,
      x + size,
      y - size / 2,
      x,
      y + size / 4,
    );
    ctx.fill();
  };

  const drawFlames = (x, y, size) => {
    const gradient = ctx.createLinearGradient(x, y - size * 2, x, y);
    gradient.addColorStop(0, "orange"); // Naranja en la parte superior
    gradient.addColorStop(1, "red"); // Rojo en la base

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.2);
    ctx.bezierCurveTo(
      x - size * 1.1,
      y - size * 0.8,
      x - size * 0.9,
      y - size * 1.5,
      x,
      y - size * 2,
    );
    ctx.bezierCurveTo(
      x + size * 0.9,
      y - size * 1.5,
      x + size * 1.1,
      y - size * 0.8,
      x,
      y - size * 0.2,
    );
    ctx.bezierCurveTo(
      x - size * 0.6,
      y - size * 1.3,
      x - size * 0.5,
      y - size * 1.7,
      x,
      y - size * 2,
    );
    ctx.bezierCurveTo(
      x + size * 0.5,
      y - size * 1.7,
      x + size * 0.6,
      y - size * 1.3,
      x,
      y - size * 0.2,
    );
    ctx.fill();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFlames(75, 110, 50 + Math.random() * 5); // Llamas dinámicas y envolventes
    drawHeart(75, 115, 30);
    setTimeout(animate, 150); // Animación más lenta
  };
  animate();
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
