// AUTH DEMO: penyimpanan akun menggunakan localStorage pada browser.
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const publicPage = currentPage === "login.html";
  const session = JSON.parse(localStorage.getItem("tnkSession") || "null");

  if (!publicPage && !session) {
    window.location.replace("login.html");
    return;
  }
  if (publicPage && session) {
    window.location.replace("index.html");
    return;
  }

  const nameTarget = document.getElementById("currentUserName");
  if (nameTarget && session) nameTarget.textContent = session.name || "Mahasiswa";

  document.querySelectorAll("[data-logout]").forEach(function (button) {
    button.addEventListener("click", function () {
      localStorage.removeItem("tnkSession");
      window.location.href = "login.html";
    });
  });

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  if (!loginForm || !registerForm) return;

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const title = document.getElementById("authTitle");
  const subtitle = document.getElementById("authSubtitle");

  function showForm(mode) {
    const isLogin = mode === "login";
    loginForm.classList.toggle("d-none", !isLogin);
    registerForm.classList.toggle("d-none", isLogin);
    loginTab.classList.toggle("active", isLogin);
    registerTab.classList.toggle("active", !isLogin);
    title.textContent = isLogin ? "Selamat Datang!" : "Buat Akun Baru";
    subtitle.textContent = isLogin
      ? "Silakan masuk ke akun Anda untuk melanjutkan."
      : "Daftarkan akun mahasiswa untuk menggunakan layanan.";
    document.getElementById("loginMessage").textContent = "";
    document.getElementById("registerMessage").textContent = "";
  }

  loginTab.addEventListener("click", () => showForm("login"));
  registerTab.addEventListener("click", () => showForm("register"));
  document.getElementById("goRegister").addEventListener("click", () => showForm("register"));
  document.getElementById("goLogin").addEventListener("click", () => showForm("login"));

  document.querySelectorAll(".password-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      const input = document.getElementById(button.dataset.target);
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.innerHTML = show ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
    });
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    if (password.length < 6) {
      message.className = "small mb-3 text-danger";
      message.textContent = "Password minimal terdiri dari 6 karakter.";
      return;
    }
    if (password !== confirm) {
      message.className = "small mb-3 text-danger";
      message.textContent = "Konfirmasi password belum sama.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("tnkUsers") || "[]");
    if (users.some(user => user.email === email)) {
      message.className = "small mb-3 text-danger";
      message.textContent = "Email sudah terdaftar. Silakan login.";
      return;
    }

    users.push({ name: name, email: email, password: password });
    localStorage.setItem("tnkUsers", JSON.stringify(users));
    message.className = "small mb-3 text-success";
    message.textContent = "Pendaftaran berhasil. Silakan login menggunakan akun baru.";
    registerForm.reset();
    setTimeout(() => showForm("login"), 900);
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const users = JSON.parse(localStorage.getItem("tnkUsers") || "[]");
    const user = users.find(item => item.email === email && item.password === password);
    const message = document.getElementById("loginMessage");

    if (!user) {
      message.className = "small mb-3 text-danger";
      message.textContent = "Email atau password salah, atau akun belum terdaftar.";
      return;
    }
    localStorage.setItem("tnkSession", JSON.stringify({ name: user.name, email: user.email }));
    window.location.href = "index.html";
  });
});
