
function toggleDisplayNone(id) {
    const element=document.getElementById(id);
    element.classList.toggle("visible");
    
}

function getHtmlProduct(product) {
  const html =
  `
    <div id="${product.id}" class="column product">
      <div class="img-product">
        <img src="${product.imagenes[0]}" alt=""> 
      </div>
          
      <span class="center">"${product.nombre}" </span>   
      <div class="arrow j-space-a align-center ">

        <span>"${product.precio}"</span>

          <button class="no-background border-round " onclick="addCart('id')">
          <i class="bi bi-cart-plus-fill"></i>
                  
          </button>
      </div>
    </div>
  `
  ;
  return html;
}

function loadShoppingCart (insertionLocation) {
    var contenedor=document.getElementById(insertionLocation)
    fetch('../assets/datos/productos.json')
    .then(productos =>productos.json())
    .then(productos => {
      productos.forEach(producto => contenedor.insertAdjacentHTML("beforeend",getHtmlProduct(producto) ))
    });
    

}


window.addEventListener("load", () => loadShoppingCart("containerProducts"));