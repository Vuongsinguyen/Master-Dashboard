import ApexCharts from "apexcharts";

// Company data
const companyData = {
  "heineken-vietnam-brewery": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 11,
        "normal": 4,
        "like": 10,
        "love": 3
      },
      "Feb": {
        "dislike": 5,
        "normal": 1,
        "like": 5,
        "love": 4
      },
      "Mar": {
        "dislike": 4,
        "normal": 5,
        "like": 4,
        "love": 4
      },
      "Apr": {
        "dislike": 4,
        "normal": 4,
        "like": 3,
        "love": 7
      },
      "May": {
        "dislike": 7,
        "normal": 7,
        "like": 5,
        "love": 5
      },
      "Jun": {
        "dislike": 2,
        "normal": 2,
        "like": 3,
        "love": 7
      },
      "Jul": {
        "dislike": 2,
        "normal": 5,
        "like": 4,
        "love": 7
      },
      "Aug": {
        "dislike": 1,
        "normal": 8,
        "like": 1,
        "love": 5
      },
      "Sep": {
        "dislike": 3,
        "normal": 8,
        "like": 5,
        "love": 4
      },
      "Oct": {
        "dislike": 10,
        "normal": 6,
        "like": 4,
        "love": 6
      },
      "Nov": {
        "dislike": 4,
        "normal": 7,
        "like": 4,
        "love": 6
      },
      "Dec": {
        "dislike": 10,
        "normal": 6,
        "like": 7,
        "love": 4
      }
    }
  },
  "ttc-group": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 6,
        "normal": 7,
        "like": 7,
        "love": 7
      },
      "Feb": {
        "dislike": 4,
        "normal": 1,
        "like": 4,
        "love": 4
      },
      "Mar": {
        "dislike": 7,
        "normal": 9,
        "like": 9,
        "love": 5
      },
      "Apr": {
        "dislike": 6,
        "normal": 7,
        "like": 4,
        "love": 5
      },
      "May": {
        "dislike": 4,
        "normal": 4,
        "like": 3,
        "love": 9
      },
      "Jun": {
        "dislike": 4,
        "normal": 3,
        "like": 1,
        "love": 5
      },
      "Jul": {
        "dislike": 7,
        "normal": 6,
        "like": 5,
        "love": 3
      },
      "Aug": {
        "dislike": 3,
        "normal": 7,
        "like": 5,
        "love": 5
      },
      "Sep": {
        "dislike": 6,
        "normal": 5,
        "like": 3,
        "love": 6
      },
      "Oct": {
        "dislike": 4,
        "normal": 4,
        "like": 3,
        "love": 3
      },
      "Nov": {
        "dislike": 5,
        "normal": 4,
        "like": 4,
        "love": 7
      },
      "Dec": {
        "dislike": 6,
        "normal": 8,
        "like": 3,
        "love": 6
      }
    }
  },
  "moshi-moshi-ramen": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 7,
        "normal": 6,
        "like": 13,
        "love": 3
      },
      "Feb": {
        "dislike": 5,
        "normal": 5,
        "like": 5,
        "love": 5
      },
      "Mar": {
        "dislike": 4,
        "normal": 3,
        "like": 4,
        "love": 5
      },
      "Apr": {
        "dislike": 4,
        "normal": 12,
        "like": 5,
        "love": 6
      },
      "May": {
        "dislike": 7,
        "normal": 3,
        "like": 4,
        "love": 8
      },
      "Jun": {
        "dislike": 3,
        "normal": 3,
        "like": 7,
        "love": 7
      },
      "Jul": {
        "dislike": 5,
        "normal": 3,
        "like": 4,
        "love": 2
      },
      "Aug": {
        "dislike": 2,
        "normal": 11,
        "like": 5,
        "love": 7
      },
      "Sep": {
        "dislike": 1,
        "normal": 8,
        "like": 5,
        "love": 8
      },
      "Oct": {
        "dislike": 5,
        "normal": 3,
        "like": 5,
        "love": 2
      },
      "Nov": {
        "dislike": 6,
        "normal": 2,
        "like": 4,
        "love": 2
      },
      "Dec": {
        "dislike": 3,
        "normal": 3,
        "like": 2,
        "love": 2
      }
    }
  },
  "p2p-agency": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 3,
        "normal": 7,
        "like": 7,
        "love": 8
      },
      "Feb": {
        "dislike": 1,
        "normal": 4,
        "like": 2,
        "love": 3
      },
      "Mar": {
        "dislike": 1,
        "normal": 2,
        "like": 4,
        "love": 9
      },
      "Apr": {
        "dislike": 5,
        "normal": 3,
        "like": 4,
        "love": 5
      },
      "May": {
        "dislike": 8,
        "normal": 6,
        "like": 5,
        "love": 8
      },
      "Jun": {
        "dislike": 5,
        "normal": 2,
        "like": 8,
        "love": 2
      },
      "Jul": {
        "dislike": 4,
        "normal": 8,
        "like": 5,
        "love": 4
      },
      "Aug": {
        "dislike": 4,
        "normal": 3,
        "like": 2,
        "love": 6
      },
      "Sep": {
        "dislike": 4,
        "normal": 3,
        "like": 3,
        "love": 4
      },
      "Oct": {
        "dislike": 4,
        "normal": 5,
        "like": 7,
        "love": 3
      },
      "Nov": {
        "dislike": 5,
        "normal": 3,
        "like": 3,
        "love": 2
      },
      "Dec": {
        "dislike": 2,
        "normal": 1,
        "like": 5,
        "love": 2
      }
    }
  },
  "e-picos": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 6,
        "normal": 4,
        "like": 9,
        "love": 5
      },
      "Feb": {
        "dislike": 5,
        "normal": 7,
        "like": 6,
        "love": 2
      },
      "Mar": {
        "dislike": 2,
        "normal": 6,
        "like": 5,
        "love": 4
      },
      "Apr": {
        "dislike": 5,
        "normal": 8,
        "like": 6,
        "love": 5
      },
      "May": {
        "dislike": 5,
        "normal": 3,
        "like": 10,
        "love": 5
      },
      "Jun": {
        "dislike": 3,
        "normal": 3,
        "like": 2,
        "love": 9
      },
      "Jul": {
        "dislike": 4,
        "normal": 5,
        "like": 3,
        "love": 5
      },
      "Aug": {
        "dislike": 5,
        "normal": 9,
        "like": 7,
        "love": 7
      },
      "Sep": {
        "dislike": 7,
        "normal": 2,
        "like": 5,
        "love": 3
      },
      "Oct": {
        "dislike": 6,
        "normal": 7,
        "like": 7,
        "love": 6
      },
      "Nov": {
        "dislike": 11,
        "normal": 2,
        "like": 5,
        "love": 0
      },
      "Dec": {
        "dislike": 4,
        "normal": 9,
        "like": 7,
        "love": 5
      }
    }
  },
  "hung-thinh-land": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 7,
        "normal": 11,
        "like": 4,
        "love": 7
      },
      "Feb": {
        "dislike": 4,
        "normal": 10,
        "like": 4,
        "love": 6
      },
      "Mar": {
        "dislike": 3,
        "normal": 1,
        "like": 3,
        "love": 5
      },
      "Apr": {
        "dislike": 3,
        "normal": 1,
        "like": 4,
        "love": 5
      },
      "May": {
        "dislike": 7,
        "normal": 6,
        "like": 4,
        "love": 2
      },
      "Jun": {
        "dislike": 8,
        "normal": 6,
        "like": 2,
        "love": 5
      },
      "Jul": {
        "dislike": 7,
        "normal": 6,
        "like": 8,
        "love": 3
      },
      "Aug": {
        "dislike": 5,
        "normal": 1,
        "like": 7,
        "love": 2
      },
      "Sep": {
        "dislike": 4,
        "normal": 4,
        "like": 6,
        "love": 4
      },
      "Oct": {
        "dislike": 6,
        "normal": 3,
        "like": 10,
        "love": 6
      },
      "Nov": {
        "dislike": 4,
        "normal": 4,
        "like": 3,
        "love": 6
      },
      "Dec": {
        "dislike": 6,
        "normal": 4,
        "like": 7,
        "love": 1
      }
    }
  },
  "land-tsn-air": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 7,
        "normal": 6,
        "like": 7,
        "love": 4
      },
      "Feb": {
        "dislike": 4,
        "normal": 1,
        "like": 1,
        "love": 5
      },
      "Mar": {
        "dislike": 1,
        "normal": 3,
        "like": 5,
        "love": 3
      },
      "Apr": {
        "dislike": 10,
        "normal": 1,
        "like": 3,
        "love": 6
      },
      "May": {
        "dislike": 1,
        "normal": 5,
        "like": 6,
        "love": 9
      },
      "Jun": {
        "dislike": 4,
        "normal": 2,
        "like": 4,
        "love": 5
      },
      "Jul": {
        "dislike": 2,
        "normal": 7,
        "like": 2,
        "love": 2
      },
      "Aug": {
        "dislike": 9,
        "normal": 3,
        "like": 3,
        "love": 3
      },
      "Sep": {
        "dislike": 5,
        "normal": 4,
        "like": 6,
        "love": 6
      },
      "Oct": {
        "dislike": 4,
        "normal": 5,
        "like": 5,
        "love": 7
      },
      "Nov": {
        "dislike": 5,
        "normal": 4,
        "like": 6,
        "love": 7
      },
      "Dec": {
        "dislike": 3,
        "normal": 5,
        "like": 1,
        "love": 5
      }
    }
  },
  "hoan-my-hospital": {
    "feedbacks": [
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
    ],
    "sentiment": {
      "Jan": {
        "dislike": 4,
        "normal": 9,
        "like": 5,
        "love": 3
      },
      "Feb": {
        "dislike": 8,
        "normal": 4,
        "like": 4,
        "love": 10
      },
      "Mar": {
        "dislike": 4,
        "normal": 1,
        "like": 8,
        "love": 5
      },
      "Apr": {
        "dislike": 6,
        "normal": 4,
        "like": 5,
        "love": 4
      },
      "May": {
        "dislike": 2,
        "normal": 6,
        "like": 8,
        "love": 6
      },
      "Jun": {
        "dislike": 8,
        "normal": 6,
        "like": 3,
        "love": 8
      },
      "Jul": {
        "dislike": 4,
        "normal": 8,
        "like": 3,
        "love": 8
      },
      "Aug": {
        "dislike": 11,
        "normal": 4,
        "like": 6,
        "love": 4
      },
      "Sep": {
        "dislike": 3,
        "normal": 7,
        "like": 10,
        "love": 2
      },
      "Oct": {
        "dislike": 6,
        "normal": 6,
        "like": 4,
        "love": 7
      },
      "Nov": {
        "dislike": 3,
        "normal": 2,
        "like": 5,
        "love": 7
      },
      "Dec": {
        "dislike": 9,
        "normal": 11,
        "like": 1,
        "love": 8
      }
    }
  }
};









// ===== chartOne
const chart01 = () => {
  let chartInstance;

  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const initialCompanies = getSelectedCompanies();
  const initialData = loadAndAggregateData(initialCompanies, allMonths);

  const chartOneOptions = {
    series: [
      { name: "Total", data: initialData.totals },
      { name: "Dislike", data: initialData.dislikes },
      { name: "Normal", data: initialData.normals },
      { name: "Like", data: initialData.likes },
      { name: "Love", data: initialData.loves }
    ],
    colors: ["#465fff", "#EF4444", "#F59E0B", "#10B981", "#EC4899"], // Total, Dislike, Normal, Like, Love
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 300,
      toolbar: {
        show: false,
      },
      margin: {
        left: 60,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
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
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",

      markers: {
        radius: 99,
      },
    },
    yaxis: {
      title: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartOne");

  if (chartSelector.length) {
    chartInstance = new ApexCharts(
      document.querySelector("#chartOne"),
      chartOneOptions
    );
    chartInstance.render();

    // Load initial data
    updateSelectAll();

    // Use event delegation for better reliability
    document.addEventListener('change', (event) => {
      const target = event.target;

      // Handle company checkboxes
      if (target.type === 'checkbox' && !target.classList.contains('month-checkbox') && target.id !== 'select-all' && target.id !== 'select-all-months') {
        console.log('Company checkbox changed:', target.nextSibling ? target.nextSibling.textContent.trim() : 'Unknown');
        updateChartData();
        updateSelectAll();
      }

      // Handle select all checkbox
      if (target.id === 'select-all') {
        console.log('Select all changed:', target.checked);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
        checkboxes.forEach(cb => cb.checked = target.checked);
        updateChartData();
        updateSelectAll();
      }
    });

    // Listen for chart filter updates from HTML
    window.addEventListener('chart1-filter-update', (event) => {
      const selectedCompanies = event.detail.selectedCompanies;
      console.log('Chart filter update from HTML:', selectedCompanies);
      const { totals, dislikes, normals, likes, loves } = loadAndAggregateData(selectedCompanies, allMonths);
      chartInstance.updateSeries([
        { name: "Total", data: totals },
        { name: "Dislike", data: dislikes },
        { name: "Normal", data: normals },
        { name: "Like", data: likes },
        { name: "Love", data: loves }
      ]);
    });

    // Initial update
    updateChartData();
  }

  function updateChartData() {
    const selectedCompanies = getSelectedCompanies();
    console.log('Selected companies:', selectedCompanies);
    const { totals, dislikes, normals, likes, loves } = loadAndAggregateData(selectedCompanies, allMonths);
    console.log('Chart data:', { totals, dislikes, normals, likes, loves });
    chartInstance.updateSeries([
      { name: "Total", data: totals },
      { name: "Dislike", data: dislikes },
      { name: "Normal", data: normals },
      { name: "Like", data: likes },
      { name: "Love", data: loves }
    ]);
  }

  function updateSelectAllMonths() {
    const checkboxes = document.querySelectorAll('.month-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    const selectAll = document.getElementById('select-all-months');
    if (selectAll) selectAll.checked = allChecked;
  }

  function updateSelectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    const selectAll = document.getElementById('select-all');
    if (selectAll) selectAll.checked = allChecked;
  }

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));

    // If no companies selected, return all companies
    if (selected.length === 0) {
      console.log('No companies selected, returning all companies');
      return Object.keys(companyData);
    }

    console.log('Selected companies from checkboxes:', selected);
    return selected;
  }

  function getSelectedMonths() {
    const checkboxes = document.querySelectorAll('.month-checkbox:checked');
    return Array.from(checkboxes).map(cb => cb.getAttribute('data-month'));
  }

  function loadAndAggregateData(companies, months) {
    const monthIndex = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const totals = new Array(months.length).fill(0);
    const dislikes = new Array(months.length).fill(0);
    const normals = new Array(months.length).fill(0);
    const likes = new Array(months.length).fill(0);
    const loves = new Array(months.length).fill(0);

    companies.forEach(company => {
      const data = companyData[company];
      if (data && data.feedbacks && data.sentiment) {
        months.forEach((month, index) => {
          const monthIdx = monthIndex[month];
          const total = data.feedbacks[monthIdx] || 0;
          totals[index] += total;

          const sent = data.sentiment[month];
          if (sent) {
            dislikes[index] += sent.dislike || 0;
            normals[index] += sent.normal || 0;
            likes[index] += sent.like || 0;
            loves[index] += sent.love || 0;
          }
        });
      }
    });

    return { totals, dislikes, normals, likes, loves };
  }
};

export default chart01;
