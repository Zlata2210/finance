const express = require('express')
const router = express.Router()
const DbUser = require('./public/db/dbUser.js')
const DbResource =  require('./public/db/dbResource.js');
const DbCategory = require('./public/db/dbCategories.js')
const DbTranzaction = require('./public/db/dbTranzaction.js');
const DbDebt = require('./public/db/dbDebt.js');
const DbFamily = require('./public/db/dbFamily.js');
router.get('/', (req, res) => {
  res.render('Auth', {
    title:"Авторизация",
    data: {},
    errors: {}
  })
})

const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
var data;
var forUsPage = false;
var userName;
var role;
var user_id=0;
var under_id;
var usUnderName;
router.post('/Auth', [
  check('email')
 .isEmail()
 .withMessage('That email doesn‘t look right'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password is required')

], (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let user = new DbUser(req.body['email'],req.body['password']);
    let checkUs = async function () {
      let flagLogin= await user.checkLogin(req.body['email']);
      let flag = await user.checkUser(req.body['email'],req.body['password']);
      console.log(flag);
        if(!flagLogin&&!flag){
       data = matchedData(req)
     req.flash('success', '')
       res.redirect('/Registr')
   }
   else if (!flag && flagLogin) {
     req.body['password'] = "";
     return res.render('Auth', {
       title:"Авторизация",
          data: req.body,
          errors: errors.mapped()
   })
 }
     else  if (flag){
       forUsPage = true;
       user_id = await user.id(req.body['email']);
       userName = await user.GetName(user_id);
       role = await user.GetRole(user_id);
       usUnderName = await user.under(user_id);
       if (!usUnderName) usUnderName = [];
           res.redirect('/userPage?id='+user_id);
             }

        }

  checkUs();
  } else return res.render('Auth', {
    title:"Авторизация",
       data: req.body,
       errors: errors.mapped()
     })
})

router.get('/Registr', (req, res) => {
  res.render('Auth', {
    title:"Регистрация",
    data: data,
    errors: {}
  })
})
router.post('/Registr', [
  check('name')
 .isLength({ min: 3, max:20 })
 .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('That email doesn‘t look rightJJJJ'),
      check('password')
      .isLength({ min: 1 })
      .withMessage('Password is required')

], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
  res.render('Auth', {
    title:"Регистрация",
 data: req.body,
 errors: errors.mapped()
})

} else {
  let user = new DbUser(req.body['email'],req.body['password']);
  let checkCreate=async function () {
    user.role = "admin";
    user.name = req.body['name'];
    let flag= await user.CreateUser();
    let Family = new DbFamily();
    if (flag) {
      forUsPage = true;
      userName = req.body['name'];
      role = user.role;
      user_id = await user.id(req.body['email']);
        let createfinance = await Family.CreateFinance(user_id,0);
      usUnderName = await user.under(user_id);
      res.redirect('/userPage?id='+user_id);
    } else {
      req.body['email'] = "Повторите email";
      res.render('Auth', {
        title:"Регистрация",
     data: req.body,
     errors: errors.mapped()
   })
 }
  }
  checkCreate();

}

})
//const qiwi = require('./public/js/qiwi.js');
/*
router.use("/userPage", function(request,response) {
  if (forUsPage) {
  let id = request.query.id;
let resource = new DbResource(id);
let user = new DbUser();
var fun = async function () {
  role = await user.GetRole(id);
  userName = await user.GetName(id)
  let cash = await resource.GetMoney(id);
  let card_id = await resource.card_id(); //qiwi
  let cashFam =await resource.cashFam(id); //id querystr
  if (!card_id) {
    console.log(" ");
    response.render('userPage',{
      name:userName,
      under_name:usUnderName,
      role: role,
      cashFam:cashFam,
      cash:cash,
      btnvisible:true
    });
  }
   else{
 let qiwibalance = await resource.getQiwi(card_id);
 console.log("IMYA: "+usUnderName[0].name);
 response.render('userPage',{
   name:userName,
   under_name:usUnderName,
   role: role,
   cashFam:cashFam,
   cash:cash,
   btnvisible:false,
   cashQiwi:qiwibalance
 });
}
}
fun();
  }

})*/
router.post('/familyAdd',[
  check('name')
 .isLength({ min: 3, max:20 })
 .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('That email doesn‘t look rightJJJJ'),
      check('password')
      .isLength({ min: 1 })
      .withMessage('Password is required')

], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    res.render('Auth', {
    title:"Регис",
 data: req.body,
 errors: errors.mapped()
})
} else {
  let user = new DbUser(req.body['email'],req.body['password']);
  let checkCreate=async function () {
    user.role = "under";
    user.name = req.body['name'];
    user.role_id = user_id;
    let flag= await user.CreateUser();
    let Family = new DbFamily();
    //console.log(flag);
    if (flag) {
      forUsPage = true;
let id_us2 = await user.getUserId(req.body['email']);
      let createfinance = await Family.UpdateFinance(user.role_id,id_us2);
      usUnderName = await user.under(user_id);
      if (!usUnderName) usUnderName = [];
      res.redirect('/userPage?id='+user_id);
    } else {
      req.body['email'] = "Повторите email";
      res.render('Auth', {
        title:"Регис",
     data: req.body,
     errors: errors.mapped()
   })
 }
  }
  checkCreate();
}
})

var id;
router.use("/userPage", function(request,response) {
  if (forUsPage) {
 id = request.query.id;
 var between = request.query.between;
 var and = request.query.and;
 var flgalert;
  var flgalertDebt;
 var flagPayDebt=false;
 if (request.query.nomoney=="true") {
   flgalert=true;
 }
 if (request.query.noDebtmoney=="true") {
   flgalertDebt=true;
 }
 let title="Home";
 var idPayDebt;
 if (request.query.family!=undefined) {
   title = "Family"
 }
 else if (request.query.pay!=undefined) {
   title = "Pay"
 }
 else if (request.query.money!=undefined) {
   title = "Money"
 }

 else if (request.query.DebtPay!=undefined) {
   flagPayDebt = true;

 }
 else if (request.query.debt!=undefined) {
   title = "Debt"
 }
 else if (request.query.setting!=undefined) {
   title = "Setting"
 }
 else if (request.query.tranzaction!=undefined) {
   title = "Tranzaction"
 }
 else if (request.query.finance!=undefined) {
   title = "Finance"
 }
 else if (request.query.familytranzaction!=undefined) {
   title = "FamilyTranzaction"
 }
 else if (request.query.debttranzaction!=undefined) {
   title = "DebtTranzaction"
 }

let user = new DbUser();
var Debt = new DbDebt();
var resourse = new DbResource();
var fun = async function () {
  role = await user.GetRole(id);
  userName = await user.GetName(id);
  let balance = await resourse.GetMoney(id);
  let user_mas = await user.GetUser(id);
  let Category = new DbCategory();
  let category = await Category.getCategories();
  let catFinance = await Category.getCategoriesFinance();
  let Tranzaction = new DbTranzaction();
  //РАСХОДЫ
  var chart = new Array();
  var chart1 = new Array();
  for (var i = 0; i < category.length; i++) {
    let cat_id = await Category.getCategoriesId(category[i].category);
    if (between!=undefined && and!=undefined) {
      var Moneychart = await Tranzaction.getTranzaction(cat_id,id,between,and);
      if (Moneychart.sum!=null){
      chart.push(Moneychart);
    }
      var Moneychart1 = await Tranzaction.getTranzactionCategory(cat_id,id,between,and);
   chart1.push(Moneychart1);
 }
    }
    let debtcategory = await Debt.getDebtName();
    for (var i = 0; i < debtcategory.length; i++) {
      let debt_id = await Debt.getDebtbyName(debtcategory[i].category);

      if (between!=undefined && and!=undefined) {
        var DebtChart = await Tranzaction.getTranzactionDebt(debt_id,id,between,and)
        if (DebtChart.sum!=null){
        chart.push(DebtChart);
      }
      var DebtChart1 = await Tranzaction.getTranzactionDebtCategory(debt_id,id,between,and);

   chart1.push(DebtChart1);
    }
  }
    //Доходыы
    var chartFinance = new Array();
      var chart1Finance = new Array();
      for (var i = 0; i < catFinance.length; i++) {
        let cat_id = await Category.getFinanceId(catFinance[i].category);
          if (between!=undefined && and!=undefined) {
    var   MoneychartFin = await Tranzaction.getTranzactionFinance(cat_id,id,between,and);
      if (MoneychartFin.sum!=null){
      chartFinance.push(MoneychartFin);
       }
       var   Moneychart1Fin = await Tranzaction.getTranzactionFinanceCategory(cat_id,id,between,and);
      chart1Finance.push(Moneychart1Fin);


          }
        }
//ДОЛГИИИ

var debt= await Debt.CheckDebt(id);
var debtDetail = await Debt.getDebtDetail(id);
if (!debtDetail) {
  debtDetail=[];
}
idPayDebt = request.query.idPayDebt;
if (request.query.DebtPay=="true") {
  flagPayDebt = true;
}
var debtCount = await Debt.CountDebt(id);
//TRANZACTIONS!!!!!
var allTranzaction;
let sumTranzaction=0;
if (request.query.datetranzaction!=undefined) {
  allTranzaction = await Tranzaction.getByDate(id,request.query.datetranzaction);
  sumTranzaction = await Tranzaction.SumByDate(id,request.query.datetranzaction)
  if (!allTranzaction) {
    allTranzaction = await Tranzaction.getAllTranzactions(id);
    sumTranzaction = await Tranzaction.SumAll(id);
  }
} else {allTranzaction = await Tranzaction.getAllTranzactions(id); sumTranzaction = await Tranzaction.SumAll(id);}
var debtSelect;
if (request.query.debtSelect!=undefined) {
 debtSelect = request.query.debtSelect;
}
//FAMILY!!!!!!
let Family = new DbFamily();
var cashFamily;
let id_us2;
let admin_name;
let underName;
if (role=="admin") {
  cashFamily = await Family.GetMoney(id);
  let underflag = await user.CheckUnder(id);
  if (underflag) {
    id_us2 = await user.underUser(id);
    underName = await user.GetName(id_us2);
  }
} else {
  cashFamily = await Family.GetMoneyUs2(id);
  id_us2 = await user.AdminUser(id);
  admin_name = await user.GetName(id_us2);
}
//FAMILY CHART!

                var chartFam = new Array();
                var chart1Fam = new Array();
                for (var i = 0; i < category.length; i++) {
                  let cat_id = await Category.getCategoriesId(category[i].category);
                  if (between!=undefined && and!=undefined) {
                    var MoneychartFam = await Tranzaction.getTranzactionFamily(cat_id,id,between,and);
                    if (MoneychartFam.sum!=null){
                    chartFam.push(MoneychartFam);
                  }
                    var Moneychart1Fam = await Tranzaction.getTranzactionFamilyCategory(cat_id,id,between,and);
                 chart1Fam.push(Moneychart1Fam);
                }
                  }

                  for (var i = 0; i < category.length; i++) {
                    let cat_id = await Category.getCategoriesId(category[i].category);
                    if (between!=undefined && and!=undefined) {
                       MoneychartFam = await Tranzaction.getTranzactionFamily(cat_id,id_us2,between,and);
                      if (MoneychartFam.sum!=null){
                      chartFam.push(MoneychartFam);
                    }
                       Moneychart1Fam = await Tranzaction.getTranzactionFamilyCategory(cat_id,id_us2,between,and);
                   chart1Fam.push(Moneychart1Fam);
                  }
                    }
                    //DEPOSIT
                    var chartFamDeposit = new Array();
                    var chart1FamDeposit = new Array();
                    var chartFamPay = new Array();
                    var chart1FamPay = new Array();
                    let familyUser;
                    if (role=="admin") {
                       familyUser = await Family.getUsersAdmin(id);
                    } else {
                      familyUser = await Family.getUsersUnder(id);
                    }
                    for (var i = 0; i < familyUser.length; i++) {
                      if (between!=undefined && and!=undefined) {
                        var DepositchartFam = await Family.getTranzaction(familyUser[i],"Пополнение",between,and);
                        if (DepositchartFam.sum!=null){
                        chartFamDeposit.push(DepositchartFam);
                      }
                        var PaychartFam = await Family.getTranzaction(familyUser[i],"Снятие",between,and);
                       if (PaychartFam.sum!=null){
                        chartFamPay.push(PaychartFam);
                      }

                        var Depositchart1Fam = await Family.getTranzactionName(familyUser[i],"Пополнение",between,and);
                     chart1FamDeposit.push(Depositchart1Fam);
                     var Paychart1Fam = await Family.getTranzactionName(familyUser[i],"Снятие",between,and);
                  chart1FamPay.push(Paychart1Fam);
                    }
                  }
                  //FamilyTranzaction
                  let datefamily;
                  let namefamily;
                  let sumFamilyTranzaction=0;
                  let allTranzactionFamily=await Family.getAllTranzactions(id,id_us2);
                  sumFamilyTranzaction = await Family.SumAll(id,id_us2);
                  if (request.query.datetranzactionfamily!=undefined) {
                    datefamily = request.query.datetranzactionfamily;
                    allTranzactionFamily = await Family.getTranzactionByDate(datefamily,id,id_us2);
                    sumFamilyTranzaction = await Family.SumByDate(datefamily,id,id_us2);
                    if (!allTranzactionFamily) {
                      allTranzactionFamily = await Family.getAllTranzactions(id,id_us2);
                      sumFamilyTranzaction = await Family.SumAll(id,id_us2);
                    }
                  }
                  if (request.query.name!=undefined) {
                    namefamily = request.query.name;
                    if (namefamily=="admin") {

                      allTranzactionFamily = await Family.getTranzactionByName(id);
                      sumFamilyTranzaction = await Family.SumByName(id);
                      if (!allTranzactionFamily) {
                        allTranzactionFamily = await Family.getAllTranzactions(id,id_us2);
                        sumFamilyTranzaction = await Family.SumAll(id,id_us2);
                      }
                    } else {
                      allTranzactionFamily = await Family.getTranzactionByName(id_us2);
                      sumFamilyTranzaction = await Family.SumByName(id_us2);
                      if (!allTranzactionFamily) {
                        allTranzactionFamily = await Family.getAllTranzactions(id,id_us2);
                        sumFamilyTranzaction = await Family.SumAll(id,id_us2);
                      }
                    }
                  }
                  let sortfamily=request.query.sortfamily;
                  if ((request.query.datefamily!=undefined)&&(request.query.familyname!=undefined)) {
                    datefamily = request.query.datefamily;
                    if (request.query.familyname=="admin") {

                      allTranzactionFamily = await Family.getTranzactionByDateName(datefamily,id);
                      sumFamilyTranzaction = await Family.SumByDateName(datefamily,id);
                      if (!allTranzactionFamily) {
                        allTranzactionFamily = await Family.getAllTranzactions(id,id_us2);
                        sumFamilyTranzaction = await Family.SumAll(id,id_us2);
                      }
                    } else {
                      allTranzactionFamily = await Family.getTranzactionByDateName(datefamily,id_us2);
                      sumFamilyTranzaction = await Family.SumByDateName(datefamily,id);
                  }
                }
                //DEBT TRANZACTION!!!!!!!
              var idSortDebt;
                var tranzactionDebt = false;
                  if(request.query.idsortDebt!=undefined){
                        idSortDebt=request.query.idsortDebt;
                        tranzactionDebt = await Debt.getTranzactionDebtById(idSortDebt,id);
                  }

    response.render('userPage1',{
      title:title,
      cashFamily:cashFamily,
      role:role,
      under_name:usUnderName,
      admin_name:admin_name,
      ChartFamily:chartFam,
      Chart1Family:chart1Fam,
      ChartFamilyDeposit:chartFamDeposit,
      Chart1FamilyDeposit:chart1FamDeposit,
      ChartFamilyPay:chartFamPay,
      Chart1FamilyPay:chart1FamPay,
      name:userName,
      user_mas: user_mas,
      balance:balance,
      between:between,
      and:and,
      Chart:chart,
      Chart1:chart1,
      categories:category,
      flagAlert:flgalert,
      ChartFinance:chartFinance,
      Chart1Finance:chart1Finance,
      under_name:usUnderName,
      finance:catFinance,
      flagAlertDebt:flgalertDebt,
      debt:debt,
      debtCount:debtCount,
      debtDetail:debtDetail,
      debtSelect:debtSelect,
      flagPay:flagPayDebt,
      idPayDebt:idPayDebt,
      tranzaction:allTranzaction,
      sumTranzaction:sumTranzaction,
      sortfamily:sortfamily,
      underName:underName,
      tranzactionFamily:allTranzactionFamily,
      sumFamilyTranzaction:sumFamilyTranzaction,
      tranzactionDebt:tranzactionDebt,
      idsortDebt:idSortDebt
    });

}

fun();
  }

})
router.post('/CheckSort', function (req, res) {
  res.redirect('/userPage?id='+id+'&sort='+req.body.example);
});
router.post('/CheckSortData', function (req, res) {
  res.redirect('/userPage?id='+id+'&between='+req.body.example1[0]+'&and='+req.body.example1[1]);
});
router.post('/CheckSortDataFamily', function (req, res) {
  res.redirect('/userPage?id='+id+'&family&between='+req.body.example1[0]+'&and='+req.body.example1[1]);
});
router.post('/CheckSortDataFin', function (req, res) {
  res.redirect('/userPage?id='+id+'&sort=financedata&between='+req.body.example1[0]+'&and='+req.body.example1[1]);
});
router.post("/AddTranzaction", function (req, res) {
   var nomoney = "false";
   var fun = async function () {

     let date = req.body.example1[0];
    let cat = req.body.example1[1];
    let pay = req.body.example1[2];
    let cashAdd = req.body.example1[3];
    let sum = req.body.example1[4];

    let Category = new DbCategory();
    let Tranzaction = new DbTranzaction();
    let id_cat = await Category.getCategoriesId(cat);
    let Resource = new DbResource();
    let Family = new DbFamily();
    let User = new DbUser();
    let cash =await Resource.GetMoney(id);
    let lastcash = cash.split(",")[0].replace(/\s/g, '');
    let role = await User.GetRole(id);
    let cashFamily;
    if (role=="admin") {
    cashFamily = await Family.GetMoney(id);
  } else cashFamily = await Family.GetMoneyUs2(id);

    if (cashAdd=="Self"){
    if (Number(lastcash)>=Number(sum)){
    let category = await Category.setTranzaction(id,id_cat,pay,-sum,date);
    let chartTran = await Tranzaction.setChartTranzaction(id,id_cat,pay,sum,date);
    let newcash = Number(lastcash)-Number(sum);
    let update_cash = await Resource.SetMoney(Number(newcash),id)
  } else {
     nomoney="true";
        }
      } else {
        if (Number(cashFamily)>=Number(sum)){
          let famTran = await Family.setTranzaction(id,sum,date,id_cat,pay);
          let chartFam = await Family.setChartTranzaction(id,-sum,date,id_cat,pay);
          let id_us2;
          if (role=="admin") {
             id_us2 = await User.underUser(id);
          } else id_us2 = await User.AdminUser(id);
          let familyCash = await Family.familycash(id,id_us2,"Снятие",sum)
          let newcash = Number(cashFamily)-Number(sum);
          let update_cash ;
          if (role=="admin") {
            update_cash = await Family.SetMoney(Number(newcash),id);
          } else {
          update_cash=await Family.SetMoneyUs2(Number(newcash),id)
          }
        } else {
           nomoney="true";
              }
      }
        res.redirect('/userPage?id='+id+"&pay&nomoney="+nomoney);
   }
   fun();

});
router.post("/AddFinance", function (req, res) {
   var fun = async function () {
     let date = req.body.example1[0];
    let cat = req.body.example1[1];
    let pay = req.body.example1[2];
    let sum = req.body.example1[3];
    let Category = new DbCategory();
    let Resource = new DbResource();
    let id_cat = await Category.getFinanceId(cat);
    let category = await Category.setTranzaction(id,id_cat,pay,sum,date);
    let cash =await Resource.GetMoney(id);
      let lastcash = cash.split(",")[0].replace(/\s/g, '');
      let newcash = Number(lastcash)+Number(sum);
      let update_cash = await Resource.SetMoney(Number(newcash),id)
   }
   fun();
  res.redirect('/userPage?id='+id+"&pay");
});


router.post('/Balance', function (req, res) {
   var fun = async function () {
     let Resourse = new DbResource();
    let setBalance = Resourse.SetMoney(req.body['cash'].split(",")[0],id)
   }
   fun();
  res.redirect('/userPage?id='+id);
});
router.post("/DebtMoney", function (req, res) {
   var fun = async function () {
     let names = req.body.example1[0];
     let name = req.body.example1[1];
     let period = req.body.example1[2];
     let dateBegin = req.body.example1[3];
     let dateEnd = req.body.example1[4];
     let payment = req.body.example1[5];
     let sum = req.body.example1[6];
     if (payment=="") {
       payment = 0;
     }
     //(user_id,sum,name,datebegin,period,dateend,rest,payment
     let Debt = new DbDebt();
     let Resource = new DbResource();
     let newDebt = await Debt.CreateDebt(id,sum,name,dateBegin,period,dateEnd,sum,payment,names);
     let cash =await Resource.GetMoney(id);
       let lastcash = cash.split(",")[0].replace(/\s/g, '');
       let newcash = Number(lastcash)+Number(sum);
       let update_cash = await Resource.SetMoney(Number(newcash),id)
   }
   fun();
  res.redirect('/userPage?id='+id+"&money");
});
router.use("/DebtPay", function (req, res) {
  var fan=async function () {
  var Debt = new DbDebt();
var nomoney = "false";
  var idPayDebt = req.body.example1;
  let sum = req.body.payment;
  let Tranzaction = new DbTranzaction();
  let Resource = new DbResource();
  let cash =await Resource.GetMoney(id);
  let lastcash = cash.split(",")[0].replace(/\s/g, '');
  if (Number(lastcash)>=Number(sum)){
  let setPay = await Debt.setDebtTranzaction(id,idPayDebt,sum);
  let sumDebt = await Debt.GetDebtbyId(idPayDebt);
  let rest = Number(sumDebt) - Number(sum);
  let payDebp = await Debt.PayDebt(idPayDebt,rest);
  let newcash = Number(lastcash)-Number(sum);
  let update_cash = await Resource.SetMoney(Number(newcash),id)
} else {
   nomoney="true";
      }
      res.redirect('/userPage?id='+id+"&money&noDebtmoney="+nomoney);
 }
 fan();
//  res.redirect('/userPage?id='+id+"&money&DebtPay=true&idPayDebt="+idPayDebt);
});
router.use("/DebtSelect", function (req, res) {

      res.redirect('/userPage?id='+id+"&money&debtSelect="+req.body.example1);

//  res.redirect('/userPage?id='+id+"&money&DebtPay=true&idPayDebt="+idPayDebt);
});
router.post('/DateTranzaction', function (req, res) {
  res.redirect('/userPage?id='+id+'&tranzaction&datetranzaction='+req.body.example1);
});

router.use("/SendFamilyFinance", function (req, res) {
  var fan=async function () {
      let Family = new DbFamily();
      let sum = req.body.example;
      let Resource = new DbResource();
      let User = new DbUser();
      let cash = await Resource.GetMoney(id);
        let lastcash = cash.split(",")[0].replace(/\s/g, '');
      if (Number(lastcash)>=sum) {
        let newcash = Number(lastcash)-Number(sum);
        let updateCashUser = await Resource.SetMoney(newcash,id);
          let newsum;

        let updateCashFam;
        let role =await User.GetRole(id);
        let id_us2;
        if (role=="admin") {
          newsum = await Family.GetMoney(id);
         newsum = Number(newsum)+Number(sum);
           updateCashFam = await Family.SetMoney(newsum,id);
          id_us2 = await User.underUser(id);

        } else {
          id_us2 = await User.AdminUser(id);
          newsum = await Family.GetMoneyUs2(id);
         newsum = Number(newsum)+Number(sum);
           updateCashFam = await Family.SetMoneyUs2(newsum,id);
        }

        let familyCash = await Family.familycash(id,id_us2,"Пополнение",sum)
      }

      res.redirect('/userPage?id='+id+"&finance");
 }
 fan();

});

router.use("/TakeFamilyFinance", function (req, res) {
  var fan=async function () {
      let Family = new DbFamily();
      let sum = req.body.example1;
      let Resource = new DbResource();
      let User = new DbUser();
        let role =await User.GetRole(id);
        let cashFam;
        let id_us2;
        if (role=="admin"){
          cashFam = await Family.GetMoney(id);
            id_us2 = await User.underUser(id);
        } else {
            id_us2 = await User.AdminUser(id);
          cashFam = await Family.GetMoneyUs2(id);
        }
          if (Number(cashFam)>=sum) {
            let newcash = Number(cashFam)-Number(sum);
            if (role=="admin"){
            let update_cash = await Family.SetMoney(newcash,id);
            } else {
              let update_cash = await Family.SetMoneyUs2(newcash,id);
            }
              let familyCash = await Family.familycash(id,id_us2,"Снятие",sum);
              let cashUs = await Resource.GetMoney(id);
              let newbalance =cashUs.split(",")[0].replace(/\s/g, '');
              newbalance = Number(newbalance)+Number(sum);
              let up_balance =  await Resource.SetMoney(newbalance,id);
          }

      res.redirect('/userPage?id='+id+"&finance");
 }
 fan();

});

router.post('/TranzactionFamilyDate', function (req, res) {

  res.redirect('/userPage?id='+id+'&familytranzaction&datetranzactionfamily='+req.body.example1);
});
router.post('/TranzactionFamily', function (req, res) {

  res.redirect('/userPage?id='+id+'&familytranzaction&sortfamily='+req.body.example1);
});
router.post('/TranzactionFamilyDateName', function (req, res) {

  res.redirect('/userPage?id='+id+'&familytranzaction&datefamily='+req.body.example1[0]+'&familyname='+req.body.example1[1]);
});
router.post('/TranzactionFamilyName', function (req, res) {
  res.redirect('/userPage?id='+id+'&familytranzaction&name='+req.body.example1);
});

router.post('/ShowDebtTranzaction', function (req, res) {
    res.redirect('/userPage?id='+id+'&debttranzaction&idsortDebt='+req.body.example1);

});
router.post('/Setting', function (req, res) {
  var User = new DbUser();
  let fun = async function () {
    let editName = await User.EditName(req.body.example1,id);
    res.redirect('/userPage?id='+id+'&setting');
  }
  fun();


});
router.post('/SettingFamily', function (req, res) {
  var User = new DbUser();
  var Family = new DbFamily();
  let fun = async function () {
    console.log(req.body.example1);
    let us2_id = req.body.example1;
    let editFinance = await User.editUserFinance(us2_id);
    let newFinance = Family.CreateFinance(id,0);
    let editCash = await User.editUserCash(us2_id);
    let resourse = await User.editUserResource(us2_id);
    let transaction = await User.editUserTranzaction(us2_id);
    let famtransaction = await User.editUserFamTranzaction(us2_id);
    let editUs = await User.editUser(us2_id);
    usUnderName =false;
        res.redirect('/userPage?id='+id+'&setting');

  }
fun();

});
router.post("/Exit", function (req, res) {

  res.redirect('/');
});
module.exports = router
