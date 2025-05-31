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
import { useEstadisticasStore } from '@/stores/estadisticasStore'
import type { EventosPorMesDto } from '@/dto/EventosPorMesDto'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Store
const store = useEstadisticasStore()

// Computed para extraer los datos y transformarlos para la gráfica
const chartData = computed(() => ({
  labels: store.eventosPorMes.map((item: EventosPorMesDto) => `${item.mes}/${item.anio}`),
  datasets: [
    {
      label: 'Eventos por mes',
      data: store.eventosPorMes.map((item: EventosPorMesDto) => item.totalEventos),
      backgroundColor: '#d40202'
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
        color: '#fff'
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#fff' }
    },
    y: {
      ticks: { color: '#fff' }
    }
  }
})

// Cargar datos al montar el componente
onMounted(async () => {
  await store.cargarEventosPorMes()
})
</script>

<template>
  <div style="width: 100%; height: 400px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
