  var tokenx = sessionStorage.getItem('token')

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

function users() {
    var elem = document.createElement("img");
    elem.setAttribute("class","tumb");
    elem.setAttribute("src", path + img);
    elem.setAttribute('onclick','javascript:showImage("'+img+'","'+imgAr[num]._id+'" )');
    document.getElementById("imagenes").appendChild(elem)
}

//------------------------------------------

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        respuesta = JSON.parse(this.responseText)
          console.log(respuesta)
          for (var i = 0; i < respuesta.length; i++) {
            var creardiv = document.createElement("div")
            creardiv.setAttribute('onclick','javascript:showImage("'+respuesta[i].name+'","'+respuesta[i].lastname+'","'+respuesta[i].mail+'","'+respuesta[i].pass+'","'+respuesta[i].school+'","'+respuesta[i]._id+'")');
            creardiv.innerHTML = '<a href="#">'+respuesta[i].user+' </a>'         
            document.getElementById("usuarios").appendChild(creardiv)
          }    
    }
  };

  xhttp.open("GET", "usersadmin?token="+tokenx, true);
  xhttp.send(); 

//------------------------------------------


function showImage(name,lastname,mail,pass,school,id) {

  var elem = document.createElement("p");
  elem.setAttribute("class","datosuser");
  elem.innerHTML = "<b>Nombre:</b> "+name+"<br><b>Apellido:</b> "+lastname+"<br><b>Mail</b>: "+mail+"<br><b>Contraseña:</b> "+pass+"<br><b>Colegio:</b> "+school    
  elem.setAttribute("width", "100%");

    var vacio = document.getElementsByClassName('screen');
    if (vacio !== null || vacio.innerHTML !== '' ) {
      document.getElementById("ventana").getElementsByClassName("close")[0].style.visibility = "visible";
      document.getElementById("ventana").style.visibility = "visible";
      document.getElementById("ventana").getElementsByClassName("addimg")[0].style.visibility = "visible";
      document.getElementById("ventana").getElementsByClassName("screen")[0].innerHTML = '';
      document.getElementById("ventana").getElementsByClassName("screen")[0].appendChild(elem);
      document.getElementById("ventana").getElementsByClassName("delimg")[0].setAttribute('onclick','javascript:post("deluser?token='+tokenx+'",{id:"'+id+'"})');
      document.getElementById("ventana").getElementsByClassName("addimg")[0].setAttribute('onclick','javascript:post("adduser?token='+tokenx+'",{id:"'+id+'",pass:"'+pass+'"})');
}
}