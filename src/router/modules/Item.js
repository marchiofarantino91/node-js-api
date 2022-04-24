const router = require('express').Router();
const {item} = require('../../models')


router.get('/',item.getDataList);
router.get('/search',item.getDataByName);
router.get('/search-item/',item.getDataById);
router.post('/add',item.addData);
router.post('/edit',item.editData);
router.delete('/remove',item.removeData);

module.exports = router;