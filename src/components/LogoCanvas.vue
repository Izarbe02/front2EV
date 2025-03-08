<template>
  <div class="logo-wrapper">
    <canvas
      ref="logoCanvas"
      :width="canvasSize"
      :height="canvasSize"
      @mouseenter="startAnimation"
      @mouseleave="resetAnimation"
      class="logo-canvas"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

const canvasSize = 160;
const logoCanvas = ref<HTMLCanvasElement | null>(null);
const images = ref<HTMLImageElement[]>([]);
const isAnimating = ref(false);
const animationProgress = ref(0);
const animationSpeed = 0.08;
const separationDistance = 10;
const rotationAngle = ref(0);

const logoPartsSrc = [
new URL("@/assets/Images/part1logo.png", import.meta.url).href,
new URL("@/assets/Images/part2logo.png", import.meta.url).href,
new URL("@/assets/Images/part3logo.png", import.meta.url).href,
];

onMounted(async () => {
await nextTick(); 

if (!logoCanvas.value) {
  console.error("No se encontró el canvas en el DOM");
  return;
}

const ctx = logoCanvas.value.getContext("2d");
if (!ctx) {
  console.error("No se pudo obtener el contexto 2D del canvas");
  return;
}

logoCanvas.value.width = canvasSize;
logoCanvas.value.height = canvasSize;

// Cargar imágenes
logoPartsSrc.forEach((src, index) => {
  const img = new Image();
  img.onload = () => {
    console.log(`Imagen ${index + 1} cargada:`, src);
    images.value[index] = img;
    if (images.value.length === logoPartsSrc.length) {
      drawLogo(0);
    }
  };
  img.onerror = () => {
    console.error(`Error al cargar la imagen: ${src}`);
  };
  img.src = src;
});
});

function startAnimation() {
isAnimating.value = true;
animate(1);
}

function resetAnimation() {
isAnimating.value = true;
animate(0);
}

function animate(targetProgress: number) {
if (!isAnimating.value) return;

animationProgress.value += (targetProgress - animationProgress.value) * animationSpeed;
rotationAngle.value += 0.05; // Incrementamos el ángulo de rotación en cada frame

drawLogo(animationProgress.value);

if (Math.abs(targetProgress - animationProgress.value) > 0.01) {
  requestAnimationFrame(() => animate(targetProgress));
} else {
  isAnimating.value = false;
}
}

function drawLogo(progress: number) {
const ctx = logoCanvas.value?.getContext("2d"); // 🔥 Obtenemos el contexto dinámicamente

if (!ctx) {
  console.warn("No se pudo obtener el contexto del canvas");
  return;
}

if (images.value.length < 3) return;

ctx.clearRect(0, 0, canvasSize, canvasSize);

const width = canvasSize;
const height = canvasSize;
const imgScale = 0.8;
const offset = separationDistance * easeInOutQuad(progress);
const spacing = width / 10;

images.value.forEach((img, index) => {
  if (!img) return;

  const aspectRatio = img.width / img.height;
  let imgWidth = (width / 3) * imgScale;
  let imgHeight = imgWidth / aspectRatio;

  if (imgHeight > height * imgScale) {
    imgHeight = height * imgScale;
    imgWidth = imgHeight * aspectRatio;
  }

  let xPos =
    index === 0
      ? width / 2 - imgWidth / 2
      : index === 1
      ? width / 2 - imgWidth / 2 - spacing - offset
      : width / 2 - imgWidth / 2 + spacing + offset;

  let yPos = (height - imgHeight) / 2;

  ctx.save();

  if (index === 0) {
    ctx.translate(xPos + imgWidth / 2, yPos + imgHeight / 2);
    ctx.rotate(rotationAngle.value);
    ctx.translate(-imgWidth / 2, -imgHeight / 2);
  }

  ctx.drawImage(img, index === 0 ? 0 : xPos, index === 0 ? 0 : yPos, imgWidth, imgHeight);

  ctx.restore();
});
}

function easeInOutQuad(x: number): number {
return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

</script>

<style scoped>
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-canvas {
  cursor: pointer;
}
</style>
