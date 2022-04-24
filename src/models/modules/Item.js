const config = require('../../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err) => {
    console.log(err);
})
const table = 'table_item'
const varPrimary = 'item_code';
const varName = 'item_name';
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
        let query = `SELECT * FROM ${table} WHERE ${varPrimary} = "${id}"`;
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
            item_code: req.body.item_code,
            item_name: req.body.item_name,
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
            item_code: req.body.item_code,
            item_name: req.body.item_name,
        }
        let id = req.query.id;
        let query = ` `
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query(`UPDATE ${table} SET ? WHERE item_code = "${id}";` ,[data],
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
        let id = req.body.item_code;
        let query = `DELETE FROM ${table} WHERE ${varPrimary} = "${id}"`
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
        let name = req.body.item_name;
        let exact = req.body.item_name_exact
        let query = `select * FROM ${table} where lower(${varName}) like "lower('%${params ? params :name}%')"`
        let queryExact = `select * FROM ${table} where lower(${varName}) = "lower('${params ? params :name}')"`
        pool.getConnection((err,conn) => {
            if (err) throw err;
            conn.query((exact == 'true' 
                        ? queryExact 
                        : query), 
                (error,result) => {
                if (error) throw error;
                res.send({
                    status  :   200,
                    msg     :   'OK',
                    data    :   result,
                    query   : query,
                    exact   : queryExact
                });
            });
            conn.release();
        })
    },
}