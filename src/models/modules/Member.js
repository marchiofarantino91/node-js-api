const config = require('../../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err) => {
    console.log(err);
})
const table = 'table_member'

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
        let query = `SELECT * FROM ${table} WHERE member_id = ${id}`;
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
            member_username: ((req.body.member_name).toLowerCase()).replace(/ /g,"_"),
             member_name: req.body.member_name,
             member_gender: req.body.member_gender,
             member_address: req.body.member_address,
             member_phone: req.body.member_phone,
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
             member_name: req.body.member_name,
             member_gender: req.body.member_gender,
             member_address: req.body.member_address,
             member_phone: req.body.member_phone,
        }
        let id = req.body.member_id;
        let query = ` UPDATE ${table} SET ${data} WHERE member_id = ${id};`
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
        let id = req.body.member_id;
        let query = `DELETE FROM ${table} WHERE member_id = ${id}`
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
        let query = `select * FROM ${table} where lower(member_name) like lower('${params}')`
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