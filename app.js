document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const cards = document.querySelectorAll(".action-card[data-target]");
  const backButtons = document.querySelectorAll(".back-btn");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
  }

  // فتح الصفحات عند الضغط
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");
      showPage(target);
      history.pushState({ page: target }, "", "#" + target);
    });
  });

  // زر الرجوع
  backButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage("home");
      history.pushState({ page: "home" }, "", "#home");
    });
  });

  // دعم زر الرجوع في المتصفح
  window.addEventListener("popstate", () => {
    const hash = location.hash.replace("#", "") || "home";
    showPage(hash);
  });

  // فتح الصفحة من الرابط #linkcheck
  const initial = location.hash.replace("#", "") || "home";
  showPage(initial);
});
