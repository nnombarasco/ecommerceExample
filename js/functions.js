
let imgCarrito = document.querySelector("#carrito_ img");
const userAdmin = "Admin";
const passAdmin = "admin123";
const detalles_ = document.getElementById("detalles");
let carrito = [];
let id = 0;
let indice = 0;
let totalFinal = 0;



const ValidarNumero = (num) =>{
    if((!isNaN(num) && num != "" && num != null)){
        return true;
    }else{
        return false;
    }
}

let total = (cant, prec) => cant * prec;

class Producto{
    constructor (name, price, amount, available){
        this.nombre = name;
        this.precio = price;
        this.cantidad = amount;
        this.disponible = available;
    }

    comprar = function (unidades){
        if(ValidarNumero(unidades)){
            if(this.cantidad <= 0 || this.cantidad < unidades){
                this.available = false;
                swal("Error", "No hay suficiente stock", "error");
            }else{
                Toastify({
                    text: "Agregado exitosamente",
                    duration: 3000
                }).showToast();
                let compra = {
                    id: id,
                    articulo: this.nombre,
                    precio: this.precio,
                    cantidad: unidades,
                    subTotal: total(unidades, this.precio)
                };
                this.cantidad -= unidades;
                if(carrito.some((item) => item.articulo === compra.articulo)){
                    agregarArticulo(compra)
                }else{
                    carrito.push(compra);
                    id += 1;
                }
                guardarDatos("carrito", JSON.stringify(carrito));
                imgCarrito.src = '../media/shopping-cart.png';
                return carrito;
            }
        }else{
            swal("Error", "No ingreso unidades correctas.", "error");
        }
    }
}

const guardarDatos = (clave, valor) => localStorage.setItem(clave, valor);


function validateLogin(){
    
    let usuario = document.getElementById('Usuario').value;
    let password = document.getElementById('Password').value;

    let error = () => swal("Error", "Usuario o contraseña incorrectos.", "error");

    const vPassword = (bool) => password === passAdmin && bool ? swal("Good job!", "Bienvenido", "success", "timer: 1000") : error();

    if(usuario.length >= 5 && usuario.length <= 16){
        if(usuario === userAdmin){
            return vPassword(true);
        }else{
            error();
        }
    }else{
        error();
    }
}

let showPassword = () =>{
    let tipo = document.getElementById('Password');
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}

let verCarrito = () => {
    detalles_.style.display = "block";
    tabla()};


const agregarArticulo = (compra)=> {
    for (let i =0;i < carrito.length; i++){
        if(carrito[i].articulo == compra.articulo){
            carrito[i].cantidad += compra.cantidad;
            carrito[i].subTotal += compra.subTotal;
        }
    }
    valorTotal();
}

function tabla(){
    let totalAMostrar = document.createElement("p");
    totalAMostrar.innerText = `El total final a pagar es de $: ${totalFinal}`;
    let div2 = document.createElement("div");
    let div = document.createElement("div");
    let btnSalir=  document.createElement("button");
    let btnBorrarCarrito = document.createElement("button");
    btnSalir.id = "salirDetalles";
    btnSalir.innerText = "Salir";
    btnBorrarCarrito.id = "borrarCarrito";
    btnBorrarCarrito.innerText = "Borrar carrito";
    div.appendChild(btnSalir);
    div2.appendChild(totalAMostrar);
    detalles_.innerHTML = "";
    carrito.forEach((element)=>{
        detalles_.innerHTML += `<div>
            <p>${element.id}) ${element.articulo} P/k$: ${element.precio} 
            cant: ${element.cantidad} $: ${element.subTotal}</p>
            </div>`;
    });
    detalles_.appendChild(div2);
    detalles_.appendChild(div);
    //detalles_.appendChild(btnBorrarCarrito);
    let btnSalir_ =  document.querySelector("#salirDetalles");
    if(btnSalir_){
        btnSalir_.addEventListener("click", cerrarDetalle);
    }
}

let valorTotal = () => { totalFinal = carrito.reduce((acumulador, valorActual)=> {
        return acumulador + valorActual.subTotal
    },0);
}

let cerrarDetalle = () => detalles_.style.display = "none";

let ticket = document.querySelector("#carrito_");
(ticket) &&  ticket.addEventListener("click", verCarrito);

let verCarrito_ = document.querySelector("#verCarrito");
(verCarrito_) && verCarrito_.addEventListener("click", verCarrito);

let login = document.querySelector("#validateLogin_");
(login) && login.addEventListener("click", validateLogin);
    
let mostrar = document.querySelector("#mostrarPassword");
(mostrar) && mostrar.addEventListener("click", showPassword);

let cNuez = document.querySelector("#cNueces")      //aca se valida si existe componente, si exite comprobamos que no sea nulo, y mandamos lso argumentos en la funcion comprar.
if(cNuez){
    cNuez.addEventListener("click", ()=>{
        if(document.querySelector("#uNuez").value != null){
            articulo_1.comprar(parseInt(document.querySelector("#uNuez").value));
        };
    });
}

let cAvellana = document.querySelector("#cAvellanas");
if(cAvellana){
    cAvellana.addEventListener("click", function(){
        if(document.querySelector("#uAvellanas").value != null){
            articulo_2.comprar(parseInt(document.querySelector("#uAvellanas").value));
        };
    });
};

const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
carrito = carritoStorage;
valorTotal();
if(carrito){
//    imgCarrito.src = '../media/shopping-cart.png';
}

const cards = async ()=> {
    const resp =  await  fetch('../datos.json')
    const art = await resp.json()
    console.log(art);
}




