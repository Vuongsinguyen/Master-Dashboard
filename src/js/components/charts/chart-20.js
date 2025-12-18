import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world";

const chart20 = () => {
  const mapSelector = document.querySelectorAll("#worldMapChart");

  if (mapSelector.length) {
    // Feedback data by country
    const feedbackData = {
      "VN": 1669, // Vietnam
      "JP": 234,  // Japan
      "US": 150   // United States
    };

    const map = new jsVectorMap({
      selector: "#worldMapChart",
      map: "world",
      zoomButtons: false,

      regionStyle: {
        initial: {
          fontFamily: "Outfit",
          fill: "#E5E7EB",
          stroke: "#FFFFFF",
          strokeWidth: 0.5,
        },
        hover: {
          fillOpacity: 0.8,
          cursor: "pointer",
        },
      },

      series: {
        regions: [{
          scale: {
            '0': '#F3F4F6',
            '1-100': '#DBEAFE',
            '101-500': '#93C5FD',
            '501-1000': '#3B82F6',
            '1001+': '#1D4ED8'
          },
          values: feedbackData,
          legend: {
            vertical: true,
            title: {
              text: 'Feedback Count'
            }
          }
        }]
      },

      markers: [
        {
          name: "Việt Nam",
          coords: [14.0583, 108.2772],
          feedbackCount: feedbackData["VN"] || 0,
          label: `${feedbackData["VN"] || 0}`
        },
        {
          name: "Nhật Bản",
          coords: [36.2048, 138.2529],
          feedbackCount: feedbackData["JP"] || 0,
          label: `${feedbackData["JP"] || 0}`
        },
        {
          name: "Hoa Kỳ",
          coords: [37.0902, -95.7129],
          feedbackCount: feedbackData["US"] || 0,
          label: `${feedbackData["US"] || 0}`
        }
      ],

      markerStyle: {
        initial: {
          strokeWidth: 1,
          fill: "#1D4ED8",
          fillOpacity: 1,
          r: 8
        },
        hover: {
          fill: "#1D4ED8",
          fillOpacity: 1,
          strokeWidth: 2,
          r: 10
        }
      },

      labels: {
        markers: {
          render: function(index) {
            return this.markers[index].label;
          },
          offsets: [
            [0, -15], // Việt Nam
            [0, -15], // Nhật Bản
            [0, -15]  // Hoa Kỳ
          ]
        }
      },

      onMarkerTooltipShow: function (tooltip, index) {
        const marker = this.markers[index];
        if (tooltip && tooltip.selector) {
          tooltip.selector.innerHTML =
            `<strong>${marker.name}</strong><br/>Feedbacks: ${marker.feedbackCount}`;
        }
      },

      onRegionTooltipShow: function (tooltip, code) {
        const count = feedbackData[code] || 0;
        const countryNames = {
          "VN": "Việt Nam",
          "JP": "Nhật Bản",
          "US": "Hoa Kỳ"
        };

        const countryName = countryNames[code] || code;
        if (tooltip && tooltip.selector) {
          tooltip.selector.innerHTML = `<strong>${countryName}</strong><br/>Feedbacks: ${count}`;
        }
      },

      backgroundColor: "transparent",
    });
  }
};

export default chart20;