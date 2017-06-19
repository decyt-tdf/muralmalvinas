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

function usuario() {
			var userx = document.getElementById("user").value.toLowerCase()
			var passx = document.getElementById("pass").value
			var randompass = Math.random().toString(36).slice(-6);
			var md = md5(randompass)
			sessionStorage.setItem("token", md);
			sessionStorage.setItem("user", userx);
			post("login",{user:userx,pass:passx,token:md})
  	}
