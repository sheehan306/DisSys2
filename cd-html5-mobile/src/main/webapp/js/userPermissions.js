//**************************** User Permissions *******************************//

	function logout() {
		clearUser();
    	window.location.replace("index.html");
	}

	function createUser() {	
    	window.location.replace("register.html");
	}
	
	function home() {	
        	window.location.replace("index.html");
    	}

    function clearUser() {
    	localStorage.clear();
    }
    
    function checkUser() {
    	var userType = localStorage.getItem("currentUserName");
    	if(userType == null) {
    		window.location.replace("index.html");
    	} 
    }
    
    function supportEngineerCheck() {
    	var userType = localStorage.getItem("currentUserType");
    	if(userType == "Support Engineer" || userType == "Network Management Engineer") {
        	var userName = localStorage.getItem("currentUserName");
        	setUserType(userType, userName);
    	} else {
        	window.location.replace("index.html");
    	}
    }
    
    function networkManagementEngineerCheck() {
    	var userType = localStorage.getItem("currentUserType");
    	if(userType == "Network Management Engineer") {
        	var userName = localStorage.getItem("currentUserName");
        	setUserType(userType, userName);
    	} else {
        	window.location.replace("index.html");
    	}
    }
    
    function administratorCheck() {
    	var userType = localStorage.getItem("currentUserType");
    	if(userType == "Administrator") {
        	var userName = localStorage.getItem("currentUserName");
        	setUserType(userType, userName);
    	} else {
        	window.location.replace("index.html");
    	}
    }
    
    function setUserType(type, name) {
    	var div = document.getElementById("userType");
    	div.innerHTML=type+" ("+name+")";
    }