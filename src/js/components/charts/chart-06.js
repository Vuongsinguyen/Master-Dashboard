import ApexCharts from "apexcharts";

// Company data
const companyData = {
  "heineken-vietnam-brewery": {
    "issues": {
      "Long wait time": 19,
      "Staff attitude": 9,
      "Lack of updates": 15,
      "Overcharged": 14,
      "System downtime": 13,
      "Data loss": 12,
      "Cleanliness": 13,
      "Poor explanation": 13,
      "Understaffed": 10
    }
  },
  "ttc-group": {
    "issues": {
      "Overcharged": 13,
      "Poor explanation": 19,
      "Long wait time": 10,
      "Staff attitude": 16,
      "Data loss": 10,
      "Lack of updates": 15,
      "System downtime": 15,
      "Cleanliness": 15,
      "Understaffed": 10
    }
  },
  "moshi-moshi-ramen": {
    "issues": {
      "Long wait time": 12,
      "Understaffed": 7,
      "Lack of updates": 13,
      "Data loss": 8,
      "Overcharged": 12,
      "Cleanliness": 14,
      "Poor explanation": 10,
      "System downtime": 12,
      "Staff attitude": 5
    }
  },
  "p2p-agency": {
    "issues": {
      "Poor explanation": 13,
      "System downtime": 10,
      "Lack of updates": 13,
      "Data loss": 11,
      "Understaffed": 7,
      "Long wait time": 11,
      "Cleanliness": 7,
      "Staff attitude": 7,
      "Overcharged": 5
    }
  },
  "e-picos": {
    "issues": {
      "System downtime": 13,
      "Data loss": 13,
      "Poor explanation": 16,
      "Long wait time": 16,
      "Cleanliness": 9,
      "Lack of updates": 12,
      "Overcharged": 9,
      "Staff attitude": 10,
      "Understaffed": 18
    }
  },
  "hung-thinh-land": {
    "issues": {
      "Data loss": 18,
      "Understaffed": 10,
      "Staff attitude": 14,
      "Long wait time": 11,
      "Cleanliness": 10,
      "Poor explanation": 14,
      "Overcharged": 11,
      "System downtime": 13,
      "Lack of updates": 12
    }
  },
  "land-tsn-air": {
    "issues": {
      "System downtime": 14,
      "Long wait time": 18,
      "Cleanliness": 11,
      "Overcharged": 13,
      "Staff attitude": 9,
      "Understaffed": 14,
      "Data loss": 10,
      "Lack of updates": 6,
      "Poor explanation": 9
    }
  },
  "hoan-my-hospital": {
    "issues": {
      "Staff attitude": 14,
      "Poor explanation": 14,
      "Cleanliness": 19,
      "Data loss": 10,
      "Understaffed": 15,
      "Long wait time": 12,
      "Lack of updates": 11,
      "System downtime": 16,
      "Overcharged": 11
    }
  }
};







const chart06 = () => {
  let chartInstance;

  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const categories = ['attitude', 'long_wait', 'space', 'order', 'drinks'];
  const categoryLabels = ['Thái độ', 'Chờ lâu', 'Không gian', 'Order', 'Sản phẩm'];

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }

  function aggregateIssues(companies) {
    const aggregated = categories.map(() => 0);

    companies.forEach(company => {
      const data = companyData[company];
      if (data && data.issues) {
        categories.forEach((category, catIndex) => {
          // Map category names to issue keys
          const issueKeyMap = {
            'attitude': 'Staff attitude',
            'long_wait': 'Long wait time',
            'space': 'Cleanliness',
            'order': 'Poor explanation',
            'drinks': 'Overcharged'
          };
          const issueKey = issueKeyMap[category];
          aggregated[catIndex] += data.issues[issueKey] || 0;
        });
      }
    });

    return aggregated;
  }

  function updateKPIs(companies) {
    const aggregated = aggregateIssues(companies);
    const totalIssues = aggregated.reduce((sum, val) => sum + val, 0);
    
    if (totalIssues === 0) {
      document.getElementById('people-process').textContent = '0%';
      document.getElementById('top-issue').textContent = 'None';
      document.getElementById('drinks-issues').textContent = 'None';
      return;
    }

    // Calculate people & process issues (attitude + long_wait + order)
    const peopleProcess = aggregated[0] + aggregated[1] + aggregated[3];
    const peopleProcessPercent = Math.round((peopleProcess / totalIssues) * 100);

    // Find top issue
    const categoryTotals = categories.map((cat, index) => ({
      name: categoryLabels[index],
      total: aggregated[index]
    }));
    const topIssue = categoryTotals.reduce((max, curr) => curr.total > max.total ? curr : max);

    // Drinks issues
    const drinksTotal = aggregated[4];
    const drinksPercent = Math.round((drinksTotal / totalIssues) * 100);

    document.getElementById('people-process').textContent = peopleProcessPercent + '%';
    document.getElementById('top-issue').textContent = topIssue.name;
    document.getElementById('drinks-issues').textContent = drinksPercent < 5 ? 'Rare' : drinksPercent + '%';
  }

  const initialCompanies = getSelectedCompanies();
  const initialData = aggregateIssues(initialCompanies);

  const chartSixOptions = {
    series: [{
      name: "Issues",
      data: initialData
    }],
    colors: ["#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
    },
    xaxis: {
      categories: categoryLabels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Number of Issues",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " issues";
        },
      },
    },
  };

  const chartSix = new ApexCharts(document.querySelector("#chartSix"), chartSixOptions);
  chartSix.render();

  updateKPIs(initialCompanies);

  // Listen for checkbox changes
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && !e.target.classList.contains('month-checkbox') && e.target.id !== 'select-all-months') {
      const companies = getSelectedCompanies();
      const newData = aggregateIssues(companies);
      
      chartSix.updateSeries([{
        name: "Issues",
        data: newData
      }]);
      updateKPIs(companies);
    }
  });

  // Handle select all checkbox
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const companyCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
      companyCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
      
      const companies = getSelectedCompanies();
      const newData = aggregateIssues(companies);
      
      chartSix.updateSeries([{
        name: "Issues",
        data: newData
      }]);
      updateKPIs(companies);
    });
  }
};

export default chart06;