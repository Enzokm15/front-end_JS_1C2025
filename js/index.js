import { reloadCounter, getProduct, Cart, ProductCart} from './logica.js';


document.addEventListener("DOMContentLoaded", reloadCounter);
document.addEventListener("DOMContentLoaded", loadOpening);

async function loadOpening(){
  const url='https://dummyjson.com/products';
  const products=(await fetch(url).then(rs =>rs.json()) ).products;

  for(const product of products){
    createHtmlProduct(product);
  };


}

function createHtmlProduct(product){
  let container = document.getElementById("containerProducts");

  let column =document.createElement("div");
  column.classList.add("column","product");

  let img=document.createElement("img");
  img.classList.add("img-product");
  img.src=`${product.images[0]}`;

  let productName= document.createElement("span");
  productName.classList.add("center");
  productName.textContent = `${product.title}`;
  
  let arrow= document.createElement("div");
  arrow.classList.add("arrow", "j-space-a", "align-center");
  
  let productPrice= document.createElement("span");
  productPrice.textContent=`$${product.price}`;

  let button=document.createElement("button");
  button.classList.add("no-background", "border-round");
  button.addEventListener("click", ()=> addToCart(product.id));

  let iconCart = document.createElement("i");
  iconCart.classList.add("bi", "bi-cart-plus-fill","white","icon")  ;

  container.appendChild(column);
  column.append(img,productName,arrow);
  arrow.append(productPrice,button);
  button.append(iconCart);


}



function addToCart(productId){
  const guardado=localStorage.getItem("carrito");
  let carrito= JSON.parse(guardado) || new Cart(); 
  const exist =carrito.products.findIndex(el=>el.id==productId);
  if(exist !== -1){
    carrito.products[exist].cant+=1;
  }
  else{
    const product= new ProductCart(productId);
    carrito.products.push(product);
  }
  
  localStorage.setItem("carrito",JSON.stringify(carrito));
  reloadCounter();
  notificacionAddCart(productId);


};
async function notificacionAddCart(id){
  const nameProduct= await getProduct(id,"title")
  const noti= document.createElement("div");
  noti.textContent=`Se añadio ${nameProduct}`;
  noti.className='mensajeAddCart'
  document.body.appendChild(noti);
  setTimeout(() => {noti.remove();},3000);
}

