<script setup lang="ts">
import { ref, onMounted } from 'vue'
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

// Registramos los módulos de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Datos reactivos para la gráfica
const chartData = ref({
  labels: [], // Aquí pondremos los meses
  datasets: [
    {
      label: 'Eventos por mes',
      data: [], // Aquí pondremos la cantidad de eventos
      backgroundColor: '#d40202'
    }
  ]
})

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

onMounted(async () => {
  // Aquí llamas a tu endpoint del backend (que ya estamos preparando)
  const res = await fetch('http://localhost:8888/api/Eventos/grafica-eventos-mensual')
  const data = await res.json()

  chartData.value.labels = data.map((item: any) => item.mes)
  chartData.value.datasets[0].data = data.map((item: any) => item.totalEventos)
})
</script>

<template>
  <div style="width: 100%; height: 400px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
