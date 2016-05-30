var http = require('http');
var soap = require("soap");
var parseString = require('xml2js').parseString;

http.createServer(function (request, response)
{
	console.log('request starting...');

	var url = 'https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL';
	var args = {name: 'value'};
	soap.createClient(url, function(err, client) {
	    client.TipoCambioDiaString(function(err, xmlResults) {
	    	if(err) console.log(err);
	        xml = xmlResults.TipoCambioDiaStringResult;
	        parseString(xml, function (err, result) {
	        	//console.dir(result);
	        	//console.dir(result.InfoVariable);
	        	//console.dir(result.InfoVariable.CambioDolar[0]);
				//console.dir(result.InfoVariable.CambioDolar[0].VarDolar[0]);
				//console.dir(result.InfoVariable.CambioDolar[0].VarDolar[0].referencia[0]);
				response.end(result.InfoVariable.CambioDolar[0].VarDolar[0].referencia[0], 'utf-8');
			});
	    });
	});

	//response.writeHead(200, {'Content-type': 'text/html'});

	//var html = '<p>Hello World</p>';
	//var html = result;

	//response.end(html, 'utf-8');
}).listen(8125);

console.log('Server running at http://localhost:8125/');
