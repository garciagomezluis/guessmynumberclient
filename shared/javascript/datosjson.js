guessnumber.shared.DatosJson = function() {
	
		var misDatos = guessnumber.shared.Datos();
		var miAjax = guessnumber.shared.Ajax();
		var misUtiles = guessnumber.shared.Genericos();
		var miJquery = guessnumber.shared.Jquery();

		var patrones = {
			'servidor_dir': "^http:\/\/(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$",
			'servidor_ip': "^http:\/\/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$",
			'puerto':  "^\\s*\\d+\\s*$",
			'nombre': "^[A-Za-z0-9]+$",
			'numero': "^[0-9]{4}$"
		};

		var errorServer = {
			"520":"Este nombre de usuario ya est&aacute; registrado!",
			"521":"No estas registrado!",
			"523":"Ya ten&eacute;s un n&uacute;mero activado!",
			"525":"No ten&eacute;s un n&uacute;mero activado!",
			"526":"El usuario con el que est&aacute;s tratando de jugar ya no existe!",
			"527":"El usuario con el que est&aacute;s jugando no tiene un n&uacute;mero activado, quiz&aacute;s se lo adivinaron!",
			"528":"El n&uacute;mero ingresado no es correcto! Deben ser cuatro d&iacute;gitos no repetidos.",
			"529":"El usuario est&aacute; tratando de adivinar su propio n&uacute;mero.",
			"600":"No se pudo realizar la acci&oacute;n, compruebe los datos para la conexi&oacute;n con el servidor.",
			"601":"No se pudo realizar la acci&oacute;n, vuelva a intentar."
		};

		var errorLocal = {
			'numero' : 'El n&uacutemero debe tener cuatro d&iacute;gitos no repetidos.',
			'nombre' : 'El nombre debe tener car&aacute;cteres alfanum&eacute;ricos.',
			'servidor': 'El servidor debe introducirse en formato http://server.com o http://127.0.0.1.',
			'puerto': 'El puerto debe ser un n&uacute;mero.'
		};
	
		var bloqueo = {
				'registracion' :  [
					{'control': misDatos.idcontroles.txtservidor},
					{'control': misDatos.idcontroles.txtpuerto},
					{'control': misDatos.idcontroles.txtnombre},
					{'control': misDatos.idcontroles.btnlimpiar},
					{'control': misDatos.idcontroles.btn_registrar}
				],
				'setear' : [
					{'control': misDatos.idcontroles.txtnumerosetear},
					{'control': misDatos.idcontroles.btn_enviarnumero}
				],
				'adivinar' : [
					{'control': misDatos.idcontroles.txtnumeroadivinar}
				]	
		};
		
		var focusTextbox = {
				'registracion': misDatos.idcontroles.txtservidor,
				'setear': misDatos.idcontroles.txtnumerosetear,
				'adivinar': misDatos.idcontroles.txtnumeroadivinar,
		};
		
		var limpiarTextbox = {
				'registracion': [
					{'textbox': misDatos.idcontroles.txtservidor,'placeholdertext': 'Servidor'},
					{'textbox': misDatos.idcontroles.txtpuerto,'placeholdertext': 'Puerto'},
					{'textbox': misDatos.idcontroles.txtnombre,'placeholdertext': 'Nombre'}
				],
				'setear': [
					{'textbox': misDatos.idcontroles.txtnumerosetear}
				],
				'adivinar': [
					{'textbox': misDatos.idcontroles.txtnumeroadivinar}
				]
		};

		var limpiarControles = function(vtextbox, ftextbox){
			return {
				'limpiar':{
					'textbox' : vtextbox
				},
				'controles' : [
					{
						'control': 'mensaje',
						'tipo': 'class'
					}
				],
				'focus' : {
					'textbox': ftextbox,
					'operacion': misDatos._SETFOCUS
				}
			};
		};

		var mostrarCargador = function(vcontroles, mostrar, activecolor){
				return {
					'controles' : vcontroles,
					'activecolor' : activecolor,
					'mostrar' : mostrar,
					'cargador' : misDatos.idcontroles.cargador
				};	
		};

		var generarJSONPatrones = function(texto, arrpatron, idmensaje, error) {
			var data_patron = {
				'texto': texto,
				'idmensaje': idmensaje,
				'error': error,
				'patrones': []
			};

			for(var i = 0; i < arrpatron.length; i++)
				data_patron.patrones.push(
					{'patron': arrpatron[i]}
				);

			return data_patron;
		};

		var JSONRegistrar = {
				'textbox': { 'textbox': bloqueo.registracion },
				'accion' : misDatos._ACCIONAGREGARJUGADOR,
				'rest' : '/players/register/',
				'ajaxParams' : {
					'campoguardar' : 'registro',
					'callback' : function () {
									miAjax.mostrarLoader(mostrarCargador(bloqueo.registracion, false, 'white'));
									miEntorno.refreshPlayers(
											{
											'JSON' : JSONConsultar,
											'datos' : { 
												'interval': 1500,
												'datostabla' : {
													'idtabla': misDatos.idcontroles.tbljugadores,
													'campos': {
															'incluir': [
																{'nombre':'lista'},
																{'nombre':'numberActivated'},
																{'nombre':'numberId'},
																{'nombre':'score'}
															],
															'otros': [
																{'nombre':'publicUuid'},
																{'nombre':'numberActivated'}
															],
														'caritas':[
															{'nombre': 'correctChars'},
															{'nombre': 'existingChars'},
															{'nombre': 'wrongChars'}
														]
													},
													'seleccion':
													{
														'idtabla': misDatos.idcontroles.tblpartida,
														'incluir': [
															{'nombre': 'lista'},
															{'nombre': 'number'},
															{'nombre': 'correctChars'},
															{'nombre': 'existingChars'},
															{'nombre': 'wrongChars'}
														],
														'caritas':[
															{'nombre': 'correctChars'},
															{'nombre': 'existingChars'},
															{'nombre': 'wrongChars'}
														]
													}
												}
											}
										}
									);
									$('#' + misDatos.idcontroles.panellogin).hide('fast');
									$('#' + misDatos.idcontroles.panelgeneral).show('fast');
									$('#' + misDatos.idcontroles.mostrarjugadores).hide('fast');
									miJquery.showPanel({
										'paneles': miJquery.paneles,
										'panelabrir': misDatos.idcontroles.panelsetear,
										'textbox': misDatos.idcontroles.txtnumerosetear,
										'operacion': misDatos._SETFOCUS
									});
								  },
					'onquery' : function () { miAjax.mostrarLoader(mostrarCargador(bloqueo.registracion, true, 'white')); },
					'onerror' : function () { miAjax.mostrarLoader(mostrarCargador(bloqueo.registracion, false, 'white')); },
					'error': {
						'errordefecto' : { 'error' : '600' },
						'idmensaje' : misDatos.idcontroles.msgregistrar,
						'camposerr' : { 'numeroerror' : 'error' }
					}
				}
		};
	
		var JSONSetear = {
				'textbox': { 'textbox': bloqueo.setear },
				'accion' : misDatos._ACCIONSETEARNUMERO,
				'rest' : '/play/setnumber/',
				'ajaxParams' : {
					'campoguardar' : 'numero',
					'callback' : function() {
									var numero = miResultado.getCampo({'campo':'numero'}).number;
									miAjax.mostrarLoader(mostrarCargador(bloqueo.setear, false, 'inherit'));
									miEntorno.resetTextShown(limpiarControles(limpiarTextbox.setear, focusTextbox.setear));
									misUtiles.changeTextValue(misDatos.idcontroles.msgestado, 'N&uacute;mero agregado correctamente! Es: ' + numero);
									miEntorno.controlPartida();
									$('#' + misDatos.idcontroles.presentacion).show('fast');
									miJquery.showPanel({
										'paneles': miJquery.paneles,
										'panelabrir': misDatos.idcontroles.paneljugadores
									});
								},
					'onquery' : function() { miAjax.mostrarLoader(mostrarCargador(bloqueo.setear, true, 'inherit')); },
					'onerror' : function() { miAjax.mostrarLoader(mostrarCargador(bloqueo.setear, false, 'inherit')); },
					'error': {
						'errordefecto' : { 'error': '601' },
						'idmensaje' : misDatos.idcontroles.msgsetear,
						'camposerr' : { 'numeroerror' : 'error' }
					}
				}
		};

		var JSONConsultar = {
				'accion' : misDatos._ACCIONCONSULTARESTADO,
				'rest' : '/players/board/',
				'ajaxParams' : {
					'campoguardar' : 'consulta',
					'callback' : function() { miAjax.mostrarLoader({'mostrar' : false, 'cargador': 'cargador'}); },
					'onquery' : function() { miAjax.mostrarLoader({'mostrar' : true, 'cargador': 'cargador'}); },
					'onerror' : function() { miAjax.mostrarLoader({'mostrar' : false, 'cargador': 'cargador'}); },
					'error': {
						'errordefecto' : { 'error': '601' },
						'idmensaje' : misDatos.idcontroles.msgadivinar,
						'camposerr' : { 'numeroerror' : 'error' }
					}
				}
		};

		var JSONAdivinar = {
			'textbox': { 'textbox': bloqueo.adivinar },
				'accion' : misDatos._ACCIONADIVINARNUMERO,
				'rest' : '/play/guessnumber/',
				'ajaxParams' : {
					'campoguardar' : 'temporal',
					'callback' : function() {
									miEntorno.resetTextShown(limpiarControles(limpiarTextbox.adivinar, focusTextbox.adivinar));
									miEntorno.actualizarJugada({
														'idtabla': misDatos.idcontroles.tblpartida,
														'incluir': [
															{'nombre': 'lista'},
															{'nombre': 'number'},
															{'nombre': 'correctChars'},
															{'nombre': 'existingChars'},
															{'nombre': 'wrongChars'}
														],
														'caritas':[
															{'nombre': 'correctChars'},
															{'nombre': 'existingChars'},
															{'nombre': 'wrongChars'}
														]
									});
								},
					'error': {
						'errordefecto' : { 'error': '601' },
						'idmensaje' : misDatos.idcontroles.msgadivinar,
						'camposerr' : { 'numeroerror' : 'error' }
					}
				}
		};

		return {
			'JSONRegistrar': JSONRegistrar,
			'JSONSetear': JSONSetear,
			'JSONConsultar': JSONConsultar,
			'JSONAdivinar': JSONAdivinar,
			'JSONTextboxRegistracion': bloqueo.registracion,
			'JSONTextboxSetear': bloqueo.setear,
			'JSONTextboxJugar': bloqueo.adivinar,
			'JSONLimpiarControlesJugar': function(){ return limpiarControles(limpiarTextbox.adivinar, focusTextbox.adivinar); },
			'JSONLimpiarControlesRegistracion': function(){ return limpiarControles(limpiarTextbox.registracion, focusTextbox.registracion);},
			'JSONLimpiarControlesSetear': function(){ return limpiarControles(limpiarTextbox.setear, focusTextbox.setear);},
			'JSONVistaCargadorRegistracion': function(mostrar){ return mostrarCargador(bloqueo.registracion, mostrar, 'white');},
			'JSONVistaCargadorSetear': function(mostrar){ return mostrarCargador(bloqueo.setear, mostrar, 'inherit');},
			'patrones': patrones,
			'errores': errorServer,
			'erroresPatrones': errorLocal,
			'generarJSONPatrones': generarJSONPatrones
		};
};