var element = document.getElementById('graficoCircular');

  // Crea un IntersectionObserver para detectar cuando el elemento entra en el viewport
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Añade la clase 'animate' cuando el elemento está visible
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1 // El porcentaje de visibilidad para activar la animación
  });

  // Observa el elemento
  observer.observe(element);

document.addEventListener('DOMContentLoaded', function() {
  var chartDom = document.getElementById('graficoCircular');
  var myChart = echarts.init(chartDom);

  function loadChartData() {
      fetch('https://ashuri315.github.io/graphicLEGO/JSON_Graphic.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              let pieData = data.map(item => ({
                  value: item.Amount,
                  name: item.Category
              }));

              let option = {
                  tooltip: {
                      trigger: 'item'
                  },
                  legend: {
                      top: '5%',
                      left: 'center'
                  },
                  series: [
                      {
                          name: 'Access From',
                          type: 'pie',
                          radius: ['40%', '70%'],
                          avoidLabelOverlap: false,
                          itemStyle: {
                              borderRadius: 10,
                              borderColor: '#fff',
                              borderWidth: 2
                          },
                          label: {
                              show: false,
                              position: 'center'
                          },
                          emphasis: {
                              label: {
                                  show: true,
                                  fontSize: '40',
                                  fontWeight: 'bold'
                              }
                          },
                          labelLine: {
                              show: false
                          },
                          data: pieData
                      }
                  ]
              };

              myChart.setOption(option);

              window.addEventListener('resize', function () {
                  myChart.resize();
              });
          })
          .catch(error => {
              console.error('There has been a problem with your fetch operation:', error);
          });
  }

  loadChartData();
});