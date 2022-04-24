const router = require('express').Router();
const {employee} = require('../../models')


router.get('/',employee.getDataList);
router.get('/search',employee.getDataByName);
router.get('/search/:id',employee.getDataById);
router.post('/add',employee.addData);
router.post('/edit',employee.editData);
router.delete('/remove',employee.removeData);

module.exports = router;