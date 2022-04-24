const router = require('express').Router();
const {member} = require('../../models')


router.get('/',member.getDataList);
router.get('/search',member.getDataByName);
router.get('/search/:id',member.getDataById);
router.post('/add',member.addData);
router.post('/edit',member.editData);
router.post('/remove',member.removeData);

module.exports = router;