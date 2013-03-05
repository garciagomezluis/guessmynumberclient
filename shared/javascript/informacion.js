/***********************************************************
******** INFORMACIÓN ***************************************
***********************************************************/
//Archivo de descripción de funciones para la aplicación.
/*

Ajax: Realiza las llamadas asíncronas con el servidor, muestra mensajes de errores y un loader durante la espera.
Datos: Guarda nombres de controles y demás datos en constantes para su uso en el proyecto.
Resultado: Guarda el estado de las respuestas almacenaras en el servidor.

	resultado = {
		'registro': respuesta de ejecutar el comando register,
		'numero': respuesta de ejecutar el comando setnumber,
		'consulta': respuesta de ejecutar el comando board,
		'rivales': estructura que almacena el estado de los jugadores con los que se está jugando,
		'temporal': respuesta de ejecutar el comando guessnumber
	};

	resultado = {
		...
		'rivales': {
			'actual': estructura que almacena el resultado del jugador con el que se está jugando en ese momento,
			'jugando': estructura que almacena un vector con los jugadores con los que se están jugando pero no en ese momento
		},
		...
	};

	resultado = {
		...
		'rivales': {
			'actual': {
				'datosrivales': copia de datos del jugador obtenida de 'consulta',
				'jugadas':	vector con las jugadas realizadas a este jugador
			},
			'jugando': [
				{
					'datosrivales': copia de datos del jugador obtenida de 'consulta',
					'jugadas':	vector con las jugadas realizadas a este jugador
				}(,...)
			]
		}
		...
	};

	resultado = {
		...
		'rivales': {
			'actual': {
				...
				'jugadas':	[
					{
						copia de 'temporal'
					}(,...)
				]
			},
			'jugando': [
				{
					...
					'jugadas':	[
						{
							copia de 'temporal'	
						}(,...)
					]
				}	
			]
		}
		...
	};

DatosJson: Contiene estructuras JSON para la llamada a métodos del proyecto o para la ejecución del las llamadas asíncronas.
Entorno: Tiene métodos que realizan la administración de Resultado y que controlan la interfáz de usuario.
Jquery: Controla los efectos de show y hide de los paneles de usuario.
Genericos: Contienen métodos 'genéricos'(?) aplicables a cualquier proyecto(?) para control de interfáz de usuario.
onload(): Inicializa las acciones de los eventos de los controles de la interfáz de usuario.

*/
/* AJAX.JS *************************************************

	** iniciarAjax: Realiza la llamada asincronica al servidor, muestra un mensaje de carga y procesa la respuesta.

	options = {
		url : url de pedido,
		campoguardar: nombre del campo con el que se guardará localmente la respuesta AJAX (registro|consulta|numero|adivinar)
		callback: acciones a realizar una vez terminada la llamada sin errores.
		onquery: acciones a realizar mientras se ejecuta la consulta.
		onerror: acciones a realizar si la consulta produjo un error.
		error : {
			errordefecto : error predeterminado,
			recursoJSON : 
			idmensaje : id del contenedor que mostrará el mensaje de error,
			camposerr : {
						numeroerror : campo del error,
						mensajeerror: campo de mensaje asociado
					}
			focus : {
						textbox : id de textbox a corregir,
						operacion : _FOCUS/_SELECT
					}
		}
	}

	** mostrarLoader: Muestra una imágen cargando junto con un texto definidos por HTML.

	options = {
		controles: [{
			control = id de control que se va a bloquear o a desbloquear.
			}(,...)],
		inactivecolor: color de las cajas de texto cuando están inactivas.
		activecolor: color de las cajas de texto cuando estan activas.
		mostrar: bool
		cargador: id del contenedor que tiene el mensaje de carga
	}

	** mostrarError: Si la devolución de iniciarAjax(options) es igual a error, se lo busca y se muestra por pantalla.
	- Salida: True : error, False: ?

	options = {
		recursoJSON : recurso JSON,
		idmensaje : id o class de contenedor que muestra el mensaje de error
		(,camposerr : {
				numeroerror : campo del error,
				mensajeerror: campo de mensaje asociado
				})
		(,focus : {
				textbox : id de textbox a corregir,
				operacion : _FOCUS/_SELECT
				})
	}

	** existeError: Por comparación, se determina si el mensaje de vuelta es un error para realizar x acción
	- Devuelve bool TRUE: Error, False: No hay error.

***********************************************************/
/* CLIENTE.JS **********************************************

	** getURLConsulta: Arma la URL que se usará para hacer una solicitud AJAX por GET.
	- Salida: URL o undefined en caso que no se establezca adecuadamente la accion.
	
	options = {

		textbox: [{
			textboxid: id del textbox,
			name : nombre del textbox,
			value : contenido
		}],

		accion: definir que URL se va a armar,
		rest : comandos rest para anexar a la URL

	}

***********************************************************/
/* ENTORNO.JS **********************************************

		** limpiarDatosMostrados: Limpia los textbox asignados y otros controles, asigna focus().
		- Función orientada a formularios.

		options = {

			limpiar : {
				textbox: [
					{
						textbox : id de textbox,
						placeholdertext : texto de compatibilidad con placeHolder()
					}(,...)
				 ],
			}

			(controles: [
					{
						control : id de control(,...)
						tipo : id o class
					}(,...)
				 ])

			(,focus : {
					textbox : id de textbox a corregir,
					operacion : _FOCUS/_SELECT
					})
		}

		** mostrarRivalesTabla: Crea filas dinamicamente con los usuarios registrados.
		REVISAR
		
		** eliminarRivalesTabla: Elimina todas las filas una tabla (.clear())
		- En caso de ser errada el campo idtabla, no se realiza ninguna acción.

		options = {
			'idtabla': id de la tabla cuyas filas se quieren eliminar
		}

		** refresarLista: Establece un intervalo de tiempo en el cual se actualizará la tabla especificada.
		REVISAR
		options = {
				'JSON': JSON de datos para consulta Ajax
				'datos' : {
					'interval': tiempo en milisegundos para refrescar la página
					'datostabla' : {
						'recurso': JSON de donde se extraen datos para actualizar la tabla.
						'idtabla': tabla de la id con la que se quiere trabajar
						'campos': {
								'incluir':[
									{'nombre': nombre del campo que se quiere tener en cuenta}(,...)
								]
						}
					}
				}
		}

		** iniciarPartida: Se seleccionan los datos de un usuario en base a un id público.
		options = {
			'idpublica': id del jugador al que se le inicia partida
			'seleccion':
				'idtabla': id de la tabla donde se mostraran los datos,
				'incluir': vector con campos a incluir en la tabla de seleccion
		}

		** jugandoPartida: Comprueba si se esta jugando actualmente una partida con un usuario.
		- Salida: Los datos del jugador si se esta jugando, de lo contrario: False.
		idpublica: id del jugador que se busca.

		//recibo 1 jugador con sus datos y las jugadas
		//recibo el id de la tabla
		/*
		options = {
			'jugador' : datos del jugador,
				'idtabla' : id de la tabla a trabajar,
					'incluir' : [
						'nombre': nombre del campo que se quiere incluir
					]
		}

				options = 
				'idtabla': id de la tabla donde se mostraran los datos,
				'incluir': vector con campos a incluir en la tabla de seleccion	

***********************************************************/
/* GENERICOS.JS ********************************************

	** placeholder: Asocia los eventos focus y blur de los textbox y establece una cadena para mostrarse según la situación.
	- Si el id pasado no existe, no se realiza ninguna operación.
	options = {
		'textbox' : id de textbox,
		'texto' : texto a colocar,
		(,'color' : color en formato css)
	}

	** ontextfocus: Realiza los cambios de valor de texto del textbox pasado por option y cambia el color de fuente.
	- options: CONTROLADAS.
	options = {
		'textbox' : elemento textbox
	}

	** ontextblur: Realiza los cambios de valor de texto del textbox pasado por option y cambia el color de fuente.
	- options: CONTROLADAS.
	options = {
		'textbox' : elemento textbox,
		'texto' : texto a colocar,
		'color' : color en formato css
	}

	** cambiarEstadoComponentes: Habilita o deshabilita los controles.
	- Si el id del control especificado no existe no se realiza acción alguna que implique a ese id.
	options = {
		controles: [{
				control = id del control
			   }(, ...)],
		inactivecolor: Color de la caja de texto cuando está inactivo.
		activecolor: Color de la caja de texto cuando esta activo.
	}

	** focoTextbox: Establece un focus() o select() sobre algún textbox.
	- Si el id de textbox expecificado no existe no se realiza acción alguna.
	- Si no se especifica la operación, se toma por defecto focus().
	options = {
		textbox: id de textbox,
		operacion: _FOCUS/_SELECT
	}

	** limpiarTextbox: Establece la propiedad value de los textbox en ''.
	- Si no se especifica el id de textbox no se realiza acción asociada a ese id.
	- El texto de compatibilidad con placeHolder() es opcional.
	options = {
		textbox: [
				{
					textbox : id de textbox,
					placeholdertext : texto de compatibilidad con placeHolder()
				}(,...)
			 ]
	}

	** getValoresCampos: Obtiene un JSON especiificando textboxid, name y value de los id de textbox especificados.
	- Si no se especifica el id de textbox no se realiza acción asociada a ese id.
	options = {
		textbox: [
				{
					control = id de textbox
				}(,...)
			 ]
	}
	-Salida
		respuesta = {
				textbox: [
						{
							textboxid: id de textbox,
							name: nombre de textbox,
							value: valor del contenido
						}
					 ]
		}

	** cambiarTexto: Cambia el texto de un elemento en base a un id_titulo.
	id_titulo: Id del contenedor cuyo contenido se va a cambiar.
	texto: Contenido que reemplazará al anterior.
	- Salidas: True: Exito, False: ?

	** crearElemento: Crea un nuevo elemento con sus atributos y lo anexa a un contenedor.
	options = {
		elemento: tipo de elemento.
		contenido: contenido que se va a escribir en el elemento.
		contenedor: elemento padre al que se va a anexar el nuevo elemento.
		atributos : [
			{nombre : nombre del atributo.
			valor : valor del atributo.}(,...)
		]
	}

*/