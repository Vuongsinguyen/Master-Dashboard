import ApexCharts from "apexcharts";

const chart14 = () => {
  const chartFourteenOptions = {
    series: [28, 22, 18, 15, 17],
    chart: {
      type: 'pie',
      height: 380,
      toolbar: {
        show: false
      }
    },
    colors: ['#EF4444', '#F97316', '#EAB308', '#A855F7', '#3B82F6'],
    labels: [
      'Thái độ nhân viên',
      'Thời gian chờ',
      'Không gian / ồn / sạch',
      'Order sai',
      'Chất lượng sản phẩm'
    ],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#fff']
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: '0%'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val + "%";
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        legend: {
          show: false
        }
      }
    }]
  };

  const chartSelector = document.querySelectorAll('#chart-14');

  if (chartSelector.length) {
    const chartFourteen = new ApexCharts(
      document.querySelector('#chart-14'),
      chartFourteenOptions
    );
    chartFourteen.render();
  }
};

export default chart14;