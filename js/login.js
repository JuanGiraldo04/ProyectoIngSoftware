logout()

firebase.auth().onAuthStateChanged(function(user) {

  var email = id("loginEmail")

  if (user) {

     tipoUsuario()

  }else{

  }
  
});


function tipoUsuario(){

  var email = id("loginEmail")

  var docRef = db.collection("empleados").doc(email);

      docRef.get().then(function(doc) {
    
      if (doc.exists) {
        console.log("-", doc.data());
        localStorage.setItem("emailActual",email);

      } else {
        window.location.replace("index.html");

      }

  });
}

//LOGIN
function log(){

	var email = id("loginEmail")
	var password = id("loginPassword")

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  alert("Login incorrecto")

  console.log(errorCode)
  console.log(errorMessage)
  // ...
});
  }

//LOGOUT
function logout(){
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}

