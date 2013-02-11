guessnumber.shared.Ajax = function(){

	var misUtiles = guessnumber.shared.Genericos();
	var misDatos = guessnumber.shared.Datos();

	var iniciarAjax = function(options) {
		
		var _options = {
			'url' :'',
			'campoguardar' : 'otros',
			'callback' : function() {},
			'onquery' : function() {},
			'onerror' : function() {},
			'error' : {
				'errordefecto' : {
						'error': 'Desconocido',
						'message': 'Error no esperado, vuelva a intentarlo luego.'
				},
				'idmensaje' : 'noid',
				'camposerr' : {
						'numeroerror' : 'error',
						'mensajeerror' : 'message'
				}
			}
		};
		
		if(options != undefined)
		{
			for(var opt in options)
				_options[opt] = options[opt];
		
			var http = new XMLHttpRequest();

			http.onreadystatechange = function () {

				if(http.readyState < 4)
					_options.onquery();
				else
				{
					try{
						_options.error.recursoJSON = '';
						var responseTxt = http.responseText;
						myJSONObject = JSON.parse(responseTxt);

						if(existeError(myJSONObject, _options.error.camposerr.numeroerror))
							_options.error.recursoJSON = myJSONObject;
						else
							miResultado.setCampo({'campo': _options.campoguardar, 'valor' :  myJSONObject});
							
					}
					catch(err){ _options.error.recursoJSON =  _options.error.errordefecto; }

					if(mostrarError(_options.error))
							_options.onerror();
					else
							_options.callback();
					
				}
			}

			http.open("GET", _options.url, true);
			http.send(null);
		}
	};

	var mostrarLoader = function(options) {
		
		var _options = {
			'controles' : [],
			'mostrar' : false,
			'cargador' : 'noid'
		}

		if(options!=undefined)
		{
			for(var opt in options)
				_options[opt] = options[opt];
				
			var estado = (_options.mostrar) ? 'visible' : 'hidden';
			document.getElementById(_options.cargador).style.visibility = estado;
			misUtiles.chageComponentsStatus(_options);
		}
		
	};

	var mostrarError = function(options) {

		var estado = false;

		if(options.recursoJSON != undefined)
		{
			if(existeError(options.recursoJSON, options.camposerr.numeroerror))
			{
				var mensaje = options.recursoJSON[options.camposerr.numeroerror] + ': ' + miJSON.errores[options.recursoJSON[options.camposerr.numeroerror]];
				misUtiles.changeTextValue(options.idmensaje, mensaje);
				estado = true;
				if(options.focus != undefined)
					misUtiles.setFocusTextBox(options.focus);
			}
		}
		
		return estado;

	};

	var existeError = function(recursoJSON, campoVerificador) {

		return recursoJSON[campoVerificador] != undefined? true: false;

	};

	return {
		'iniciarAjax' : iniciarAjax,
		'mostrarLoader' : mostrarLoader
	};
}