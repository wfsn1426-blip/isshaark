// تفعيل الضغط على الكروت (GitHub Pages friendly)
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const page = card.getAttribute("data-go");
  if (!page) return;

  // انتقال لصفحة أخرى
  window.location.href = `./${page}`;
}); 
 
