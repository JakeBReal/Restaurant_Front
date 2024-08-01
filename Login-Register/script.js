// alert("Hello world!");
document.getElementById("btn-registarse").addEventListener("click", register);
document.getElementById("btn-iniciar_sersion").addEventListener("click", iniciarsesion);
window.addEventListener("resize",anchodepagina);
// DECLARANDO VARIABLE
var contenedor_login_register = document.querySelector(".contenedor__login_register")
var formulario_login = document.querySelector(".formulario_login")
var formulario_registro = document.querySelector(".formulario_registro")
var caja_trasera_login = document.querySelector(".caja_trasera_login")
var caja_trasera_register = document.querySelector(".caja_trasera_register")

function anchodepagina(){
    if(window.innerWidth>850){
        caja_trasera_login.style.display="block";
        caja_trasera_register.style.display="block";
    }else{
        caja_trasera_register.style.display="block";
        caja_trasera_register.style.opacity="1";
        caja_trasera_login.style.display= "none";
        formulario_login.style.display="block";
        formulario_registro.style.display="none";
        contenedor_login_register.style.left="0px";
    }
}

anchodepagina();

function iniciarsesion(){
    if(window.innerWidth > 850){
        formulario_registro.style.display = "none";
    contenedor_login_register.style.left="10px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.opacity= "1";
    caja_trasera_login.style.opacity= "0";
    }else{
    formulario_registro.style.display = "none";
    contenedor_login_register.style.left="0px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.display= "block";
    caja_trasera_login.style.display= "none";
    }
}

function register(){
    if(window.innerWidth>850){
        formulario_registro.style.display = "block";
        contenedor_login_register.style.left="410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity= "0";
        caja_trasera_login.style.opacity= "1"; 
    }else{
    formulario_registro.style.display = "block";
    contenedor_login_register.style.left="0px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.display= "none";
    caja_trasera_login.style.display= "block";
    caja_trasera_login.style.opacity= "1";
    }
}

