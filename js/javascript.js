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
                return carrito;
            }
        }else{
            console.log("No ingreso unidades correctas.");
        }
    }
}

function finalizaCompra (){
    let total = 0;
    for (const item of carrito) {
        total =  total + parseInt(item.subTotal);
        console.log("Su compra realizada fue de " + item.articulo + " por " + item.cantidad + "Kilos.");
    }
    if(total == 0){
        alert("No ha realizado ninguna compra.")
    }else{
        alert("El total a pagar es de: $" + total);
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