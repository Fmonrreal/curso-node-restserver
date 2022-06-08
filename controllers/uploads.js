

const {response} = require('express');
// const { path } = require('express/lib/application');
const { subirArchivo } = require('../helpers/subir-archivo');


const cargarArchivo = async(req,res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).send('No hay acrchivos que subir');
    }
    
  //  const pathCompleto = await subirArchivo(req.files);

  //  res.json({
  //    path: pathCompleto
  //  })

  try {
    
  } catch (error) {
    //txt, md
    const nombre = await subirArchivo(req.files,['txt','md']);
    res.json({nombre});
  }

  

}




module.exports = {
    cargarArchivo
}