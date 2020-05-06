const express = require('express')
const app = express();
const rest_users = require('../services/rest-users');
const msg = require('../lib/message');
const service = "-users";
const result = new msg.MessageBuilder().setOrigen(service).build();



/**
 *  createOptionsNutricional
 */
app.post('/createUsers', function (req, res, next) {
  const { uid, first_name, second_name, first_lastname, second_lastname, email, pass, phone, address, application, state, type_user } = req.body;
  if (first_name) {
    if (first_lastname) {
      if (email) {
        if (pass) {
          if (phone) {
            if (address) {
              if (application) {
                if (state) {
                  if (type_user) {
                    rest_users.createUsers(req.body).then(response => {
                      return res.json(response);
                    }).catch(err => {
                      result.success = false;
                      result.message = "Falla en la ejecución " + err;
                      return res.json(result);
                    })
                  } else {
                    result.success = false;
                    result.message = "El campo tipo de usuario es necesario para continuar";
                    return res.json(result);
                  }
                } else {
                  result.success = false;
                  result.message = "El campo estado es necesario para continuar";
                  return res.json(result);
                }
              } else {
                result.success = false;
                result.message = "El campo aplicación es necesario para continuar";
                return res.json(result);
              }
            } else {
              result.success = false;
              result.message = "El campo dirección es necesario para continuar";
              return res.json(result);
            }
          } else {
            result.success = false;
            result.message = "El campo telefono celular es necesario para continuar";
            return res.json(result);
          }
        } else {
          result.success = false;
          result.message = "El campo contraseña es necesario para continuar";
          return res.json(result);
        }
      } else {
        result.success = false;
        result.message = "El campo correo electrónico es necesario para continuar";
        return res.json(result);
      }
    } else {
      result.success = false;
      result.message = "El campo primer apellido es necesario para continuar";
      return res.json(result);
    }
  } else {
    result.success = false;
    result.message = "El campo primer nombre es necesario para continuar";
    return res.json(result);
  }
});

/**
 * getOptionsNutricional
 */
app.post('/getDataUsers', (req, res, next) => {
  rest_users.getDataUsers(req.body).then(response => {
    return res.json(response);
  }).catch(err => {
    result.success = false;
    result.message = "Falla en la ejecución " + err;
    return res.json(result);
  })
})

app.post('/uploadImages', function (req, res) {
  const { type, name, image } = req.body;

  if(type){
    if(name){
      if(image){
        rest_users.uploadImages(req.body).then(response =>{
          return res.json(response);
        });
      }else{
        result.success = false;
        result.message = "El campo imagen es necesario para continuar.";
        return res.json(result);
      }
    }else{
      result.success = false;
      result.message = "El campo nombre de imagen es necesario para continuar.";
      return res.json(result);
    }
  }else{
    result.success = false;
    result.message = "El campo tipo de imagen es necesario para continuar.";
    return res.json(result);
  }


  //res.send('POST request to the homepage')
})

module.exports = app;