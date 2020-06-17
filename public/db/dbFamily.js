const express = require('express')
const { Client } = require('pg');
//const db = express.Route();
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Diplom',
  password: '123',
  port: 5432,
})

var tableName = "user";
//  var salt = bcrypt.genSaltSync(10);
  client.connect();
  function dbFamily() {
    this.GetMoney = async function (id) {
      let query="SELECT sum FROM public.familyfinance WHERE  id_us1 = $1;";
      let values=[id]
      var summ = await client.query(query,values)
              .then(res=>{
                return res.rows[0].sum;
                          })
                        return summ;
    }
    this.GetMoneyUs2 = async function (id) {
      let query="SELECT sum FROM public.familyfinance WHERE  id_us2 = $1;";
      let values=[id]
      var summ = await client.query(query,values)
              .then(res=>{
                return res.rows[0].sum;
                          })
                        return summ;
    }
    this.setTranzaction = async function(user_id,sum,date,category_id,pay) {
  //    console.log("user_id:  "+user_id +"\n category_id:  "+category_id+"\n pay: "+pay+"\n sum: "+(sum)+"\n date: "+date);
      let query="INSERT INTO public.chartfamily (user_id,sum,date,category_id,pay) VALUES($1,$2,$3,$4,$5)";
      let values=[user_id,sum,date,category_id,pay];
      var res= await client.query(query,values)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
    this.setChartTranzaction = async function(user_id,sum,date,category_id,pay) {
  //    console.log("user_id:  "+user_id +"\n category_id:  "+category_id+"\n pay: "+pay+"\n sum: "+(sum)+"\n date: "+date);
      let query="INSERT INTO public.familytranzaction (user_id,sum,date,category_id,pay) VALUES($1,$2,$3,$4,$5)";
      let values=[user_id,sum,date,category_id,pay];
      var res= await client.query(query,values)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
    this.SetMoney = async function (cash,user_id) {
      let query="UPDATE public.familyfinance SET sum='"+cash+"' WHERE id_us1 ='"+user_id+"' ";
      var res= await client.query(query)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
    this.SetMoneyUs2 = async function (cash,user_id) {
      let query="UPDATE public.familyfinance SET sum='"+cash+"' WHERE id_us2 ='"+user_id+"' ";
      var res= await client.query(query)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
    this.familycash = async function(id_us1,id_us2,cause,sum) {
  //    console.log("user_id:  "+user_id +"\n category_id:  "+category_id+"\n pay: "+pay+"\n sum: "+(sum)+"\n date: "+date);
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  var date = year+ "-" + (("0" + month).slice(-2)) + "-" +(day);
      let query="INSERT INTO public.familycash (id_us1,id_us2,cause,sum,date) VALUES($1,$2,$3,$4,$5)";
      let values=[id_us1,id_us2,cause,sum,date];
      var res= await client.query(query,values)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }

    this.getUsersAdmin = async function (id) {
      let query = "SELECT id_us1,id_us2 FROM public.familyfinance WHERE id_us1 = $1"
      let values=[id]
      var arrayUs=[];
      var ar = await client.query(query,values)
              .then(res=>{
                arrayUs.push(res.rows[0].id_us1);
                arrayUs.push(res.rows[0].id_us2);
                return arrayUs;
                          })
                        return ar;
    }
    this.getUsersUnder = async function (id) {
        let query = "SELECT id_us1,id_us2 FROM public.familyfinance WHERE id_us2 = $1"
        let values=[id]
        var arrayUs=[];
        var ar = await client.query(query,values)
                .then(res=>{
                  arrayUs.push(res.rows[0].id_us1);
                  arrayUs.push(res.rows[0].id_us2);
                  return arrayUs;
                            })
                          return ar;
    }
    this.getTranzaction = async function (user_id,cause,between,and) {
        let query = "SELECT SUM(sum) FROM public.familycash WHERE id_us1=$1 AND cause=$2 AND date BETWEEN '"+between+"' AND '"+and+"' ;";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"
      let values = [user_id,cause];
      var sum = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return sum;
    }
    this.getTranzactionName = async function (user_id,cause,between,and) {
        let query = "SELECT name FROM public."+tableName+" t2 WHERE EXISTS (SELECT sum FROM public.familycash t1 WHERE t1.id_us1 = t2.id AND t1.id_us1 = $1 AND cause =$2 AND t1.date BETWEEN '"+between+"' AND '"+and+"')  ";
    //  let query = "SELECT t1.sum , t2.category FROM public.charttranzaction t1 INNER JOIN public.categories t2 ON t1.category_id = t2.id where category_id = $1 AND user_id = $2;"
      let values = [user_id,cause];
      var name = await client.query(query,values)
              .then(res=>{
                return res.rows[0];
                          })
                          return name;
    }
    this.CreateFinance = async function (id_us1,sum) {
      let query="INSERT INTO public.familyfinance (id_us1,sum) VALUES($1,$2)";
      let values=[id_us1,sum];
      var res= await client.query(query,values)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
    this.UpdateFinance = async function (id_us1,id_us2) {
      let query="Update public.familyfinance SET id_us2='"+id_us2+"' WHERE id_us1 = $1";
      let values=[id_us1];
      var res= await client.query(query,values)
              .then(res=>{
                return res;
                          })
              .catch(err=>{
                console.log(err);
              })
    }
    this.getTranzactionByName = async function (user_id) {
      let query = "SELECT t2.* , t1.category,t3.name FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  t2.user_id =$1;"
let values = [user_id];
      var res = await client.query(query,values)
              .then(res=>{
                return res.rows;
                          })

                          if (res.rowCount==0) {
                            return false;
                          } else   return res;

      }
      this.SumByName = async function (user_id) {
        let query = "SELECT SUM(t2.sum) FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  t2.user_id =$1;"
  let values = [user_id];
        var res = await client.query(query,values)
                .then(res=>{
                  return res.rows[0].sum;
                            })
                            return res;

        }
      this.getTranzactionByDate = async function (date,id_us1,id_us2) {
        let query = "SELECT t2.* , t1.category,t3.name FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  t2.date=$1 AND t3.id IN ($2,$3);"
  let values = [date,id_us1,id_us2];
        var res = await client.query(query,values)
                .then(res=>{
                  return res.rows;
                            })

                            if (res.rowCount==0) {
                              return false;
                            } else   return res;

        }
        this.SumByDate = async function (date,id_us1,id_us2) {
          let query = "SELECT SUM(t2.sum) FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  t2.date=$1 AND t3.id IN ($2,$3);"
    let values = [date,id_us1,id_us2];
          var res = await client.query(query,values)
                  .then(res=>{
                    return res.rows[0].sum;
                              })

                              return res;

          }
        this.getTranzactionByDateName = async function (date,user_id) {
          let query = "SELECT t2.* , t1.category,t3.name FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  (t2.date=$1  AND t2.user_id =$2);"
    let values = [date,user_id];
          var res = await client.query(query,values)
                  .then(res=>{
                    return res.rows;
                              })

                              if (res.rowCount==0) {
                                return false;
                              } else   return res;

          }
          this.SumByDateName = async function (date,user_id) {
            let query = "SELECT SUM(t2.sum)  FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  (t2.date=$1  AND t2.user_id =$2);"
      let values = [date,user_id];
            var res = await client.query(query,values)
                    .then(res=>{
                      return res.rows[0].sum;
                                })
                                return res;

            }
      this.getAllTranzactions = async function (id_us1,id_us2) {
        let query = "SELECT t2.* , t1.category,t3.name FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  t2.user_id IN ($1,$2);"

      //  let query = "SELECT *  FROM public.charttranzaction t1 WHERE EXISTS(SELECT t2.category FROM public.categories t2 WHERE t1.category_id=t2.id AND user_id=$1) ";
      let values = [id_us1,id_us2];
      var res = await client.query(query,values)
              .then(res=>{
                return res.rows;
                          })

                          if (res.rowCount==0) {
                            return false;
                          } else   return res;
      }
      this.SumAll = async function (id_us1,id_us2) {
        let query = "SELECT SUM(t2.sum) FROM public.categories t1 INNER JOIN public.chartfamily t2 ON t2.category_id = t1.id   JOIN public."+tableName+" t3 ON t3.id=t2.user_id where  t2.user_id IN ($1,$2);"

      //  let query = "SELECT *  FROM public.charttranzaction t1 WHERE EXISTS(SELECT t2.category FROM public.categories t2 WHERE t1.category_id=t2.id AND user_id=$1) ";
      let values = [id_us1,id_us2];
      var res = await client.query(query,values)
              .then(res=>{
                return res.rows[0].sum;
                          })
                          return res;
      }


  }
  module.exports = dbFamily;
