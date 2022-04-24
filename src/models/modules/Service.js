const config = require('../../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err) => {
    console.log(err);
})
const table = 'table_service'
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
        let query = `SELECT * FROM ${table} WHERE service_id = ${id}`;
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
             service_name: req.body.service_name,
             service_duration: req.body.service_duration,
             service_desc: req.body.service_desc,
             service_price: req.body.service_price,
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
             service_name: req.body.service_name,
             service_duration: req.body.service_duration,
             service_desc: req.body.service_desc,
             service_price: req.body.service_price,
        }
        let id = req.body.service_id;
        let query = ` UPDATE table_service SET ${data} WHERE service_id = ${id};`
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(query, 
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
        let id = req.body.service_id;
        let query = `DELETE FROM ${table} WHERE service_id = ${id}`
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
        let query = `select * FROM ${table} where lower(service_name) like lower('${params}')`
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