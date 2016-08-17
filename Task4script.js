function addRow(table) {
    if(table=="table1")
        {
            $("#table1").append(rowDetails()); 
        }    
    else {
            $("#table2").append('<tr><td>Semester '+$("#table2 tr").length+'</td><td><input type="text" class="semHours"></td><td><input type="text" class="semGPA"></td></tr>');
    }
}
function rowDetails() {
    return '<tr class="tableRows"><td><input type="text" name="course-name" class="courses"></td><td><input type="text" name="hours" class="hour"></td><td><select class="grades"><option value="0" class="single">Select</option><option value="4" class="single">A</option><option value="3.7" class="single">A-</option><option value="3" class="single">B</option><option value="2.7" class="single">B-</option><option value="2" class="single">C</option><option value="1.7" class="single">C-</option><option value="1.5" class="single">D</option><option value="1.7" class="single">D-</option></select></td></tr>';
}
$(document).ready(function() {
    
    var semhours= new Array();
    var CGPA=0;
    var totalHours=0;
    
    for(var i=1 ; i<=4 ; i++)
            addRow("table1"); 
    
    for(var i=1 ; i<=2 ; i++)
            addRow("table2");
 
    $(document).on('click', 'button[name="addCourse"]', function(){
        addRow("table1");
    });  
    
    $(document).on('click', 'button[name="addSemester"]', function(){
        addRow("table2");
    }); 
    
    $(document).on('click', 'button[name="calculateCGPA"]', function(){
        var semhours= new Array();
        var semgpa= new Array();
        CGPA=0;
        totalHours=0;
        
        $(".semHours").each(function() {
            if($(this).val()!="")
                semhours.push(parseFloat($(this).val(), 10));
        });
        
        $(".semGPA").each(function() {
            if($(this).val()!="")
                semgpa.push(parseFloat($(this).val(), 10));
        });
        
        if( semhours.length!= semgpa.length || semhours.length==0 || semgpa.length==0)
                alert("Complete the information!");

        else {
            totalHours=0;
            for( var i=0 ; i<semhours.length ; i++)
                {
                    CGPA+= parseFloat(semhours[i], 10)*parseFloat(semgpa[i], 10);
                    totalHours+= parseFloat(semhours[i], 10);
                }
            CGPA/=totalHours;
         
            alert("Your cummulative GPA is: " + CGPA.toFixed(3));
        } 
    }); 
    
    $(document).on('click', 'button[name="calculateGPA"]', function(){
        var hoursArr=  new Array();
        var gradesArr= new Array();
        var tot=0;
        
        $(".hour").each(function() {
            if($(this).val()!="")
                hoursArr.push(parseInt($(this).val(), 10));
        });
        $(".grades").each(function() {
            if($(this).val()!=0)
                gradesArr.push($(this).val());
        })
        
        if(gradesArr.length!=hoursArr.length || gradesArr.length==0 || hoursArr.length==0)
            alert("Complete the information!");
        
        else {
            var GPA=0;
            for(var i=0 ; i<hoursArr.length ; i++)
                {
                    GPA+= parseFloat(hoursArr[i], 10)*parseFloat(gradesArr[i], 10);
                    tot+= parseFloat(hoursArr[i], 10);
                }       

            GPA/=tot;
            alert("Your GPA is: "+GPA.toFixed(3));
        }
    });  
    $(document).on('click', 'button[name="predict"]', function(){
        $(".form1").css("display","block");
    }); 
    $(document).on('click', 'button[name="submitBtn"]', function(){
        alert(CGPA);
        if($("#cgpa1").val()=="" || $("#cgpa2").val()=="" || CGPA==0)
            alert("Complete the information!");
        else {
            var targetGPA= parseFloat($("#cgpa1").val());
            var semHours= parseFloat($("#cgpa2").val());
            
            var neededGPA=(((targetGPA*(totalHours+semHours))-(CGPA*totalHours)))/semHours;
            if(neededGPA>4)
                alert("you can't reach your target GPA");
            else 
                alert("you need a GPA of "+neededGPA.toFixed(3)+"to reach your target GPA");
        }   
    }); 
});
