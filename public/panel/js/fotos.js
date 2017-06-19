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

  xhttp.open("GET", "photosadmin", true);
  xhttp.send(); 

//------------------------------------------



function post(path, params) {
    method = "post"; 

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
            
         }
    }

    document.body.appendChild(form);
    form.submit();
}



document.getElementById("ventana").getElementsByClassName("close")[0].onclick = function () {
  	document.getElementById("ventana").style.visibility = "hidden";
  	document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "hidden";
    document.getElementById("ventana").getElementsByClassName("addimg")[0].style.visibility = "hidden";
}

function showImage(img,datos) {

	var elem = document.createElement("img");
  console.log(img)
	elem.src = '../img/'+img;
	//elem.setAttribute("height", "100%");
    //elem.setAttribute("width", "100%");
    var vacio = document.getElementsByClassName('screen');
    if (vacio !== null || vacio.innerHTML !== '' ) {
    	document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "visible";
    	document.getElementById("ventana").style.visibility = "visible";
      document.getElementById("ventana").getElementsByClassName("addimg")[0].style.visibility = "visible";
    	document.getElementById("ventana").getElementsByClassName("screen")[0].innerHTML = '';
    	document.getElementById("ventana").getElementsByClassName("screen")[0].appendChild(elem);
      document.getElementById("ventana").getElementsByClassName("delimg")[0].setAttribute('onclick','javascript:post("delimg?token='+tokenx+'",{id:"'+datos+'",img:"'+img+'"})');
      document.getElementById("ventana").getElementsByClassName("addimg")[0].setAttribute('onclick','javascript:post("addimg?token='+tokenx+'",{id:"'+datos+'"})');
    }
}

function getRandomImage(imgAr,numero) { 
    path = '../imgthumb/'; 
    var num = Math.floor( Math.random() * (imgAr.length));
    if(!search(randoms,num)) {
             randoms.push(num)
            var img = imgAr[ num ].img;
            var elem = document.createElement("img");
            elem.setAttribute("class","tumb");
            elem.setAttribute("src", path + img);
            elem.setAttribute('onclick','javascript:showImage("'+img+'","'+imgAr[num]._id+'")');
            document.getElementById("imagenes").appendChild(elem)
    } else {
        getRandomImage(imgAr,numero)
    }


}
  

