const pages = document.querySelectorAll(".page");
const cards = document.querySelectorAll(".action-card");
const backs = document.querySelectorAll(".back-btn");

function show(id){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

cards.forEach(c=>{
  c.onclick=()=>show(c.dataset.target);
});

backs.forEach(b=>{
  b.onclick=()=>show("home");
});
