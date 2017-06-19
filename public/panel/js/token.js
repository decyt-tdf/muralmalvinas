function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

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
var respuesta = getParameterByName('token');
var userx = sessionStorage.getItem('user')
var tokenx = sessionStorage.getItem('token')
var fileName = location.href.split("/").slice(-1);
if (!userx && fileName[0] === '' || fileName[0] === 'index.html') {
  console.log("login")
} else {
    if (tokenx !== respuesta) {
      post("token",{user:userx,token:tokenx,file:fileName[0]})
    }
}

//------------------------------------------

