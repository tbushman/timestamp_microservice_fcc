var express = require('express');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.get(/(.+)/, function (req, res) {
	var dateInput = url.parse(req.url).pathname;
	dateInput = dateInput.replace(/%20/g, " ");
	res.render('index', {
		title: 'FCC Timestamp Microservice',
		response: formatDate(dateInput)
	});
});

app.post('/', urlencodedParser, function(req, res){
	var dateInput = req.body.date;	
	res.render('index', {
		title: 'FCC Timestamp Microservice',
		response: formatDate(dateInput)
	});
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate(dateInput){
	var newDate = new Date(''+dateInput+'');
	if (newDate == NaN || newDate == "Invalid Date") {
		var convertDate = new Date(dateInput*1000);
		if (convertDate == "Invalid Date" || convertDate == NaN) {
			response = {
				"unix": null,
				"natural": null
			}	
		} else {
			var year = convertDate.getFullYear();
			var month = months[convertDate.getMonth()];
			var day = convertDate.getDate();
			var unixDate = Math.floor(Date.parse(convertDate)/1000);
		}
	} else {
		var year = newDate.getFullYear();
		var month = months[newDate.getMonth()];
		var day = newDate.getDate();
		var unixDate = Math.floor(Date.parse(newDate)/1000);
	}
	var natural = ""+month+" "+day+", "+year+"";
	response = {
		"unix": unixDate,
		"natural": natural
	}
	return JSON.stringify(response);
}


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
