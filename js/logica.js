
function toggleDisplayNone(id) {
    const element=document.getElementById(id);
    element.classList.toggle("visible");
    
}

function getHtmlProduct(product) {
  const html =`
    <div id " "class="product">
      <h2>${product.nombre}</h2>
      <p>${product.descripcion}</p>
      <span>Precio: $${prod.precio}</span>
    </div>`
  ;
  contenedor.insertAdjacentHTML("beforeend", html);
}

function loadShoppingCart (insertionLocation) {
    var productos;
    var location=document.getElementById(insertionLocation)
    fetch('../assets/datos/productos.json', GET)
    .then(res =>{
        productos=res.json();
    });
    
    productos.forEach(producto => {
        let newItem= document.createElement("div");
        div.classList.add ('product');
        newItem.appendChild
        location.appendChild(newItem);
    });





}


window.addEventListener("load", loadShoppingCart("containerProduct"));