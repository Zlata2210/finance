document.addEventListener('DOMContentLoaded', function(){
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    console.log("hhh", ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"");
    var name_input1 = document.getElementById('OneDate');



    var name_input2 = document.getElementById('TwoDate');

    if (document.getElementById('between').getAttribute('value')!="" && document.getElementById('and').getAttribute('value')!="") {
      name_input1.value = ""+document.getElementById('between').getAttribute('value');
      console.log("bet:"+document.getElementById('between').getAttribute('value'));
      name_input2.value = ""+document.getElementById('and').getAttribute('value');
    } else {
    if (day<=9) {
       name_input1.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";
name_input2.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";
          name_input1.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";
      name_input2.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +"0"+(day) +"";
    }else{
      name_input2.value = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
        name_input1.value =""+ year+ "-" + (("0" + month).slice(-2)) + "-" +(day)+"";
        name_input2.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
        name_input1.max = ""+year+ "-" + (("0" + month).slice(-2)) + "-" +(day) +"";
      }
    }

});
