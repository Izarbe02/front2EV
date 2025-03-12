<template>
    <div id="metaball-container"></div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  
  
  onMounted(() => {
    let container = document.getElementById("metaball-container");
    let canvas = document.createElement("canvas");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    container.appendChild(canvas);
  
    let gl = canvas.getContext("webgl");
  
    let numMetaballs = 30;
    let metaballs = [];
  
    for (let i = 0; i < numMetaballs; i++) {
      let radius = Math.random() * 60 + 10;
      metaballs.push({
        x: Math.random() * (width - 2 * radius) + radius,
        y: Math.random() * (height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        r: radius * 0.75,
      });
    }
  
    let vertexShaderSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
  
    let fragmentShaderSrc = `
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
          gl_FragColor = vec4(0.7, 0.0, 0.0, 1.0); // Rojo intenso
          return;
        }
  
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Negro de fondo
      }
    `;
  
    function compileShader(shaderSource, shaderType) {
      let shader = gl.createShader(shaderType);
      gl.shaderSource(shader, shaderSource);
      gl.compileShader(shader);
      return shader;
    }
  
    let vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    let fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);
  
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
  
    let vertexData = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    let vertexDataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
  
    let positionHandle = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 2 * 4, 0);
  
    let metaballsHandle = gl.getUniformLocation(program, "metaballs");
  
    function loop() {
      for (let i = 0; i < numMetaballs; i++) {
        let metaball = metaballs[i];
        metaball.x += metaball.vx;
        metaball.y += metaball.vy;
  
        if (metaball.x < metaball.r || metaball.x > width - metaball.r)
          metaball.vx *= -1;
        if (metaball.y < metaball.r || metaball.y > height - metaball.r)
          metaball.vy *= -1;
      }
  
      let dataToSendToGPU = new Float32Array(3 * numMetaballs);
      for (let i = 0; i < numMetaballs; i++) {
        let baseIndex = 3 * i;
        let mb = metaballs[i];
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
  