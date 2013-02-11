window.onload = function() {

	var misUtiles = guessnumber.shared.Genericos();
	var miJquery = guessnumber.shared.Jquery();
	var misDatos = guessnumber.shared.Datos();

	misUtiles.placeHolder({
		'textbox': misDatos.idcontroles.txtservidor,
		'texto': 'Servidor'
	});

	misUtiles.placeHolder({
		'textbox': misDatos.idcontroles.txtpuerto,
		'texto': 'Puerto'
	});

	misUtiles.placeHolder({
		'textbox': misDatos.idcontroles.txtnombre,
		'texto': 'Nombre'
	});

	misUtiles.placeHolder({
		'textbox': misDatos.idcontroles.txtnumerosetear,
		'texto': 'Tu número!',
		'color': 'maroon'
	});

	misUtiles.placeHolder({
		'textbox': misDatos.idcontroles.txtnumeroadivinar,
		'texto': 'Intentá adivinar!',
		'color': 'maroon'
	});

	var txtservidor = document.getElementById(misDatos.idcontroles.txtservidor);
	var txtpuerto = document.getElementById(misDatos.idcontroles.txtpuerto);
	var txtnombre = document.getElementById(misDatos.idcontroles.txtnombre);
	var txtnumero = document.getElementById(misDatos.idcontroles.txtnumerosetear);
	var txtadivinar = document.getElementById(misDatos.idcontroles.txtnumeroadivinar);
	var btnlimpiar = document.getElementById(misDatos.idcontroles.btnlimpiar);
	var btnregistrar = document.getElementById(misDatos.idcontroles.btnregistrar);
	var btnenviarnumero = document.getElementById(misDatos.idcontroles.btnenviarnumero);
	var btnaleatorio = document.getElementById(misDatos.idcontroles.btnaleatorio);
	var lnkmostrarjugadores = document.getElementById(misDatos.idcontroles.mostrarjugadores);

	btnlimpiar.onclick = function() { 
			miEntorno.resetTextShown(miJSON.JSONLimpiarControlesRegistracion()); 
	};
	
	btnregistrar.onclick = function() {
	 	if(txtservidor.onchange() && txtpuerto.onchange() && txtnombre.onchange())
	 		miCliente.conectar();
	};
	
	btnenviarnumero.onclick = function() { 
		if(txtnumero.onchange())
			miCliente.setear();
	};

	btnaleatorio.onclick = function() {
		txtnumero.value = miEntorno.getAleatorio(4);
		btnenviarnumero.onclick();
	};

	lnkmostrarjugadores.onclick = function(){
		miJquery.showPanel({
			'paneles': miJquery.paneles,
			'panelabrir': misDatos.idcontroles.paneljugadores
		});
		$('#' + misDatos.idcontroles.mostrarjugadores).hide('fast');
	}
	
	txtadivinar.onkeydown = function(e) { 
		var key=e.keyCode || e.which;
		if (key==13)
			if(txtadivinar.onchange())
			miCliente.adivinar(); 
	};

	txtnumero.onkeydown = function(e) { 
		var key=e.keyCode || e.which;
		if (key==13)
			btnenviarnumero.onclick();
	};

	txtnombre.onkeydown = function(e) { 
		var key=e.keyCode || e.which;
		if (key==13)
			btnregistrar.onclick();
	};

	txtservidor.onchange = function() {
		var patron = miJSON.generarJSONPatrones(txtservidor.value,[
					miJSON.patrones.servidor_ip,
		 			miJSON.patrones.servidor_dir
				], misDatos.idcontroles.msgregistrar, miJSON.erroresPatrones.servidor);

		return miEntorno.validarPatron(patron);
	};

	txtpuerto.onchange = function() {
		var patron = miJSON.generarJSONPatrones(txtpuerto.value,[
					miJSON.patrones.puerto
				], misDatos.idcontroles.msgregistrar, miJSON.erroresPatrones.puerto);

		return miEntorno.validarPatron(patron);
	};

	txtnombre.onchange = function() {
		var patron = miJSON.generarJSONPatrones(txtnombre.value,[
					miJSON.patrones.nombre
				], misDatos.idcontroles.msgregistrar, miJSON.erroresPatrones.nombre);

		return miEntorno.validarPatron(patron);
	};

	txtnumero.onchange = function() {
				var patron = miJSON.generarJSONPatrones(txtnumero.value,[
					miJSON.patrones.numero
				], misDatos.idcontroles.msgsetear, miJSON.erroresPatrones.numero);

		return miEntorno.validarPatron(patron);
	};

	txtadivinar.onchange = function() {
				var patron = miJSON.generarJSONPatrones(txtadivinar.value,[
					miJSON.patrones.numero
				], misDatos.idcontroles.msgadivinar, miJSON.erroresPatrones.numero);

		return miEntorno.validarPatron(patron);
	};

	miJquery.showLogin({
		'textbox': misDatos.idcontroles.txtnombre,
		'operacion': misDatos._SETFOCUS
	});
};

guessnumber.shared.Jquery = function() {

	var misUtiles = guessnumber.shared.Genericos();
	var misDatos = guessnumber.shared.Datos();

	var mostrarPanel = function(options) {
		
		ocultarTodosPaneles(options)
		$('#' + options.panelabrir).show('fast');
		if(options.reset != undefined ) miEntorno.resetTextShown(options.reset);
		misUtiles.setFocusTextBox(options);
	};

	var ocultarTodosPaneles = function(options) {

		for(var i = 0; i < options.paneles.length; i++)
			$('#' + options.paneles[i].panelid).hide('fast');

	};
	
	var mostrarLogin = function(options) {
		$('#' + misDatos.idcontroles.panellogin).show('fast');
		misUtiles.setFocusTextBox(options);
	};

	var paneles = [
			{'panelid': 'contenido_setear'},
			{'panelid': 'contenido_jugar'},
			{'panelid': 'contenido_datos'}
			];
	
	return {
		'showPanel': mostrarPanel,
		'showLogin': mostrarLogin,
		'paneles': paneles
	};
	
};

	var miResultado = guessnumber.shared.Resultado();
	var miCliente = guessnumber.shared.Cliente();
	var miJSON = guessnumber.shared.DatosJson();
	var miEntorno = guessnumber.shared.Entorno();