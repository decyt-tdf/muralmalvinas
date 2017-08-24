var randoms = [];

var mural ='<b>¡Bienvenidos al Mural Digital “Malvinas, identidad y pertenencia”!</b><br><br>'
mural += 'En este espacio, estudiantes del nivel inicial y del primer ciclo de la escuela '
mural += 'primaria de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur, '
mural += 'completarán durante el 2017, el  mural digital colectivo con sus obras plásticas '
mural += 'referidas a nuestras Islas Malvinas. <br><br>'
mural += 'Con esta manifestación cultural, esperamos contribuir a la Causa Malvinas, en tanto '
mural += 'es de importancia en la construcción de nuestra identidad nacional como símbolo de la '
mural += 'fraternidad sudamericana, de la MEMORIA, la SOBERANÍA y la DEMOCRACIA.<br><br> '
mural += '<div style="font-size:15px">Para participar, los estudiantes deben pertenecer al nivel inicial, o al primer ciclo '
mural += 'de la escuela primaria de una institución escolar de la Provincia de Tierra del Fuego, '
mural += 'Antártida e Islas del Atlántico Sur. Toda la información necesaria estará disponible '
mural += 'en las escuelas y jardines habilitados desde la fecha de lanzamiento.</div><br>'
mural += '<div style="font-size:14px">Subsecretaría de Planeamiento Educativo, Informática y Evaluación - Dirección Provincial de Educación, Ciencia y tecnología - email: decyt.tdf@gmail.com</div>'

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


function showImage(img,name,course,school) {

  var elem = document.createElement("img");
  elem.src = './img/'+img;
    var vacio = document.getElementsByClassName('screen');
    if (vacio !== null || vacio.innerHTML !== '' ) {
      document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "visible";
      document.getElementById("ventana").style.visibility = "visible";
      document.getElementById("ventana").getElementsByClassName("screen")[0].innerHTML = '';
      document.getElementById("ventana").getElementsByClassName("screen")[0].appendChild(elem);
      document.getElementById("ventana").getElementsByClassName("datos")[0].style.visibility = "visible";
      document.getElementById("ventana").getElementsByClassName("datos")[0].innerHTML = '<b>Nombre:</b> '+name+'&nbsp&nbsp&nbsp&nbsp<b>Curso:</b> '+course+'&nbsp&nbsp&nbsp&nbsp<b>Colegio:</b> '+school;
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
            var school = imgAr[num].school;
            var elem = document.createElement("img");
            elem.setAttribute("class","tumb");
            elem.setAttribute("src", path + img);
            elem.setAttribute('onclick','javascript:showImage("'+img+'","'+name+'","'+course+'","'+school+'")')
            document.getElementById("imagenes").appendChild(elem)
    } else {
        getRandomImage(imgAr,numero)
    }


}
  

