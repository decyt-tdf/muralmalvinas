
var express = require("express"),
http = require('http'),
app = express(),
formidable = require('formidable'),
util = require('util'),
fsx   = require('fs-extra'), 
assert = require('assert'),
bodyParser = require('body-parser');
md5 = require('md5'),
delx = require('delete'),
fs = require('fs'),
gm = require('gm');
 

app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var mongouser= process.env.USER
var mongopass= process.env.PASS

var url = 'mongodb://'+mongouser+':'+mongopass+'@muraldb:27017/admin';
var db;

MongoClient.connect(url, function (err, database) {
if(err) throw err;

db = database;
})


function admin(tokenx,callback) {
  var collection = db.collection('users');
  collection.find({token:tokenx}).toArray(function(err, result) {
            if(result.length > 0) {
              if (result[0].token === tokenx) {
                      if (result[0].superuser) {
               callback(true)
             }
           }
         } else {
              callback(false)
         }
      })
    }



function thumbnail(img) {
var urlgm = '/home/public'
gm(urlgm+'/img/'+img)
.resize(100, 100)
.write(urlgm+'/imgthumb/'+img, function (err) {
});
}

function update(collection,id) {
collection.updateOne({'_id':ObjectId(id)}, {$set: {active :"true"}}, function(err, result) {
  console.log("update");
});
}

function updateuser(collection,id,passmd) {
collection.updateOne({'_id':ObjectId(id)}, {$set: {active :"true",pass: md5(passmd)}}, function(err, result) {
  console.log("update");
});
}

function insert(collection,array) {
collection.insert(array, function(err, result) {
  console.log("insert");
});
}

/* db.users.update({"_id":ObjectId("58f90060c20c0a006b68f627")},{$set: {"superuser": "true"}}) */

/*cargar base de datos colegios json
  MongoClient.connect(url, function (err, database) {
    db = database
    var collection = db.collection('school');
    var array = 

    insert(collection, array)
  })
*/

function del(collection,array) {
collection.deleteOne(array, function(err, result) {
if(err) {
console.log(err)
} else {
console.log("deleted");
 }
});	
}
/*
function find(collection){
collection.find({}).toArray(function(err, result) {
	console.log(result)
})
}
*/

app.use(express.static('public'));


app.post('/panel/login', function(req, res) {
var form = new formidable.IncomingForm();

 var userx
 var passx
 var tokenx

form.parse(req, function(err, fields, files) {
  //res.redirect('/panel/upload.html');
  //console.log(files)
  
  //
});

form.on('field', function(name, value) {

 if (name === 'user') {
  userx = value.toLowerCase()
 }
 if (name === 'pass') {
  passx = value
 }
 if (name === 'token') {
  tokenx = value
 }
})


form.on('end', function(fields, files) {
       var collection = db.collection('users');

           collection.find({user:userx,pass:md5(passx)}).toArray(function(err, result) {
            if ( result.length > 0) {
              collection.updateOne({user:userx}, {$set: {token:tokenx}})
              if (result[0].superuser) {
                url = "/panel/admin.html"
              } else {
                url = "/panel/upload.html"
              }
            } else {
                url = "/panel/proceso.html"
            }
            res.redirect(url)
          })
})

})


app.post('/panel/registrar', function(req, res) {
var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files) {
  res.redirect('/panel/proceso.html');
});

var nombre 
var apellido
var colegio
var curso
var correo
var cuex

form.on('field', function(name, value) {
if (name === 'nombre'){
	nombre = value.toLowerCase()
}
if (name === 'apellido') {
	apellido = value.toLowerCase()
}
if (name === 'colegio'){
	colegio = value
}
if (name === 'correo') {
	correo = value
}
if (name === 'cue') {
  cuex = value
}
});

form.on('end', function(fields, files) {
//	    	MongoClient.connect(url, function (err, database) {
//			db = database
  var randompass = Math.random().toString(36).slice(-6);
	var collection = db.collection('users');
	var array = [{name: nombre, lastname: apellido, user: nombre+"_"+apellido, pass: randompass, school: colegio, cue: cuex, mail: correo, active:"false"}]
  	insert(collection,array)

	})
        })
    


//    return;

//})

app.post('/panel/token', function(req, res) {

var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files) {
  
});

var userx
var tokenx
var file

form.on('field', function(name, value) {
if (name === 'user'){
    userx = value
}
if (name === 'token') {
    tokenx = value
}
if (name === 'file') {
    file = value
}
});

form.on('end', function(fields, files) {
  var url
  var collection = db.collection('users');
  collection.find({user:userx}).toArray(function(err, result) {
            if(result.length > 0) {
               if (result[0].token === tokenx) {
                      if (result[0].superuser) {
                         if(!file) {
                                  file = "admin.html"
                                }
                           url = "/panel/"+file+"?token="+tokenx
                          
                        } else {
                          url = "/panel/upload.html?token="+tokenx
                        }         
                      } else {
                          url = "/panel/index.html"
                      } 
           } else {
             url = "/panel/index.html"
            }  

              res.redirect(url)
      })
  }) 

return;

})


app.post('/upload', function(req, res) {
var username
var nombre
var curso
var filex
var form = new formidable.IncomingForm();
var url


form.parse(req, function(err, fields, files) {
  //res.redirect(url);
});

form.on('progress', function(bytesReceived, bytesExpected) {
    var percent_complete = (bytesReceived / bytesExpected) * 100;
    console.log(percent_complete.toFixed(2));

});

form.on('error', function(err) {
    console.error(err);
});

form.on('field', function(name, value) {
usernamex = value
if (name === 'nombre'){
	nombre = value
}
if (name === 'curso') {
	curso = value
}
if (name === 'user') {
  username = value
}

});


form.on('end', function(fields, files) {
	
    var temp_path = this.openedFiles[0].path;

    var file_name = this.openedFiles[0].name;

    var new_location = './public/img/';
    
    fileType = file_name.split('.').pop().toLowerCase()
    if(fileType === 'jpg'){    
    var file = md5(file_name.toLowerCase())+".jpg"
    fsx.copy(temp_path, new_location + file, function(err) {  
        if (err) {
            console.error(err);
        } else {
       thumbnail(file)
		   var collection = db.collection('photos');
		   var array = [{img: file , user: username.toLowerCase(), name: nombre, course: curso,  active:'false'}]
       console.log(array)
		   insert(collection,array)       
        }
    });
    url = '/panel/proceso.html'
  } else {
    url = "/panel/upload.html"
  }
  res.redirect(url);
});

return;
})



// MURAL FOTOS
app.get('/photos', function(req, res) {
       var collection = db.collection('photos');
collection.find({active:'true'}).toArray(function(err, result) {
        res.send(result);
})
})
//---------------


// BASE DE DATOS COLEGIOS
app.get('/panel/school', function(req, res) {
       var collection = db.collection('school');
collection.find({}).toArray(function(err, result) {
        res.send(result);
})
})
//---------------

/*
app.get('/panel/users', function(req, res) {
       var collection = db.collection('users');
collection.find({active:'true'}).toArray(function(err, result) {
        res.send(result);
})
})
*/

// ADMINISTRADOR --------------------------------------------------
app.get('/panel/photosadmin', function(req, res) {
       var collection = db.collection('photos');
collection.find({active:'false'}).toArray(function(err, result) {
        res.send(result);
})
})

// ELIMINAR FOTO 
app.post('/panel/delimg', function(req, res) {
    admin(req.query.token, function(boolean){
  if (boolean) {

var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files) {
  res.redirect('/panel/fotos.html');
});
 var id 
 var img
form.on('field', function(name, value) { 
  if (name === 'id') {
     id = value
     }
  if (name === 'img') {
    img = value
    }
})


form.on('end', function(fields, files) {
       var collection = db.collection('photos');
      var array = { "_id" : ObjectId(id)}
      console.log(img)
delx.sync(['public/img/'+img]);
delx.sync(['public/imgthumb/'+img]);
      del(collection,array)
    }) 
}
})
})

// HABILITAR USUARIOS
app.get('/panel/usersadmin', function(req, res) {
admin(req.query.token, function(boolean){
  if (boolean) {
        var collection = db.collection('users');
        collection.find({active:"false"}).toArray(function(err, result) {
        res.send(result);
          })
       }
  })
})

//  HABILITAR FOTO 
app.post('/panel/addimg', function(req, res) {
admin(req.query.token, function(boolean){
  if (boolean) {

        var form = new formidable.IncomingForm();
         form.parse(req, function(err, fields, files) {
          res.redirect('/panel/fotos.html');
        });
         var id 
        form.on('field', function(name, value) { 
         id = value
        })

        form.on('end', function(fields, files) {
               var collection = db.collection('photos');
              update(collection,id)
            })

       }
  })
})  

// ELIMINAR USUARIO 
app.post('/panel/deluser', function(req, res) {
  admin(req.query.token, function(boolean){
  if (boolean) {

var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files) {
  res.redirect('/panel/usuarios.html');
});
 var id 
form.on('field', function(name, value) { 
 id = value
})

form.on('end', function(fields, files) {
       var collection = db.collection('users');
      var array = { "_id" : ObjectId(id)}
      del(collection,array)
    }) 
  }
})
})
//---------------

//  HABILITAR USUARIO 
app.post('/panel/adduser', function(req, res) {
    admin(req.query.token, function(boolean){
  if (boolean) {

var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files) {
  res.redirect('/panel/usuarios.html');
});
 var id
 var pass
form.on('field', function(name, value) { 
if (name === 'id'){
  id = value
}
if (name === 'pass') {
  pass = value
}
})

form.on('end', function(fields, files) {
       var collection = db.collection('users');
      updateuser(collection,id,pass)
})
}
})
})  

// END - ADMINISTRADOR ------------------------------------------------

http.createServer(app).listen(8081, function() {
console.log('Server started: Listening on port 8081');
})
