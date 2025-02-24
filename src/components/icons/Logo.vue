<template>
  <!-- Canvas para las llamas de fuego -->
  <div class="flame-container">
    <canvas ref="flamingFire" width="150" height="200" class="flame-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Llamas de fuego Canvas
const flamingFire = ref(null);

const drawFlamingFire = () => {
  const canvas = flamingFire.value;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const drawFlames = (x, y, size) => {
    const gradient = ctx.createLinearGradient(x, y - size * 2, x, y);
    gradient.addColorStop(0, "yellow"); // Amarillo en la parte inferior
    gradient.addColorStop(0.5, "orange"); // Naranja en el medio
    gradient.addColorStop(1, "red"); // Rojo en la parte superior
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size * 0.8, y - size * 1.5, x - size * 0.5, y - size * 2.5, x, y - size * 3);
    ctx.bezierCurveTo(x + size * 0.5, y - size * 2.5, x + size * 0.8, y - size * 1.5, x, y);
    ctx.bezierCurveTo(x - size * 0.5, y - size * 2, x - size * 0.3, y - size * 2.8, x, y - size * 3);
    ctx.bezierCurveTo(x + size * 0.3, y - size * 2.8, x + size * 0.5, y - size * 2, x, y);
    ctx.fill();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFlames(75, 180, 60 + Math.random() * 5); // Llamas dinámicas
    setTimeout(animate, 150); // Animación más lenta
  };
  animate();
};

onMounted(() => {
  drawFlamingFire();
});
</script>

<style scoped>
.flame-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flame-canvas {
  background-color: transparent;
}
</style>
