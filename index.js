var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.get('/', function (req, res) {
  res.render('index', {title: 'FCC Timestamp Microservice'});
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
app.post('/process_post', urlencodedParser, function(req, res){
	/*response = {
		date: req.body.date
	};*/
	var data = req.body.date;
	var newDate = new Date(''+data+'');
	if (newDate == NaN || newDate == "Invalid Date") {
		console.log('noop');	
	} else {
		var year = newDate.getFullYear();
		var month = months[newDate.getMonth()];
		var day = newDate.getDate();
		var natural = ""+month+" "+day+", "+year+"";
		var unixDate = Math.floor(Date.parse(newDate)/1000);
		response = {
			"unix": unixDate,
			"natural": natural
		}
		console.log(JSON.stringify(response));
		res.render('index', {response: JSON.stringify(response)});
	}
	
	//res.end(JSON.stringify(response));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
