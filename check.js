const checkBtn = document.getElementById("checkBtn");
const linkInput = document.getElementById("linkInput");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const resultIcon = document.getElementById("resultIcon");

checkBtn.addEventListener("click", () => {
  const link = linkInput.value.trim();

  if (!link) {
    showResult("⚠️", "الرجاء إدخال رابط", "warning");
    return;
  }

  // محاكاة فحص (بدون API)
  if (link.includes("secure") || link.includes("https")) {
    showResult("✅", "رابط آمن", "safe");
  } 
  else if (link.includes("scam") || link.includes("fraud")) {
    showResult("❌", "رابط غير آمن – احتيال مؤكد", "danger");
  } 
  else {
    showResult("⚠️", "احتيال محتمل – توخَّ الحذر", "warning");
  }
});

function showResult(icon, text, type) {
  resultIcon.textContent = icon;
  resultText.textContent = text;

  resultBox.className = `result ${type}`;
  resultBox.classList.remove("hidden");
}
