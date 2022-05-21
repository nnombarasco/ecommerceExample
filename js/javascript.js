const userAdmin = "Admin";
const passAdmin = "admin123";
let carrito = [];

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
                    articulo: this.nombre,
                    precio: this.precio,
                    cantidad: unidades,
                    subTotal: total(unidades, this.precio)
                };
                this.cantidad -= unidades;
                carrito.push(compra);
                imgCarrito.src = '../media/shopping-cart.png';
                return carrito;
            }
        }else{
            console.log("No ingreso unidades correctas.");
        }
    }
}

function finalizaCompra (){
    let total = 0;

    if(carrito != null){
        for (const item of carrito) {
        total =  total + parseInt(item.subTotal);
        detalle(total);
        }
    }if(total == 0){
        alert("No ha realizado ninguna compra.")
    }
}

function detalle(total){
    let detalles_ = document.getElementById("detalles");

    for(const item of carrito){
        detalles_.innerHTML = `<div><p>El total de su compra es de $ ${total}</p></div>`;
    }
    
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

let imgCarrito = document.querySelector("#carrito_ img");

let ticket = document.querySelector("#carrito_");
if(ticket){
    ticket.addEventListener("click", finalizaCompra)
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
            articulo_1.comprar(document.querySelector("#uNuez").value);
        };
    });
};

let cAvellana = document.querySelector("#cAvellanas");
if(cAvellana){
    cAvellana.addEventListener("click", function(){
        if(document.querySelector("#uAvellanas").value != null){
            articulo_2.comprar(document.querySelector("#uAvellanas").value);
        };
    });
};