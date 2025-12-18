import ApexCharts from "apexcharts";

const chart18 = () => {
  const chartEighteenOptions = {
    series: [{
      name: 'Tỷ lệ cải thiện (%)',
      data: [
        { x: 5, y: 65 },
        { x: 8, y: 58 },
        { x: 10, y: 52 },
        { x: 15, y: 42 },
        { x: 20, y: 28 },
        { x: 25, y: 18 },
        { x: 30, y: 12 },
        { x: 40, y: 8 },
        { x: 50, y: 5 },
        { x: 60, y: 3 }
      ]
    }],
    chart: {
      type: 'scatter',
      height: 380,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true,
        type: 'xy'
      }
    },
    colors: ['#3B82F6'],
    markers: {
      size: 8,
      strokeWidth: 2,
      strokeColors: '#fff',
      hover: {
        size: 10
      }
    },
    xaxis: {
      min: 0,
      max: 70,
      tickAmount: 7,
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        },
        formatter: function (val) {
          return Math.round(val) + ' phút';
        }
      },
      title: {
        text: 'Thời gian phản hồi của quản lý',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        },
        formatter: function (val) {
          return Math.round(val) + '%';
        }
      },
      title: {
        text: 'Tỷ lệ feedback tiêu cực giảm',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5
    },
    tooltip: {
      theme: 'dark',
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return '<div class="px-3 py-2">' +
          '<div class="text-xs">Phản hồi: ' + data.x + ' phút</div>' +
          '<div class="text-xs font-bold">Cải thiện: ' + data.y + '%</div>' +
          '</div>';
      }
    },
    annotations: {
      xaxis: [
        {
          x: 10,
          strokeDashArray: 0,
          borderColor: '#10B981',
          label: {
            borderColor: '#10B981',
            style: {
              color: '#fff',
              background: '#10B981'
            },
            text: 'Ngưỡng vàng (10 phút)'
          }
        },
        {
          x: 30,
          strokeDashArray: 0,
          borderColor: '#EF4444',
          label: {
            borderColor: '#EF4444',
            style: {
              color: '#fff',
              background: '#EF4444'
            },
            text: 'Ngưỡng tối đa (30 phút)'
          }
        }
      ]
    }
  };

  const chartSelector = document.querySelectorAll('#chart-18');

  if (chartSelector.length) {
    const chartEighteen = new ApexCharts(
      document.querySelector('#chart-18'),
      chartEighteenOptions
    );
    chartEighteen.render();
  }
};

export default chart18;