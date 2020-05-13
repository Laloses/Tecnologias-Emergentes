var sintomasElegidos = [];
//base de hechos (BH). Lo que ha seleccionado
busqueda.next().click(function(){
    if( listaSintomas.includes(busqueda.val()) ) {
        agregarSintoma(busqueda.val());
    }
})
function agregarSintoma(sintoma){
    if(sintomasElegidos.length == 0){
        sintomasElegidos.push(sintoma);
        busqueda.val("");
        ponerSintomaDiv(sintoma);
    }
    else{
        var flag=false;
        for(var i=0; i<sintomasElegidos.length; i++){
            if(sintomasElegidos[i] == sintoma)
            flag = true;
            break;
        }
        if(!flag){
            sintomasElegidos.push(sintoma);
            busqueda.val("");
            ponerSintomaDiv(sintoma);
        }
    }
}
//base de conocimientos (BC). Reglas
//máquina o motor de inferencias (MI).

//animaciones
var intro = $(".cont-white:first");
var explicacion = intro.next();
var divSintomas = explicacion.next();
var divResultados = divSintomas.next();
var busqueda = $("#searchSintomas");
var listaSintomas= [
    "Diarrea",
    "Tos",
    "Cansancio",
    "Fiebre",
    "Dolor de cabeza",
    "Náuseas",
    "Ictericia",
    "Apatia",
    "Escalofrios",
    "Jaqueca",
    "Secrecion",
];
intro.find("button").click(function(){
    intro.toggle("slide",{direction: "left"});
    explicacion.toggle("slide",{direction: "right"});
})
explicacion.find("button").click(function(){
    explicacion.toggle("slide",{direction: "up"});
    divSintomas.toggle("slide",{direction: "right"});
})
divSintomas.find("button").click(function(){
    if(sintomasElegidos.length>0){
        divSintomas.toggle("slide",{direction: "down"});
        divResultados.toggle("fade",3000);
    }
    else{
        busqueda.parent().effect("shake");
    }
})
busqueda.autocomplete({
    delay: 0,
    minLength: 0,
    source: listaSintomas
})
busqueda.on('keypress',function(tecla){
    if(tecla.which == 13 && listaSintomas.includes(busqueda.val()) ) {
        agregarSintoma(busqueda.val());
    }
})
function ponerSintomaDiv(sin){
    busqueda.parent().next().append('<div class="sintoma">'+sin+'</div>')
}