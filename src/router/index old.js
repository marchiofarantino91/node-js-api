const router = require('express').Router();
const { member,
        service,
        operator,
        transaction 
    } = require('../models')
// member
router.get('/api/member/',member.getDataList);
router.get('/api/member/search',member.getDataByName);
router.get('/api/member/search/:id',member.getDataById);
router.post('/api/member/add',member.addData);
router.post('/api/member/edit',member.editData);
router.post('/api/member/remove',member.removeData);
// service
router.get('/api/service/',service.getDataList);
router.get('/api/service/search',service.getDataByName);
router.get('/api/service/search/:id',service.getDataById);
router.post('/api/service/add',service.addData);
router.post('/api/service/edit',service.editData);
router.post('/api/service/remove',service.removeData);
// operator
router.get('/api/operator/',operator.getDataList);
router.get('/api/operator/search',operator.getDataByName);
router.get('/api/operator/search/:id',operator.getDataById);
router.post('/api/operator/add',operator.addData);
router.post('/api/operator/edit/:id',operator.editData);
router.post('/api/operator/remove',operator.removeData);
// operator
router.get('/api/transaction/',transaction.getDataList);
router.get('/api/transaction/search/:id',transaction.getDataById);
router.post('/api/transaction/add',transaction.addData);
// router.post('/api/transaction/edit/:id',transaction.editData);
router.post('/api/transaction/remove',transaction.removeData);

module.exports = router;