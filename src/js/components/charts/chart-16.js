import ApexCharts from "apexcharts";

const chart16 = () => {
  // Generate heatmap data for time slots across days
  const generateData = (name, data) => {
    return {
      name: name,
      data: data
    };
  };

  const chartSixteenOptions = {
    series: [
      generateData('7-9h', [12, 15, 18, 22, 25, 28, 32]),
      generateData('9-11h', [8, 10, 12, 14, 16, 18, 20]),
      generateData('11-13h', [14, 16, 18, 20, 22, 24, 26]),
      generateData('13-15h', [6, 8, 10, 12, 14, 16, 18]),
      generateData('15-17h', [10, 12, 14, 16, 18, 20, 22]),
      generateData('17-19h', [18, 20, 22, 24, 26, 30, 35]),
      generateData('19-21h', [16, 18, 20, 22, 24, 28, 32]),
      generateData('21-22h', [8, 10, 12, 14, 16, 18, 20])
    ],
    chart: {
      type: 'heatmap',
      height: 400,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 2,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 10,
              name: 'Ít vấn đề',
              color: '#10B981'
            },
            {
              from: 11,
              to: 20,
              name: 'Trung bình',
              color: '#F59E0B'
            },
            {
              from: 21,
              to: 40,
              name: 'Nhiều vấn đề',
              color: '#EF4444'
            }
          ]
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        fontSize: '11px'
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Ngày trong tuần',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Khung giờ',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val + ' feedback tiêu cực';
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
      markers: {
        width: 12,
        height: 12,
        radius: 2
      }
    }
  };

  const chartSelector = document.querySelectorAll('#chart-16');

  if (chartSelector.length) {
    const chartSixteen = new ApexCharts(
      document.querySelector('#chart-16'),
      chartSixteenOptions
    );
    chartSixteen.render();
  }
};

export default chart16;