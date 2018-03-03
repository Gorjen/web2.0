var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var path = require("path");
var users = [];
var usernames = [];
var info;

var server = http.createServer(function(request, response) {
	if (request.method == "GET") {
		info = querystring.parse(url.parse(request.url).query);
		var count = 0;
        for (var i in info) count++;
        var length = count;
		if (length == 0) {
			build(request, response, " ");
	    } else if (length == 1) {
		  	var j = -1;
		  	for (var x = 0; x < usernames.length; x++) {if (usernames[x] == info.username) j = x;}
		  	if (j == -1) build(request, response, " ");
		  	else show(response, users[j]);
	    }
	} else {
		var postData = "";
	    request.setEncoding("UTF-8");
	    request.addListener("data", function(postDataChunk) {
		    console.log(postDataChunk);
		    postData += postDataChunk;
		    console.log(postData);
	    });
        request.addListener("end", function() {
	 	    info = querystring.parse(postData);
	 	    console.log(info);
	 	    var flag = true;
	 	    for (i in users) {
		        for (value in info) {
			        if(info[value] === users[i][value]){
				         build(request, response, value);
				         flag = false;
			        }
				}
			}
	 	    if(check(info, request, response)){
		 	    show(response, info);
	  			users.push(info);
	  			usernames.push(info.username);	 	    	
	 	    }
	 	});
	}
});
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");
function build(request, response, val) {
	var filePath = "."+request.url;
    if (filePath == './') filePath = './signin.html';
    fs.readFile(filePath, function(error, content) {
		if (error) {
		    if(error.code == 'ENOENT'){
		        fs.readFile('./404.html', function(error, content) {
		            response.writeHead(200, { 'Content-Type': 'text/html' });
		            response.end(content, 'utf-8');
		        });
		    } else {
		        response.writeHead(500);
		        response.end('error: '+error.code+' ..\n');
		        response.end(); 
		    }
		} else {
		    response.writeHead(200, { 'Content-Type': 'text/html' });
		    response.end(content+val+"", 'utf-8');
		}
	});
}

function show(response, info) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<!DOCTYPE \"html\">");
	response.write("<html>");
	response.write("<head>");
	response.write("<meta charset=\"UTF-8\">");
	response.write("<title>Login Page</title>");
	response.write("</head>");
	response.write("<body>");
	response.write("</body>");
	response.write("</html>");
	response.end("用户名："+(info.username)+"\n学号："+(info.number)+"\n电话："+(info.phone)+"\n邮箱："+(info.email));

}