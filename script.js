// Real-time Clock
function updateClock() {
  const now = new Date();
  const dateEl = document.getElementById('currentDate');
  const timeEl = document.getElementById('currentTime');
  
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  if (timeEl) {
    timeEl.textContent = now.toTimeString().substring(0, 8); // HH:MM:SS
  }
}

// Initial clock update and interval
updateClock();
setInterval(updateClock, 1000);

// Custom Chart.js Plugin to draw text in the center
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: function(chart) {
    if (chart.config.type !== 'doughnut') return;
    
    var ctx = chart.ctx;
    var chartArea = chart.chartArea;
    var centerX = (chartArea.left + chartArea.right) / 2;
    var centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.restore();
    
    // Draw "รวม"
    ctx.font = "600 14px 'Noto Sans Thai'";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#6b7280";
    var text1 = "รวม";
    var text1X = centerX - (ctx.measureText(text1).width / 2);
    var text1Y = centerY - 25;
    ctx.fillText(text1, text1X, text1Y);
    
    // Draw "60"
    ctx.font = "800 36px 'Noto Sans Thai'";
    ctx.fillStyle = "#1f2937";
    var text2 = "60";
    var text2X = centerX - (ctx.measureText(text2).width / 2);
    var text2Y = centerY + 2;
    ctx.fillText(text2, text2X, text2Y);
    
    // Draw "ใบ"
    ctx.font = "600 14px 'Noto Sans Thai'";
    ctx.fillStyle = "#6b7280";
    var text3 = "ใบ";
    var text3X = centerX - (ctx.measureText(text3).width / 2);
    var text3Y = centerY + 28;
    ctx.fillText(text3, text3X, text3Y);

    ctx.save();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('statusChart');
  if (ctx) {
    Chart.register(centerTextPlugin);
    
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'พร้อมให้เบิก \t\t\t 38 ใบ (63.33%)', 
          'ครูยืมอยู่ \t\t\t\t\t 8 ใบ (13.33%)', 
          'คืนแล้ววันนี้ \t\t\t 22 ใบ (36.67%)', 
          'ยังไม่คืน \t\t\t\t\t 3 ใบ (5.00%)'
        ],
        datasets: [{
          data: [38, 8, 22, 3],
          backgroundColor: ['#10b981', '#3b82f6', '#059669', '#f43f5e'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        layout: {
          padding: {
            right: 150 // space for legend
          }
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'rectRounded',
              padding: 15,
              font: { 
                family: "'Noto Sans Thai', sans-serif",
                size: 11,
                weight: '600'
              },
              color: '#374151'
            }
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
  }
});
