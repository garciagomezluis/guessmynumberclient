guessnumber.shared.Datos = function() {

	var idcontroles = {
		'panellogin': 'login',
		'panelgeneral': 'panel',
		'txtservidor': 'idtxt_servidor',
		'txtpuerto': 'idtxt_puerto',
		'txtnombre': 'idtxt_nombre',
		'txtnumerosetear': 'idtxt_numero',
		'txtnumeroadivinar': 'idtxt_adivinar',
		'btnlimpiar': 'btn_limpiar',
		'btnregistrar': 'btn_registrar',
		'btnenviarnumero': 'btn_enviarnumero',
		'btnaleatorio': 'btn_aleatorio',
		'msgregistrar': 'mensaje_registrar',
		'msgsetear': 'mensaje_setear',
		'msgadivinar': 'mensaje_jugar',
		'msgestado': 'mensajes',
		'tbljugadores': 'tabla_jugadores',
		'tblpartida': 'tabla_partida',
		'panelsetear': 'contenido_setear',
		'paneljugadores': 'contenido_datos',
		'paneladivinar': 'contenido_jugar',
		'cargador': 'cargador',
		'presentacion': 'presentacion',
		'mostrarjugadores': 'mostrar_jugadores',
		'templatelistajugadores': 'datos-jugadores-template',
		'templatelistarivales': 'datos-rivales-template'
	};

	var namecontroles = {
		'filasjugadores': 'filas_jugadores',
		'filasrivales': 'filas_rivales'
	};

	const _AGREGARJUGADOR = 0;
	const _SETEARNUMERO = 1;
	const _ADIVINARNUMERO = 2;
	const _CONSULTARESTADO = 3;
	const _INDEFINIDO = 4;

	const _FOCUS = 10;
	const _SELECT = 11;

	return {
		'idcontroles': idcontroles,
		'namecontroles': namecontroles,
		'_ACCIONAGREGARJUGADOR': _AGREGARJUGADOR,
		'_ACCIONSETEARNUMERO': _SETEARNUMERO,
		'_ACCIONADIVINARNUMERO': _ADIVINARNUMERO,
		'_ACCIONCONSULTARESTADO': _CONSULTARESTADO,
		'_ACCIONINDEFINIO': _INDEFINIDO,
		'_SETFOCUS' : _FOCUS,
		'_SETSELECT' : _SELECT
	};
	
};
guessnumber.shared.Resultado = function() {

	//almacenará todos los resultados devueltos del servidor.
	var resultado = {
		'rivales': {}
	};
	
	var setCampo = function(options) {
		resultado[options.campo] = options.valor;
	};
	
	var getPath = function(options) {
		var temporal = eval(options.path) != undefined ? eval(options.path) : undefined;
		return temporal;
	};
	
	var getCampo = function(options) {
		return resultado[options.campo];
	};

	var setResultado = function(options) {
		resultado = options;
	};
	
	var getResultado = function() {
		return resultado;
	};
	
	var getJSON = function() {
		return JSON.stringify(resultado);
	};

	return {
		'setResultado': setResultado,
		'getResultado': getResultado,
		'setCampo': setCampo,
		'getCampo': getCampo,
		'getJSON': getJSON,
		'getPath': getPath,
	};
};
