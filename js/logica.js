

export class Cart {
  constructor(products=[]){
    this.products=products;
  };
  cant (){
    let cant=0;
    this.products.forEach(el=>cant+=el.cant)
    return cant;
  };
  price() {
    let price=0;
    this.products.forEach(p => {
      price += p.price * p.cant;}
    );
    return price;
    
  }

}

export class ProductCart {
  constructor(id,name,price,img,cant=1) {
    this.id=id;
    this.name=name;
    this.price=price;
    this.img=img;
    this.cant=cant;
  }

}
/* repeticion de logica:

  const guardado=localStorage.getItem("carrito");
  let carrito= JSON.parse(guardado) || new Cart();

  crear una funcion?
*/

export function reloadCounter() {
  const guardado=localStorage.getItem("carrito");
  let carrito= JSON.parse(guardado) || new Cart();
  carrito= new Cart (carrito.products);
  document.getElementById("counter").textContent= carrito.cant();

}


export async function getProduct(id,parametro) {
    const product= await ( fetch(`https://dummyjson.com/products/${id}`).then(res => res.json()));  
    return (product[parametro] !== undefined) ? product[parametro] : product;
    //devuelve null si no existe ese parametro, mejorar para ese caso
}  

//buscar mejor solucion para acceder a los contenedores de datos del producto

export async function plusProductCart(id,event){
  const guardado=localStorage.getItem("carrito");
  let carrito= JSON.parse(guardado) || new Cart();
  const product=carrito.products.find(p => p.id==id)
  product.cant+=1
  localStorage.setItem("carrito",JSON.stringify(carrito));
  const button= event.target
  reloadCounter();
  const counter= button.parentElement.querySelector("span");
  counter.textContent=product.cant;
  const price=button.parentElement.parentElement.querySelector(".product-price");
  price.textContent=(product.cant) * (await getProduct(id,"price"));
}

export async function minusProductCart(id,event){
  const guardado=localStorage.getItem("carrito");
  let carrito= JSON.parse(guardado) || new Cart();
  const product=carrito.products.find(p => p.id==id)
  const button= event.target
  product.cant-=1
  if(product.cant > 0){
    localStorage.setItem("carrito",JSON.stringify(carrito));
    reloadCounter();
    const counter=button.parentElement.querySelector("span");
    counter.textContent=product.cant;
    const price=button.parentElement.parentElement.querySelector(".product-price");
    price.textContent=(product.cant) * (await getProduct(id,"price"));
  }
  else{
    button.closest(".container-product").remove();
    deleteProductCart(id);
    reloadCounter()

  }
}

function deleteProductCart(id){
  const guardado=localStorage.getItem("carrito");
  let carrito= JSON.parse(guardado) || new Cart();
  carrito.products= carrito.products.filter(p => p.id !== id);
  localStorage.setItem("carrito",JSON.stringify(carrito));
}
