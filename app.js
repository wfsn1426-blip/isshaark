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
