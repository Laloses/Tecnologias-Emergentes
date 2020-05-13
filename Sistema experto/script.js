var sintomasElegidos = [];
var listaEnfermedades = [
    "Gripe",
    "Rubeola",
    "Malaria",
    "Hepatitis",
    "Tuberculosis",
    "Anemia"
];
var listaEspecialistas = [];
var listaMedicinas = [];
//base de hechos (BH). Lo que ha seleccionado
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
//minimo debe tener la mitad de coincidencias en los sintomas para recetar una medicina
function gripe(valores){
    var cont=0;
    for(var i=0; i<valores.length; i++)
        switch(valores[i]){
            case "Tos":
                cont++;
                break;
            case "Cansancio":
                cont++;
                break;
            case "Fiebre":
                cont++;
                break;
            case "Dolor de cabeza":
                cont++;
                break;
        }
    if(cont >= 2) return true;
    else return false;
}
function rubeola(valores){
    var cont=0;
    for(var i=0; i<valores.length; i++)
        switch(valores[i]){
            case "Fiebre":
                cont++;
                break;
            case "Escalofrios":
                cont++;
                break;
            case "Jaqueca":
                cont++;
                break;
            case "Secrecion":
                cont++;
                break;
        }
    if(cont >= 2) return true;
    else return false;
}
function malaria(valores){
    var cont=0;
    for(var i=0; i<valores.length; i++)
        switch(valores[i]){
            case "Diarrea":
                cont++;
                break;
            case "Fiebre":
                cont++;
                break;
            case "Ictericia":
                cont++;
                break;
            case "Escalofrios":
                cont++;
                break;
        }
    if(cont >= 2) return true;
    else return false;
}
function hepatitis(valores){
    var cont=0;
    for(var i=0; i<valores.length; i++)
        switch(valores[i]){
            case "Diarrea":
                cont++;
                break;
            case "Nauseas":
                cont++;
                break;
            case "Ictericia":
                cont++;
                break;
        }
    if(cont >= 2) return true;
    else return false;
}
function tuberculosis(valores){
    var cont=0;
    for(var i=0; i<valores.length; i++)
        switch(valores[i]){
            case "Tos":
                cont++;
                break;
            case "Cansancio":
                cont++;
                break;
            case "Fiebre":
                cont++;
                break;
            case "Escalofrios":
                cont++;
                break;
        }
    if(cont >= 2) return true;
    else return false;
}
function anemia(valores){
    var cont=0;
    for(var i=0; i<valores.length; i++)
        switch(valores[i]){
            case "Cansancio":
                cont++;
                break;
            case "Nauseas":
                cont++;
                break;
            case "Apatia":
                cont++;
                break;
        }
    if(cont >= 2) return true;
    else return false;
}
//máquina o motor de inferencias (MI).
function revisarSintomas(){
    var resultadosSintomas = [];
    resultadosSintomas.push( [listaEnfermedades[0],gripe(sintomasElegidos)] );
    resultadosSintomas.push( [listaEnfermedades[1],rubeola(sintomasElegidos)] );
    resultadosSintomas.push( [listaEnfermedades[2],malaria(sintomasElegidos)] );
    resultadosSintomas.push( [listaEnfermedades[3],hepatitis(sintomasElegidos)] );
    resultadosSintomas.push( [listaEnfermedades[4],tuberculosis(sintomasElegidos)] );
    resultadosSintomas.push( [listaEnfermedades[5],anemia(sintomasElegidos)] );

    var flag=false;
    for(var i=0; i<resultadosSintomas.length; i++){
        var valor= resultadosSintomas[i];
        if(valor[1]){ //si es un resultado válido
            flag=true;
            switch(listaEnfermedades[i]){
                case "Gripe":
                    divResultadosSintomas.append("<div class='med'><span class=\"text-bold bb-2\">"+listaEnfermedades[i]+"</span></div>");
                    cargarMed(listaEnfermedades[i]);
                    break;
                case "Rubeola":
                    divResultadosSintomas.append("<div class='med'><span class=\"text-bold bb-2\">"+listaEnfermedades[i]+"</span></div>");
                    cargarMed(listaEnfermedades[i]);
                    break;
                case "Malaria":
                    divResultadosSintomas.append("<div class='med'><span class=\"text-bold bb-2\">"+listaEnfermedades[i]+"</span></div>");
                    cargarMed(listaEnfermedades[i]);
                    break;
                case "Hepatitis":
                    divResultadosSintomas.append("<div class='med'><span class=\"text-bold bb-2\">"+listaEnfermedades[i]+"</span></div>");
                    cargarMed(listaEnfermedades[i]);
                    break;
                case "Tuberculosis":
                    divResultadosSintomas.append("<div class='med'><span class=\"text-bold bb-2\">"+listaEnfermedades[i]+"</span></div>");
                    cargarMed(listaEnfermedades[i]);
                    break;
                case "Anemia":
                    divResultadosSintomas.append("<div class='med'><span class=\"text-bold bb-2\">"+listaEnfermedades[i]+"</span></div>");
                    cargarMed(listaEnfermedades[i]);
                    break;
            }
        }
    }
    if(!flag)
        divResultadosSintomas.append("<div class='med'><span class=\"text-bold\">No se pudo obtener un resultado. Intenta ser mas preciso.</span></div>");
    else
        cargarDoc();
}
function cargarMed(enf){
    switch(enf){
        case "Gripe":
            if(!listaMedicinas.includes("Jarabe")) listaMedicinas.push("Jarabe");
            if(!listaMedicinas.includes("Contrex")) listaMedicinas.push("Contrex");
            if(!listaMedicinas.includes("Vacuna")) listaMedicinas.push("Vacuna");
            $("#medicamentos").append("<span class=\"titulo-med\">"+enf+"</span>");
            $("#medicamentos").append("<span class='med'>Jarabe</span>");
            $("#medicamentos").append("<span class='med'>Contrex</span>");
            $("#medicamentos").append("<span class='med'>Vacuna</span>");
            break;
        case "Rubeola":
            if(!listaMedicinas.includes("Vacuna")) listaMedicinas.push("Vacuna");
            if(!listaMedicinas.includes("Paracetamol")) listaMedicinas.push("Paracetamol");
            $("#medicamentos").append("<span class=\"titulo-med\">"+enf+"</span>");
            $("#medicamentos").append("<span class='med'>Vacuna</span>");
            $("#medicamentos").append("<span class='med'>Paracetamol</span>");
            break;
        case "Malaria":
            if(!listaMedicinas.includes("Vacuna")) listaMedicinas.push("Vacuna");
            $("#medicamentos").append("<span class=\"titulo-med\">"+enf+"</span>");
            $("#medicamentos").append("<span class='med'>Vacuna</span>");
            break;
        case "Hepatitis":
            if(!listaMedicinas.includes("Vacuna")) listaMedicinas.push("Vacuna");
            if(!listaMedicinas.includes("Paracetamol")) listaMedicinas.push("Paracetamol");
            $("#medicamentos").append("<span class=\"titulo-med\">"+enf+"</span>");
            $("#medicamentos").append("<span class='med'>Vacuna</span>");
            $("#medicamentos").append("<span class='med'>Paracetamol</span>");
            break;
        case "Tuberculosis":
            if(!listaMedicinas.includes("Paracetamol")) listaMedicinas.push("Paracetamol");
            $("#medicamentos").append("<span class=\"titulo-med\">"+enf+"</span>");
            $("#medicamentos").append("<span class='med'>Paracetamol</span>");
            break;
        case "Anemia":
            if(!listaMedicinas.includes("Vitamina")) listaMedicinas.push("Vitamina");
            $("#medicamentos").append("<span class=\"titulo-med\">"+enf+"</span>");
            $("#medicamentos").append("<span class='med'>Vitamina</span>");
            break;
    }
}
function cargarDoc(){
    $("#verMed").toggle();
    $("#verDoc").toggle();
    var doc="";
    for(var i=0; i<listaMedicinas.length; i++){
        switch(listaMedicinas[i]){
            case "Jarabe":
                doc="Otorrinolaringologo";
                if(!listaEspecialistas.includes(doc)) listaEspecialistas.push(doc);
                break;
            case "Contrax":
                doc="Otorrinolaringologo";
                if(!listaEspecialistas.includes(doc)) listaEspecialistas.push(doc);
                break;
            case "Vitamina":
                doc="Nutriologo";
                if(!listaEspecialistas.includes(doc)) listaEspecialistas.push(doc);
                break;
            case "Vacuna":
                doc="Endocrinologo";
                if(!listaEspecialistas.includes(doc)) listaEspecialistas.push(doc);
                doc="Medico General";
                if(!listaEspecialistas.includes(doc)) listaEspecialistas.push(doc);
                break;
            case "Paracetamol":
                doc="Medico General";
                if(!listaEspecialistas.includes(doc)) listaEspecialistas.push(doc);
                break;
        }
    }
    var med=""
    for(var i=0; i<listaEspecialistas.length; i++){
        med = listaEspecialistas[i];
        switch(med){
            case "Otorrinolaringologo":
                $("#especialistas").append("<span class=\"titulo-med\">"+med+"</span>");
                $("#especialistas").append("<span class='med'>Jarabe</span>");
                $("#especialistas").append("<span class='med'>Contrex</span>");
                break;
            case "Nutriologo":
                $("#especialistas").append("<span class=\"titulo-med\">"+med+"</span>");
                $("#especialistas").append("<span class='med'>Vitamina</span>");
                break;
            case "Endocrinologo":
                $("#especialistas").append("<span class=\"titulo-med\">"+med+"</span>");
                $("#especialistas").append("<span class='med'>Vacuna</span>");
                break;
            case "Medico General":
                $("#especialistas").append("<span class=\"titulo-med\">"+med+"</span>");
                $("#especialistas").append("<span class='med'>Paracetamol</span>");
                $("#especialistas").append("<span class='med'>Vacuna</span>");
                break;
        }
    }
}

//animaciones
var intro = $(".cont-white:first");
var explicacion = intro.next();
var divSintomas = explicacion.next();
var divResultados = divSintomas.next();
var busqueda = $("#searchSintomas");
var divResultadosSintomas = divResultados.children("div:eq(1)");
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
    if(sintomasElegidos.length>=2){
        divSintomas.toggle("slide",{direction: "down"});
        revisarSintomas();
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
busqueda.next().click(function(){
    if( listaSintomas.includes(busqueda.val()) ) {
        agregarSintoma(busqueda.val());
    }
})
function ponerSintomaDiv(sin){
    busqueda.parent().next().append('<span class="sintoma">'+sin+'</span>')
}
$("#reiniciar").click(function(){
    sintomasElegidos = [];
    $(".ui-widget").next().html("");
    divResultadosSintomas.html("")
    divResultados.toggle("slide",{direction:"right"});
    if($("#verMed").css("display") != "none") $("#verMed").toggle();
    if($("#verDoc").css("display") != "none") $("#verDoc").toggle();
    divSintomas.toggle("slide",{directon:"right"});
    if( $("#medicamentos").css("display") != "none" ) $("#medicamentos").toggle("slide");
    if( $("#especialistas").css("display") != "none" ) $("#especialistas").toggle("slide",{direction:"right"});
})
$("#verMed").click(function(){
    $("#medicamentos").toggle("slide")
})
$("#verDoc").click(function(){
    $("#especialistas").toggle("slide",{direction:"right"})
})