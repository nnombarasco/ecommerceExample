const userAdmin = "Admin";
const passAdmin = "admin123";
const articulo_1 = {
    nombre: "Nueces",
    valor: 200,
    cantidad : 1000,
    disponibilidad : true
}
const articulo_2 = {
    nombre: "Avellanas",
    valor: 150,
    cantidad : 600,
    disponibilidad : true
}
let opcion;

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

function ValidarNumero(){
    if((!isNaN(opcion) && opcion != "" && opcion != null)){
        return true;
    }else{
        return false;
    }
}

function total(cant, prec){
    return cant * prec;
}

function comprar(){
    opcion = prompt("por favor, ingrese 1 si desea comprar Nueces y 2 si desea comprar Avellanas");
    if(ValidarNumero(opcion)){         //aca validamos que ingrese un numero si o si
        if(opcion == 1){                                                        //compramos nueces
            console.log("quiere nueces");
            alert("Hola!, actualmente la cantidad de " + articulo_1.nombre + " que tenemos son: " + articulo_1.cantidad + "Kilos y su valor por kilo es de: " + articulo_1.valor);
            let kilos = prompt("Por favor ingrese la cantida de kilos que desea: ");
            if(ValidarNumero(kilos)){
                console.log("quiere: " + kilos + "kilos");
                if(kilos > articulo_1.cantidad){
                    alert("Error, no puede comprar mas de la cantidad de stock!");
                }else{
                    alert("Bien, su producto fue cargado con exito!");
                    alert("el total de su compra por " + kilos + " Kilos de " + articulo_1.nombre + " es de: $" + total(kilos, articulo_1.valor)) ;
                }
            }
        }if (opcion == 2) {
            console.log("quiere avellanas");
            alert("Hola!, actualmente la cantidad de " + articulo_2.nombre + " que tenemos son: " + articulo_2.cantidad + "Kilos y su valor por kilo es de: " + articulo_2.valor);
            let kilos = prompt("Por favor ingrese la cantida de kilos que desea: ");
            if(ValidarNumero(kilos)){
                console.log("quiere: " + kilos + "kilos");
                if(kilos > articulo_2.cantidad){
                    alert("Error, no puede comprar mas de la cantidad de stock!");
                }else{
                    alert("Bien, su producto fue cargado con exito!");
                    alert("el total de su compra por " + kilos + " Kilos de " + articulo_2.nombre + " es de: $" + total(kilos, articulo_2.valor)) ;
                }
            }
        } if(opcion > 2 || opcion < 1){
            alert("Opcion invalida!");
        }
    }else{
        alert("Por favor, ingresa una opcion valida, chau!");
    }
}