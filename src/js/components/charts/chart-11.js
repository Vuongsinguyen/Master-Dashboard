import ApexCharts from "apexcharts";

// Improvement loop data
const improvementData = {
  "heineken-vietnam-brewery": {
    "longWaitIssue": [
      0,
      1,
      1,
      2,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      6
    ]
  },
  "ttc-group": {
    "longWaitIssue": [
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      4
    ]
  },
  "moshi-moshi-ramen": {
    "longWaitIssue": [
      1,
      0,
      2,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      2
    ]
  },
  "p2p-agency": {
    "longWaitIssue": [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      4
    ]
  },
  "e-picos": {
    "longWaitIssue": [
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      5
    ]
  },
  "hung-thinh-land": {
    "longWaitIssue": [
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      3
    ]
  },
  "land-tsn-air": {
    "longWaitIssue": [
      1,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      6
    ]
  },
  "hoan-my-hospital": {
    "longWaitIssue": [
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      4
    ]
  }
};







const chart11 = () => {
  let chartInstance;

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'];

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }

  function aggregateImprovementData(companies) {
    const aggregated = new Array(12).fill(0);
    let companyCount = 0;

    companies.forEach(company => {
      const data = improvementData[company];
      if (data && data.longWaitIssue) {
        data.longWaitIssue.forEach((value, index) => {
          aggregated[index] += value;
        });
        companyCount++;
      }
    });

    if (companyCount > 0) {
      return aggregated.map(val => val / companyCount);
    }

    return aggregated;
  }

  function calculateKPIs(aggregated) {
    if (aggregated.length === 0) {
      document.getElementById('current-issue-rate').textContent = '0%';
      document.getElementById('improvement-rate').textContent = '0%';
      document.getElementById('learning-status').textContent = 'No Data';
      return;
    }

    // Current issue rate (last 4 weeks average)
    const currentRate = aggregated.slice(-4).reduce((sum, val) => sum + val, 0) / 4;

    // Improvement rate (before vs after intervention)
    const beforeIntervention = aggregated.slice(0, 4).reduce((sum, val) => sum + val, 0) / 4;
    const afterIntervention = aggregated.slice(5).reduce((sum, val) => sum + val, 0) / 7;
    const improvement = ((beforeIntervention - afterIntervention) / beforeIntervention) * 100;

    // Learning status based on improvement
    let learningStatus = 'Stagnant';
    if (improvement > 40) learningStatus = 'Evolving';
    else if (improvement > 20) learningStatus = 'Improving';
    else if (improvement > 0) learningStatus = 'Learning';
    else learningStatus = 'Stagnant';

    document.getElementById('current-issue-rate').textContent = Math.round(currentRate) + '%';
    document.getElementById('improvement-rate').textContent = improvement > 0 ? '+' + Math.round(improvement) + '%' : Math.round(improvement) + '%';
    document.getElementById('learning-status').textContent = learningStatus;
  }

  const initialCompanies = getSelectedCompanies();
  const initialData = aggregateImprovementData(initialCompanies);

  const series = [{
    name: 'Long Wait Time Issues (%)',
    data: initialData
  }];

  const chartElevenOptions = {
    series: series,
    colors: ["#EF4444"],
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
      width: 4,
    },
    xaxis: {
      categories: weeks,
      title: {
        text: 'Weeks'
      }
    },
    yaxis: {
      title: {
        text: 'Issue Rate (%)'
      },
      min: 0,
      max: 50
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(1) + '% of feedback mentions long wait times';
        }
      }
    },
    legend: {
      show: false
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 8
      }
    },
    annotations: {
      xaxis: [
        {
          x: 'Week 5',
          borderColor: '#10B981',
          label: {
            borderColor: '#10B981',
            style: {
              color: '#fff',
              background: '#10B981'
            },
            text: 'Intervention Applied'
          }
        }
      ],
      points: [
        {
          x: 'Week 4',
          y: initialData[3],
          marker: {
            size: 8,
            fillColor: '#EF4444',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Before: ' + initialData[3].toFixed(1) + '%'
          }
        },
        {
          x: 'Week 12',
          y: initialData[11],
          marker: {
            size: 8,
            fillColor: '#10B981',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'After: ' + initialData[11].toFixed(1) + '%'
          }
        }
      ]
    }
  };

  const chartEleven = new ApexCharts(document.querySelector("#chartEleven"), chartElevenOptions);
  chartEleven.render();

  calculateKPIs(initialData);

  // Listen for checkbox changes
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && !e.target.classList.contains('month-checkbox') && e.target.id !== 'select-all-months') {
      const companies = getSelectedCompanies();
      const aggregated = aggregateImprovementData(companies);

      const newSeries = [{
        name: 'Long Wait Time Issues (%)',
        data: aggregated
      }];

      chartEleven.updateSeries(newSeries);

      // Update annotations with new data
      const newAnnotations = {
        ...chartElevenOptions.annotations,
        points: [
          {
            x: 'Week 4',
            y: aggregated[3],
            marker: {
              size: 8,
              fillColor: '#EF4444',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Before: ' + aggregated[3].toFixed(1) + '%'
            }
          },
          {
            x: 'Week 12',
            y: aggregated[11],
            marker: {
              size: 8,
              fillColor: '#10B981',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'After: ' + aggregated[11].toFixed(1) + '%'
            }
          }
        ]
      };

      chartEleven.updateOptions({ annotations: newAnnotations });
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
      const aggregated = aggregateImprovementData(companies);

      const newSeries = [{
        name: 'Long Wait Time Issues (%)',
        data: aggregated
      }];

      chartEleven.updateSeries(newSeries);

      // Update annotations with new data
      const newAnnotations = {
        ...chartElevenOptions.annotations,
        points: [
          {
            x: 'Week 4',
            y: aggregated[3],
            marker: {
              size: 8,
              fillColor: '#EF4444',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Before: ' + aggregated[3].toFixed(1) + '%'
            }
          },
          {
            x: 'Week 12',
            y: aggregated[11],
            marker: {
              size: 8,
              fillColor: '#10B981',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'After: ' + aggregated[11].toFixed(1) + '%'
            }
          }
        ]
      };

      chartEleven.updateOptions({ annotations: newAnnotations });
      calculateKPIs(aggregated);
    });
  }
};

export default chart11;