
var taskID;

function isValidModelInput(modelString){
	if(containsColon(modelString)){
		return false;
	}
	return true;
}

function containsColon(stringInput){
	if(stringInput.contains(';')){
		alert("does contain a ;");
		return true;
	}
	return false;
}

function startBeforeEnd(startDateTime, endDateTime){
	alert("checking startBeforeEnd");
	var start = new Date(startDateTime);
	var end = new Date(endDateTime);
	var today = new Date();
	alert(start);
	if(start < end){
		return true;
	}
	return false;
}

/*
Validate if passwords are the same ______________________________
 */

$(document).ready(function() {
	$("#passwordRetype").keyup(validate);
});


function validate() {
	var password = $("#password").val();
	var passwordRetype = $("#passwordRetype").val();
	
	if(password == passwordRetype) {
		$("#validate-status").text("passwords match :)"); 
		document.getElementById("validate-status").style.color= "#14993E";
	}
	else {
		$("#validate-status").text("passwords don't match");  
		document.getElementById("validate-status").style.color= "#CC0000";
	}
}

/*
Register Memeber ______________________________
 */
function registerMember(memberData) {
    //clear existing  msgs
    $('span.invalid').remove();
    $('span.success').remove();

    $.ajax({
        url: 'rest/members',
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(memberData),
        success: function(data) {
            //console.log("Member registered");

        	//alert("Success");
            //clear input fields
            $('#reg')[0].reset();

            //mark success on the registration form
            $('#formMsgs').append($('<span class="success">Member Added</span>'));

           // updateMemberTable();
        },
        error: function(error) {
            if ((error.status == 409) || (error.status == 400)) {
                //console.log("Validation error registering user!");

                var errorMsg = $.parseJSON(error.responseText);

                $.each(errorMsg, function(index, val) {
                	$('#formMsgs').append($('<span class="invalid">' + val + '</span>').insertAfter($('#' + index)));
                });
            } else {
                //console.log("error - unknown server issue");
                $('#formMsgs').append($('<span class="invalid">Unknown server error</span>'));
            }
        }
    });
}


/*
Create Task______________________________________
 
 */


function createTask(taskData) {
    //clear existing  msgs
    $('span.invalid').remove();
    $('span.success').remove();

    $.ajax({
        url: 'rest/tasks',
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(taskData),
        success: function(data) {
            //console.log("Member registered");

        	//alert("Success");
            //clear input fields
            $('#reg')[0].reset();

            //mark success on the registration form
            $('#formMsgs').append($('<span class="success">Member Added</span>'));

            updateMemberTable();
            
            $('span.invalid').remove();
            $('span.success').remove();
        },
        error: function(error) {
            if ((error.status == 409) || (error.status == 400)) {
                //console.log("Validation error registering user!");

                var errorMsg = $.parseJSON(error.responseText);

                $.each(errorMsg, function(index, val) {
                	$('#formMsgs').append($('<span class="invalid">' + val + '</span>').insertAfter($('#' + index)));
                });
            } else {
                //console.log("error - unknown server issue");
                $('#formMsgs').append($('<span class="invalid">Unknown server error</span>'));
            }
        }
    });
}

/* Get the member template */
function getMemberTemplate() {
    $.ajax({
        url: "tmpl/task.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            updateMemberTable();
        }
    });
}

/* Builds the updated table for the member list */
function buildMemberRows(obj) {
    return _.template( $( "#task-tmpl" ).html(), {"obj": obj});
}

/* Uses JAX-RS GET to retrieve current member list */
function updateMemberTable() {
    $.ajax({
        url: "rest/tasks/"+localStorage.getItem("currentUserName"),
        cache: false,
        success: function(data) {
            $('#members').empty().append(buildMemberRows(data));
        },
        error: function(error) {
            //console.log("error updating table -" + error.status);
        }
    });
}


/*
 * Delete Task!!
 */
 
/* Uses JAX-RS GET to retrieve all imsi Numbers for start and end dateTimes*/
function deleteTask(taskId) {
	
	var r=confirm("Are you sure you want to delete this item?");
	if (r==true)
	  {

    $.ajax({
        url: "rest/tasks/deleteTask/"+taskId,
        type: "GET",
        cache: false,
        success: function(data) {
        	console.log("Task Deleted");

            //mark success on the registration form
            //$('#formMsgs').append($('<span class="success">Member Added</span>'));

            updateMemberTable();
        },
        error: function(error) {
        	console.log("Delete Error");
        }
    });
	  }
    
}


/*
 * Edit Task!!
 */

 /*
  * Button in the to do list to activate the form
  */
function editTask(taskId, task)
{
    taskID = taskId;
    
    document.location.href ="#openModal";
    
    document.getElementById("reg1").elements.namedItem("task1").value=task;

}

/*
 * Submit edit once complete
 */
function submitEdit(task) {
	
	//alert(task);
	
	 $.ajax({
	        url: "rest/tasks/editTask/"+task+"/"+taskID ,
	        type: "GET",
	        cache: false,
	        success: function(data) {
	            document.location.href = '#close';
	        	console.log("Task Edited");

	            updateMemberTable();
	        },
	        error: function(error) {
	        	console.log("Edit Error");
	        }
	    });

}
	 

