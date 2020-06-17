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
var tableName = "categories"
client.connect();
function DbCategory() {
  this.getCategories = async function  () {
    let query="SELECT category FROM public."+tableName+" ;"
    var rows = await client.query(query)
            .then(res=>{
              return res.rows;
                        })

              .catch(err=>{
                          console.log("error");
                        })
                        return rows;
  }
  this.getCategoriesId =  async function (category) {
    let query="SELECT * FROM public."+tableName+" WHERE category=$1 ;";
    let values=[category];
    var id = await client.query(query,values)
            .then(res=>{
              return res.rows[0].id;
                        })
                        .catch(err=>{
                                    console.log("error");
                                  })
  return id;
    }
  this.setTranzaction = async function (user_id,category_id,pay,sum,date) {
    console.log("user_id:  "+user_id +"\n category_id:  "+category_id+"\n pay: "+pay+"\n sum: "+(sum)+"\n date: "+date);
    let query="INSERT INTO public.tranzaction (user_id,category_id,pay,sum,date) VALUES($1,$2,$3,$4,$5)";
    let values=[user_id,category_id,pay,sum,date];
    var res= await client.query(query,values)
            .then(res=>{
              return res;
                        })
            .catch(err=>{
              console.log(err);
            })
  }
  this.getCategoriesFinance = async function  () {
    let query="SELECT category FROM public.categoriesfinance ;"
    var rows = await client.query(query)
            .then(res=>{
              return res.rows;
                        })

              .catch(err=>{
                          console.log("error");
                        })
                        return rows;
  }
  this.getFinanceId =  async function (category) {
    let query="SELECT id FROM public.categoriesfinance WHERE category=$1 ;";
    let values=[category];
    var id = await client.query(query,values)
            .then(res=>{
              return res.rows[0].id;
                        })
  return id;
    }
}
module.exports = DbCategory;
