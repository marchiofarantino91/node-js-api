
const router = require('express').Router();
const {transaction} = require('../../models')


// transaction
router.get('/',transaction.getDataList);
router.get('/search/:id',transaction.getDataById);
router.post('/add',transaction.addData);
router.post('/update-progress',transaction.updateProgress);
router.post('/remove',transaction.removeData);

module.exports = router;