const express = require('express')
const { Client } = require('pg');
var bcrypt = require('bcrypt');
//const db = express.Route();
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Diplom',
  password: '123',
  port: 5432,
})

var tableName = "public.tranzaction";
//  var salt = bcrypt.genSaltSync(10);
  client.connect();
  function dbTranzaction() {
    //
    this.getTranzaction = async function (category_id,user_id,between,and) {
        let query = "SELECT SUM(sum) FROM public.charttranzaction t1 WHERE EXISTS (SELECT category FROM public.categories t2 WHERE t1.category_id = t2.id AND t1.category_id = $1 AND t1.user_id = $2) AND t1.date BETWEEN '"+between+"' AND '"+and+"' ;";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"
      let values = [category_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.getTranzactionFamily = async function (category_id,user_id,between,and) {
        let query = "SELECT SUM(sum) FROM public.chartfamily t1 WHERE EXISTS (SELECT category FROM public.categories t2 WHERE t1.category_id = t2.id AND t1.category_id = $1 AND t1.user_id = $2) AND t1.date BETWEEN '"+between+"' AND '"+and+"' ;";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"

      let values = [category_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }

    this.getTranzactionDebt = async function (debt_id,user_id,between,and) {
        let query = "SELECT SUM(sum) FROM public.debtpay t1 WHERE EXISTS (SELECT category FROM public.debt t2 WHERE t1.id_debt = t2.id AND t1.id_debt = $1 AND t1.user_id = $2) AND t1.datepay BETWEEN '"+between+"' AND '"+and+"' ;";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"
      let values = [debt_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.getTranzactionDebtCategory = async function (debt_id,user_id,between,and) {
        let query = "SELECT category FROM public.debt t2 WHERE EXISTS (SELECT sum FROM public.debtpay t1 WHERE t1.id_debt = t2.id AND t1.id_debt = $1 AND t1.user_id = $2 AND t1.datepay BETWEEN '"+between+"' AND '"+and+"')  ";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"
      let values = [debt_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.getTranzactionFinance = async function (category_id,user_id,between,and) {
        let query = "SELECT SUM(sum) FROM public.tranzaction t1 WHERE EXISTS (SELECT category FROM public.categoriesfinance t2 WHERE t1.category_id = t2.id AND t1.category_id = $1 AND t1.user_id = $2) AND t1.date BETWEEN '"+between+"' AND '"+and+"' ;";
    let values = [category_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.getTranzactionFinanceCategory = async function (category_id,user_id,between,and) {
        let query = "SELECT category FROM public.categoriesfinance t2 WHERE EXISTS (SELECT sum FROM public.tranzaction t1 WHERE t1.category_id = t2.id AND t1.category_id = $1 AND t1.user_id = $2 AND t1.date BETWEEN '"+between+"' AND '"+and+"')  ";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"
      let values = [category_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.getTranzactionCategory = async function (category_id,user_id,between,and) {
        let query = "SELECT category FROM public.categories t2 WHERE EXISTS (SELECT sum FROM public.charttranzaction t1 WHERE t1.category_id = t2.id AND t1.category_id = $1 AND t1.user_id = $2 AND t1.date BETWEEN '"+between+"' AND '"+and+"' )  ";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"
      let values = [category_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.getTranzactionFamilyCategory = async function (category_id,user_id,between,and) {
        let query = "SELECT category FROM public.categories t2 WHERE EXISTS (SELECT sum FROM public.chartfamily t1 WHERE t1.category_id = t2.id AND t1.category_id = $1 AND t1.user_id = $2 AND t1.date BETWEEN '"+between+"' AND '"+and+"' )  ";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"

      let values = [category_id,user_id];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.setChartTranzaction = async function(user_id,category_id,pay,sum,date) {
  //    console.log("user_id:  "+user_id +"\n category_id:  "+category_id+"\n pay: "+pay+"\n sum: "+(sum)+"\n date: "+date);
      let query="INSERT INTO public.charttranzaction (user_id,category_id,pay,sum,date) VALUES($1,$2,$3,$4,$5)";
      let values=[user_id,category_id,pay,sum,date];
      var res= await client.query(query,values)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
      this.getAllTranzactions = async function (user_id) {
        let query = "SELECT t1.* , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where  user_id = $1;"

      //  let query = "SELECT *  FROM public.charttranzaction t1 WHERE EXISTS(SELECT t2.category FROM public.categories t2 WHERE t1.category_id=t2.id AND user_id=$1) ";
      let values = [user_id];
      var res = await client.query(query,values)
              .then(res=>{

                return res.rows;
                          })
                          return res;
      }
      this.SumAll = async function (user_id) {
        let query = "SELECT SUM(t1.sum) FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where  user_id = $1;"

      //  let query = "SELECT *  FROM public.charttranzaction t1 WHERE EXISTS(SELECT t2.category FROM public.categories t2 WHERE t1.category_id=t2.id AND user_id=$1) ";
      let values = [user_id];
      var res = await client.query(query,values)
              .then(res=>{

                return res.rows[0].sum;
                          })
                          return res;
      }

      this.getByDate = async function (user_id,date) {
        let query = "SELECT t1.* , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where  user_id = $1 AND t1.date=$2;"

      //  let query = "SELECT *  FROM public.charttranzaction t1 WHERE EXISTS(SELECT t2.category FROM public.categories t2 WHERE t1.category_id=t2.id AND user_id=$1) ";
      let values = [user_id,date];
      var res = await client.query(query,values)
              .then(res=>{
                return res.rows;
                          })

                          if (res.rowCount==0) {
                            return false;
                          } else   return res;

      }
      this.SumByDate = async function (user_id,date) {
        let query = "SELECT SUM(t1.sum)  FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where  user_id = $1 AND t1.date=$2;"

      //  let query = "SELECT *  FROM public.charttranzaction t1 WHERE EXISTS(SELECT t2.category FROM public.categories t2 WHERE t1.category_id=t2.id AND user_id=$1) ";
      let values = [user_id,date];
      var res = await client.query(query,values)
              .then(res=>{
                return res.rows[0].sum;
                          })
                return  res;
      }

  }
  module.exports = dbTranzaction;
