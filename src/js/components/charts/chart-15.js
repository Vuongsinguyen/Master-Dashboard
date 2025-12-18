import ApexCharts from "apexcharts";

const chart15 = () => {
  const chartFifteenOptions = {
    series: [{
      name: 'Feedback tiêu cực / 100 khách',
      data: [2.1, 3.5, 4.8, 5.2, 6.1, 7.8, 9.2, 11.5, 14.3]
    }],
    chart: {
      type: 'bar',
      height: 380,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    colors: ['#10B981', '#10B981', '#F59E0B', '#F59E0B', '#F59E0B', '#F59E0B', '#EF4444', '#EF4444', '#EF4444'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -25,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#64748B']
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [
        'Store Sala',
        'Store WH0045',
        'Warehouse Binh Dien',
        'Store Metro12',
        'Store HN007',
        'Store QN001',
        'Store VT010',
        'Group Tan Son',
        'Store B100'
      ],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Cửa hàng',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 16,
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
        text: 'Tỷ lệ feedback tiêu cực',
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
      y: {
        formatter: function (val) {
          return val + "% (mỗi 100 khách)";
        }
      }
    },
    legend: {
      show: false
    },
    annotations: {
      yaxis: [
        {
          y: 3,
          borderColor: '#10B981',
          strokeDashArray: 0,
          label: {
            borderColor: '#10B981',
            style: {
              color: '#fff',
              background: '#10B981'
            },
            text: 'Chuẩn tốt (<3%)'
          }
        },
        {
          y: 8,
          borderColor: '#EF4444',
          strokeDashArray: 0,
          label: {
            borderColor: '#EF4444',
            style: {
              color: '#fff',
              background: '#EF4444'
            },
            text: 'Ngưỡng cảnh báo (8%)'
          }
        }
      ]
    }
  };

  const chartSelector = document.querySelectorAll('#chart-15');

  if (chartSelector.length) {
    const chartFifteen = new ApexCharts(
      document.querySelector('#chart-15'),
      chartFifteenOptions
    );
    chartFifteen.render();
  }
};

export default chart15;