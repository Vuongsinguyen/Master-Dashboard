import ApexCharts from "apexcharts";

// Staff performance signals
const staffData = {
  "heineken-vietnam-brewery": {
    "teams": {
      "Nguyen Van A": [
        7,
        4,
        4,
        10,
        6,
        8,
        10,
        7,
        10,
        7,
        7,
        9
      ],
      "Tran Thi B": [
        8,
        0,
        5,
        5,
        6,
        9,
        3,
        6,
        6,
        10,
        0,
        4
      ],
      "Le Van C": [
        6,
        4,
        10,
        0,
        8,
        4,
        10,
        6,
        5,
        8,
        0,
        0
      ],
      "Tran Van G": [
        4,
        5,
        7,
        4,
        4,
        7,
        0,
        6,
        9,
        5,
        10,
        9
      ],
      "Hoang Thi J": [
        4,
        4,
        10,
        10,
        0,
        8,
        0,
        10,
        7,
        4,
        6,
        6
      ],
      "Pham Thi D": [
        6,
        7,
        5,
        5,
        4,
        10,
        6,
        0,
        6,
        4,
        4,
        4
      ],
      "Pham Van I": [
        4,
        9,
        8,
        10,
        4,
        0,
        8,
        10,
        5,
        4,
        10,
        10
      ],
      "Hoang Van E": [
        3,
        8,
        0,
        5,
        8,
        6,
        9,
        0,
        4,
        4,
        0,
        3
      ],
      "Nguyen Thi F": [
        0,
        7,
        0,
        4,
        0,
        0,
        0,
        10,
        7,
        6,
        6,
        6
      ],
      "Le Thi H": [
        8,
        0,
        4,
        6,
        8,
        0,
        10,
        5,
        0,
        5,
        6,
        8
      ]
    }
  },
  "ttc-group": {
    "teams": {
      "Pham Thi D": [
        10,
        10,
        5,
        6,
        9,
        4,
        7,
        8,
        3,
        6,
        0,
        8
      ],
      "Hoang Van E": [
        7,
        10,
        8,
        4,
        10,
        10,
        0,
        7,
        6,
        9,
        0,
        10
      ],
      "Le Van C": [
        6,
        0,
        8,
        10,
        9,
        10,
        8,
        8,
        4,
        5,
        3,
        4
      ],
      "Pham Van I": [
        7,
        0,
        4,
        0,
        8,
        6,
        6,
        9,
        10,
        4,
        0,
        10
      ],
      "Le Thi H": [
        6,
        0,
        6,
        8,
        0,
        5,
        6,
        10,
        8,
        7,
        8,
        6
      ],
      "Tran Van G": [
        10,
        6,
        4,
        8,
        4,
        6,
        3,
        6,
        6,
        8,
        10,
        6
      ],
      "Hoang Thi J": [
        8,
        7,
        6,
        5,
        9,
        0,
        9,
        5,
        10,
        7,
        8,
        5
      ],
      "Nguyen Van A": [
        8,
        4,
        8,
        6,
        0,
        0,
        10,
        10,
        4,
        4,
        4,
        8
      ],
      "Tran Thi B": [
        6,
        4,
        6,
        5,
        5,
        4,
        5,
        6,
        4,
        3,
        3,
        9
      ],
      "Nguyen Thi F": [
        4,
        3,
        6,
        0,
        0,
        10,
        7,
        10,
        6,
        9,
        10,
        9
      ]
    }
  },
  "moshi-moshi-ramen": {
    "teams": {
      "Nguyen Thi F": [
        5,
        9,
        3,
        6,
        3,
        8,
        10,
        8,
        0,
        7,
        10,
        4
      ],
      "Tran Van G": [
        10,
        6,
        3,
        0,
        0,
        10,
        5,
        5,
        7,
        0,
        8,
        10
      ],
      "Hoang Van E": [
        4,
        0,
        0,
        6,
        7,
        10,
        0,
        5,
        8,
        0,
        3,
        6
      ],
      "Nguyen Van A": [
        7,
        10,
        3,
        8,
        10,
        8,
        0,
        6,
        9,
        6,
        0,
        0
      ],
      "Tran Thi B": [
        4,
        0,
        6,
        7,
        10,
        0,
        7,
        8,
        6,
        4,
        0,
        6
      ],
      "Pham Van I": [
        7,
        6,
        3,
        9,
        9,
        10,
        0,
        10,
        10,
        8,
        8,
        0
      ],
      "Hoang Thi J": [
        6,
        8,
        10,
        8,
        5,
        6,
        4,
        6,
        9,
        0,
        7,
        6
      ],
      "Le Thi H": [
        8,
        10,
        0,
        6,
        7,
        0,
        5,
        0,
        0,
        3,
        6,
        0
      ],
      "Le Van C": [
        4,
        8,
        6,
        6,
        3,
        0,
        10,
        10,
        6,
        6,
        4,
        0
      ],
      "Pham Thi D": [
        0,
        0,
        0,
        8,
        10,
        10,
        5,
        8,
        6,
        3,
        4,
        8
      ]
    }
  },
  "p2p-agency": {
    "teams": {
      "Le Thi H": [
        6,
        6,
        6,
        5,
        10,
        8,
        5,
        0,
        0,
        4,
        4,
        0
      ],
      "Pham Van I": [
        6,
        4,
        0,
        9,
        8,
        4,
        3,
        9,
        4,
        10,
        6,
        0
      ],
      "Tran Van G": [
        8,
        0,
        10,
        4,
        10,
        5,
        0,
        6,
        3,
        8,
        4,
        8
      ],
      "Tran Thi B": [
        6,
        5,
        8,
        0,
        6,
        8,
        5,
        6,
        8,
        0,
        0,
        0
      ],
      "Le Van C": [
        6,
        0,
        10,
        6,
        6,
        0,
        7,
        7,
        0,
        6,
        0,
        8
      ],
      "Pham Thi D": [
        7,
        0,
        5,
        0,
        6,
        7,
        3,
        0,
        9,
        7,
        8,
        0
      ],
      "Nguyen Van A": [
        10,
        0,
        7,
        7,
        8,
        3,
        0,
        9,
        0,
        5,
        9,
        10
      ],
      "Nguyen Thi F": [
        8,
        7,
        0,
        4,
        0,
        8,
        10,
        0,
        8,
        8,
        0,
        0
      ],
      "Hoang Van E": [
        6,
        0,
        10,
        4,
        6,
        7,
        6,
        10,
        6,
        3,
        3,
        5
      ],
      "Hoang Thi J": [
        0,
        8,
        0,
        8,
        10,
        9,
        10,
        10,
        3,
        8,
        4,
        4
      ]
    }
  },
  "e-picos": {
    "teams": {
      "Hoang Thi J": [
        8,
        6,
        5,
        8,
        9,
        10,
        8,
        10,
        4,
        4,
        4,
        6
      ],
      "Pham Thi D": [
        5,
        6,
        9,
        3,
        6,
        9,
        0,
        5,
        10,
        6,
        7,
        4
      ],
      "Tran Van G": [
        6,
        8,
        0,
        4,
        4,
        6,
        6,
        0,
        5,
        5,
        6,
        10
      ],
      "Nguyen Thi F": [
        4,
        7,
        6,
        8,
        4,
        10,
        7,
        6,
        3,
        4,
        4,
        8
      ],
      "Pham Van I": [
        9,
        5,
        8,
        7,
        9,
        0,
        8,
        6,
        0,
        9,
        3,
        0
      ],
      "Le Thi H": [
        8,
        9,
        8,
        6,
        4,
        10,
        4,
        8,
        4,
        8,
        4,
        0
      ],
      "Hoang Van E": [
        4,
        8,
        7,
        4,
        8,
        9,
        10,
        6,
        9,
        3,
        4,
        5
      ],
      "Nguyen Van A": [
        8,
        3,
        3,
        3,
        9,
        10,
        6,
        7,
        8,
        8,
        6,
        9
      ],
      "Le Van C": [
        7,
        0,
        4,
        0,
        8,
        7,
        4,
        8,
        8,
        5,
        3,
        6
      ],
      "Tran Thi B": [
        7,
        6,
        7,
        6,
        8,
        3,
        10,
        10,
        10,
        7,
        8,
        4
      ]
    }
  },
  "hung-thinh-land": {
    "teams": {
      "Pham Thi D": [
        4,
        4,
        0,
        0,
        4,
        4,
        4,
        4,
        10,
        8,
        0,
        4
      ],
      "Nguyen Van A": [
        7,
        5,
        3,
        10,
        10,
        3,
        5,
        4,
        10,
        4,
        4,
        0
      ],
      "Hoang Van E": [
        9,
        6,
        0,
        0,
        6,
        10,
        0,
        4,
        6,
        0,
        10,
        4
      ],
      "Pham Van I": [
        6,
        8,
        8,
        10,
        4,
        5,
        6,
        5,
        5,
        3,
        7,
        8
      ],
      "Le Van C": [
        9,
        10,
        10,
        5,
        5,
        4,
        6,
        9,
        7,
        10,
        0,
        6
      ],
      "Le Thi H": [
        4,
        10,
        9,
        4,
        8,
        9,
        4,
        10,
        3,
        7,
        4,
        6
      ],
      "Tran Van G": [
        5,
        6,
        0,
        6,
        0,
        0,
        8,
        8,
        4,
        7,
        8,
        4
      ],
      "Nguyen Thi F": [
        4,
        8,
        8,
        0,
        0,
        6,
        6,
        7,
        8,
        10,
        9,
        6
      ],
      "Hoang Thi J": [
        4,
        6,
        0,
        7,
        6,
        0,
        4,
        8,
        0,
        10,
        0,
        4
      ],
      "Tran Thi B": [
        5,
        9,
        10,
        7,
        4,
        4,
        8,
        8,
        0,
        7,
        5,
        8
      ]
    }
  },
  "land-tsn-air": {
    "teams": {
      "Pham Thi D": [
        6,
        9,
        6,
        8,
        10,
        0,
        0,
        0,
        9,
        9,
        9,
        4
      ],
      "Pham Van I": [
        10,
        4,
        0,
        10,
        10,
        7,
        7,
        0,
        10,
        0,
        3,
        0
      ],
      "Nguyen Thi F": [
        8,
        4,
        7,
        10,
        4,
        0,
        4,
        7,
        8,
        8,
        10,
        4
      ],
      "Tran Van G": [
        6,
        10,
        0,
        3,
        10,
        6,
        9,
        3,
        7,
        10,
        3,
        0
      ],
      "Hoang Van E": [
        4,
        10,
        0,
        3,
        6,
        4,
        6,
        6,
        8,
        5,
        4,
        10
      ],
      "Le Van C": [
        3,
        0,
        0,
        0,
        6,
        10,
        6,
        10,
        3,
        4,
        6,
        9
      ],
      "Nguyen Van A": [
        8,
        0,
        10,
        10,
        7,
        6,
        0,
        4,
        0,
        10,
        8,
        10
      ],
      "Le Thi H": [
        6,
        6,
        6,
        8,
        0,
        3,
        6,
        5,
        8,
        8,
        0,
        5
      ],
      "Tran Thi B": [
        0,
        9,
        7,
        10,
        6,
        10,
        8,
        4,
        0,
        4,
        10,
        5
      ],
      "Hoang Thi J": [
        0,
        0,
        8,
        6,
        8,
        8,
        10,
        4,
        10,
        8,
        9,
        4
      ]
    }
  },
  "hoan-my-hospital": {
    "teams": {
      "Le Thi H": [
        3,
        9,
        10,
        3,
        8,
        3,
        5,
        5,
        9,
        8,
        4,
        4
      ],
      "Tran Thi B": [
        4,
        10,
        10,
        4,
        3,
        6,
        10,
        4,
        5,
        10,
        0,
        6
      ],
      "Hoang Van E": [
        6,
        3,
        10,
        9,
        0,
        9,
        6,
        3,
        3,
        10,
        5,
        10
      ],
      "Nguyen Van A": [
        9,
        4,
        7,
        5,
        10,
        4,
        6,
        3,
        7,
        10,
        3,
        6
      ],
      "Hoang Thi J": [
        9,
        0,
        7,
        0,
        8,
        4,
        8,
        8,
        8,
        7,
        10,
        4
      ],
      "Le Van C": [
        8,
        10,
        0,
        5,
        10,
        4,
        4,
        8,
        6,
        8,
        9,
        6
      ],
      "Tran Van G": [
        8,
        4,
        0,
        8,
        8,
        6,
        0,
        4,
        0,
        3,
        10,
        5
      ],
      "Pham Van I": [
        6,
        10,
        10,
        8,
        4,
        6,
        8,
        3,
        8,
        3,
        8,
        4
      ],
      "Nguyen Thi F": [
        4,
        5,
        3,
        10,
        5,
        3,
        6,
        7,
        7,
        10,
        4,
        4
      ],
      "Pham Thi D": [
        5,
        10,
        7,
        9,
        0,
        10,
        3,
        8,
        0,
        6,
        8,
        9
      ]
    }
  }
};







const chart09 = () => {
  let chartInstance;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function getSelectedCompanies() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }

  function aggregateTeamPerformance(companies) {
    const teamPerformance = {};
    const teamCount = {};

    companies.forEach(company => {
      const data = staffData[company];
      if (data && data.teams) {
        Object.entries(data.teams).forEach(([teamName, performance]) => {
          if (!teamPerformance[teamName]) {
            teamPerformance[teamName] = new Array(12).fill(0);
            teamCount[teamName] = 0;
          }
          performance.forEach((value, index) => {
            teamPerformance[teamName][index] += value;
          });
          teamCount[teamName]++;
        });
      }
    });

    // Calculate averages
    Object.keys(teamPerformance).forEach(teamName => {
      teamPerformance[teamName] = teamPerformance[teamName].map(val => val / teamCount[teamName]);
    });

    return teamPerformance;
  }

  function calculateKPIs(teamPerformance) {
    const allTeams = Object.keys(teamPerformance);
    if (allTeams.length === 0) {
      document.getElementById('team-performance').textContent = 'No Data';
      document.getElementById('coaching-impact').textContent = '0%';
      document.getElementById('support-needed').textContent = '0 teams';
      return;
    }

    // Calculate overall trend
    const recentAvg = allTeams.reduce((sum, team) => {
      const recent = teamPerformance[team].slice(-3).reduce((a, b) => a + b, 0) / 3;
      const earlier = teamPerformance[team].slice(0, 3).reduce((a, b) => a + b, 0) / 3;
      return sum + (recent > earlier ? 1 : -1);
    }, 0);

    const teamStatus = recentAvg > 0 ? 'Improving' : recentAvg < 0 ? 'Declining' : 'Stable';

    // Calculate coaching impact (improvement after month 6)
    const coachingImpact = allTeams.reduce((sum, team) => {
      const beforeCoaching = teamPerformance[team].slice(0, 6).reduce((a, b) => a + b, 0) / 6;
      const afterCoaching = teamPerformance[team].slice(6).reduce((a, b) => a + b, 0) / 6;
      const improvement = ((afterCoaching - beforeCoaching) / beforeCoaching) * 100;
      return sum + improvement;
    }, 0) / allTeams.length;

    // Count teams needing support (performance < 7.0 in recent months)
    const supportNeeded = allTeams.filter(team => {
      const recent = teamPerformance[team].slice(-3).reduce((a, b) => a + b, 0) / 3;
      return recent < 7.0;
    }).length;

    document.getElementById('team-performance').textContent = teamStatus;
    document.getElementById('coaching-impact').textContent = coachingImpact > 0 ? `+${coachingImpact.toFixed(0)}%` : `${coachingImpact.toFixed(0)}%`;
    document.getElementById('support-needed').textContent = `${supportNeeded} teams`;
  }

  const initialCompanies = getSelectedCompanies();
  const initialPerformance = aggregateTeamPerformance(initialCompanies);

  const series = Object.entries(initialPerformance).map(([teamName, performance]) => ({
    name: teamName,
    data: performance
  }));

  const chartNineOptions = {
    series: series,
    colors: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#06B6D4", "#F97316", "#84CC16"],
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
      width: 3,
    },
    xaxis: {
      categories: months,
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Performance Score'
      },
      min: 0,
      max: 10
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(1) + ' (performance score)';
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
    }
  };

  const chartNine = new ApexCharts(document.querySelector("#chartNine"), chartNineOptions);
  chartNine.render();

  calculateKPIs(initialPerformance);

  // Listen for checkbox changes
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && !e.target.classList.contains('month-checkbox') && e.target.id !== 'select-all-months') {
      const companies = getSelectedCompanies();
      const performance = aggregateTeamPerformance(companies);

      const newSeries = Object.entries(performance).map(([teamName, perfData]) => ({
        name: teamName,
        data: perfData
      }));

      chartNine.updateSeries(newSeries);
      calculateKPIs(performance);
    }
  });

  // Handle select all checkbox
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const companyCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all):not(.month-checkbox):not(#select-all-months)');
      companyCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);

      const companies = getSelectedCompanies();
      const performance = aggregateTeamPerformance(companies);

      const newSeries = Object.entries(performance).map(([teamName, perfData]) => ({
        name: teamName,
        data: perfData
      }));

      chartNine.updateSeries(newSeries);
      calculateKPIs(performance);
    });
  }
};

export default chart09;