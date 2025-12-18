import ApexCharts from "apexcharts";

const chart17 = () => {
  const chartSeventeenOptions = {
    series: [
      {
        name: 'Feedback tiêu cực lặp lại',
        data: [45, 48, 42, 38, 32, 28, 25, 22]
      }
    ],
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
      colors: ['#3B82F6']
    },
    markers: {
      size: 6,
      colors: ['#3B82F6'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    xaxis: {
      categories: [
        'Tuần 1',
        'Tuần 2',
        'Tuần 3',
        'Tuần 4',
        'Tuần 5',
        'Tuần 6',
        'Tuần 7',
        'Tuần 8'
      ],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Thời gian (Tuần)',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        },
        formatter: function (val) {
          return Math.round(val);
        }
      },
      title: {
        text: 'Số lượng feedback tiêu cực lặp lại',
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
          return val + ' feedback';
        }
      }
    },
    annotations: {
      xaxis: [
        {
          x: 'Tuần 2',
          x2: 'Tuần 3',
          fillColor: '#F59E0B',
          opacity: 0.1,
          label: {
            borderColor: '#F59E0B',
            style: {
              fontSize: '11px',
              color: '#fff',
              background: '#F59E0B'
            },
            text: 'Can thiệp real-time'
          }
        }
      ],
      points: [
        {
          x: 'Tuần 1',
          y: 45,
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
            text: 'Before: 45'
          }
        },
        {
          x: 'Tuần 8',
          y: 22,
          marker: {
            size: 8,
            fillColor: '#10B981',
            strokeColor: '#fff',
            strokeWidth: 3
          },
          label: {
            borderColor: '#10B981',
            offsetY: -10,
            style: {
              color: '#fff',
              background: '#10B981'
            },
            text: 'After: 22 (↓51%)'
          }
        }
      ]
    }
  };

  const chartSelector = document.querySelectorAll('#chart-17');

  if (chartSelector.length) {
    const chartSeventeen = new ApexCharts(
      document.querySelector('#chart-17'),
      chartSeventeenOptions
    );
    chartSeventeen.render();
  }
};

export default chart17;