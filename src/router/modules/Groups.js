const router = require('express').Router();
const {groups} = require('../../models')


router.get('/',groups.getDataList);
// router.get('/search',groups.getDataByName);
router.get('/search/:id',groups.getDataById);
router.post('/add',groups.addData);
router.post('/edit',groups.editData);
router.delete('/remove',groups.removeData);

module.exports = router;