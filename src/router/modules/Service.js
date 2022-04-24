
const router = require('express').Router();
const {service} = require('../../models')


// service
router.get('/',service.getDataList);
router.get('/search',service.getDataByName);
router.get('/search/:id',service.getDataById);
router.post('/add',service.addData);
router.post('/edit',service.editData);
router.post('/remove',service.removeData);

module.exports = router;