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
  function dbResource(user_id) {
    this.id;
    this.cash;
    this.card_id = async function () {
      let query="SELECT id FROM public.card WHERE  user_id = $1 AND name = $2;";
      let values=[this.user_id,'qiwi']
      var id = await client.query(query,values)
              .then(res=>{
                return res.rows[0].id;
                          })
                .catch((err) => {return false})

                if (!id) return false
                else
                        return id;
    }
    this.user_id ;
    this.GetMoney = async function (id) {
      let query="SELECT SUM(cash) FROM public.resource WHERE  user_id = $1;";
      let values=[id]
      var summ = await client.query(query,values)
              .then(res=>{
                return res.rows[0].sum;
                          })
                        return currencyFormatter.format(summ, { style:'decimal',code: 'RUB' });
    }
    this.SetMoney = async function (cash,user_id) {
      let query="UPDATE public.resource SET cash='"+cash+"' WHERE user_id ='"+user_id+"' ";
      var res= await client.query(query)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
    
    this.cashFam = async function (id) {
      let user = new DbUser();
      let under_id = await user.under(id);
      var summ;
    //  console.log(under_id);
      if (!under_id) {
        return false;
      }
      else {
         for (var i = 0; i < under_id.length; i++) {
           let query="SELECT SUM(cash) FROM public.resource WHERE ( user_id = $1 OR user_id = $2);";
           let values=[under_id[i].id,under_id[i].role_id]
         summ = await client.query(query,values)
                   .then(res=>{
                     //console.log(res);
                     return res.rows[0].sum;
                   })

                                }
        return currencyFormatter.format(summ, { code: 'RUB' });
      }

    }

    this.getQiwi = async function (card_id) {
      await wallet.Balance(user_id,card_id);
      let query="SELECT cash FROM public.resource WHERE  user_id = $1 AND card_id = $2;";
      let values=[this.user_id,card_id]
      var qiwi = await client.query(query,values)
              .then(res=>{
                return res.rows[0].cash;
                          })
                        return qiwi;
    }
    this.GetRole = async function (id) {
      let tableName = "user"
      let query="SELECT role FROM public."+tableName+" WHERE  id = $1;";
      let values=[id]
      var role = await client.query(query,values)
              .then(res=>{
                return res.rows[0].role;
                          })
                          return role;
    }
  }
  module.exports = dbResource;
