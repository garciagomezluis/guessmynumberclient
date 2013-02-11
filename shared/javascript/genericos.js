guessnumber.shared.Genericos = function() {

	var misDatos = guessnumber.shared.Datos();

	var placeHolder = function(options) {

		var _options = {
			'textbox' : '',
			'texto' : '',
			'color' : 'gray'
		};

		if(options != undefined)
			for(var opt in options)
				 _options[opt] = options[opt];


		if(_options.textbox != '')
		{
			var elemento = document.getElementById(_options.textbox);
			if(elemento != undefined)
			{
				_options.textbox = elemento;
				elemento.onfocus = function() { onTextFocus(_options) };
				elemento.onblur = function() { onTextBlur(_options) };
			}
		}
	}

	var onTextFocus = function(options) {

		if(options.textbox.value == options.texto)
		{
			options.textbox.value = '';
			options.textbox.style.color = '';
		}
	}

	var onTextBlur = function(options) {

		if(options.textbox.value == '')
		{
			options.textbox.value = options.texto;
			options.textbox.style.color = options.color;
		}
	}

	var cambiarEstadoComponentes = function(options) {
	
		var _options = {
			'controles':[],
			'inactivecolor': 'gray',
			'activecolor': 'white'
		};
		
		if(options != undefined)
		{
				for(var opt in options)
					_options[opt] = options[opt];
			
				for(var i = 0; i < _options.controles.length; i++)
				{
					var elemento = document.getElementById(_options.controles[i].control)
					if(elemento != null)
					{
						elemento.disabled = !elemento.disabled;
						if(elemento.type == 'text')
							if(elemento.disabled)
								elemento.style.backgroundColor = _options.inactivecolor;
							else
								elemento.style.backgroundColor = _options.activecolor;
					}
				}
		}
	}

	var focoTextBox = function(options) {

		var _options = {
			'textbox' : '',
			'operacion' : misDatos._SETFOCUS
		};
		
		if(options != undefined)
		{
			for(var opt in options)
				_options[opt] = options[opt];

			var elemento = document.getElementById(_options.textbox);
			if(elemento != null)
				if(_options.operacion == misDatos._SETFOCUS)
					elemento.focus();
				else
					elemento.select();
		}
	}

	var limpiarTextBox =  function(options) {
		
		var _options = {
			'textbox': []
		};
		
		if(options != undefined)
		{
			for(var opt in options)
				_options[opt] = options[opt];
				
			for(var i = 0; i < _options.textbox.length; i++)
			{	
				if(_options.textbox[i].textbox == undefined) _options.textbox[i].textbox = '';
				if(_options.textbox[i].placeholdertext == undefined) _options.textbox[i].placeholdertext = '';
			
				var elemento = document.getElementById(_options.textbox[i].textbox);

				if(elemento != undefined) elemento.value = _options.textbox[i].placeholdertext;
			}
		}
	}

	var getValoresCampos = function(options) {

		var respuesta = {
			'textbox': []
		};
		
		var _options = {
			'textbox':[]
		};
		
		if(options != undefined)
		{
			for(var opt in options)
				_options[opt] = options[opt];
										
			for(var i = 0; i < _options.textbox.length; i++)
			{
				var elemento = document.getElementById(_options.textbox[i].control);
				if(elemento != null)
				{
					respuesta.textbox.push({
						'textboxid': elemento.id,
						'name': elemento.name,
						'value': elemento.value
					});
				}
			}
		}
		
		return respuesta;
	}

	var cambiarTexto = function(idtitulo, nuevotexto) {

		if(idtitulo == undefined) idtitulo = 'noid';
		if(nuevotexto == undefined) nuevotexto = '';
	
		var estado = false;
		var elemento = document.getElementById(idtitulo);

		if(elemento != null)
		{	
			estado = true;
			elemento.innerHTML = nuevotexto;
		}

		return estado;
	}

	var crearElemento = function(options) {

		var _options = {
			'elemento': 'div',
			'contenido': '',
			'contenedor': '',
			'atributos': []
		};
		
		if(options!=undefined)
		{
			for(var opt in options)
				_options[opt] = options[opt];
		
			var elemento = document.createElement(_options.elemento);
			elemento.innerHTML = options.contenido;
			
			for(var i = 0; i < _options.atributos.length; i++)
			{
				var attr = document.createAttribute(_options.atributos[i].nombre);
				attr.value = _options.atributos[i].valor;
				elemento.setAttributeNode(attr);
			}

			var contenedor = document.getElementById(_options.contenedor);
			contenedor.appendChild(elemento);
		}
	}

	var validarExp = function(cadena, patron) {
		var reg = new RegExp(patron, 'g');
		return reg.test(cadena);
	}

	return {
		'placeHolder': placeHolder,
		'chageComponentsStatus': cambiarEstadoComponentes,
		'setFocusTextBox': focoTextBox,
		'resetTextBox': limpiarTextBox,
		'getTextBoxValues': getValoresCampos,
		'changeTextValue': cambiarTexto,
		'createElement': crearElemento,
		'RegExpr': validarExp
	};
}