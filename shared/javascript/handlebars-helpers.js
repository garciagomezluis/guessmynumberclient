Handlebars.registerHelper('gravatar', function(id, tamano){
	if(id != undefined && tamano != undefined)
	{
		id = id.substr(0,8);
		var link = 'http://www.gravatar.com/avatar/' + id + '?d=retro&s=' + tamano; 
		var img = '<img alt="' + id + '" src="' + link + '"/>';
		return new Handlebars.SafeString(img);
	}
});

Handlebars.registerHelper('esJugando', function(id){

	if(id != undefined)
	{
		var resultado = miResultado.getCampo({'campo':'rivales'});
		var jugando = 'No';
		if(resultado.jugando != undefined)
			for(var i = 0, l = resultado.jugando.length; i < l; i++)
				if(resultado.jugando[i].datosrivales.publicUuid == id)
				{
					jugando = '¡Si!';
					break;
				}

		if(resultado.actual != undefined && resultado.actual.datosrivales != undefined && resultado.actual.datosrivales.publicUuid == id)
			jugando = 'Ahora!';

		return jugando;
	}
});

Handlebars.registerHelper('esVacio', function(condicional, options){

	if(condicional)
		return options.fn(this);
	else
		return options.inverse(this);

});

var compilarTemplate = function(options){

	var source = $('#' + options.idtemplate).html();
	var template = Handlebars.compile(source);
	var data = miResultado.getCampo({'campo':options.campo});
	$('#' + options.idmostrar).html(template(data));

}