document.addEventListener("DOMContentLoaded", function () {
  if (typeof DataTable === "undefined") return;

  ["#dashboardRouteTable","#dashboardNebengTable","#routeTable","#rideTable","#userTable"].forEach(function(selector){
    const table = document.querySelector(selector);
    if (table) {
      new DataTable(table, {
        pageLength: selector === "#dashboardRouteTable" || selector === "#dashboardNebengTable" ? 3 : 3,
        lengthMenu: [ [3, 5, 10], [3, 5, 10] ],
        columnDefs: [
          { 
            targets: 0, 
            orderable: false,
            // Membuat nomor urut otomatis berdasar posisi baris (bukan teks statis dari HTML)
            render: function (data, type, row, meta) {
              return meta.row + 1; // Menghasilkan nomor 1, 2, 3, dst secara otomatis
            }
          }
        ],

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