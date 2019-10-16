firebase.auth().onAuthStateChanged(function(user) {

  if (user) {

    document.getElementById("page-top").style.display = "block"


  }else{

    document.getElementById("page-top").style.display = "none"
    window.location.replace("login.html");


  }
  
});

//Agregar empleado a la base de datos
function guardarEmpleado(){

  var email = id("email")
  var password = id("password")
  var passwordC = id("passwordC")

  if(password == passwordC){

firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){

    var dpto = id("departamento")
    var localidad = id("localidad") 
    var nombre = id("nombre")
    var apellido = id("apellido")
    var telefono = id("telefono")
    var estado = "activo"
    var fechanacimiento = id("fechaNacimiento")
    var fechaingreso = firebase.firestore.FieldValue.serverTimestamp()
  
  db.collection("empleados").doc(email).set({
    localidad: localidad,
    estado: estado,
    fechaingreso: fechaingreso,
    fechanacimiento: fechanacimiento,
    nombre: nombre,
    departamento: dpto,
    apellido: apellido,
    telefono: telefono
})
.then(function() {
    console.log("Document successfully written!");
    alert("Guardado exitosamente")
    window.location.replace("register.html");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert("Error al guardar")
    console.log(errorMessage)
  });
}else{
  alert("Las contraseñas no coinciden")
}
}


//Recupera la información de la base de datos y la lista en una tabla
function listarTabla(){

    db.collection("empleados").orderBy("estado", "asc").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
          var tabla = document.getElementById("tabla")

          var x = doc.data();
          console.log(x)
          var email = doc.id
          tabla.innerHTML+="<tr><td>"+x.nombre+"</td><td>"+x.apellido+"</td><td>"+email+"</td><td>"+x.departamento+"</td><td>"+x.estado+"</td><td class='visualizarEmpleado' id='"+email+"'>Visualizar</td><td class='eliminarEmpleado' id='"+email+"'>Eliminar</td></tr>"

          });
      agregarFunciones()
}).catch(function(error){
  console.log(error)
});


}

//Agrega las funciones a cada elemento creado dinámicamente
function agregarFunciones(){
  var tds = document.getElementsByClassName("eliminarEmpleado")

  for(var i = 0;i<tds.length;i++){
 // console.log(listaEmail[i])
  tds[i].addEventListener('click', function(event){ 
     // console.log(event.path[0].id)
      eliminarEmpleado(event.path[0].id)
    }, false);
  }

  var tdsV = document.getElementsByClassName("visualizarEmpleado")

  for(var i = 0;i<tdsV.length;i++){
 // console.log(listaEmail[i])
  tdsV[i].addEventListener('click', function(event){ 
     // console.log(event.path[0].id)
      visualizarEmpleado(event.path[0].id)
    }, false);
  }

}

//Recupera la información de la base de datos y la lista en un select
function listarSelect(){

  var select = document.getElementById("select")
    db.collection("empleados").where("estado", "==", "activo").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
          var x = doc.data();
          console.log(x)
          var email = doc.id
          select.innerHTML += "<option value='"+email+"'>"+x.nombre+" "+x.apellido+"</option>"
          
          });
}).catch(function(error){
  console.log(error)
});

}

//Agrega elemento a la tabla
function agregarLista(){

  var emp = id("select")
  empleadosAsignados.push(emp)
  document.getElementById("tabla").innerHTML += "<tr><td>"+emp+"</td></tr>"

}

//Remueve elemento de la tabla
function removerLista(){

  empleadosAsignados.pop()
  document.getElementById("tabla").deleteRow(empleadosAsignados.length+1)

}

//Lleva a otro sitio en el que se mostrará la información
function visualizarEmpleado(email){

  window.location.replace("update.html");
  localStorage.setItem("email",email);

}

//Llena los campos con la información del empleado
function cargarInfoEmpleado(){
  var email = localStorage.getItem("email")
  db.collection("empleados").doc(email).get().then(function(doc) {
      if (doc.exists) {
          
          document.getElementById("nombre").value = doc.data().nombre
          document.getElementById("apellido").value = doc.data().apellido
          document.getElementById("email").value = doc.id
          document.getElementById("telefono").value = doc.data().telefono
          document.getElementById("fechanacimiento").value = doc.data().fechanacimiento
          
          var val = doc.data().departamento;
          var sel = document.getElementById('departamento');
          var opts = sel.options;
            for (var opt, j = 0; opt = opts[j]; j++) {
              if (opt.value == val) {
                sel.selectedIndex = j;
                break;
              }
            }

          var val = doc.data().localidad;
          var sel = document.getElementById('localidad');
          var opts = sel.options;
            for (var opt, j = 0; opt = opts[j]; j++) {
              if (opt.value == val) {
                sel.selectedIndex = j;
                break;
              }
            }
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

function modificar(){

  var email = id("email")
  var dpto = id("departamento")
  var localidad = id("localidad") 
  var nombre = id("nombre")
  var apellido = id("apellido")
  var telefono = id("telefono")
  var fechanacimiento = id("fechanacimiento")

  var emp = db.collection("empleados").doc(email);

return emp.update({
    localidad: localidad,
    fechanacimiento: fechanacimiento,
    nombre: nombre,
    departamento: dpto,
    apellido: apellido,
    telefono: telefono
})
.then(function() {
    console.log("Document successfully updated!");
    alert("Modificado exitosamente")
    window.location.replace("tables.html");

})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

}


function eliminarEmpleado(email){

    var emp = db.collection("empleados").doc(email);

return emp.update({
    estado: "inactivo"
})
.then(function() {
    console.log("Document successfully updated!");
    alert("Empleado marcado como inactivo")
    window.location.replace("tables.html");

})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

}

