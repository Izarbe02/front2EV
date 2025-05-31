<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useEventosStore } from '@/stores/eventos'
import type { EventosPorMesDto } from '@/dto/EventosPorMesDto'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Store
const store = useEventosStore()

// Helper: mes a nombre
function obtenerNombreMes(mes: number): string {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  return meses[mes - 1] || 'Mes desconocido'
}


const chartData = computed(() => ({
  labels: store.eventosPorMes.map(
    (item: EventosPorMesDto) => `${obtenerNombreMes(item.mes)} ${item.anio}`
  ),
  datasets: [
    {
      label: 'Eventos por mes',
      data: store.eventosPorMes.map((item: EventosPorMesDto) => item.totalEventos),
      backgroundColor: '#e8faf2'
    }
  ]
}))

// Opciones de la gráfica
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffbfc7'
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#ffbfc7' }
    },
    y: {
      ticks: { color: '#ffbfc7' }
    }
  }
})


onMounted(async () => {
  await store.cargarEventosPorMes()
})
</script>


<template>
  <div style="width: 100%; height: 400px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
