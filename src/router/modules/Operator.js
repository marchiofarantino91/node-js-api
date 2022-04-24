
const router = require('express').Router();
const {operator} = require('../../models')


// operator
router.get('/',operator.getDataList);
router.get('/search',operator.getDataByName);
router.get('/search/:id',operator.getDataById);
router.post('/add',operator.addData);
router.post('/edit/:id',operator.editData);
router.post('/remove',operator.removeData);
// operator

module.exports = router;