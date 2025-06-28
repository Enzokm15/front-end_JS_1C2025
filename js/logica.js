class Cart {
  constructor(products=[]){
    this.products=products;
  };
  cant (){
    return this.products.length
  };
  price() {
    if(this.cant==0){
      return 0
    }
    else{
      let price;
      this.products.forEach(p => {
        price += p.price;}
      );
      return price;
    }
  }


  
}

class ProductCart {
  constructor(id,name,price,img,cant=1) {
    this.id=id;
    this.name=name;
    this.price=price;
    this.img=img;
    this.cant=cant;
  }


}






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
          
      <span class="center">"${product.name}" </span>   
      <div class="arrow j-space-a align-center ">

        <span>"${product.price}"</span>

          <button class="no-background border-round " onclick="addToCart('${product.id}')">
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



async function addToCart(id){
  const guardado=localStorage.getItem("carrito");
  let carrito=JSON.parse(guardado) || new Cart();
  const product= await getProduct(id);
  if(guardado) {
    const exist =carrito.products.findIndex(el=>el.id==product.id);
    if(exist !== -1){
      carrito.products[exist].cant+=1;
    }
    else{
      carrito.products.push(product)
    }
    
  }
  else{
    carrito.products.push(product)
  }
  localStorage.setItem("carrito",JSON.stringify(carrito));
  notificacionAddCart(id);


};

async function getProduct(id) {
  const products= await fetch("../assets/datos/productos.json").then(rs=>rs.json());
  const product= products.find(p => p.id==id);
  return product;

  
}
async function getNameProduct(idProduct){
  const products = await fetch('../assets/datos/productos.json').then(rs => rs.json());
  const product= products.find(t => t.id==idProduct);
  return ( `"${product?.nombre}"` || "Error al Buscar producto");
}

async function notificacionAddCart(id){
  const nameProduct= await getNameProduct(id);
  const noti= document.createElement("div");
  noti.textContent=`Se añadio ${nameProduct}`;
  noti.className='mensajeAddCart'
  document.body.appendChild(noti);
  setTimeout(() => {noti.remove();},3000);


}

window.addEventListener("load", () => loadShoppingCart("containerProducts"));