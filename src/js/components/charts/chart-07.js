import ApexCharts from "apexcharts";

// Company data
const companyData = {
  "heineken-vietnam-brewery": {
    "locations": {
      "Main Branch": {
        "total": 41,
        "positive": 21
      },
      "Downtown Branch": {
        "total": 39,
        "positive": 21
      },
      "Premium Lounge": {
        "total": 36,
        "positive": 17
      },
      "Main Restaurant": {
        "total": 53,
        "positive": 20
      },
      "Data Center": {
        "total": 34,
        "positive": 16
      },
      "Head Office": {
        "total": 40,
        "positive": 22
      }
    }
  },
  "ttc-group": {
    "locations": {
      "Premium Lounge": {
        "total": 39,
        "positive": 21
      },
      "Main Branch": {
        "total": 30,
        "positive": 12
      },
      "Head Office": {
        "total": 47,
        "positive": 25
      },
      "Data Center": {
        "total": 43,
        "positive": 20
      },
      "Downtown Branch": {
        "total": 30,
        "positive": 11
      },
      "Main Restaurant": {
        "total": 54,
        "positive": 27
      }
    }
  },
  "moshi-moshi-ramen": {
    "locations": {
      "Main Restaurant": {
        "total": 34,
        "positive": 16
      },
      "Downtown Branch": {
        "total": 45,
        "positive": 19
      },
      "Main Branch": {
        "total": 32,
        "positive": 16
      },
      "Premium Lounge": {
        "total": 32,
        "positive": 16
      },
      "Head Office": {
        "total": 42,
        "positive": 24
      },
      "Data Center": {
        "total": 49,
        "positive": 29
      }
    }
  },
  "p2p-agency": {
    "locations": {
      "Head Office": {
        "total": 45,
        "positive": 23
      },
      "Main Restaurant": {
        "total": 37,
        "positive": 17
      },
      "Data Center": {
        "total": 20,
        "positive": 12
      },
      "Main Branch": {
        "total": 42,
        "positive": 21
      },
      "Downtown Branch": {
        "total": 35,
        "positive": 20
      },
      "Premium Lounge": {
        "total": 25,
        "positive": 18
      }
    }
  },
  "e-picos": {
    "locations": {
      "Data Center": {
        "total": 33,
        "positive": 14
      },
      "Main Branch": {
        "total": 43,
        "positive": 22
      },
      "Downtown Branch": {
        "total": 46,
        "positive": 23
      },
      "Premium Lounge": {
        "total": 44,
        "positive": 20
      },
      "Head Office": {
        "total": 45,
        "positive": 23
      },
      "Main Restaurant": {
        "total": 45,
        "positive": 26
      }
    }
  },
  "hung-thinh-land": {
    "locations": {
      "Main Restaurant": {
        "total": 32,
        "positive": 11
      },
      "Head Office": {
        "total": 39,
        "positive": 20
      },
      "Main Branch": {
        "total": 43,
        "positive": 22
      },
      "Data Center": {
        "total": 45,
        "positive": 23
      },
      "Downtown Branch": {
        "total": 48,
        "positive": 25
      },
      "Premium Lounge": {
        "total": 28,
        "positive": 13
      }
    }
  },
  "land-tsn-air": {
    "locations": {
      "Main Branch": {
        "total": 30,
        "positive": 14
      },
      "Data Center": {
        "total": 37,
        "positive": 25
      },
      "Premium Lounge": {
        "total": 45,
        "positive": 28
      },
      "Head Office": {
        "total": 33,
        "positive": 18
      },
      "Main Restaurant": {
        "total": 30,
        "positive": 11
      },
      "Downtown Branch": {
        "total": 37,
        "positive": 15
      }
    }
  },
  "hoan-my-hospital": {
    "locations": {
      "Premium Lounge": {
        "total": 49,
        "positive": 20
      },
      "Main Restaurant": {
        "total": 40,
        "positive": 21
      },
      "Main Branch": {
        "total": 43,
        "positive": 22
      },
      "Head Office": {
        "total": 51,
        "positive": 32
      },
      "Downtown Branch": {
        "total": 46,
        "positive": 18
      },
      "Data Center": {
        "total": 41,
        "positive": 21
      }
    }
  }
};







const chart07 = () => {
  let chartInstance;

  const storeNames = {
    "heineken-vietnam-brewery": "Heineken Brewery",
    "ttc-group": "TTC Group",
    "moshi-moshi-ramen": "Moshi Moshi Ramen",
    "p2p-agency": "P2P Agency",
    "e-picos": "E-PICOS",
    "hung-thinh-land": "Hung Thinh Land",
    "land-tsn-air": "Land TSN Air",
    "hoan-my-hospital": "Hoan My Hospital"
  };

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }

  function calculateStorePerformance(companies) {
    const performance = companies.map(company => {
      const data = companyData[company];
      if (!data || !data.locations) return null;

      // Aggregate across all locations
      let totalFeedback = 0;
      let totalPositive = 0;

      Object.values(data.locations).forEach(location => {
        totalFeedback += location.total;
        totalPositive += location.positive;
      });

      const badFeedback = totalFeedback - totalPositive;
      const badFeedbackRate = totalFeedback > 0 ? (badFeedback / totalFeedback) * 100 : 0;

      return {
        name: storeNames[company] || company,
        badFeedbackRate: badFeedbackRate,
        revenue: totalFeedback * 1000, // Mock revenue
        customers: totalFeedback
      };
    }).filter(item => item !== null);

    // Sort by bad feedback rate (ascending - better stores first)
    performance.sort((a, b) => a.badFeedbackRate - b.badFeedbackRate);

    return performance;
  }

  function updateKPIs(performance) {
    if (performance.length === 0) {
      document.getElementById('avg-bad-feedback').textContent = '0';
      document.getElementById('best-store').textContent = '-';
      document.getElementById('worst-store').textContent = '-';
      return;
    }

    const avgBadFeedback = performance.reduce((sum, store) => sum + store.badFeedbackRate, 0) / performance.length;
    const bestStore = performance[0].name;
    const worstStore = performance[performance.length - 1].name;

    document.getElementById('avg-bad-feedback').textContent = avgBadFeedback.toFixed(1);
    document.getElementById('best-store').textContent = bestStore;
    document.getElementById('worst-store').textContent = worstStore;
  }

  const initialCompanies = getSelectedCompanies();
  const initialPerformance = calculateStorePerformance(initialCompanies);

  const chartSevenOptions = {
    series: [{
      name: 'Bad Feedback per 100 Customers',
      data: initialPerformance.map(store => store.badFeedbackRate)
    }],
    colors: ["#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
        distributed: true,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1);
      },
      style: {
        fontSize: '12px',
        colors: ['#304758']
      }
    },
    xaxis: {
      categories: initialPerformance.map(store => store.name),
      title: {
        text: 'Bad Feedback per 100 Customers'
      }
    },
    yaxis: {
      title: {
        text: 'Store'
      }
    },
    tooltip: {
      y: {
        formatter: function (val, { dataPointIndex }) {
          const store = initialPerformance[dataPointIndex];
          return `
            Bad Feedback Rate: ${val.toFixed(1)} per 100 customers<br/>
            Revenue: $${store.revenue.toLocaleString()}<br/>
            Customers: ${store.customers.toLocaleString()}
          `;
        }
      }
    },
    legend: {
      show: false
    }
  };

  const chartSeven = new ApexCharts(document.querySelector("#chartSeven"), chartSevenOptions);
  chartSeven.render();

  updateKPIs(initialPerformance);

  // Listen for checkbox changes
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && !e.target.classList.contains('month-checkbox') && e.target.id !== 'select-all-months') {
      const companies = getSelectedCompanies();
      const performance = calculateStorePerformance(companies);

      const newSeries = [{
        name: 'Bad Feedback per 100 Customers',
        data: performance.map(store => store.badFeedbackRate)
      }];

      const newOptions = {
        ...chartSevenOptions,
        series: newSeries,
        xaxis: {
          ...chartSevenOptions.xaxis,
          categories: performance.map(store => store.name)
        }
      };

      chartSeven.updateOptions(newOptions);
      updateKPIs(performance);
    }
  });

  // Handle select all checkbox
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const companyCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
      companyCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);

      const companies = getSelectedCompanies();
      const performance = calculateStorePerformance(companies);

      const newSeries = [{
        name: 'Bad Feedback per 100 Customers',
        data: performance.map(store => store.badFeedbackRate)
      }];

      const newOptions = {
        ...chartSevenOptions,
        series: newSeries,
        xaxis: {
          ...chartSevenOptions.xaxis,
          categories: performance.map(store => store.name)
        }
      };

      chartSeven.updateOptions(newOptions);
      updateKPIs(performance);
    });
  }
};

export default chart07;