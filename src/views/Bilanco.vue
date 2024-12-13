<template>
  <Doughnut
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Doughnut  } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels:[],
        datasets:[]
      },
      chartOptions: {
        responsive: true,
        plugins : {
            legend: {
                position : 'top'
            }
        }
      }
    }
  },
  async mounted() {
    try {
        const response = await fetch(`http://localhost:3000/ilaclar`)
        if(response.ok){
            const drugsData = await response.json()
            console.log(drugsData)
            this.chartData = {
                labels: [...new Set(drugsData.map(item => item.kategori))],           //  [kategori listesi doner]
                datasets: [
                    {
                        label: "SATISLAR",
                        data: drugsData.map(item => item.fiyat)
                    }
                ] 
            }
            console.log(this.chartData)
        }
    } catch (error) {
        
    }
  },
}
</script>
