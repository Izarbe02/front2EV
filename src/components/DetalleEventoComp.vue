<script setup lang="ts">


</script>

<template>
    <main class="main">
        <article class="evento">
            <h1 class="evento__titulo">TITULO DEL EVENTO</h1>
            <section class="evento__detalle">
                <img alt="Imagen Evento" class="evento__imagen">
                <div class="evento__texto"></div>
                    <h3 class="evento__subtitle">Descripcion</h3>
                    <span>esta es la desc del evetno</span>
            </section>
        </article>
    </main>
</template>

<style lang="scss">
h1 {
  margin-top: 5%;
  border: #d40202;
  background-color: rgba(0, 0, 0, 0.88);
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
  color: #d40202;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  width: 100%;
  padding: 10px;
}
</style>