
google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);
//кол-во умнодить на сумму = сколько денег потрачено в этой
function drawChart() {
  var dates =  document.getElementsByClassName('diagramm1');
  var datess =  document.getElementsByClassName('diagramm');

  var newArray = new Array()
  for (var i = 0; i < datess.length; i++) {
      console.log(dates[i].title,datess[i].title);
    newArray.push([dates[i].title,datess[i].title])
  }
  console.log(newArray);
var data = new google.visualization.DataTable();
data.addColumn('string', 'Category');
data.addColumn('number', 'Sum');
for (var i = 0; i < newArray.length; i++) {
  var nun = newArray[i][0];

    console.log(Number(nun)+" JJJJ "+newArray[i][1]);
data.addRow([newArray[i][1],Number(nun)]);
}
var options = {
'colors': ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
  'is3D': true,
  'backgroundColor': 'transparent',
  'chartArea'    : { width: '95%', height: '65%'},
               'width':300,
               'height':280};

var chart = new google.visualization.PieChart(document.getElementById('chart_divPayHome'));
chart.draw(data, options);
}

google.charts.setOnLoadCallback(drawChartFin);
//кол-во умнодить на сумму = сколько денег потрачено в этой
function drawChartFin() {
  var dates =  document.getElementsByClassName('diagramm1Fin');
  var datess =  document.getElementsByClassName('diagrammFin');

  var newArray = new Array()
  for (var i = 0; i < datess.length; i++) {
      console.log(dates[i].title,datess[i].title);
    newArray.push([dates[i].title,datess[i].title])
  }
  console.log(newArray);
var data = new google.visualization.DataTable();
data.addColumn('string', 'Category');
data.addColumn('number', 'Sum');
for (var i = 0; i < newArray.length; i++) {
  var nun = newArray[i][0];

    console.log(Number(nun)+" JJJJ "+newArray[i][1]);
data.addRow([newArray[i][1],Number(nun)]);
}
var options = {
'colors': ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
  'is3D': true,
  'backgroundColor': 'transparent',
  'chartArea'    : {width: '95%', height: '65%'},
               'width':300,
               'height':280};


var chart = new google.visualization.PieChart(document.getElementById('chart_divFinance'));
chart.draw(data, options);
}
google.charts.setOnLoadCallback(drawChartPayFamily);

function drawChartPayFamily() {
  var dates =  document.getElementsByClassName('diagramm1');
  var datess =  document.getElementsByClassName('diagramm');

  var newArray = new Array()
  for (var i = 0; i < datess.length; i++) {
      console.log(dates[i].title,datess[i].title);
    newArray.push([dates[i].title,datess[i].title])
  }
  console.log(newArray);
var data = new google.visualization.DataTable();
data.addColumn('string', 'Category');
data.addColumn('number', 'Sum');
for (var i = 0; i < newArray.length; i++) {
  var nun = newArray[i][0];

    console.log(Number(nun)+" JJJJ "+newArray[i][1]);
data.addRow([newArray[i][1],Number(nun)]);
}
var options = {
colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
  is3D: true,
  backgroundColor: 'transparent',
  chartArea   : {left: 20, top: 21, width: '95%', height: '95%'},
               width:250,
               height:280};

var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
 }
google.charts.setOnLoadCallback(drawChartCategory);

function drawChartCategory() {
  var dates =  document.getElementsByClassName('diagrammSum');
  var datess =  document.getElementsByClassName('diagrammName');

  var newArray = new Array()
  for (var i = 0; i < datess.length; i++) {
      console.log(dates[i].title,datess[i].title);
    newArray.push([dates[i].title,datess[i].title])
  }
  console.log(newArray);
var data = new google.visualization.DataTable();
data.addColumn('string', 'Category');
data.addColumn('number', 'Sum');
for (var i = 0; i < newArray.length; i++) {
  var nun = newArray[i][0];

    console.log(Number(nun)+" JJJJ "+newArray[i][1]);
data.addRow([newArray[i][1],Number(nun)]);
}
var options = {
colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
  is3D: true,
  backgroundColor: 'transparent',
  chartArea   : {left: 20, top: 21, width: '95%', height: '95%'},
               width:250,
               height:280};

var chart = new google.visualization.PieChart(document.getElementById('chart_divDeposit'));
chart.draw(data, options);
 }
 google.charts.setOnLoadCallback(drawChartPay);

 function drawChartPay() {
   var dates =  document.getElementsByClassName('diagrammSumPay');
   var datess =  document.getElementsByClassName('diagrammNamePay');

   var newArray = new Array()
   for (var i = 0; i < datess.length; i++) {
       console.log(dates[i].title,datess[i].title);
     newArray.push([dates[i].title,datess[i].title])
   }
   console.log(newArray);
 var data = new google.visualization.DataTable();
 data.addColumn('string', 'Category');
 data.addColumn('number', 'Sum');
 for (var i = 0; i < newArray.length; i++) {
   var nun = newArray[i][0];

     console.log(Number(nun)+" JJJJ "+newArray[i][1]);
 data.addRow([newArray[i][1],Number(nun)]);
 }
 var options = {
 colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
   is3D: true,
   backgroundColor: 'transparent',
};

 var chart = new google.visualization.PieChart(document.getElementById('chart_divPay'));
 chart.draw(data, options);
  }
