const firebase = require('../config/firebaseconfig');
const config = require("../config/config");
const firestorage = firebase.firestore();
const firephotos = firebase.storage();
const msg = require('../lib/message');
const service = "-users";
const request = require('request');
const result = new msg.MessageBuilder().setOrigen(service).build();

const formatMessages = require('../lib/formatmessages');
const formatmsg = new formatMessages.FormatMessagesFirebase();

let docRef = firestorage.collection('-users');
var atob = require('atob');
const Blob = require('node-blob');

/**
 * 
 * @param {*} params 
 * Funcion que permite crear y registrar la informacion del usuario junto a su Auth
 */
async function createUsers(params) {
  const result = new msg.MessageBuilder().setOrigen(service).build();

  let respost;
  let datasend = {
    "email": params.email,
    "pass": params.pass
  }

  let dataemails = {
    "name": params.first_name,
    "email": params.email
  }

  let uid = await createLoginUser({
    headers: { "content-type": "application/json" },
    method: "POST",
    url: `${config.endpoint_rest_post}`,
    body: datasend,
    json: true
  });

  respost = uid.body;
  console.log("resultado de crear el usuario", respost);
  if (respost.success !== false) {
    params.id_user = uid.body.documents.data.uid;
    if (params.type_user === "nutricionista") {
      params.id_professional = uid.body.documents.data.uid;
    } else {
      params.id_professional = "";
    }

    params.pass = "";
    return docRef.add(params).then((response) => {
      //console.log(response);
      result.success = true;
      result.message = "Ejecución Exitosa";
      result.documents = {
        data: {
          uid: response.id
        },
        description: "Registro de usuario " + params.first_name + " exitoso."
      };


      let paramsemail = {
        headers: { "content-type": "application/json" },
        method: "POST",
        url: `${config.endpoint_rest_send_email}`,
        body: dataemails,
        json: true
      };
      sendEmail(paramsemail);
      return result;
    }).catch((err) => {
      //console.log(err);
      result.message = formatmsg.validateMessages(err.code, err.message);
      result.success = false;
      return result;
    });
  } else {
    result.success = false;
    result.message = "Ejecución fallida al crear registro Auth -- " + respost.message;
  }
  return result;



}

/**
 * 
 * @param {*} params 
 * Funcion que permite pasar el correo y clave para hacer la creacion de Auth
 */
function createLoginUser(params) {
  return new Promise((resolve, reject) => {
    request(params, (error, response, body) => {
      if (error) return reject(error)
      return resolve({ body, response });
    })
  })
}

function sendEmail(params) {
  return new Promise((resolve, reject) => {
    request(params, (error, response, body) => {
      if (error) return reject(error)
      return resolve({ body, response });
    })
  })
}

/**
 * Consulta todas las opciones que se encuentran activas para la aplicacion nutricional
 */
function getDataUsers(params) {
  const result = new msg.MessageBuilder().setOrigen(service).build();
  let search;
  const { email, identification, all } = params;

  if (email !== "") {
    search = docRef.where('email', '==', email).get();
  }
  if (identification !== "") {
    search = docRef.where('identification', '==', identification).get();
  }
  if (all !== "") {
    search = docRef.get();
  }

  try {
    return search.then((response) => {
      let tamanio = response.docs.length;

      if (tamanio > 0) {
        let users = [];
        response.forEach(doc => {
          users.push(
            doc.data()
          )
          result.success = true;
          result.message = "Ejecución Exitosa";
          result.documents = {
            data: {
              users
            },
            description: "Consulta Exitosa."
          };
        });
      } else {
        let users = [];
        result.success = true;
        result.message = "Ejecución Exitosa";
        result.documents = {
          data: {
            users
          },
          description: "Consulta exitosa, no se encuentran registros."
        };
      }
      return result;
    }).catch((err) => {
      console.log(err);
      result.message = formatmsg.validateMessages(err.code, err.message);
      result.success = false;
      return result;
    });
  } catch (error) {
    console.log(error);
    result.message = error.message;
    result.success = false;
    return result;
  }

}

async function uploadImages(params) {
  try {
    var contentType = 'image/png';
    let byteCharacters  = atob(params.image);

    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var blob;
    var reader = new FileReader();
    reader.onloadend = function (evt) {
      var byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: "image/jpeg" });

    }

    
    //var blob = new Blob([byteArray], {type: contentType});


    const image = firephotos.ref(params.type + "/" + params.name);

    image.put(blob).then(response => {
    }).catch(error => {
      result.message = error.message;
      result.success = false;
      return result;
    });
    
    let image_url = await getImageUrl(params);
      if(image_url !== null){
        result.success = true;
        result.message = "Ejecución Exitosa";
        result.documents = {
          data: {
            uid: response.id
          },
          description: "Registro de usuario " + params.first_name + " exitoso."
        };
      }else{
        result.success = false;
        result.message = "Ejecución Exitosa";
        result.documents = {
          data: {},
          description: "Url de imagen no encontrada."
        };
      }
      return result;
  } catch (error) {
    result.message = error.message;
    result.success = false;
    return result;
  }




}

function getImageUrl(params) {
  firephotos.ref().child("/" + params.type + "/" + params.name).getDownloadURL().then(url => {
    return url;
  }).then(error => {
    result.message = error.message;
    result.success = false;
    return result;
  });
}


module.exports = {
  createUsers,
  getDataUsers,
  uploadImages
}