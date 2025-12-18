import ApexCharts from "apexcharts";

const chart13 = () => {
  const chartThirteenOptions = {
    series: [{
      name: 'Khả năng can thiệp (%)',
      data: [75, 65, 50, 35, 20, 8]
    }],
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#EF4444']
    },
    markers: {
      size: 6,
      colors: ['#EF4444'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    xaxis: {
      categories: [
        'Real-time\n(0-5 phút)',
        '15 phút',
        '30 phút',
        'Cuối ngày\n(8 giờ)',
        '1 tuần',
        'Cuối tháng'
      ],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Thời gian nhận feedback',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        },
        formatter: function (val) {
          return val + "%"
        }
      },
      title: {
        text: 'Khả năng can thiệp (%)',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val + "% khả năng can thiệp"
        }
      }
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: '#F59E0B',
          label: {
            borderColor: '#F59E0B',
            style: {
              color: '#fff',
              background: '#F59E0B'
            },
            text: 'Ngưỡng tối thiểu'
          }
        }
      ],
      points: [
        {
          x: '30 phút',
          y: 50,
          marker: {
            size: 8,
            fillColor: '#EF4444',
            strokeColor: '#fff',
            strokeWidth: 3
          },
          label: {
            borderColor: '#EF4444',
            offsetY: -10,
            style: {
              color: '#fff',
              background: '#EF4444'
            },
            text: 'Điểm chuyển giao quan trọng'
          }
        }
      ]
    }
  };

  const chartSelector = document.querySelectorAll('#chart-13');

  if (chartSelector.length) {
    const chartThirteen = new ApexCharts(
      document.querySelector('#chart-13'),
      chartThirteenOptions
    );
    chartThirteen.render();
  }
};

export default chart13;