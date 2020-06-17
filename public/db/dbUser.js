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

var tableName = "user";
//  var salt = bcrypt.genSaltSync(10);
  client.connect();
function dbUser(login,password)  {
  this.id = async function (login) {
    let query="SELECT id FROM public."+tableName+" WHERE  login = $1;";
    let values=[login]
    var id = await client.query(query,values)
            .then(res=>{
              return res.rows[0].id;
                        })
                      return id;
  }
  this.login = login;
  this.password = password;
  this.name;
  this.role;
  this.role_id;

  this.checkUser= async function (login,pass) {
    let query="SELECT * FROM public."+tableName+" WHERE  login = $1 LIMIT 1;";
    let values=[login]
    var password = await client.query(query,values)
            .then(res=>{
              console.log(res.rows[0].password);
              return res.rows[0].password;
                        })
            .catch( (err) => {
             console.log(err);
           })

  //pass = bcrypt.hashSync(pass, salt);
  console.log(pass);
  if (pass==password) {
    return true;
  } else return false;

  }
  this.CreateUser = async function () {
    //var passwordToSave = bcrypt.hashSync(this.password, salt);
    var passwordToSave = this.password;
    let values=[this.name,this.login,passwordToSave,this.role]
    let query="INSERT INTO public."+tableName+"(name,login,password,role) VALUES ($1, $2,$3,$4) RETURNING ID ;";
    var id_us = await client.query(query,values)
            .then(res=>{
              return res.rows[0].id;
                        })
   values=['0',id_us]
     query="INSERT INTO public.resource(cash,user_id) VALUES ($1, $2);";
    var rows = await client.query(query,values)
                          .then(res=>{
                                  return res.rowCount;
                                            })
      if(this.role == "under"){
        values=[id_us]
          query="UPDATE public."+tableName+" SET role_id ='"+this.role_id+"' WHERE id = $1;";
         var rowsUn = await client.query(query,values)
                               .then(res=>{
                                       return res.rowCount;
                                                 })
      }
    if ((id_us!=""&&rows==1) || (id_us!=""&&rows==1&&rowsUn==1) ) {
        return true;
      } else return false;
}

this.checkLogin=async function (login) {
  let query="SELECT COUNT(*) FROM public."+tableName+" WHERE  login = $1;";
  let values=[login]
  var rows = await client.query(query,values)
          .then(res=>{
            return res.rows[0].count;
                      })
if (rows==0) {
  return false;
} else return true;
}
this.GetName = async function (id) {
  let query="SELECT name FROM public."+tableName+" WHERE  id = $1;";
  let values=[id]
  var name = await client.query(query,values)
          .then(res=>{
            return res.rows[0].name;
                      })
                    return name;
}

this.GetRole = async function (id) {
  let query="SELECT role FROM public."+tableName+" WHERE  id = $1;";
  let values=[id]
  var role = await client.query(query,values)
          .then(res=>{
            return res.rows[0].role;
                      })
                      return role;
}

this.under = async function (role_id) {
  let query="SELECT * FROM public."+tableName+" WHERE ( role=$1 AND role_id = $2 );";
  let values=["under",role_id]
  var ar = await client.query(query,values)
          .then(res=>{
            return res.rows;
                      })
                      console.log("Under:   "+ar);
                      if (ar==0) {
                        return false;
                      } else return ar;
}
this.family = async function (us_1,us_2) {
  let values=[us_1,us_2];
  let query="INSERT INTO public.family (id_us1,id_us2) VALUES ($1, $2) RETURNING ID ;";
  var id_us = await client.query(query,values)
          .then(res=>{
            return res.rows[0].id;
                      })
 values=['0',id_us]
   query="INSERT INTO public.resource(cash,user_id) VALUES ($1, $2);";
  var rows = await client.query(query,values)
                        .then(res=>{
                                return res.rowCount;
                                          })

  if ((id_us!=""&&rows==1) )  {
      return true;
    } else return false;
}
this.GetUser = async function (user_id) {
  let query="SELECT * FROM public."+tableName+" WHERE  id = $1;";
  let values=[user_id]
  var us = await client.query(query,values)
          .then(res=>{
            return res.rows[0];
                      })
                      return us;
}
this.underUser = async function (role_id) {
  let query="SELECT id FROM public."+tableName+" WHERE ( role=$1 AND role_id = $2 );";
  let values=["under",role_id]
  var ar = await client.query(query,values)
          .then(res=>{
            return res.rows[0].id;
                      })

                  return ar;

}
this.AdminUser = async function (id) {
  let query="SELECT role_id FROM public."+tableName+" WHERE ( id = $1 );";
  let values=[id]
  var ar = await client.query(query,values)
          .then(res=>{
            return res.rows[0].role_id;
                      })
                  return ar;

}
this.CheckUnder = async function (id) {
  let query="SELECT * FROM public."+tableName+" WHERE ( role_id = $1 );";
  let values=[id]
  var ar = await client.query(query,values)
          .then(res=>{
            return res.rowCount;
                      })
                      if (ar==0) {
                        return false;
                      } else return true;
}
this.EditName = async function (name,id) {
  let query="UPDATE public."+tableName+" SET name = '"+name+"' WHERE id=$1;";
  let values = [id];
  var res = await client.query(query,values)
          .then(res=>{
            return res;
                      })
                      return res;
}
this.getUserId = async function (login) {
  let query="SELECT id FROM public."+tableName+" WHERE  login = $1;";
  let values=[login]
  var id = await client.query(query,values)
          .then(res=>{
            return res.rows[0].id;
                      })
                    return id;
}
this.editUser = async function (id) {
  let query="DELETE FROM public."+tableName+"  WHERE id=$1;";
  let values = [id];
  var res = await client.query(query,values)
          .then(res=>{
            return res;
                      })
                      return res;
}
this.editUserFinance = async function (id) {
  let query="DELETE FROM public.familyfinance WHERE id_us2=$1 AND id_us1=$2;";
  let values = [id,id];
  var res = await client.query(query,values)
          .then(res=>{
            return res;
                      })
                      return res;
}
this.editUserFamTranzaction = async function (id) {
  let query="DELETE FROM public.familytranzaction WHERE user_id=$1;";
  let values = [id];
  var res = await client.query(query,values)
          .then(res=>{
            return res;
                      })
                      return res;
}

this.editUserCash = async function (id) {
  let query="DELETE FROM public.familycash WHERE id_us2=$1;";
  let values = [id];
  var res = await client.query(query,values)
          .then(res=>{
            return res;
                      })
                      return res;
}
this.editUserResource = async function (id) {
  let query="DELETE FROM public.resource WHERE user_id=$1;";
  let values = [id];
  var res = await client.query(query,values)
          .then(res=>{
            return res;
                      })
                      return res;
}
this.editUserTranzaction = async function (id) {
  let query="DELETE FROM public.tranzaction WHERE user_id=$1;";
  let values = [id];
  var res = await client.query(query,values)
          .then(res=>{
            return res;
                      })
                      return res;
}

}
module.exports = dbUser;
