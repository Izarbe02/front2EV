<template>
  <Header />

  <main class="eventos-container">
    <div class="eventos-container__buscador">
      <BuscadorEventos />
    </div>

    <div v-if="eventosStore.eventos.length === 0" class="eventos-container__mensaje">
      No hay eventos disponibles.
    </div>

    <div class="eventos-container__lista" v-else>
      <EventoCard
        v-for="evento in eventosStore.eventos"
        :key="evento.id"
        :evento="evento"
      />
    </div>
  </main>

  <Footer />
</template>

<style scoped lang="scss">
.eventos-container {
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eventos-container__buscador {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.eventos-container__mensaje {
  font-size: 1.2rem;
  color: gray;
  text-align: center;
}

// Mobile First: 1 columna por defecto
.eventos-container__lista {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 768px) { 
    grid-template-columns: repeat(2, 1fr); // 2 columnas en tablet
  }

  @media (min-width: 1024px) { 
    grid-template-columns: repeat(3, 1fr); // 3 columnas en desktop
  }
}
</style>
