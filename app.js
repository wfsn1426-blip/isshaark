/* ===============================
   التنقل بين الصفحات
================================ */
window.go = function (page) {
  window.location.href = page;
};

/* ===============================
   فحص الرابط
================================ */
function checkLink(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return { valid: false, message: "⚠️ الرابط غير آمن لأنه لا يستخدم HTTPS" };
    return { valid: true, message: "🔒 الرابط يستخدم HTTPS (آمن مبدئيًا)" };
  } catch (e) {
    return { valid: false, message: "❌ رابط غير صالح" };
  }
}

function checkURL() {
  let url = document.getElementById("urlInput").value;
  let result = document.getElementById("urlResult");
  if (!url) { result.innerHTML = "⚠️ الرجاء إدخال الرابط"; result.style.color = "red"; return; }
  let linkCheck = checkLink(url);
  if (!linkCheck.valid) { result.innerHTML = linkCheck.message; result.style.color = "red"; return; }

  let suspiciousWords = ["bank", "login", "free", "gift", "verify", "code"];
  let isSuspicious = suspiciousWords.some(w => url.toLowerCase().includes(w));

  if (isSuspicious) { result.innerHTML = "⛔ الرابط غير آمن - قد يكون احتيالي!"; result.style.color = "red"; }
  else { result.innerHTML = "✅ الرابط يبدو آمنًا حسب الفحص المبدئي"; result.style.color = "green"; }
}

/* ===============================
   التحليل الذكي للنصوص
================================ */
function analyzeText() {
  let text = document.getElementById("aiText").value;
  let result = document.getElementById("aiResult");
  if (!text) { result.innerHTML = "⚠️ الرجاء إدخال النص للتحليل"; result.style.color = "red"; return; }

  let dangerKeywords = ["تحويل","رمز","أرسل","اضغط","معلق","حساب","تحديث","فوري"];
  let detected = dangerKeywords.filter(k => text.includes(k));

  if (detected.length > 0) { result.innerHTML = "⛔ الرسالة تحتوي كلمات تحذيرية: " + detected.join("، "); result.style.color = "red"; }
  else { result.innerHTML = "✅ لم يتم اكتشاف كلمات احتيالية"; result.style.color = "green"; }
}

/* ===============================
   نظام البلاغات
================================ */
function saveReport() {
  let num = document.getElementById("number").value;
  let details = document.getElementById("details").value;
  if (!num) { alert("ادخل البيانات"); return; }

  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports.push({ number: num, details: details, date: new Date().toLocaleString() });
  localStorage.setItem("reports", JSON.stringify(reports));
  alert("تم رفع البلاغ بنجاح");
  displayReports();
}

function displayReports() {
  let list = document.getElementById("report-list");
  if(!list) return;
  let reports = JSON.parse(localStorage.getItem("reports") || '[]');
  if (reports.length === 0) { list.innerHTML = "لا يوجد بلاغات"; return; }

  list.innerHTML = reports.map(r => `<div><strong>${r.number}</strong><br>${r.details}<br><small>${r.date}</small><hr></div>`).join('');
}

document.addEventListener('DOMContentLoaded', displayReports);

/* ===============================
   دعم كبار السن وذوي الهمم
================================ */
document.getElementById('increase-font')?.addEventListener('click', () => { document.body.style.fontSize = 'larger'; });
document.getElementById('decrease-font')?.addEventListener('click', () => { document.body.style.fontSize = 'smaller'; });
document.getElementById('high-contrast')?.addEventListener('click', () => { document.body.classList.toggle('high-contrast'); });
document.getElementById('read-text')?.addEventListener('click', () => { const utter = new SpeechSynthesisUtterance(document.body.innerText); speechSynthesis.speak(utter); });

/* ===============================
   مساعد صوتي/نصي
================================ */
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
document.getElementById('startVoiceBtn')?.addEventListener('click', () => { recognition.start(); });
recognition.onresult = (e) => {
  const text = e.results[0][0].transcript;
  const chatOutput = document.getElementById("chat-output");
  chatOutput && (chatOutput.innerHTML += `<div>أنت: ${text}</div>`);
  const utter = new SpeechSynthesisUtterance('تم الاستماع: ' + text);
  speechSynthesis.speak(utter);
}

function sendChat() {
  const input = document.getElementById("chat-input");
  const chatOutput = document.getElementById("chat-output");
  if(!input || !chatOutput) return;
  chatOutput.innerHTML += `<div>أنت: ${input.value}</div>`;
  const utter = new SpeechSynthesisUtterance('تم الاستماع: ' + input.value);
  speechSynthesis.speak(utter);
  input.value = '';
}
