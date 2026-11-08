document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("globalSearch");

    if (!searchInput) return;

    // Daftar menu aplikasi
    const menuData = [
        {
            keywords: ["dashboard", "beranda", "statistik"],
            url: "index.html"
        },
        {
            keywords: ["rute", "transportasi", "angkutan"],
            url: "rute.html"
        },
        {
            keywords: ["nebeng", "tumpangan", "perjalanan"],
            url: "nebeng.html"
        },
        {
            keywords: ["peta", "lokasi", "maps"],
            url: "peta.html"
        },
        {
            keywords: ["pengguna", "mahasiswa", "user"],
            url: "pengguna.html"
        }
    ];

    // Fungsi pencarian
    function cariInformasi() {

        const keyword = searchInput.value
            .toLowerCase()
            .trim();

        if (keyword === "") {
            return;
        }

        // Mencari menu berdasarkan kata kunci
        const hasil = menuData.find(menu =>
            menu.keywords.some(kata =>
                kata.includes(keyword) ||
                keyword.includes(kata)
            )
        );

        if (hasil) {
            window.location.href = hasil.url;
        } else {
            alert("Informasi atau menu tidak ditemukan.");
        }
    }

    // Jalankan pencarian ketika Enter ditekan
    searchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            cariInformasi();
        }

    });

});