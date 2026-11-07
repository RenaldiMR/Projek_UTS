document.addEventListener("DOMContentLoaded", function () {
  const searchRideForm = document.getElementById("searchRideForm");
  if (searchRideForm) {
    searchRideForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(searchRideForm);
      const asal = data.get("asal");
      const tujuan = data.get("tujuan");
      document.getElementById("searchRideResult").innerHTML =
        `<div class="alert alert-info py-2 small mb-0">Pencarian contoh berhasil diproses: <strong>${escapeHTML(asal)}</strong> menuju <strong>${escapeHTML(tujuan)}</strong>. Cocokkan hasil perjalanan secara langsung dengan pengemudi.</div>`;
    });
  }

  const offerRideForm = document.getElementById("offerRideForm");
  if (offerRideForm) {
    offerRideForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(offerRideForm);
      const nama = escapeHTML(data.get("nama"));
      const asal = escapeHTML(data.get("asal"));
      const tujuan = escapeHTML(data.get("tujuan"));
      const waktu = escapeHTML(data.get("waktu"));
      const kursi = escapeHTML(data.get("kursi"));
      document.getElementById("offerRideResult").innerHTML =
        `<div class="alert alert-success py-2 small mb-0">Tawaran simulasi berhasil dibuat oleh <strong>${nama}</strong>: ${asal} → ${tujuan}, pukul ${waktu}, tersedia ${kursi} kursi.</div>`;
      offerRideForm.reset();
    });
  }
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[char];
  });
}
