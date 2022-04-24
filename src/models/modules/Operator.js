const config = require('../../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err) => {
    console.log(err);
})
const table = 'table_operator'
module.exports ={
    //get all Service
    getDataList(req,res){
        pool.getConnection((err,conn) => {
            let query =  `SELECT * FROM ${table}`;
            if (err) throw err;
            conn.query(query , 
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'ok',
                    data    :   result
                });
            });
            conn.release();
        })
    },
    getDataById(req,res){
        let id = req.params.id;
        let query = `SELECT * FROM ${table} WHERE operator_username = '${id}'`;
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(
                query
            , (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK',
                    data    :   result
                });
            });
            conn.release();
        })
    },

    addData(req,res){
        let data = {
             operator_username: req.body.operator_username,
             operator_name: req.body.operator_name,
             operator_phone: req.body.operator_phone,
             operator_address: req.body.operator_address,
             operator_email: req.body.operator_email,
             operator_gender: req.body.operator_gender,
        }
        
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(`INSERT INTO ${table} SET ? `,[data],
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK',
                    data    : data
                });
            });
            conn.release();
        })
    },
    editData(req,res){
        let data = {
             operator_username: req.body.operator_username,
             operator_name: req.body.operator_name,
             operator_phone: req.body.operator_phone,
             operator_address: req.body.operator_address,
             operator_email: req.body.operator_email,
             operator_gender: req.body.operator_gender,
        }
        let id = req.params.id;
        let query =
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query( ` UPDATE ${table} SET ? WHERE operator_username = ?;` ,[data,id],
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK'
                });
            });
            conn.release();
        })
    },
    removeData(req,res){
        let id = req.body.operator_username;
        let query = `DELETE FROM ${table} WHERE operator_username = ${id}`
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(query, 
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK',
                });
            });
            conn.release();
        })
    },    
    getDataByName(req,res){
        let params = `%${req.query.name}%`
        let query = `select * FROM ${table} where lower(operator_name) like lower('${params}')`
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(query, 
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK',
                    data    :   result,
                });
            });
            conn.release();
        })
    },
}