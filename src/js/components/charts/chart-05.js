import ApexCharts from "apexcharts";

// Company data
const companyData = {
  "heineken-vietnam-brewery": {
    "volume": [
      28,
      15,
      17,
      18,
      24,
      14,
      18,
      15,
      20,
      26,
      21,
      27
    ]
  },
  "ttc-group": {
    "volume": [
      27,
      13,
      30,
      22,
      20,
      13,
      21,
      20,
      20,
      14,
      20,
      23
    ]
  },
  "moshi-moshi-ramen": {
    "volume": [
      29,
      20,
      16,
      27,
      22,
      20,
      14,
      25,
      22,
      15,
      14,
      10
    ]
  },
  "p2p-agency": {
    "volume": [
      25,
      10,
      16,
      17,
      27,
      17,
      21,
      15,
      14,
      19,
      13,
      10
    ]
  },
  "e-picos": {
    "volume": [
      24,
      20,
      17,
      24,
      23,
      17,
      17,
      28,
      17,
      26,
      18,
      25
    ]
  },
  "hung-thinh-land": {
    "volume": [
      29,
      24,
      12,
      13,
      19,
      21,
      24,
      15,
      18,
      25,
      17,
      18
    ]
  },
  "land-tsn-air": {
    "volume": [
      24,
      11,
      12,
      20,
      21,
      15,
      13,
      18,
      21,
      21,
      22,
      14
    ]
  },
  "hoan-my-hospital": {
    "volume": [
      21,
      26,
      18,
      19,
      22,
      25,
      23,
      25,
      22,
      23,
      17,
      29
    ]
  }
};







// ===== chartFive
const chart05 = () => {
  let chartInstance;

  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }

  function loadAndAggregateVolume(companies) {
    const totals = new Array(12).fill(0);

    companies.forEach(company => {
      const data = companyData[company];
      if (data && data.volume) {
        data.volume.forEach((count, index) => {
          totals[index] += count;
        });
      }
    });

    return totals;
  }

  const initialCompanies = getSelectedCompanies();
  const initialData = loadAndAggregateVolume(initialCompanies);

  const chartFiveOptions = {
    series: [
      {
        name: "Feedback Volume",
        data: initialData,
      },
    ],
    colors: ["#3B82F6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: allMonths,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Number of Feedbacks",
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        formatter: function (val) {
          return val + " feedbacks";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartFive");

  if (chartSelector.length) {
    chartInstance = new ApexCharts(
      document.querySelector("#chartFive"),
      chartFiveOptions
    );
    chartInstance.render();

    // Update KPIs
    updateKPIs(initialCompanies);

    // Add listeners to checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        updateChartData();
        updateSelectAll();
      });
    });

    // Add listener to select all
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
        checkboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
        updateChartData();
        updateSelectAll();
      });
    }
  }

  function updateChartData() {
    const selectedCompanies = getSelectedCompanies();
    const data = loadAndAggregateVolume(selectedCompanies);
    chartInstance.updateSeries([{
      name: "Feedback Volume",
      data: data
    }]);
    updateKPIs(selectedCompanies);
  }

  function updateSelectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    const selectAll = document.getElementById('select-all');
    if (selectAll) selectAll.checked = allChecked;
  }

  function updateKPIs(companies) {
    const data = loadAndAggregateVolume(companies);
    const total = data.reduce((sum, val) => sum + val, 0);
    const avgDaily = Math.round(total / 365);
    // Assuming 1000 customers for participation rate calculation
    const participationRate = total > 0 ? Math.round((total / 1000) * 100) : 0;

    document.getElementById('total-feedbacks').textContent = total.toLocaleString();
    document.getElementById('participation-rate').textContent = participationRate + '%';
    document.getElementById('avg-daily').textContent = avgDaily;
  }
};

export default chart05;