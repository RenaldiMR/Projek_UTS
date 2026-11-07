document.addEventListener("DOMContentLoaded", function () {
  const chartElement = document.getElementById("usageChart");
  if (!chartElement || typeof Highcharts === "undefined") return;
  Highcharts.chart("usageChart", {
    chart: { type: "column", backgroundColor: "transparent", height: 260 },
    title: { text: null },
    xAxis: { categories: ["Sen","Sel","Rab","Kam","Jum","Sab","Min"] },
    yAxis: { min: 0, title: { text: "Jumlah aktivitas" } },
    tooltip: { shared: true },
    legend: { align: "center", verticalAlign: "bottom" },
    credits: { enabled: false },
    series: [
      { name: "Pencarian rute", data: [32,45,51,48,62,70,75] },
      { name: "Aktivitas nebeng", data: [18,25,29,31,38,42,49] }
    ]
  });
});
