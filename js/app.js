document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // ===== Form Cari Nebeng -> pop up daftar tawaran =====
  const searchForm = $("searchRideForm");
  const modalEl = $("rideResultModal");

  if (searchForm && modalEl) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    const [summary, body, showAllBtn] = ["rideResultSummary", "rideResultBody", "rideShowAll"].map($);
    let lastAsal = "";

    // Teks polos dari sel tabel (membuang tag HTML seperti badge)
    const plainText = (html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent.trim();
    };

    // Baris tabel -> [nama, asal, tujuan, waktu, kursi, status]
    const getRides = () => {
      const rows = window.jQuery?.fn.dataTable?.isDataTable("#rideTable")
        ? jQuery("#rideTable").DataTable().rows().data().toArray()
        : [...document.querySelectorAll("#rideTable tbody tr")].map((tr) => [...tr.cells].map((td) => td.innerHTML));
      return rows.map((cells) => cells.slice(0, 6).map(plainText));
    };

    const rideRow = ([nama, asal, tujuan, waktu, kursi, status]) => `
      <tr>
        ${[nama, asal, tujuan, waktu, kursi].map((v) => `<td>${escapeHTML(v)}</td>`).join("")}
        <td><span class="badge ${status.toLowerCase() === "tersedia" ? "bg-success" : "bg-secondary"}">${escapeHTML(status)}</span></td>
      </tr>`;

    const showResults = (showAll) => {
      const keyword = lastAsal.toLowerCase();
      const rides = getRides().filter((r) => showAll || r[1].toLowerCase().includes(keyword));

      summary.textContent = showAll
        ? `Menampilkan semua tawaran (${rides.length}).`
        : `Hasil untuk penjemputan di "${lastAsal}": ${rides.length} tawaran ditemukan.`;
      showAllBtn.classList.toggle("d-none", showAll);
      body.innerHTML = rides.length
        ? rides.map(rideRow).join("")
        : `<tr><td colspan="6" class="text-center text-muted py-4">Belum ada tawaran nebeng yang cocok dengan titik awal Anda.</td></tr>`;
    };

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      lastAsal = String(new FormData(searchForm).get("asal")).trim();
      showResults(false);
      modal.show();
    });

    showAllBtn.addEventListener("click", () => showResults(true));
  }

  // ===== Form Tawarkan Nebeng =====
  const offerForm = $("offerRideForm");

  if (offerForm) {
    // Tambah satu baris ke #rideTable (DataTables maupun tabel biasa)
    const addRideToTable = (cells) => {
      if (!window.jQuery?.fn.dataTable?.isDataTable("#rideTable")) {
        $("rideTable").tBodies[0].insertAdjacentHTML("beforeend", `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`);
        return;
      }

      const table = jQuery("#rideTable").DataTable();
      const row = table.row.add(cells);
      table.search("").draw();

      // Pindah ke halaman yang memuat baris baru, lalu sorot sebentar
      const pos = table.rows({ order: "current", search: "applied" }).indexes().toArray().indexOf(row.index());
      const pageLen = table.page.len();
      if (pos >= 0 && pageLen > 0) table.page(Math.floor(pos / pageLen)).draw("page");

      const node = row.node();
      node.classList.add("table-success");
      setTimeout(() => node.classList.remove("table-success"), 3000);
    };

    offerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(offerForm));
      const e = (key) => escapeHTML(data[key]);
      const waktu = e("waktu").replace(":", "."); // 07:30 -> 07.30, sama seperti format tabel

      addRideToTable([e("nama"), e("asal"), e("tujuan"), waktu, e("kursi"), '<span class="badge bg-success">Tersedia</span>']);

      $("offerRideResult").innerHTML = `
        <div class="alert alert-success py-2 small mb-0">
          Tawaran dari <strong>${e("nama")}</strong> berhasil ditambahkan ke Daftar Tawaran Nebeng:
          ${e("asal")} → ${e("tujuan")}, pukul ${waktu}, tersedia ${e("kursi")} kursi.
        </div>`;
      offerForm.reset();
    });
  }
});

function escapeHTML(value) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(value).replace(/[&<>"']/g, (char) => map[char]);
}