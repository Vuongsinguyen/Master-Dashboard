import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world";

const chart20 = () => {
  const mapSelector = document.querySelectorAll("#worldMapChart");

  if (mapSelector.length) {
    // Feedback data by country
    const feedbackData = {
      "VN": 1669, // Vietnam
      "JP": 734,  // Japan (234 + 500)
      "US": 800,  // United States (150 + 650)
      "TW": 400   // Taiwan
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
          style: {
            initial: {
              fill: "#1D4ED8"
            }
          },
          tooltip: `<div style="text-align: center; font-weight: bold; font-size: 14px;">Việt Nam</div>
                   <div style="text-align: center; color: #1D4ED8; font-size: 16px; font-weight: bold;">Số lượng Feedbacks: ${feedbackData["VN"] || 0}</div>`
        },
        {
          name: "Nhật Bản",
          coords: [36.2048, 138.2529],
          feedbackCount: feedbackData["JP"] || 0,
          style: {
            initial: {
              fill: "#1D4ED8"
            }
          },
          tooltip: `<div style="text-align: center; font-weight: bold; font-size: 14px;">Nhật Bản</div>
                   <div style="text-align: center; color: #1D4ED8; font-size: 16px; font-weight: bold;">Số lượng Feedbacks: ${feedbackData["JP"] || 0}</div>`
        },
        {
          name: "Hoa Kỳ",
          coords: [37.0902, -95.7129],
          feedbackCount: feedbackData["US"] || 0,
          style: {
            initial: {
              fill: "#1D4ED8"
            }
          },
          tooltip: `<div style="text-align: center; font-weight: bold; font-size: 14px;">Hoa Kỳ</div>
                   <div style="text-align: center; color: #1D4ED8; font-size: 16px; font-weight: bold;">Số lượng Feedbacks: ${feedbackData["US"] || 0}</div>`
        },
        {
          name: "Đài Loan",
          coords: [23.6978, 120.9605],
          feedbackCount: feedbackData["TW"] || 0,
          style: {
            initial: {
              fill: "#1D4ED8"
            }
          },
          tooltip: `<div style="text-align: center; font-weight: bold; font-size: 14px;">Đài Loan</div>
                   <div style="text-align: center; color: #1D4ED8; font-size: 16px; font-weight: bold;">Số lượng Feedbacks: ${feedbackData["TW"] || 0}</div>`
        }
      ],

      markerStyle: {
        initial: {
          strokeWidth: 2,
          stroke: "#FFFFFF",
          fill: "#1D4ED8",
          fillOpacity: 1,
          r: 12
        },
        hover: {
          fill: "#1D4ED8",
          fillOpacity: 1,
          strokeWidth: 3,
          r: 15
        }
      },

      backgroundColor: "transparent",
    });
  }
};

export default chart20;