
let imgCarrito = document.querySelector("#carrito_ img");
const userAdmin = "Admin";
const passAdmin = "admin123";
const detalles_ = document.getElementById("detalles");
let carrito = [];
let id = 0;
let indice = 0;



function ValidarNumero(num){
    if((!isNaN(num) && num != "" && num != null)){
        return true;
    }else{
        return false;
    }
}

function total(cant, prec){
    return cant * prec;
}

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
                console.log("No hay stock suficiente.");
            }else{
                console.log("se vende");
                let compra = {
                    id: id,
                    articulo: this.nombre,
                    precio: this.precio,
                    cantidad: unidades,
                    subTotal: total(unidades, this.precio)
                };
                this.cantidad -= unidades;
                if(verificarArticulo(compra)){
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
            console.log("No ingreso unidades correctas.");
        }
    }
}

function guardarDatos(clave, valor){
    localStorage.setItem(clave, valor);
}

const articulo_1 = new Producto("Nueces", 200, 1000, true);
const articulo_2 = new Producto("Avellanas", 150, 600, true);

function validateLogin(){
    
    let usuario = document.getElementById('Usuario').value;
    let password = document.getElementById('Password').value;

    function error(){
        alert("Usuario o contraseña incorrectos.");
    }

    function vPassword(bool){
        if(password === passAdmin && bool){
            alert("Usuario ingresado exitosamente");
        }else{
            error();
        }
    }

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

function showPassword(){
    let tipo = document.getElementById('Password');
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}

function verCarrito(){
    detalles_.style.display = "block";
    tabla();
}

function verificarArticulo(compra){
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].articulo == compra.articulo){
            console.log("si esta");
            return true;
            
        }else{
            console.log("no esta");
            return false;
        }
    }
}

function agregarArticulo(compra){
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].articulo == compra.articulo){
            carrito[i].cantidad += compra.cantidad;
            carrito[i].subTotal += compra.subTotal;
        }
    }
}

const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
carrito = carritoStorage;
if(carrito){
    imgCarrito.src = '../media/shopping-cart.png';
}


function tabla(){
    let div = document.createElement("div");
    let btnSalir=  document.createElement("button");
    let btnBorrarCarrito = document.createElement("button");
    btnSalir.id = "salirDetalles";
    btnSalir.innerText = "Salir";
    btnBorrarCarrito.id = "borrarCarrito";
    btnBorrarCarrito.innerText = "Borrar carrito";
    div.appendChild(btnSalir)
    detalles_.innerHTML = "";
    carrito.forEach((element)=>{
        detalles_.innerHTML += `<div>
            <p>${element.id}) ${element.articulo} P/k$: ${element.precio} 
            cant: ${element.cantidad} $: ${element.subTotal}</p>
            </div>`;
    });
    detalles_.appendChild(div);
    //detalles_.appendChild(btnBorrarCarrito);
    let btnSalir_ =  document.querySelector("#salirDetalles");
    if(btnSalir_){
        btnSalir_.addEventListener("click", cerrarDetalle);
    }
}

function valorTotal(entarda){
    let total_ = 0;
    entarda.forEach((item) => { 
        total_ += item.subTotal 
    });
    console.log("Valor total de la compra es de: " +  total_);
}

function cerrarDetalle(){
    detalles_.style.display = "none";
}



let ticket = document.querySelector("#carrito_");
if(ticket){
    ticket.addEventListener("click", verCarrito)
}

let verCarrito_ = document.querySelector("#verCarrito");
if(verCarrito_){
    verCarrito_.addEventListener("click", verCarrito)
}

let login = document.querySelector("#validateLogin_");
if(login){
    login.addEventListener("click", validateLogin);
}
    
let mostrar = document.querySelector("#mostrarPassword");
if(mostrar){
    mostrar.addEventListener("click", showPassword);
}

let cNuez = document.querySelector("#cNueces")
if(cNuez){
    cNuez.addEventListener("click", function(){
        if(document.querySelector("#uNuez").value != null){
            articulo_1.comprar(parseInt(document.querySelector("#uNuez").value));
        };
    });
};

let cAvellana = document.querySelector("#cAvellanas");
if(cAvellana){
    cAvellana.addEventListener("click", function(){
        if(document.querySelector("#uAvellanas").value != null){
            articulo_2.comprar(parseInt(document.querySelector("#uAvellanas").value));
        };
    });
};