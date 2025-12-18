import ApexCharts from "apexcharts";

// Response time and action rate data
const responseData = {
  "heineken-vietnam-brewery": {
    "responseTime": [
      124,
      144,
      154,
      163,
      175,
      126,
      148,
      144,
      132,
      153,
      115,
      139
    ],
    "actionRate10min": [
      4,
      7,
      0,
      6,
      4,
      0,
      6,
      13,
      0,
      12,
      10,
      4
    ],
    "actionRate15min": [
      7,
      13,
      0,
      6,
      4,
      7,
      6,
      20,
      5,
      12,
      10,
      4
    ]
  },
  "ttc-group": {
    "responseTime": [
      126,
      126,
      161,
      160,
      152,
      152,
      170,
      149,
      152,
      200,
      126,
      144
    ],
    "actionRate10min": [
      7,
      15,
      0,
      9,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      4
    ],
    "actionRate15min": [
      19,
      15,
      0,
      9,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      4
    ]
  },
  "moshi-moshi-ramen": {
    "responseTime": [
      144,
      142,
      142,
      132,
      131,
      165,
      123,
      166,
      181,
      124,
      153,
      178
    ],
    "actionRate10min": [
      7,
      0,
      0,
      11,
      9,
      5,
      0,
      4,
      0,
      7,
      0,
      0
    ],
    "actionRate15min": [
      7,
      0,
      0,
      15,
      9,
      5,
      14,
      8,
      0,
      7,
      0,
      0
    ]
  },
  "p2p-agency": {
    "responseTime": [
      140,
      87,
      102,
      172,
      121,
      123,
      174,
      175,
      135,
      116,
      175,
      201
    ],
    "actionRate10min": [
      4,
      20,
      6,
      0,
      4,
      6,
      0,
      0,
      0,
      11,
      0,
      10
    ],
    "actionRate15min": [
      4,
      20,
      6,
      0,
      4,
      12,
      0,
      7,
      0,
      11,
      0,
      10
    ]
  },
  "e-picos": {
    "responseTime": [
      208,
      133,
      150,
      158,
      163,
      167,
      119,
      141,
      141,
      162,
      167,
      147
    ],
    "actionRate10min": [
      4,
      20,
      6,
      0,
      0,
      0,
      6,
      0,
      0,
      0,
      6,
      0
    ],
    "actionRate15min": [
      4,
      20,
      6,
      0,
      4,
      0,
      6,
      7,
      0,
      0,
      6,
      0
    ]
  },
  "hung-thinh-land": {
    "responseTime": [
      137,
      157,
      177,
      129,
      137,
      170,
      156,
      147,
      174,
      141,
      107,
      148
    ],
    "actionRate10min": [
      7,
      0,
      8,
      0,
      16,
      0,
      8,
      0,
      11,
      4,
      12,
      0
    ],
    "actionRate15min": [
      7,
      4,
      8,
      8,
      16,
      0,
      8,
      0,
      11,
      4,
      18,
      0
    ]
  },
  "land-tsn-air": {
    "responseTime": [
      143,
      171,
      142,
      193,
      157,
      136,
      180,
      165,
      159,
      185,
      189,
      190
    ],
    "actionRate10min": [
      4,
      0,
      0,
      0,
      10,
      0,
      8,
      0,
      5,
      5,
      0,
      7
    ],
    "actionRate15min": [
      4,
      0,
      0,
      0,
      10,
      0,
      8,
      0,
      10,
      5,
      0,
      7
    ]
  },
  "hoan-my-hospital": {
    "responseTime": [
      131,
      154,
      162,
      174,
      142,
      140,
      166,
      149,
      160,
      133,
      154,
      155
    ],
    "actionRate10min": [
      5,
      4,
      0,
      0,
      5,
      4,
      4,
      0,
      0,
      9,
      6,
      0
    ],
    "actionRate15min": [
      5,
      8,
      0,
      0,
      9,
      8,
      9,
      0,
      5,
      9,
      6,
      0
    ]
  }
};







const chart10 = () => {
  let chartInstance;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }

  function aggregateResponseData(companies) {
    const aggregated = {
      responseTime: new Array(12).fill(0),
      actionRate10min: new Array(12).fill(0),
      actionRate15min: new Array(12).fill(0)
    };
    let companyCount = 0;

    companies.forEach(company => {
      const data = responseData[company];
      if (data) {
        data.responseTime.forEach((value, index) => {
          aggregated.responseTime[index] += value;
        });
        data.actionRate10min.forEach((value, index) => {
          aggregated.actionRate10min[index] += value;
        });
        data.actionRate15min.forEach((value, index) => {
          aggregated.actionRate15min[index] += value;
        });
        companyCount++;
      }
    });

    if (companyCount > 0) {
      aggregated.responseTime = aggregated.responseTime.map(val => val / companyCount);
      aggregated.actionRate10min = aggregated.actionRate10min.map(val => val / companyCount);
      aggregated.actionRate15min = aggregated.actionRate15min.map(val => val / companyCount);
    }

    return aggregated;
  }

  function calculateKPIs(aggregated) {
    if (aggregated.responseTime.length === 0) {
      document.getElementById('avg-response-time').textContent = '0 min';
      document.getElementById('action-rate-10min').textContent = '0%';
      document.getElementById('customer-save-rate').textContent = '0%';
      return;
    }

    // Average response time
    const avgResponseTime = aggregated.responseTime.reduce((sum, val) => sum + val, 0) / aggregated.responseTime.length;

    // Action rate within 10 minutes
    const avgActionRate10min = aggregated.actionRate10min.reduce((sum, val) => sum + val, 0) / aggregated.actionRate10min.length;

    // Customer save rate (estimated based on response time)
    // <10 min = 90% save rate, 10-20 min = 75%, 20-30 min = 50%, >30 min = 25%
    const saveRate = aggregated.responseTime.reduce((sum, time) => {
      if (time < 10) return sum + 90;
      if (time < 20) return sum + 75;
      if (time < 30) return sum + 50;
      return sum + 25;
    }, 0) / aggregated.responseTime.length;

    document.getElementById('avg-response-time').textContent = Math.round(avgResponseTime) + ' min';
    document.getElementById('action-rate-10min').textContent = Math.round(avgActionRate10min) + '%';
    document.getElementById('customer-save-rate').textContent = Math.round(saveRate) + '%';
  }

  const initialCompanies = getSelectedCompanies();
  const initialData = aggregateResponseData(initialCompanies);

  const series = [
    {
      name: 'Response Time (min)',
      type: 'line',
      data: initialData.responseTime
    },
    {
      name: 'Action Rate <10min (%)',
      type: 'line',
      data: initialData.actionRate10min
    },
    {
      name: 'Action Rate <15min (%)',
      type: 'line',
      data: initialData.actionRate15min
    }
  ];

  const chartTenOptions = {
    series: series,
    colors: ["#EF4444", "#10B981", "#3B82F6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3, 3],
      dashArray: [0, 0, 5] // Make 15min line dashed
    },
    xaxis: {
      categories: months,
      title: {
        text: 'Month'
      }
    },
    yaxis: [
      {
        title: {
          text: 'Response Time (minutes)'
        },
        min: 0,
        max: 35
      },
      {
        opposite: true,
        title: {
          text: 'Action Rate (%)'
        },
        min: 0,
        max: 100
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val, { seriesIndex }) {
          if (seriesIndex === 0) {
            return val.toFixed(1) + ' minutes';
          }
          return val.toFixed(1) + '%';
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: 6
      }
    },
    annotations: {
      yaxis: [
        {
          y: 10,
          borderColor: '#10B981',
          label: {
            borderColor: '#10B981',
            style: {
              color: '#fff',
              background: '#10B981'
            },
            text: 'High Save Rate Zone'
          }
        },
        {
          y: 30,
          borderColor: '#EF4444',
          label: {
            borderColor: '#EF4444',
            style: {
              color: '#fff',
              background: '#EF4444'
            },
            text: 'Low Save Rate Zone'
          }
        }
      ]
    }
  };

  const chartTen = new ApexCharts(document.querySelector("#chartTen"), chartTenOptions);
  chartTen.render();

  calculateKPIs(initialData);

  // Listen for checkbox changes
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && !e.target.classList.contains('month-checkbox') && e.target.id !== 'select-all-months') {
      const companies = getSelectedCompanies();
      const aggregated = aggregateResponseData(companies);

      const newSeries = [
        {
          name: 'Response Time (min)',
          type: 'line',
          data: aggregated.responseTime
        },
        {
          name: 'Action Rate <10min (%)',
          type: 'line',
          data: aggregated.actionRate10min
        },
        {
          name: 'Action Rate <15min (%)',
          type: 'line',
          data: aggregated.actionRate15min
        }
      ];

      chartTen.updateSeries(newSeries);
      calculateKPIs(aggregated);
    }
  });

  // Handle select all checkbox
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const companyCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
      companyCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);

      const companies = getSelectedCompanies();
      const aggregated = aggregateResponseData(companies);

      const newSeries = [
        {
          name: 'Response Time (min)',
          type: 'line',
          data: aggregated.responseTime
        },
        {
          name: 'Action Rate <10min (%)',
          type: 'line',
          data: aggregated.actionRate10min
        },
        {
          name: 'Action Rate <15min (%)',
          type: 'line',
          data: aggregated.actionRate15min
        }
      ];

      chartTen.updateSeries(newSeries);
      calculateKPIs(aggregated);
    });
  }
};

export default chart10;