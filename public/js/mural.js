var randoms = [];
var mural ='<b>Mural Digital “Malvinas, identidad y pertenencia”</b><br> '
mural += 'Mural de construcción colectiva.<br><br>'
mural +='El Mural Digital es una propuesta que consistente en la producción '
mural +='plástica _mural, pintura, collage_ destinado a estudiantes de nivel '
mural +='inicial y del primer ciclo de la escuela primaria. Las temáticas para '
mural +='construir el mural se referirán a las Islas Malvinas como parte integral '
mural +='de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur, '
mural +='desde su historia, su geografía y sus recursos naturales. '
mural +='A través de la construcción colectiva del Mural “Malvinas, identidad y '
mural +='pertenencia”'

mural +=', como manifestación cultural, esperamos contribuir a la '
mural +='Causa Malvinas, en tanto es de importancia en la construcción de la '
mural +='identidad nacional como símbolo de la fraternidad sudamericana y de la '
mural +='memoria, la soberanía y la democracia. '
mural +='Las actividades se centran en la creación de un mural por grupo (grado '
mural +='o sala). El mismo puede ser desarrollado sobre una de las paredes – '
mural +='internas o externas de la institución- o pueden estar realizadas sobre '
mural +='otro tipo de soportes, para luego ser expuesto y compartido con la '
mural +='comunidad educativa. Cada uno de los murales elaborados formará '
mural +='parte del Mural, para lo cual el proyecto será luego, presentado en '
mural +='formato digital.'


//document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "visible";
document.getElementById("ventana").getElementsByClassName("screen")[0].style.visibility = "visible";
document.getElementById("ventana").getElementsByClassName("screen")[0].innerHTML ='<div id="mural">'+ mural+'<div><br><div style="text-align:center"><input class="btn" onclick="usuario()" value="Ver mural" type="submit"></div>'


function galeria(img,numero) {
    for (i = 0; i < img.length; i++) { 
        getRandomImage(img,numero);
    }
}

function search(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
//------------------------------------------

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        respuesta = JSON.parse(this.responseText)
          galeria(respuesta,randoms)
     
          
    }
  };

  xhttp.open("GET", "photos", true);
  xhttp.send();

//------------------------------------------
function cerrar_ventana() {
    document.getElementById("ventana").style.visibility = "hidden";
    document.getElementById("ventana").getElementsByClassName("screen")[0].innerHTML = '';
    document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "hidden";
    document.getElementById("ventana").getElementsByClassName("datos")[0].style.visibility = "hidden";
}

document.getElementById("ventana").getElementsByClassName("close")[0].onclick = function () {
        cerrar_ventana()
    }


document.getElementById("ventana").getElementsByClassName("btn")[0].onclick = function () {
        cerrar_ventana()
    }


function showImage(img,name,course) {

  var elem = document.createElement("img");
  elem.src = './img/'+img;
    var vacio = document.getElementsByClassName('screen');
    if (vacio !== null || vacio.innerHTML !== '' ) {
      document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "visible";
      document.getElementById("ventana").style.visibility = "visible";
      document.getElementById("ventana").getElementsByClassName("screen")[0].innerHTML = '';
      document.getElementById("ventana").getElementsByClassName("screen")[0].appendChild(elem);
      document.getElementById("ventana").getElementsByClassName("datos")[0].style.visibility = "visible";
      document.getElementById("ventana").getElementsByClassName("datos")[0].innerHTML = '<b>Nombre:</b> '+name+'&nbsp&nbsp&nbsp&nbsp<b>Curso:</b> '+course;
    }
}

function getRandomImage(imgAr,numero) { 
    path = './imgthumb/'; 
    var num = Math.floor( Math.random() * (imgAr.length));
    
    if(!search(randoms,num)) {
             randoms.push(num)
            var img = imgAr[num].img;
            var name = imgAr[num].name;
            var course = imgAr[num].course;
            var elem = document.createElement("img");
            elem.setAttribute("class","tumb");
            elem.setAttribute("src", path + img);
            elem.setAttribute('onclick','javascript:showImage("'+img+'","'+name+'","'+course+'")')
            document.getElementById("imagenes").appendChild(elem)
    } else {
        getRandomImage(imgAr,numero)
    }


}
  

