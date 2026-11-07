document.addEventListener("DOMContentLoaded", function () {
  if (typeof DataTable === "undefined") return;
  ["#dashboardRouteTable","#dashboardNebengTable","#routeTable","#rideTable","#userTable"].forEach(function(selector){
    const table = document.querySelector(selector);
    if (table) {
      new DataTable(table, {
        pageLength: selector === "#dashboardRouteTable" || selector === "#dashboardNebengTable" ? 3 : 5,
        lengthChange: true,
        language: {
          search: "Cari:",
          lengthMenu: "Tampilkan _MENU_ data",
          info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
          infoEmpty: "Tidak ada data",
          zeroRecords: "Data tidak ditemukan",
          paginate: { first: "Awal", last: "Akhir", next: "Berikutnya", previous: "Sebelumnya" }
        }
      });
    }
  });
});
