// check.js
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("linkInput");
  const btn = document.getElementById("checkBtn");

  const box = document.getElementById("resultBox");
  const icon = document.getElementById("resultIcon");
  const title = document.getElementById("resultTitle");
  const text = document.getElementById("resultText");

  function show(type, t, msg, ic) {
    box.classList.remove("hidden", "safe", "danger", "warn");
    box.classList.add(type);
    title.textContent = t;
    text.textContent = msg;
    icon.textContent = ic;
  }

  function normalize(v) {
    return (v || "").trim();
  }

  function checkLink(raw) {
    const v = normalize(raw);

    if (!v) {
      show("warn", "رابط مزيف محتمل", "فضلاً أدخل رابط/نص للفحص.", "!");
      return;
    }

    // إذا بدأ بـ https:// => آمن
    if (/^https:\/\//i.test(v)) {
      show("safe", "رابط آمن ✓", "هذا الرابط يبدأ بـ HTTPS ويبدو آمناً للاستخدام.", "✓");
      return;
    }

    // إذا بدأ بـ http:// => خطر
    if (/^http:\/\//i.test(v)) {
      show("danger", "رابط خطر - احتيال مؤكد", "هذا الرابط يستخدم HTTP بدون تشفير. تعامل معه كخطر.", "✕");
      return;
    }

    // بدون بروتوكول => مزيف محتمل
    show(
      "warn",
      "رابط مزيف محتمل",
      "الرابط لا يحتوي على http/https. قد يكون غير مكتمل أو مزيف. تحقق قبل فتحه.",
      "!"
    );
  }

  btn.addEventListener("click", () => checkLink(input.value));

  // Enter داخل textarea ما يسوي سطر جديد ويشغّل الفحص (اختياري)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      checkLink(input.value);
    }
  });
});
