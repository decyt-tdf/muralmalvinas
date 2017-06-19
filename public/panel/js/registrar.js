  function search(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        respuesta = JSON.parse(this.responseText)
            
  var array = []
     for (var i = 0; i < respuesta.length; i++) {
            array.push({id: respuesta[i].cue, nombre: respuesta[i].nombre+" - ("+respuesta[i].ciudad+")"})         
        }

var source  = [ ];
var mapping = { };
for(var i = 0; i < array.length; ++i) {
    source.push(array[i].nombre);
    mapping[array[i].nombre] = array[i].id;
}

  $( function() {
    $('#tags').autocomplete({
        minLength: 1,
        source: source,
        select: function(event, ui) {
          $('#taghidden').val(mapping[ui.item.value]);
        }
    });
});





          
    }
  };

  xhttp.open("GET", "/panel/school", true);
  xhttp.send();
