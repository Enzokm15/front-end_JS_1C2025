
document.getElementById("button-nav1").addEventListener("click", () => {
  toggleDisplayNone('nav-main2');
});

export function toggleDisplayNone(id) {
  const element=document.getElementById(id);
  element.classList.toggle("visible");
    
}

