class FormatMessagesFirebase {
    constructor() {
        this.code = 0;
        this.message = "Failed transaction";
       
      }

validateMessages(code , message) {
    if(code === "auth/invalid-email"){
        message = "El correo ingresado no tiene el formato correcto.";
    }else if(code === "auth/user-not-found"){
        message = "El correo no se encuentra registrado en base de datos.";
    }else if(code === "auth/email-already-in-use"){
        message = "El correo ingresado ya se encuentra en uso.";
    }else if (code === "auth/wrong-password"){
        message = "La clave no es correcta o el correo no tiene clave asignada.";
    }else if (code === "auth/weak-password"){
        message = "La clave debe contener mas de seis (6) caracteres.";
    }
    return message;
}

}

module.exports = {FormatMessagesFirebase};