var proxy = 'https://cryptic-headland-94862.herokuapp.com/';
var token ="";
$(document).ready(function(){
    function getGrade(tries) {
        $('html, body').animate({scrollTop:$('#console').position().top}, 'slow');
        $("#console").html("Status : Getting Step 2 grades (Attempt #"+tries.toString()+")... <img class='load' src='loading.gif' alt='.' />");
        $.ajax({
            type: "POST",
            url: proxy+"http://www3.reg.chula.ac.th/cureg-test/web/index.php?r=student-reg/getcr60",
            contentType:"application/x-www-form-urlencoded",
            data:{token:token},
            success: function (res) {
                if(res.code==200) {
                  var xdata=res.data.gradeAll;
                  var newdiv=$("<div></div>");
                  var xxdata,temp,tableman,tbody;
                  for(var i=0;i<xdata.length;i++) {
                    xxdata=xdata[i].detail;
                    temp=$("<div class='aTop'></div>");
                    temp.append("<h5 class='ud'>ภาคการศึกษา "+xdata[i].allyear+"/"+xdata[i].allsemester+"</h5>");
                    tableman=$("<table class='table table-bordered'></table>");
                    tableman.append("<thead class='thead-dark'><tr><th scope='col'>รหัสวิชา</th><th scope='col'>ชื่อวิชา</th><th scope='col'>หน่วยกิต</th><th scope='col'>เกรด</th></tr></thead>");
                    tablebody=$("<tbody></tbody>");
                    for(var i2=0;i2<xxdata.length;i2++)
                      tablebody.append("<tr><td>"+xxdata[i2].COURSECODE+"</td><td>"+xxdata[i2].NAMEENGLISHABBR+"</td><td>"+xxdata[i2].TOTALCREDIT+"</td><td>"+xxdata[i2].GRADE+"</td></tr>");
                    tableman.append(tablebody);
                    temp.append(tableman);
                    newdiv.append(temp);
                  }
                  $("#step2data").html(newdiv);
                  $("#console").text("Status : Done...Enjoy :)");
                  $('html, body').animate({scrollTop:$('#step2').position().top}, 'slow');
                }
                else{
                  alert(res.codeError);
                  $("#console").text("Status : Error , token expired , please try again");
                }
            },
            error: function () {
                setTimeout(function () {
                    getGrade(tries+1);
                }, 1000)
            }
        });
    }
    function getToken(data,tries) {
        $("#step2data").html("Waiting for data...");
        $("#step1data").html("Waiting for data...");
        $("#console").html("Status : Getting Step 1 token (Attempt #"+tries.toString()+")...  <img class='load' src='loading.gif' alt='.' />");
        $.ajax({
            type: "POST",
            url: proxy+"http://www3.reg.chula.ac.th/cureg-test/web/index.php?r=student-reg/login",
            contentType:"application/x-www-form-urlencoded",
            data:data,
            success: function (res) {
                if(res.code==200) {
                  token=res.data.token;
                  $("#step1data").html("<table class='table table-bordered'><thead class='thead-dark'><tr><th scope='col'>Field</th><th scope='col'>Data</th></tr></thead><tbody><tr><th scope='row'>ชื่อ</th><td>"+res.studentInfo.th_name+"</td></tr><tr><th scope='row'>คณะ</th><td>"+res.studentInfo.th_facName+"</td></tr><tr><th scope='row'>ภาควิชา</th><td>"+res.studentInfo.th_majorName+"</td></tr></tbody></table>")
                  getGrade(1);
                }
                else{
                  alert(res.codeError);
                  $("#console").text("Status : Error , double check username and password");
                }
            },
            error: function () {
                setTimeout(function () {
                    getToken(data,tries+1);
                }, 1000)
            }
        });
    }
    $("form").on("submit", function(event) {
       event.preventDefault();
       var nisitid = $("#nisitid").val();
       var password=$("#password").val();
       var data={username:nisitid,password:password};
       getToken(data,1);
    });
});
