import ApexCharts from "apexcharts";

const chart12 = () => {
  const chartTwelveOptions = {
    series: [{
      name: 'Tỷ Lệ (%)',
      data: [100, 10, 32.5]
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
        distributed: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    colors: ['#3C50E0', '#FF6B6B', '#10B981'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        const labels = ['100%', '~8–12%', '~25–40%'];
        return labels[opt.dataPointIndex];
      },
      offsetX: 0,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: [
        'Khách đến quán',
        'Sẵn sàng feedback (hỏi dài)',
        'Feedback (1-2 chạm)'
      ],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val, opt) {
          const details = [
            '100% khách đến quán',
            '~8–12% khách sẵn sàng feedback nếu hỏi dài',
            '~25–40% feedback nếu chỉ cần 1–2 chạm'
          ];
          return details[opt.dataPointIndex];
        }
      }
    },
    legend: {
      show: false
    }
  };

  const chartSelector = document.querySelectorAll('#chart-12');

  if (chartSelector.length) {
    const chartTwelve = new ApexCharts(
      document.querySelector('#chart-12'),
      chartTwelveOptions
    );
    chartTwelve.render();
  }
};

export default chart12;