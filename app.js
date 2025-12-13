const btn = document.getElementById("checkBtn");
const input = document.getElementById("urlInput");
const result = document.getElementById("result");
const icon = document.getElementById("resultIcon");
const title = document.getElementById("resultTitle");
const text = document.getElementById("resultText");

btn.onclick = () => {
  const url = input.value.toLowerCase();

  result.className = "result";

  if(url.includes("bank") || url.includes("verify") || url.includes("login")){
    result.classList.add("danger");
    icon.innerHTML = "⛔";
    title.innerText = "احتيال مؤكد";
    text.innerText = "هذا الرابط يحتوي مؤشرات احتيالية عالية. لا تقم بفتحه.";
  }
  else if(url.includes("free") || url.includes("offer") || url.includes("canva")){
    result.classList.add("warning");
    icon.innerHTML = "⚠️";
    title.innerText = "رابط مزيف محتمل";
    text.innerText = "هذا الرابط قد يكون مشبوهاً. يرجى الحذر قبل الاستخدام.";
  }
  else{
    result.classList.add("safe");
    icon.innerHTML = "✔️";
    title.innerText = "رابط آمن";
    text.innerText = "هذا الرابط لم يتم الإبلاغ عنه ويبدو آمناً للاستخدام.";
  }

  result.classList.remove("hidden");
};
function checkLink(){
  const link = document.getElementById("linkInput").value.trim();
  const box = document.getElementById("resultBox");
  const title = document.getElementById("resultTitle");
  const desc = document.getElementById("resultDesc");
  const icon = document.getElementById("resultIcon");

  box.className = "result"; // reset
  box.classList.remove("hidden");

  if(link === ""){
    title.textContent = "لم يتم إدخال رابط";
    desc.textContent = "يرجى إدخال رابط لفحصه";
    icon.textContent = "⚠️";
    box.classList.add("warning");
    return;
  }

  // منطق تجريبي (Demo)
  if(link.includes("bank") || link.includes("verify")){
    title.textContent = "احتيال مؤكد";
    desc.textContent = "تم رصد هذا الرابط كتهديد خطير ويُنصح بعدم فتحه.";
    icon.textContent = "❌";
    box.classList.add("danger");

  }else if(link.includes("http")){
    title.textContent = "رابط مزيف محتمل";
    desc.textContent = "لم يتم التأكد من موثوقية الرابط بالكامل، يرجى الحذر.";
    icon.textContent = "⚠️";
    box.classList.add("warning");

  }else{
    title.textContent = "رابط آمن";
    desc.textContent = "لم يتم تسجيل أي بلاغات على هذا الرابط حتى الآن.";
    icon.textContent = "✅";
    box.classList.add("safe");
  }
}
function showSafe(){
  document.getElementById("resultSafe").classList.remove("hidden");
}
