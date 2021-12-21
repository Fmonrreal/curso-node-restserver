
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT, 
    esAdminRole, 
    tieneRole
} = require('../middlewares')

const {esRolValido, emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');

const {usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch} = require('../controllers/usuarios');



const router = Router();

router.get('/',usuariosGet );

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut);
    
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
    // check('correo','El correo no es valido').isEmail(),  
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
],
usuariosPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','NOSE_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);




module.exports = router;