const config = require('../../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err) => {
    console.log(err);
})
const table = 'table_employee'

module.exports ={
    //get all member
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
                    data    :   result,
                });
            });
            conn.release();
        })
    },
    getDataById(req,res){
        let id = req.params.id;
        let query = `SELECT * FROM ${table} WHERE employee_id = ${id}`;
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
             employee_name: req.body.employee_name,
             employee_gender: req.body.employee_gender,
             employee_phone: req.body.employee_phone,
             employee_address: req.body.employee_address
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
             employee_name: req.body.employee_name,
             employee_gender: req.body.employee_gender,
             employee_phone: req.body.employee_phone,
             employee_address: req.body.employee_address,
        }
        let id = req.query.id;
        let query = ` `
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(`UPDATE ${table} SET ? WHERE employee_id = ${id};` ,[data],
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK',
                    data    :   data
                });
            });
            conn.release();
        })
    },
    removeData(req,res){
        let id = req.body.employee_id;
        let query = `DELETE FROM ${table} WHERE employee_id = ${id}`
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
        let query = `select * FROM ${table} where lower(employee_name) like lower('${params}')`
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