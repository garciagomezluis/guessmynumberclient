guessnumber.shared.Cliente = function() {
	
	var misDatos = guessnumber.shared.Datos();
	var misUtiles = guessnumber.shared.Genericos();
	var miAjax = guessnumber.shared.Ajax();
	var urlServidor = '', intervalo;
	
	var conectar = function() { consultaAjax(miJSON.JSONRegistrar); };

	var setear = function() { consultaAjax(miJSON.JSONSetear); };

	var adivinar = function() { consultaAjax(miJSON.JSONAdivinar); };
	
	var consultaAjax = function(options) {

		var valores = misUtiles.getTextBoxValues(options.textbox);

		valores.accion = options.accion;
		valores.rest = options.rest;

		var url = getURLConsulta(valores);

		var ajaxParams = options.ajaxParams;
		ajaxParams.url = url,

		miAjax.iniciarAjax(ajaxParams);	
	};

	var getURLConsulta = function(options) {
	
		var url = '';
		var _options = {
			'textbox': [],
			'accion': misDatos._ACCIONINDEFINIDO,
			'rest': 'doc/'
		};
		
		if(options!=undefined)
		{
			for(var opt in options)
				_options[opt] = options[opt];
				
			switch(_options.accion)
			{
				case misDatos._ACCIONAGREGARJUGADOR:
					var nombre = options.textbox[2].value;
					setURLServidor({
						'servidor': options.textbox[0].value,
						'puerto': options.textbox[1].value
					});
					url	= urlServidor + _options.rest + nombre;
				break;
				case misDatos._ACCIONSETEARNUMERO:
					var numero = options.textbox[0].value;
					url = urlServidor + _options.rest + miResultado.getPath({'path': 'resultado.registro.privateUuid'}) + '/' + numero;
				break;
				case misDatos._ACCIONADIVINARNUMERO:
					var numero = options.textbox[0].value;
					url = urlServidor + _options.rest + miResultado.getPath({'path': 'resultado.registro.privateUuid'})    + '/'  + miResultado.getPath({'path': 'resultado.rivales.actual.datosrivales.publicUuid'})  + '/' + numero;
				break;
				case misDatos._ACCIONCONSULTARESTADO:
					url = urlServidor + _options.rest + miResultado.getPath({'path': 'resultado.registro.privateUuid'});
				break;
			}
		
		}
		return url;
	};

	var setURLServidor = function(options) {
		
		var _options = {
			'servidor' : 'http://127.0.0.1',
			'puerto': '9999'
		};
		
		if(options != undefined)
			for(var opt in options)
				_options[opt] = options[opt];
				
		urlServidor = _options.servidor + ':' + _options.puerto;	
	};

	return {
		'conectar': conectar,
		'setear': setear,
		'adivinar': adivinar,
		'consultaAjax': consultaAjax
	};
	
};