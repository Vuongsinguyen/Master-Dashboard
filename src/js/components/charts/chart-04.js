import ApexCharts from "apexcharts";

// Company data
const companyData = {
  "heineken-vietnam-brewery": {
    "sentiment": {
      "dislike": 63,
      "normal": 63,
      "like": 55,
      "love": 62
    }
  },
  "ttc-group": {
    "sentiment": {
      "dislike": 62,
      "normal": 65,
      "like": 51,
      "love": 65
    }
  },
  "moshi-moshi-ramen": {
    "sentiment": {
      "dislike": 52,
      "normal": 62,
      "like": 63,
      "love": 57
    }
  },
  "p2p-agency": {
    "sentiment": {
      "dislike": 46,
      "normal": 47,
      "like": 55,
      "love": 56
    }
  },
  "e-picos": {
    "sentiment": {
      "dislike": 63,
      "normal": 65,
      "like": 72,
      "love": 56
    }
  },
  "hung-thinh-land": {
    "sentiment": {
      "dislike": 64,
      "normal": 57,
      "like": 62,
      "love": 52
    }
  },
  "land-tsn-air": {
    "sentiment": {
      "dislike": 55,
      "normal": 46,
      "like": 49,
      "love": 62
    }
  },
  "hoan-my-hospital": {
    "sentiment": {
      "dislike": 68,
      "normal": 68,
      "like": 62,
      "love": 72
    }
  }
};








// ===== chartFour
const chart04 = () => {
  let chartInstance;

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }

  function getSelectedMonths() {
    const checkboxes = document.querySelectorAll('.month-checkbox:checked');
    return Array.from(checkboxes).map(cb => cb.getAttribute('data-month'));
  }

  function loadAndAggregateSentiment(companies, months) {
    let totalDislike = 0, totalNormal = 0, totalLike = 0, totalLove = 0;

    companies.forEach(company => {
      const data = companyData[company];
      if (data && data.sentiment) {
        totalDislike += data.sentiment.dislike || 0;
        totalNormal += data.sentiment.normal || 0;
        totalLike += data.sentiment.like || 0;
        totalLove += data.sentiment.love || 0;
      }
    });

    const total = totalDislike + totalNormal + totalLike + totalLove;
    if (total === 0) return [25, 25, 50]; // Default values if no data

    // Calculate percentages
    const negativePercent = Math.round((totalDislike / total) * 100);
    const neutralPercent = Math.round((totalNormal / total) * 100);
    const positivePercent = 100 - negativePercent - neutralPercent;

    return [negativePercent, neutralPercent, positivePercent];
  }

  const initialCompanies = getSelectedCompanies();
  const initialData = loadAndAggregateSentiment(initialCompanies, []);

  console.log('Initial companies:', initialCompanies);
  console.log('Initial data:', initialData);

  const chartFourOptions = {
    series: initialData,
    colors: ["#EF4444", "#F59E0B", "#10B981"], // Negative, Neutral, Positive
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "pie",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    labels: ["😡 Negative", "😐 Neutral", "😊 Positive"],
    legend: {
      position: "bottom",
      fontFamily: "Outfit",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartFour");

  console.log('Chart selector length:', chartSelector.length);
  console.log('Chart element:', document.querySelector("#chartFour"));

  if (chartSelector.length) {
    console.log('ChartFour element found, initializing chart');
    chartInstance = new ApexCharts(
      document.querySelector("#chartFour"),
      chartFourOptions
    );
    console.log('Chart instance created');
    try {
      chartInstance.render();
      console.log('Chart rendered successfully');
    } catch (error) {
      console.error('Error rendering chart:', error);
    }

    // Load initial data
    updateSelectAll();

    // Use event delegation for better reliability
    document.addEventListener('change', (event) => {
      const target = event.target;

      // Handle company checkboxes
      if (target.type === 'checkbox' && !target.classList.contains('month-checkbox') && target.id !== 'select-all' && target.id !== 'select-all-months') {
        updateChartData();
        updateSelectAll();
      }

      // Handle select all checkbox
      if (target.id === 'select-all') {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
        checkboxes.forEach(cb => cb.checked = target.checked);
        updateChartData();
        updateSelectAll();
      }
    });
  }

  function updateChartData() {
    const selectedCompanies = getSelectedCompanies();
    const aggregatedData = loadAndAggregateSentiment(selectedCompanies, []);
    chartInstance.updateSeries(aggregatedData);
  }

  function updateSelectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    const selectAll = document.getElementById('select-all');
    if (selectAll) selectAll.checked = allChecked;
  }
};

export default chart04;