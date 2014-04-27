/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//var j;

 var days = ["Date","Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      
 var tableNumber;
 
 var tableRow;
 
 var cellHeight;
 
 var numbOfHours;
 
 var endTime;
 
 /*
  * Creates the table to display onload of the index.html page
  * 
  */

function createTable() {
       
        // creates <table> and <tbody> elements
       
       //Loops through each day in the array
        for(var k=0; k<days.length; k++){
         // get the reference for the body
        var mybody = document.getElementsByTagName("body")[0];
          
        
        mytable     = document.createElement("table");
        mytablebody = document.createElement("tbody");
        //Sets the title in the first row
        mytable.setAttribute("id",""+days[k]+"");         
        // creates a <tr> element
        mycurrent_row = document.createElement("tr");
        // creates a <td> element
        mycurrent_cell = document.createElement("th");
        // creates a Text Node with the days
        currenttext = document.createTextNode(days[k]);
        // appends the Text Node we created into the cell <td>
        mycurrent_cell.appendChild(currenttext);
        // appends the cell <td> into the row <tr>
        mycurrent_row.appendChild(mycurrent_cell);
         // appends the row <tr> into <tbody>
         mytablebody.appendChild(mycurrent_row);

            
        // creating all cells from 0 to 24 under the Date column
       if(k===0){
        for(var j = 0; j < 24; j++) {
            // creates a <tr> element
            mycurrent_row = document.createElement("tr");
            // creates a <td> element
            mycurrent_cell = document.createElement("td");
                // creates a Text Node to insert the times into the cells
                if(j<10){
                      currenttext = document.createTextNode("0"+ j+".00");  
                }else{
                    currenttext = document.createTextNode( j+".00");  
                }
            // appends the Text Node we created into the cell <td>
            mycurrent_cell.appendChild(currenttext);
            // appends the cell <td> into the row <tr>
            mycurrent_row.appendChild(mycurrent_cell);
            // appends the row <tr> into <tbody>
            mytablebody.appendChild(mycurrent_row);
        }
        }
        
        else{
            // creates the blank cells under each day
            for(var j = 0; j < 24; j++) {
                // creates a <tr> element
                mycurrent_row = document.createElement("tr");
                //ssets the id for the tr and td
                var id= j;
               // creates a <td> element
                mycurrent_cell = document.createElement("td");
                //setting cell id for the tr
                mycurrent_row.setAttribute("id",id);
                //set cell ID for td
                mycurrent_cell.setAttribute("id",id);
                /*
                 * Setting the td with an onlick function to show popUp to insert
                 * details of your appointment
                 */
                mycurrent_cell.setAttribute("onclick", "popUp('#openModal', "+k+", "+id+")");
                // appends the cell <td> into the row <tr>
                mycurrent_row.appendChild(mycurrent_cell);
                // appends the row <tr> into <tbody>
                mytablebody.appendChild(mycurrent_row);
            }
       }
        
        // appends <tbody> into <table>
        mytable.appendChild(mytablebody);
        // appends <table> into <body>
        mybody.appendChild(mytable);

    }
}

/*
 * 
 * @param {type} cell
 * @param {type} table
 * @param {type} title
 * @param {type} description
 * @param {type} numberOfHours
 * @param {type} backGroundColor
 * 
 * Inserts the title, description, time into the cell 
 */

function insertText(cell, table, title, description, numberOfHours, backGroundColor) {
    
    var currentHeight = eval(cellHeight);
    var currentCell= eval(cell);
    var hours = eval(numberOfHours);
    var displayHeight = currentHeight-2;
    var finishTime = currentCell+hours;
    var title1 = escape(title);
    var description1 = escape(description);
    
    //String to insert the inputs into the cells 
    var appDetails = "<td id="+cell+"><div><div style='overflow:auto; overflow-x: hidden; height:"+displayHeight+"px; width:123px;'<h4><strong>Title:</strong> "+title+"</h4><p>\n\
    <strong>Time:</strong> "+currentCell+":00-"+finishTime+":00<br><strong>Des:</strong> "+description+"</p></div>\n\
             <img src='img/pencil.png' alt='Edit' onclick=editCell("+cell+"," +table+ ",'" +title1+ "','"+description1+"',"+numberOfHours+",'"+backGroundColor+"')>\n\
            <img onclick='DeleteButton("+cell+", "+table+","+numberOfHours+")' src='img/delete.png' alt='Delete'></div></td>"+edit+"";
    
    //insert text into the particular table and row
     document.getElementById(days[table]).rows.namedItem(cell).innerHTML = appDetails;

}

/*
 * 
 * @param {type} cell
 * @param {type} table
 * @param {type} bckgroundColor
 * 
 * Changes the background color of the cell and sets the border thickness and 
 * color.
 */
        
function changeBackgroundColor(cell, table, bckgroundColor){
    
    //Sets the style by table id and row
    var x= document.getElementById(days[table]).rows.namedItem(cell);
       x.style.backgroundColor = bckgroundColor;
       x.style.borderStyle="Solid";
       x.style.borderWidth="3px";
  
  //sets the border color depending on the input color
       if(bckgroundColor==="red"){
            x.style.borderColor="darkred";}
       if(bckgroundColor==="blue"){
            x.style.borderColor="darkblue";}
       if(bckgroundColor==="green"){
            x.style.borderColor="darkgreen";}
        if(bckgroundColor==="cyan"){
            x.style.borderColor="darkcyan";}
       if(bckgroundColor==="lightgreen"){
            x.style.borderColor="green";}
        if(bckgroundColor==="yellow"){
            x.style.borderColor="gold";}
       if(bckgroundColor==="magenta"){
            x.style.borderColor="darkmagenta";}
  

}

/*
 * 
 * @param {type} cell
 * @param {type} table
 * @param {type} hours
 * 
 * Changes the height of the cell depending on the 
 * number of hours entered for the duration.
 * 
 */

function changeHeight(cell, table, hours){
        
        numberOfCells=hours-1; 
        
        if(numberOfCells===0){
              cellHeight=26;
        }
        if(numberOfCells>=1 && numberOfCells<2){
           cellHeight=26+29; 
        }
        if (numberOfCells>=2 && numberOfCells<8){
             cellHeight=23+(28*numberOfCells);
        }
        
            //Sets the cell Height by table id and row
           var x= document.getElementById(days[table]).rows.namedItem(cell);
    
           x.style.height=cellHeight+"px";
 
}

/*
 * 
 * @param {type} cellID
 * @param {type} numberOfHours
 * @param {type} tableName
 * 
 * Deletes the cells that the the appointment will cover
 * 
 */

function removeCells(cellID, numberOfHours ,tableName){
    //starts at the cell ahead
    var delCell = cellID+1;
    var hours = eval(numberOfHours);
    //loops through the number of hours-1 that the appointment lasts
    for(var i=0; i<(hours-1); i++){
        
        document.getElementById(days[tableName]).rows.namedItem(delCell).deleteCell(0);
        delCell++;
    }
      
}

/*
 * 
 * @param {type} cellID
 * @param {type} tableName
 * @param {type} numberOfHours
 * 
 * Delete called from the delete icon on the appointment
 * confirmation box appears to confirm you want to delete the 
 * appointment
 * 
 */

function DeleteButton(cellID, tableName, numberOfHours){
    
var r=confirm("Are you sure you want to Delete this Appointment");
if (r==true){ 
        var div = '#openModal';
        var time = eval(numberOfHours);
        var table = eval(tableName);
        var cell= eval(cellID);
            
            for(var i=cell; i<(cell+time); i++ ){
                var row = document.getElementById(days[table]).rows.namedItem(i);
                row.innerHTML ="<td id="+i+" onclick=popUp('"+div+"',"+table+","+i+") style='height:25px;, backgroundColor:#FFFFFF;'></td>";
                row.removeAttribute("style");
            }
     }
}
/*
 * 
 * @param {type} cellID
 * @param {type} tableName
 * @param {type} numberOfHours
 * 
 * adds blank cells
 * 
 */

function addCells(cellID, tableName, numberOfHours){
    
            var div = '#openModal';
//            tableNumber = table ;
//            rowNumber = row;
            var time = eval(numberOfHours);
            var table = eval(tableName);
            var cell= eval(cellID);
          //alert(cellID);
            
            for(var i=cell; i<=(cell+time+1); i++ ){
    
            var row = document.getElementById(days[table]).rows.namedItem(i);
                 // alert("row"+i);

            row.innerHTML ="<td id="+i+" onclick=popUp('"+div+"',"+table+","+i+") style='height:25px;, backgroundColor:#FFFFFF;'></td>";
            
            row.removeAttribute("style");
            
            }
    
}

/*
 * 
 * @param {type} cellID
 * @param {type} tableName
 * @returns {undefined}
 * 
 * adds back in blank cells
 */

function editAddCells(cellID, tableName){
    
            var div = '#openModal';
//            tableNumber = table ;
//            rowNumber = row;
            var time = eval(numbOfHours);
            var table = eval(tableName);
            var cell= eval(cellID);
          //alert(cellID);
            
            for(var i=cell; i<=(cell+time); i++ ){
    
            var row = document.getElementById(days[table]).rows.namedItem(i);
                 // alert("row"+i);

            row.innerHTML ="<td id="+i+" onclick=popUp('"+div+"',"+table+","+i+") style='height:25px;, backgroundColor:#FFFFFF;'></td>";
            
            row.removeAttribute("style");
            
            }
    
}


/*
 * 
 * @param {type} cellID
 * @param {type} tableName
 * @param {type} numberOfHours
 * @returns {String}
 * 
 * Checks if the cell is taken
 */

function checkIfTaken(cellID, tableName, numberOfHours){
    
   // alert("check: "+cellID+" tbale: "+tableName);
    hours = eval(numberOfHours);
    cell = eval(cellID);
    var unoccupied;
    
    var cellToCheck = cell;
    var finishCell = cell+hours-1;
    
    alert(finishCell +" cell: "+cellToCheck+" hours "+hours );
    
    if(finishCell<=24){
        
        while(cellToCheck<=finishCell){

            if(cellToCheck<=22){
                var cellCheck = document.getElementById(days[tableName]).rows.namedItem(cellToCheck).cells.namedItem(cellToCheck).innerHTML;

                //alert("content in td:"+cellCheck);

                if (cellCheck!==''){
                   unoccupied="FALSE";
                   //break;
                }
                else{
                unoccupied= null;
                }
                
            cellToCheck++;
            }
            if(cellToCheck===24||cellToCheck===23){
                
                var cellCheck = document.getElementById(days[tableName]).rows.namedItem(23).cells.namedItem(23).innerHTML;

                //alert("content in td:"+cellCheck);

                if (cellCheck!==''){
                   unoccupied="FALSE";
                   //break;
                }
                else{
                unoccupied= null;
                }
                
            }
             if(cellToCheck===23){
                
                var cellCheck = document.getElementById(days[tableName]).rows.namedItem(22).cells.namedItem(22).innerHTML;

                //alert("content in td:"+cellCheck);

                if (cellCheck!==''){
                   unoccupied="FALSE";
                   //break;
                }
                else{
                unoccupied= null;
                }
                
            }
            cellToCheck++;
        }
        } 
        else {

            unoccupied="FALSE";
        }
        
        return unoccupied;
}

/*
 * 
 * @param {type} cellID
 * @param {type} tableName
 * @param {type} numberOfHours
 * @returns {String}
 * 
 * Checks if the appointmetn clashes with any other one 
 */

function editCheckIfTaken(cellID, tableName, numberOfHours){
    
   // alert("check: "+cellID+" tbale: "+tableName);
    hours = eval(numberOfHours);
    cell = eval(cellID);
    var unoccupied;
    
    var cellToCheck = cell;
    var finishCell = hours;
    
    alert(finishCell +" cell: "+cellToCheck+" hours "+hours );
    
    if(finishCell<=24){
        
        while(cellToCheck<=finishCell){

            if(cellToCheck<=22){
                var cellCheck = document.getElementById(days[tableName]).rows.namedItem(cellToCheck).cells.namedItem(cellToCheck).innerHTML;

                alert("content in td:"+cellToCheck+" is "+cellCheck);

                if (cellCheck!==''){
                   unoccupied="FALSE";
                  
                }
                else{
                unoccupied= null;
                }
                
            cellToCheck+1;
            }
            if(cellToCheck===24||cellToCheck===23){
                
                var cellCheck = document.getElementById(days[tableName]).rows.namedItem(23).cells.namedItem(23).innerHTML;

                //alert("content in td:"+cellCheck);

                if (cellCheck!==''){
                   unoccupied="FALSE";
                   //break;
                }
                else{
                unoccupied= null;
                }
                
            }
             if(cellToCheck===23){
                
                var cellCheck = document.getElementById(days[tableName]).rows.namedItem(22).cells.namedItem(22).innerHTML;

                //alert("content in td:"+cellCheck);

                if (cellCheck!==''){
                   unoccupied="FALSE";
                   //break;
                }
                else{
                unoccupied= null;
                }
                
            }
            cellToCheck++;
        }
        } 
        else {

            unoccupied="FALSE";
        }
        
        return unoccupied;
}

/*
 * This is the function called when I click on a cell
 * 
 * My plan is to have a form that when you hit submit it will pass all the variables 
 * to this which will create your appointment. I don't have a form yet so the parameters are passed from the 
 * function when I click on  a cell.
 * 
 */

function myFunction(title, description, numberOfHours, backGroundColor)
{     
         
    var tableName= tableNumber;
    var cellID= rowNumber;
    
    var cellCheck = checkIfTaken(cellID, tableName, numberOfHours);
    
    //alert(cellCheck);
    
    if(cellCheck!=="FALSE"){
        
        document.location.href = '#close';
    
            //just a debug to see what is passed
        //alert("I am an alert box! cell: "+rowNumber+" Table: "+days[ tableNumber]+" Title:"+title+" des: "+description+" hours: "+numberOfHours+" bcolr "+backGroundColor);
        //Inserts text into the cell

        changeHeight(cellID, tableName, numberOfHours);

        insertText (cellID, tableName, title, description, numberOfHours, backGroundColor);
        //ChangeBackGround color
        changeBackgroundColor(cellID, tableName, backGroundColor);
        //changes the height depending on the number of hours the appoint will last
        removeCells(cellID, numberOfHours, tableName);
        reset();
    }
    else{
        // document.location.href = '#close';
     alert("Sorry this appointment is too long! Please choose another time"); 
    }

}
/*
 * 
 * @param {type} url
 * @param {type} table
 * @param {type} row
 * @returns {undefined}
 * 
 * Popup menu for appointment.
 */

  function popUp(url, table, row)
{
    tableNumber = table ;
    rowNumber = row;
    
   document.location.href = url;
   
   //insertForm(row, table);
   
   
}

/*
 * 
 * @param {type} row
 * @param {type} table
 * @param {type} title1
 * @param {type} description1
 * @param {type} numberOfHours
 * @param {type} backGroundColor
 * @returns {undefined}
 */


function editCell(row, table, title1, description1, numberOfHours, backGroundColor)
{
    tableNumber = table ;
    tableRow = row;
    numbOfHours= eval(numberOfHours);
    
    var title = unescape(title1);
    var description = unescape(description1);
    
    document.location.href ="#openModal1";
    
    document.getElementById("myForm1").elements.namedItem("title").value=title;
    document.getElementById("myForm1").elements.namedItem("description").value=description;
    document.getElementById("myForm1").elements.namedItem("hours").value=numberOfHours;
    document.getElementById("myForm1").elements.namedItem("color").value=backGroundColor;

}


function edit(title, description, numberOfHours, backGroundColor){
    
    var tableName= tableNumber;
    var cellID= tableRow;
    var newHours= eval(numberOfHours);
    var newFinishHour= newHours+cellID-1;
    var totalHours= tableRow+numbOfHours;
    var extraHoursToCheck=newFinishHour-totalHours;
        
   
   //alert("totalhours"+totalHours+"new finish"+newFinishHour+"extra hours"+extraHoursToCheck);
//Check if the new edit is a longer appointment
    if(newFinishHour>totalHours){ 
                
       var cellCheck = editCheckIfTaken(totalHours, tableName, newFinishHour);
       
                if(cellCheck!=="FALSE"){
                 //close the form
                 document.location.href = '#close';
                 //add cells back in
                 editAddCells(cellID, tableName);
                 //removes the unwanted cells
                 removeCells(cellID, numberOfHours, tableName);
                 //changes the height depending on the number of hours the appoint will last
                 changeHeight(cellID, tableName, numberOfHours);
                 //Inserts text into the cell
                 insertText (cellID, tableName, title, description, numberOfHours, backGroundColor);
                 //ChangeBackGround color
                 changeBackgroundColor(cellID, tableName, backGroundColor);}
                else{
                   alert("Sorry this appointment is too long! Please choose another time"); 
                }
    
   }
   else{
        //closes the popup
        document.location.href = '#close';
        //add cell back in
        editAddCells(cellID, tableName);
        //change cell height
        changeHeight(cellID, tableName, numberOfHours);
        //Inserts text into the cell
        insertText (cellID, tableName, title, description, numberOfHours, backGroundColor);
        //ChangeBackGround color
        changeBackgroundColor(cellID, tableName, backGroundColor);
        //Delete the cells taken up by the appointment
        removeCells(cellID, numberOfHours, tableName);

    }
       
}

/*
 * Resets the form
 */
function reset()
{
document.getElementById("myForm").reset();
}



