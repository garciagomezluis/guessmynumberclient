guessnumber.shared.Entorno = function() {

		var misUtiles = guessnumber.shared.Genericos();
		var miJquery = guessnumber.shared.Jquery();
		var misDatos = guessnumber.shared.Datos();
		var intervalo_refresh, intervarlo_control;

		//de juego

		//
		var eliminarRivalActual = function(){
			var rivales = miResultado.getCampo({'campo':'rivales'});
			rivales.actual = undefined;
			miResultado.setCampo({'campo': 'rivales', 'valor': rivales});
		};

		//
		var actualizarEstadoPartida = function(){
			var resultado = miResultado.getResultado();

				for(var i = 0, l = resultado.consulta.players.length; i < l; i++)
					if(resultado.rivales.actual != undefined && resultado.rivales.actual.datosrivales != undefined && resultado.rivales.actual.datosrivales.publicUuid == resultado.consulta.players[i].publicUuid)
					{
						resultado.rivales.actual.datosrivales = resultado.consulta.players[i];
						break;
					}

			miResultado.setResultado(resultado);
		};

		//
		var comprobarBajas = function(){
			var retirados = actualizarListaJugadoresActuales();
			for(var i = 0, l = retirados.length; i < l; i++)
				console.log(retirados[i][0].datosrivales.publicUuid + ' se ha retirado del juego.');
		};

		//
		var iniciarPartida = function(options) {
			var jugadores = miResultado.getPath({'path': 'resultado.consulta.players'});
			var resultado = {
				'actual': miResultado.getPath({'path': 'resultado.rivales.actual'}),
				'jugando': miResultado.getPath({'path': 'resultado.rivales.jugando'})
			};
			var jugador;
			if(resultado.jugando == undefined) resultado.jugando = [];
			var idactual = resultado.actual != undefined ? resultado.actual.datosrivales.publicUuid : undefined;
			
			if(idactual != undefined)
			{
				if(idactual != options.idpublica) //si el seleccionado no es igual al actual
				{
					//codigo para agregar cuando está jugando
						jugador = buscarEnSuenos(options.idpublica, resultado) != false ? seleccionarJugador(options.idpublica, resultado) : buscarJugadorDePlayers(options.idpublica, jugadores);
						copiarActualJugando(resultado); //pasa el juego actual a jugando
						copiarJugadorActual(resultado, jugador); //pasa el juego seleccionado al registro actual
				}
			}
			else
			{
				//var jugador = seleccionarJugador(options['idpublica']);
				jugador = buscarJugadorDePlayers(options.idpublica, jugadores);
				resultado.actual = {};
				copiarJugadorActual(resultado, jugador); //pasa el juego seleccionado al registro actual
			}
			//console.log(JSON.stringify(resultado));
			miResultado.setCampo({'campo': 'rivales',
								  'valor': resultado});
								  
			var params = {
				'jugador' : resultado.actual,
				'idtabla' : options.seleccion.idtabla,
				'incluir' : options.seleccion.incluir,
				'caritas' : options.seleccion.caritas
			}
			cargarDatosPartida(params);
			$('#' + misDatos.idcontroles.mostrarjugadores).show('fast');
			miJquery.showPanel({
				'paneles': miJquery.paneles,
				'panelabrir': 'contenido_jugar',
				'textbox': misDatos.idcontroles.txtnumeroadivinar,
				'operacion': misDatos._SETFOCUS,
				'reset':{
					'limpiar':{
						'textbox': [
							{
								'textbox' : misDatos.idcontroles.txtnumeroadivinar
							}
						],
					},
					'controles': [
						{
							'control' : misDatos.idcontroles.msgadivinar,
							'tipo' : 'id'
						}
					]
				}
			});
		};
		
		//
		var arrToJson = function(res) {
			var str = JSON.stringify(res);
			var mijson = str.substring(1, str.length-1);
			return JSON.parse(mijson);
		};

		//
		var seleccionarJugador = function(idpublica, resultado) {
			var res = false;
			for(var i = 0; i < resultado.jugando.length; i++)
				if(resultado.jugando[i].datosrivales.publicUuid == idpublica)
					res = resultado.jugando.splice(i,1);

			return arrToJson(res);
		};

		//
		var buscarEnSuenos = function(idpublica, resultado) {
			var res = false;
			for(var i = 0; i < resultado.jugando.length; i++)
				if(resultado.jugando[i].datosrivales.publicUuid == idpublica)
					res = true;
			
			return res;
		};
		
		//
		var copiarActualJugando = function(resultado) {
			if(resultado.actual != undefined)
				resultado.jugando.push(resultado.actual);
		};
		
		//
		var copiarJugadorActual = function(resultado, jugador) {
			var jugadortxt = JSON.stringify(jugador);
			var indice = jugadortxt.indexOf("datos");
			if(indice == -1)
				resultado.actual = {
					'datosrivales': jugador,
					'jugadas': []
				};
			else
				resultado.actual = jugador;
		};
		
		//
		var buscarJugadorDePlayers = function(idpublica, players) {
			var jugadores = players;
			var res = false;
			for(var i = 0; i < jugadores.length; i++)
				if(jugadores[i].publicUuid == idpublica)
					res = jugadores[i];
				
			return res;
		};

		//
		var cargarDatosPartida = function(options) {
			eliminarFilasTabla({'idtabla': options.idtabla});
			var jugadas = options.jugador.jugadas;
			var tabla = document.getElementById(options.idtabla);
			var imejorjugada = buscarMejorJugada();
			for(var i = 0; i < jugadas.length; i++)
			{
				var fila = tabla.insertRow(1);
				var celdaposicion = 0;
				var contenido = 'Sin contenido';
				
				if(i == imejorjugada.iteracion)
				{
					fila.style.backgroundColor = 'black';
					fila.style.color = 'white';
				}

				for(var opt in jugadas[i])
				{
					var existecampo = false;
								//iteramos en los campos para mostrarlos
								for(var j = 0; j < options.incluir.length; j++)
								{
									if(opt == options.incluir[j].nombre)
									{
										var caritas = false;

										for(var k = 0; k < options.caritas.length; k++)
										{
											if(opt == options.caritas[k].nombre)
											{
												caritas = true;
												contenido = getCarita(options.caritas[k].nombre, jugadas[i][opt]);
												existecampo = true;
												break;
											}
										}

										if(!caritas)
										{
											contenido = jugadas[i][opt];
											existecampo = true;
											break;
										}
									}
								}
								
					if(existecampo) 
					{
						var celda = fila.insertCell(celdaposicion++);
						celda.innerHTML = contenido;
					}
				
				}
			}
		};
		
		//
		var actualizarJugadaActual = function(options) {
			var resultado = miResultado.getResultado();
			resultado.rivales.actual.jugadas.push(resultado.temporal);


			var params = {
				'jugador' : resultado.rivales.actual,
				'idtabla' : options.idtabla,
				'incluir' : options.incluir,
				'caritas' : options.caritas
			}
			cargarDatosPartida(params);
		};

		//
		var validarPatron = function(options){
				var estado = false;

				for(var i = 0, l = options.patrones.length; i < l; i++)
					if(!misUtiles.RegExpr(options.texto, options.patrones[i].patron))
						misUtiles.changeTextValue(options.idmensaje, options.error);
					else
					{
						misUtiles.changeTextValue(options.idmensaje,'');
						estado = true;
						break;
					}

						
				return estado;
		};

		//
		var actualizarListaJugadoresActuales = function(){
			var jugadores = miResultado.getCampo({'campo':'consulta'}).players;
			var rivales = miResultado.getCampo({'campo':'rivales'});
			var retirados = new Array();

			if(rivales.jugando != undefined)
			{
				for(var i = 0; i < rivales.jugando.length; i++)
				{
					var existe = false;
					for(var j = 0, l2 = jugadores.length; j < l2; j++)
					{
						if(jugadores[j].publicUuid == rivales.jugando[i].datosrivales.publicUuid && jugadores[j].numberActivated)
						{
							existe = true;
							break;
						}
					}

					if(!existe) {retirados.push(rivales.jugando.splice(i,1));i--;}
				}
				miResultado.setCampo({'campo':'rivales','valor':rivales});
			}

			return retirados;
		};

		//
		var esGanado = function(){
			var resultado = miResultado.getResultado();
			var ganado = false;

			if(resultado.rivales.actual != undefined)
					if(resultado.rivales.actual.datosrivales!=undefined)
					{
						if(resultado.rivales.actual.datosrivales.numberActivated == false)
						{
							eliminarRivalActual();
							ganado = true;
						}
					}

			return ganado;
		};

		//
		var esPerdido = function() {
			var resultado = miResultado.getPath({'path':'resultado.consulta.me[0]'});
			var perdido = false;

			if(!resultado.numberActivated)
				perdido = true;

			return perdido;
		};

		//
		var iniciarControlPartida = function() {

						intervalo_control = setInterval( 

							function(){

										var mensaje, panel, idmensaje = misDatos.idcontroles.msgestado;

										var g = esGanado(), p = esPerdido();

											if(g || p)
											{
												var puntaje = miResultado.getCampo({'campo':'consulta'}).me[0].score;
												$('#' + misDatos.idcontroles.mostrarjugadores).hide('fast');
												if(g)
												{
													mensaje = 'El n&uacute;mero de tu oponente ha sido adivinado! Ten&eacute;s ' + puntaje + ' puntos!. Elegí a alguien m&aacute;s para jugar!';
													panel = misDatos.idcontroles.paneljugadores;
												}
												if(p)
												{
													mensaje = 'El juego se termin&oacute;! Te adivinaron el n&uacute;mero y ten&eacute;s ' + puntaje + ' puntos!. Escrib&iacute; otro para seguir jugando.';
													panel = misDatos.idcontroles.panelsetear;
													$('#' + misDatos.idcontroles.presentacion).hide('fast');
													clearInterval(intervalo_control);
												}

												misUtiles.changeTextValue(idmensaje, mensaje);
												miJquery.showPanel({
													'paneles': miJquery.paneles,
													'panelabrir': panel,
													'textbox': misDatos.idcontroles.txtnumerosetear,
													'operacion': misDatos._SETFOCUS
												});

											}

									}

						, 2000);
		};

		//
		var buscarMejorJugada = function(){
			var rival = miResultado.getCampo({'campo':'rivales'}).actual;
			var mejorjugada = {
				'iteracion' : undefined,
				'puntos': 0
			};

			for(var i = 0, l = rival.jugadas.length; i < l; i++)
			{
				var suma = rival.jugadas[i].correctChars + rival.jugadas[i].existingChars;
				if(suma >= mejorjugada.puntos)
				{
					mejorjugada.iteracion = i;
					mejorjugada.puntos = suma;
				}
			}

			return mejorjugada;
		};

		//
		var generarNumero = function(length) {

			var arr_digitos= new Array(length);
			var digitos = [0,1,2,3,4,5,6,7,8,9];

			for(var i = 0; i < length; i++)
			{
				do
				{var pos = generarAleatorio(0, digitos.length-1);}
				while(i==0 && pos == 0);
				arr_digitos.push(digitos.splice(pos, 1)[0]);
			}

			return parseInt(arr_digitos.join(''));
		};

		//
		var generarAleatorio = function(min, max) {
			var posibilidades = max - min;
			var numerogenerado = Math.random() * posibilidades;
			return Math.round(numerogenerado);
		};


		//de interfaz

		var limpiarDatosMostrados = function(options){

			misUtiles.resetTextBox(options.limpiar);

			if(options.controles != undefined)
				for(var i = 0; i < options.controles.length; i++)
				{
					if(options.controles[i].tipo == 'id')
					{
						var control = document.getElementById(options.controles[i].control)
						if(control != undefined) control.innerHTML = '';
					}else{
						var control = document.getElementsByClassName(options.controles[i].control)
						for(var j = 0; j < control.length; j++)
							control[j].innerHTML = '';
					}
				}

			if(options.focus != undefined)
				misUtiles.setFocusTextBox(options.focus);
		};

		var mostrarJugadoresTabla = function(options){
			compilarTemplate({
				'idtemplate': misDatos.idcontroles.templatelistajugadores,
				'idmostrar': misDatos.idcontroles.paneljugadores,
				'campo': 'consulta'
			});

			//hacemos clickeables las filas
			hacerFilasClickeables({
				'namefilas': misDatos.namecontroles.filasjugadores,
				'seleccion': options.seleccion
			});
		};

		var mostrarRivalesTabla = function(options){
			compilarTemplate({
				'idtemplate': misDatos.idcontroles.templatelistarivales,
				'idmostrar': misDatos.idcontroles.presentacion,
				'campo': 'rivales'
			});

			//hacemos las filas clickeables
			hacerFilasClickeables({
				'namefilas': misDatos.namecontroles.filasrivales,
				'seleccion': options.seleccion
			});
		};

		var hacerFilasClickeables = function(options){

			var filas = document.getElementsByName(options.namefilas);
				for(var i = 0, l = filas.length; i < l; i++)
				{
					filas[i].onclick = function(idpublica){
						return function(){
							iniciarPartida({
								 'idpublica': idpublica,
								 'seleccion': options.seleccion
							});
						}
					}(filas[i].id);
				}
		};

		var eliminarFilasTabla = function(options){
			var tabla = document.getElementById(options.idtabla);
			if(tabla != undefined)
				if(tabla.rows != null)
					while(tabla.rows.length > 1)
						tabla.deleteRow(1);
		};

		var getCarita = function(tipo, cantidad) {

			var foto = 'images/';
			var imagenes = '';
			if(tipo == 'wrongChars')
				foto += 'malo.png';
			else
				foto += 'bueno.png';
			for(var i = 0; i < cantidad; i++)
			 imagenes += '<img alt="' + tipo + '" src="' + foto + '"/>';

			return imagenes;
		};


		//general

		var refrescarListaJugadores = function(options){
			intervalo_refresh = setInterval(function(){

				miCliente.consultaAjax(options.JSON);

				if(miResultado.getResultado().consulta != undefined)
				{
					options.datos.datostabla.recurso = miResultado.getResultado().consulta.players;
					mostrarJugadoresTabla(options.datos.datostabla);
					mostrarRivalesTabla(options.datos.datostabla);
					actualizarEstadoPartida();
					comprobarBajas();
				}

			}, options.datos.interval);
		};

		return {
			'resetTextShown': limpiarDatosMostrados,
			'refreshPlayers': refrescarListaJugadores,
			'actualizarJugada': actualizarJugadaActual,
			'controlPartida': iniciarControlPartida,
			'validarPatron': validarPatron,
			'iniciarPartida': iniciarPartida,
			'getAleatorio': generarNumero
		};
};