//Agregar tarea a un empleado de la base de datos
function guardarTarea(email){

    var titulo = id("titulo")
    var descripcion = id("descripcion")
    var estado = "asignada"
    var fechaAsignacion = firebase.firestore.FieldValue.serverTimestamp()
	
	db.collection("empleados").doc(email).collection("tareas").add({
    estado: estado,
    fechaAsignacion: fechaAsignacion,
    titulo: titulo,
    descripcion: descripcion
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

var empleadosAsignados = []

function guardarMultiplesTareas(){

    for(var i = 0; i<empleadosAsignados.length; i++){
        guardarTarea(empleadosAsignados[i])
    }
        //window.location.replace("registerTask.html");

}

function completarTarea(email, id){

var tarea = db.collection("empleados").doc(email).collection("tareas").doc(id);

return tarea.update({
    estado: "completada"
})
.then(function() {
    console.log("Document successfully updated!");
    alert("Tarea marcada como completada")
    window.location.replace("tables.html");

})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

}

function mostrarTareasEmpleado(){
    var email = localStorage.getItem("emailActual");

  //  var tabla = document.getElementById("tabla")
    db.collection("empleados").doc(email).collection("tareas").orderBy("estado", "desc").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
          var x = doc.data();
          console.log(x)
          
          });
}).catch(function(error){
  console.log(error)
});


}


