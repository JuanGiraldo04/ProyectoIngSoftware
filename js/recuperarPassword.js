function recuperarPassword(){

    var email = id("email")
  
    if(email!=""){
    firebase.auth().sendPasswordResetEmail(email).then(function(){
		alert("Se ha enviado un correo electrónico de recuperación")
		window.location.replace("login.html");

    })
    
  }else{
    alert("Escriba su correo electrónico")
  }
  }