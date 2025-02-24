<template>
  <!-- Canvas para el corazón en llamas con ondas concéntricas -->
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

const drawFlamingHeart = () => {
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
      y + size * 1.3,
    );
    ctx.bezierCurveTo(
      x + size * scaleFactor * 0.8,
      y + size / 2,
      x + size * scaleFactor * 0.8,
      y - size / 2,
      x,
      y + size / 4,
    );
    ctx.fill();
    ctx.stroke();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLayer(125, 200, 80 * flameSize.value, "red", "#C04100", 1.2); // Capa externa roja
    drawLayer(125, 200, 65 * flameSize.value, "white", "#C04100", 1.0); // Capa media naranja
    drawLayer(125, 200, 55 * flameSize.value, "red", "#C04100", 0.8); // Capa interna amarilla
    setTimeout(animate, 150); // Animación más lenta
  };
  animate();
};

const onMouseMove = () => {
  flameSize.value = 1.2; // Aumenta el tamaño al pasar el mouse
};

const resetFlame = () => {
  flameSize.value = 1.0; // Vuelve al tamaño normal al salir el mouse
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
