function checkLink(){
  const link = document.getElementById("linkInput").value.toLowerCase();
  const result = document.getElementById("result");
  const icon = document.getElementById("resultIcon");
  const title = document.getElementById("resultTitle");
  const text = document.getElementById("resultText");

  result.className = "result"; // reset
  result.classList.remove("hidden");

  // منطق تجريبي
  if(link.includes("bank") || link.includes("verify") || link.includes("login")){
    result.classList.add("danger");
    icon.innerHTML = "❌";
    title.innerText = "رابط خطر – احتيال مؤكد";
    text.innerText = "هذا الرابط مصنف كخطر عالي وقد يؤدي لسرقة بياناتك.";
  }
  else if(link.includes("canva") || link.includes("free") || link.includes("offer")){
    result.classList.add("warning");
    icon.innerHTML = "⚠️";
    title.innerText = "رابط مزيف محتمل";
    text.innerText = "الرابط يبدو مشبوهاً، ننصح بعدم إدخال أي بيانات.";
  }
  else{
    result.classList.add("safe");
    icon.innerHTML = "✔️";
    title.innerText = "رابط آمن";
    text.innerText = "هذا الرابط لم يتم الإبلاغ عنه ويبدو آمناً للاستخدام.";
  }
}
