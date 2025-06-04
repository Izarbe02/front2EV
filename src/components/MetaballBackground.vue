<template>
  <div id="metaball-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "MetaballBackground",
  setup() {
    onMounted(() => {
      const container = document.getElementById("metaball-container");
      if (!container) return;

      const canvas = document.createElement("canvas");
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);
      container.appendChild(canvas);

      const gl = canvas.getContext("webgl");
      if (!gl) throw new Error("WebGL no soportado");

      const numMetaballs = 30;
      const metaballs: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

      for (let i = 0; i < numMetaballs; i++) {
        const radius = Math.random() * 60 + 10;
        metaballs.push({
          x: Math.random() * (width - 2 * radius) + radius,
          y: Math.random() * (height - 2 * radius) + radius,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          r: radius * 0.75,
        });
      }

      const vertexShaderSrc = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSrc = `
        precision highp float;
        uniform vec3 metaballs[${numMetaballs}];
        void main() {
          float x = gl_FragCoord.x;
          float y = gl_FragCoord.y;
          float sum = 0.0;
          for (int i = 0; i < ${numMetaballs}; i++) {
            vec3 mb = metaballs[i];
            float dx = mb.x - x;
            float dy = mb.y - y;
            float radius = mb.z;
            sum += (radius * radius) / (dx * dx + dy * dy);
          }
          if (sum >= 0.99) {
            gl_FragColor = vec4(0.7, 0.0, 0.0, 1.0);
            return;
          }
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      `;

      function compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader {
        const shader = gl.createShader(shaderType);
        if (!shader) throw new Error("No se pudo crear el shader");
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        return shader;
      }

      const vertexShader = compileShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
      const fragmentShader = compileShader(gl, fragmentShaderSrc, gl.FRAGMENT_SHADER);

      const program = gl.createProgram();
      if (!program) throw new Error("No se pudo crear el programa WebGL");

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const vertexData = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
      const vertexDataBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

      const positionHandle = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionHandle);
      gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 2 * 4, 0);

      const metaballsHandle = gl.getUniformLocation(program, "metaballs");
      if (!metaballsHandle) throw new Error("No se pudo obtener la ubicación de uniform");

      function loop() {
        for (let i = 0; i < numMetaballs; i++) {
          const metaball = metaballs[i];
          metaball.x += metaball.vx;
          metaball.y += metaball.vy;

          if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
          if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
        }

        const dataToSendToGPU = new Float32Array(3 * numMetaballs);
        for (let i = 0; i < numMetaballs; i++) {
          const baseIndex = 3 * i;
          const mb = metaballs[i];
          dataToSendToGPU[baseIndex] = mb.x;
          dataToSendToGPU[baseIndex + 1] = mb.y;
          dataToSendToGPU[baseIndex + 2] = mb.r;
        }

        gl.uniform3fv(metaballsHandle, dataToSendToGPU);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(loop);
      }

      loop();
    });
  }
});
</script>

<style scoped>
#metaball-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
