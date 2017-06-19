var randoms = [];

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
document.getElementById("ventana").getElementsByClassName("close")[0].onclick = function () {
    document.getElementById("ventana").style.visibility = "hidden";
    document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "hidden";
          document.getElementById("ventana").getElementsByClassName("datos")[0].style.visibility = "hidden";
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
  

