//****************************LOGIN*******************************//

	// Length of time (in minutes before logout)
	var maxTime = 15;
    
    function pageRedirect(name, password) {

        $.ajax({
            url: "rest/members/login?name="+name+"&password="+password,
            type: "GET",
            cache: false,
            success: function(data) {
            	if (data.length > 0) {
            		$('#info').empty();
            		//alert("Success Login!!");
            		document.location.href = '/cd-html5-mobile/toDoList.html';
            		
            		addCurrentUserToLocalStorage(data);
            	} else {
            		$('#userPassWord').val('');
            		$('#info').removeClass("hidden");
            		$('#info').empty().append("<br/><center>Login for Username: '"+name+"' failed. Please try again.</center>");
                }
            },
            error: function(error) {
            	alert('login error');
//                document.location.href = '/loginFail.html';
            }
        });
    }
    
    function addCurrentUserToLocalStorage(data) {
    	localStorage.setItem("currentUserName", data[0]);
    	localStorage.setItem("currentUserType", data[2]);
    }