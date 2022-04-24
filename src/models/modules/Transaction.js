const config = require('../../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err) => {
    console.log(err);
})
const table = 'table_transaction'
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
    // get transaksi id
    getDataById(req,res){
        let id = req.params.id;
        let query = `SELECT * FROM ${table} WHERE transaction_id = ${id}`;
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
  getDataById(req,res){
        let id = req.params.id;
        let query = `SELECT * FROM ${table} WHERE transaction_id = ${id}`;
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
        let today = new Date();
        pool.getConnection((err,conn) => {
            let data = {
                member_id: req.body.member_id,
                service_id: req.body.service_id,
                operator_username: req.body.operator_username,
                transaction_output_date: new Date(),
                transaction_weight : req.body.transaction_weight,
                transaction_summary	 : 0,
                transaction_status  : 'laundry_in'
           }
            if (err) throw err;
            conn.query(`SELECT service_duration,service_price from table_service where service_id = ${data.service_id};`,function (error, results,fields) {
                // Neat!
                if (error) throw error;
        
                if (results[0]) {
                    data.transaction_output_date.setDate(data.transaction_output_date.getDate() + results[0].service_duration)  ;
                    data.transaction_output_date = data.transaction_output_date.toISOString().slice(0, 19).replace("T", " ")
                    data.transaction_summary = (data.transaction_weight * results[0].service_price); 
                // res.send({
                //     status  :   200,
                //     msg     :   'OK',
                //     data    : data
                // });
                conn.query(`INSERT INTO ${table} SET ? `,[data],
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK',
                    data    : data
                    });
                });
                }else {
                    res.send({
                        status  :   400,
                        msg     :   'Data Service Tidak Ada',
                    });
                }
        
                
            })
           
            conn.release();
        })
    },
    updateProgress(req,res){
        let data = {
            transaction_id : req.body.transaction_id,
            transaction_status : req.body.transaction_status,
        }
        // let id = req.params.id;
        let query = 
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(` UPDATE ${table} SET ? WHERE transaction_id = ${data.transaction_id};`, [data],
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
        let id = req.body.transaction_id;
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
    // getDataByName(req,res){
    //     let params = `%${req.query.name}%`
    //     let query = `select * FROM ${table} where lower(service_name) like lower('${params}')`
    //     pool.getConnection((err,conn) => {
    //         if (err) throw err;
    //         conn.query(query, 
    //             (error,result) => {
    //             if (error) throw error;
    //             res.send({
    //                 status  :   200,
    //                 msg     :   'OK',
    //                 data    :   result,
    //             });
    //         });
    //         conn.release();
    //     })
    // },
}