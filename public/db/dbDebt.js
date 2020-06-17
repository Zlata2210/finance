const express = require('express')
const { Client } = require('pg');
var bcrypt = require('bcrypt');
const qiwi = require('./qiwi.js');
const DbUser = require('./dbUser.js')
var currencyFormatter = require('currency-formatter');
//const db = express.Route();
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Diplom',
  password: '123',
  port: 5432,
})
  var wallet = new qiwi();
  client.connect();
  function dbDebt() {
    this.CreateDebt = async function (user_id,sum,name,datebegin,period,dateend,rest,payment,names) {
      let query="INSERT INTO public.debt (user_id,sum,category,datebegin,period,dateend,rest,payment,name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)";
      let values=[user_id,sum,name,datebegin,period,dateend,rest,payment,names];
      var res= await client.query(query,values)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }

    this.CheckDebt = async function (user_id) {
      let query="SELECT * FROM public.debt WHERE user_id = $1";
      let values=[user_id];
      var res= await client.query(query,values)
              .then(res=>{
                return res.rowCount;
                          })
              .catch(err=>{
                console.log(err);
              })
              if (res!=0) return true; else return false;
    }

    this.GetDebt = async function (user_id) {
      let query="SELECT rest FROM public.debt WHERE user_id = $1";
      let values=[user_id];
      var res= await client.query(query,values)
              .then(res=>{
                return res.rows[0].rest;
                          })
              .catch(err=>{
                console.log(err);
              })
              return res;
    }
    this.GetDebtbyId = async function (id) {
      let query="SELECT rest FROM public.debt WHERE id = $1";
      let values=[id];
      var res= await client.query(query,values)
              .then(res=>{
                return res.rows[0].rest;
                          })
              .catch(err=>{
                console.log(err);
              })
              return res;
    }
    this.GetDebtDataEnd = async function (user_id) {
      let query="SELECT dateend FROM public.debt WHERE user_id = $1";
      let values=[user_id];
      var res= await client.query(query,values)
              .then(res=>{
                return res.rows[0].dateend;
                          })
              .catch(err=>{
                console.log(err);
              })
              return res;
    }
    this.PayDebt = async function (id,rest) {
      let query="UPDATE public.debt SET rest='"+rest+"' WHERE id ='"+id+"' ";
      var res= await client.query(query)
              .then(res=>{
                return res.rows;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
this.getDebtbyName = async function (name) {
  let query="SELECT id FROM public.debt WHERE  category = $1";
  let values=[name];
  var res= await client.query(query,values)
          .then(res=>{
            return res.rows[0].id;
                      })
          .catch(err=>{
            console.log(err);
          })
          return res;
}
    this.getDebtDetail = async function  (user_id) {
      let query="SELECT * FROM public.debt WHERE user_id=$1;"
      let values=[user_id];
      var rows = await client.query(query,values)
              .then(res=>{
                return res.rows;
                          })

                .catch(err=>{
                            console.log("error");
                          })
                          if (rows==0) {
                            return false;
                          } else return rows;
  }
  this.setDebtTranzaction = async function (user_id,id_debt,sum) {
    let query="INSERT INTO public.debtpay (user_id,id_debt,datepay,sum) VALUES($1,$2,$3,$4)";
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var date = year+ "-" + (("0" + month).slice(-2)) + "-" +(day);
    let values=[user_id,id_debt,date,sum];
    var res= await client.query(query,values)
            .then(res=>{
              return res;
                        })
            .catch(err=>{
              console.log(err);
            })
  }
  this.getDebtName = async function () {
    let query="SELECT category FROM public.debt ";
    var res= await client.query(query)
            .then(res=>{
              return res.rows;
                        })
            .catch(err=>{
              console.log(err);
            })
            return res;
  }
  this.CountDebt = async function (user_id) {
    let query="SELECT COUNT(*) FROM public.debt WHERE user_id =$1; ";
    let values = [user_id];
    var res= await client.query(query,values)
            .then(res=>{
              return res.rows[0].count;
                        })
            .catch(err=>{
              console.log(err);
            })
            return res;
  }
  this.getTranzactionDebtById = async function (debt_id,user_id) {
    let query="SELECT * FROM public.debtpay WHERE user_id =$1 AND id_debt=$2; ";
    let values = [user_id,debt_id];
    var res= await client.query(query,values)
            .then(res=>{
              return res.rows;
                        })
            .catch(err=>{
              console.log(err);
            })
            return res;
  }

  }
  module.exports = dbDebt;
