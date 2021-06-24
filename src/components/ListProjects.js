import React from "react";
import {
	BsFileEarmarkPlus,
	BsPencilSquare,
	BsFileEarmarkArrowDown,
	BsPencil,
} from "react-icons/bs";
import { MdSave } from "react-icons/md";
import firebase from "firebase";
import { URL_SERVICES, firebaseConfig, URL_API } from "../constants/contants.js";
import { DigitalSignature } from "../components/Signature/DigitalSignature.js";
import * as ApiServices from "../Services/ApiServices";
import NavBar from "../components/NavBar";
import { ListFiles } from "../components/Files/ListFiles.js";
import {Modificaciones} from "../components/modificaciones.js";
import { CustomToggle } from "../components/Customs/CustomToggle.js";
import "../assets/css/ListProjects.css";
import {
	BootstrapTable,
	TableHeaderColumn,
	ExportCSVButton,
} from "react-bootstrap-table";
import {
	Form,
	Col,
	Row,
	Button,
	Accordion,
	Card,
	Modal,
} from "react-bootstrap";

firebase.initializeApp(firebaseConfig);

class ListProjects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modificaciones: [], // Modificaciones que se realizarion
			projectsIds: [], // Id´s proyectos to show on select options :: Array []
			formcampos: [], // campos para crear el formulario
			projectid: 0, // Select options, projects
			project: [], // Proyoecto, datos de la tabla tbl_proyecto

			inventariosid: [], // Lista del Inventario
			inventarioSelected: [], // Invenntario seleccionado

			showModal: false, // Bandera para mostrar - ocultar Modal Carga archivos
			filesList: [], // Lista de archivos del inventario seleccionado

			showModalInventario: false, // Bandera para mostrar - ocultar Modal Edicion Inventario
			showModalModificado: false, //Bandera para mostrar - ocultar Modal Inventario Modificado

			showModalFirma: false, // Bandera para mostrar - ocultar Modal Firma digital

			modeloequipo: [],
			modelomonitor: [],
			modeloteclado: [],
			modelomause: [],
			modeloups: [],

			modelomaletin: [],
			estado: [], // Select optios :: Lista de estados
			colonia: [], // Select optios :: Lista de colonias
			localidad: [], // Select options :: Lista Localidades

			validated: false, // Estado de validación del formulario
			inputsBeforeValue: "",

			downloadFormat: false, // Specify if download format or just save signatures

			perfilid: JSON.parse(this.props.userdata).perfilid, // Perfil del usuario
		};
	}

	componentDidMount() {
		this.gerProjectIds();
	}

	getProyectosEditados(idInventario){
		console.log("Dentro del obtener proyectos editados");
	// 	//fetch('https://www.cookysoft.com/serving-web-content-0.0.1-SNAPSHOT/inventario/Modificado/'+idInventario.inventarioid)
		fetch(URL_API+'inventario/Modificado/'+idInventario.inventarioid)
      .then((response) => {
        return response.json()
      })
      .then((respuesta) => {
        this.setState({ modificaciones: respuesta })
      })
	}

	gerProjectIds = async () => {
		//let url = URL_SERVICES + "inventario/projectsid";
		let url= `${URL_API}lista/Asignacion/proyectos/${JSON.parse(this.props.userdata).usuarioid}`;

		let headers = {
			"Content-type": "application/json;",
		};

		// Request options
		let options = {
			method: "GET",
			mode: "cors",
			cache: "default",
			header: headers,
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((projectsIds) => {
				// Render the parsed body
				console.log("Datos :: get projects ids");
				console.log(projectsIds);
				this.setState({ projectsIds: projectsIds });
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	/**
	 * Obtiene el proyecto de la tabla proyectos, (Campos con Banderas para validar o no el campo)
	 */
	getDataProjectFields = async (id) => {
		console.log("get by ID");
		let url = URL_SERVICES + `project/${id}`;

		let headers = { "Content-type": "application/json;" };

		let options = {
			method: "GET",
			mode: "cors",
			cache: "default",
			header: headers,
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((project) => {
				console.log("Datos");
				console.log(project);

				this.setState({ project: project });

				this.obtenerFormCampos(id);
			})
			.catch((err) => console.log(err));
	};

	/**
	 * Get Inventario by Ids
	 * @param {*} id
	 */
	getInventarioId = async (id) => {
		console.log("get by ID " + id);
		document.querySelector(".loader").classList.add("show");
		document.querySelector(".back-loader").classList.add("show");

		let url = `${URL_API}inventario/filtro/${JSON.parse(this.props.userdata).usuarioid}/${id}`;

		// let url ="";
		// if (id === 0) {
		// 	url = URL_SERVICES + "inventario/";
		// } else {
		// 	url = URL_SERVICES + `inventario/projects/${id}`;
		// }

		var options = {
			method: "GET",
			mode: "cors",
			cache: "default",
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((inventariosid) => {
				// Render the parsed body
				console.log("Datos :: get Inventarios");

				this.setState({ inventariosid: inventariosid });

				document.querySelector(".loader").classList.remove("show");
				document.querySelector(".back-loader").classList.remove("show");
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	/**
	 * Obtiene los datos para armar el formulario de alta de inventario
	 */
	obtenerFormCampos = async (idproject) => {
		let url = URL_SERVICES + `formcamposgroup/${idproject}`;

		let headers = { "Content-type": "application/json;" };

		// Request options
		let options = {
			method: "GET",
			mode: "cors",
			cache: "default",
			header: headers,
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((formcampos) => {
				console.log(formcampos);
				this.setState({ formcampos: formcampos });
			})
			.catch((err) => console.log(err));
	};

	/**
	 * Select inventario by Id project, on select options
	 * @param {*} e
	 */
	selectInventarioProject = (e) => {
		var id = e.target.value;

		console.log(id);

		this.setState({ inventariosid: [], projectid: id });

		this.setState(function(state, props) {
			console.log('state:');
			console.log(state.projectid);
			console.log('props: idPerfilUs');
			console.log(JSON.parse(this.props.userdata).perfilid);
			console.log('props: idUs');
			console.log(JSON.parse(this.props.userdata).usuarioid);
			return {
				projectid: state.projectid,
			};
		  });
		

		var download = document.getElementById("download-file");
		download.removeAttribute("href");

		if (id > 0) {
			this.setState({ projectid: id });
			this.getDataProjectFields(id);

			/*Disabled, Mientras se implementa la descarga con filtrado de manera correcta
      download.href=`http://ec2-3-15-143-127.us-east-2.compute.amazonaws.com:8080/inventario/download/${id}`;*/

			this.getInventarioId(id);
		}
	};

	/**
	 * Valida el valor con el valor a encontrar
	 * @param {*} value
	 * @param {*} findvalue
	 * return true ::: Encuentra el valor buscado
	 */
	validateValue(value, findvalue) {
		if (value.indexOf(findvalue) !== -1) {
			return true;
		} else {
			return false;
		}
	}

	/*Eventos, datos, Para implementacion Bootstrap Table*/
	onFilterChange(filterObj) {
		console.log("Filter table ---->");
		console.log(filterObj);

		var tablebody = document.getElementsByTagName("tbody");
		var body = tablebody[0];
		console.log(body);
		console.log(body.querySelectorAll("tr"));
	}

	/**
	 *
	 */
	startDownload() {
		if (this.state.projectid > 0) {
			var tabledata = document.getElementsByTagName("tbody");
			var rows = tabledata[0].querySelectorAll("tr");
			var tds = rows[0].querySelectorAll("td");

			if (tds.length > 1) {
				var csvdownload = document.getElementById("csvdownload");
				csvdownload.click();
			} else {
				console.log("filtrado de datos :: 0");
			}
		} else {
			console.log("selecciona un proyecto");
		}
	}

	handleExportCSVButtonClick = (onClick) => {
		// Custom your onClick event here,
		// it's not necessary to implement this function if you have no any process before onClick
		console.log("This is my custom function for ExportCSVButton click event");
		onClick();
	};

	/**
	 * Ejemplo de como customizar el boton de descarga
	 */
	createCustomExportCSVButton = (onClick) => {
		return (
			<ExportCSVButton
				btnText="Descargar"
				id="csvdownload"
				className="hidden"
				onClick={() => this.handleExportCSVButtonClick(onClick)}
			/>
		);
	};

	/**
	 * Options to Table
	 */
	options = {
		// columns: columns, // Verificar como implementar la asignacion de los nombres de columnas
		sizePerPageList: [
			{
				text: "5",
				value: 5,
			},
			{
				text: "10",
				value: 10,
			},
			{
				text: "15",
				value: 15,
				//text: 'All', value: inventariosid.length
			},
		], // you can change the dropdown list for size per page
		//onFilterChange: onFilterChange,
		//afterColumnFilter: onFilterChange,
		exportCSVBtn: this.createCustomExportCSVButton,
		sizePerPage: 5, // which size per page you want to locate as default
		paginationPosition: "top", // default is bottom, top and both is all available
		// hideSizePerPage: true > You can hide the dropdown for sizePerPage
		// alwaysShowAllBtns: true // Always show next and previous button
		// withFirstAndLast: false > Hide the going to First and Last page button
		noDataText: "Sin registros",
	};

	/**
	 * Evento to display or hide File modal
	 * @param {*} e
	 */
	displayModal = (e) => {
		console.log("Toggle Display - Close");

		this.setState({ showModal: !this.state.showModal });
	};

	displayModalUpdate = (e) => {
		console.log("Toggle Display - Close");
		this.setState({ showModal: true });
	};

	/**
	 * Evento to display or hide Edit modal
	 * @param {*} e
	 */
	displayEditModal = (e) => {
		console.log("Toggle Display Edit Modal- Close");

		this.setState({
			showModalInventario: !this.state.showModalInventario,
			validated: false,
		});
	};
	displayModificadoModal = (e) => {
		console.log("Toggle Display Edit Modal- Close");

		this.setState({
			showModalModificado: !this.state.showModalModificado,
			validated: false,
		});
	};

	/**
	 * Evento to display or hide Firma modal
	 * @param {*} e
	 */
	displayFirmaModal = (cell, row, rowIndex, download) => {
		console.log("Toggle Display Firma Modal");
		console.log(row);

		this.setState({
			showModalFirma: !this.state.showModalFirma,
			inventarioSelected: row,
			downloadFormat: download,
		});
	};

	onClickAddFiles = (cell, row, rowIndex) => {
		console.log("click table");
		console.log(row);

		this.setState({ inventarioSelected: row, filesList: [], showModal: true });
	};

	cellButton(cell, row, enumObject, rowIndex) {
		return (
			<Button className="btn-icon btn-icon-color" onClick={() => this.onClickAddFiles(cell, row, rowIndex)}>
				<BsFileEarmarkPlus />
			</Button>
		);
	}

	/**
	 * Evento of input file :: firma digital
	 * @param {*} e
	 */
	fileInputFirma = (e) => {
		var inp = document.getElementById("firma-file");
		inp.click();
	};

	/**
	 * Customize cell button to edit a row on tbale
	 */
	cellButtonEdit(cell, row, enumObject, rowIndex) {
		return (
			<Button
				className="btn-icon btn-icon-color"
				onClick={() => this.onClickEdit(cell, row, rowIndex)}
			>
				<BsPencilSquare />
			</Button>
		);
	}
	cellModificado(cell, row, enumObject, rowIndex) {
		return (
			<Button
				className="btn-icon btn-icon-color"
				onClick={() => this.onClickModificado(cell, row, rowIndex)}
			>
				<BsPencil />
			</Button>
		);
	}

	/**
	 * Button to Signature and download format
	 * Hidden
	 */
	cellButtonSignatureDownload(cell, row, enumObject, rowIndex) {
		return (
			<Button onClick={() => this.displayFirmaModal(cell, row, rowIndex, true)}>
				Firmar/Descargar
			</Button>
		);
	}

	/**
	 * Button to Download format
	 */
	cellButtonDownloadFormat(cell, row, enumObject, rowIndex) {
		return (
			<Button
				className="btn-icon btn-icon-color"
				onClick={() => this.onClickDownloadFormat(row)}
			>
				<BsFileEarmarkArrowDown />
			</Button>
		);
	}

	/**
	 * Button to Signature and download format
	 * Hidden
	 */
	cellButtonSaveSignature(cell, row, enumObject, rowIndex) {
		return (
			<Button
				onClick={() => this.displayFirmaModal(cell, row, rowIndex, false)}
			>
				Firmar
			</Button>
		);
	}

	/**
	 *
	 * @param {*} cell
	 * @param {*} row
	 * @param {*} rowIndex
	 */
	onClickEdit = (cell, row, rowIndex) => {
		console.log("click edit row");
		console.log(row);
		this.setState({ inventarioSelected: row, showModalInventario: true });

		//this.obtenerFormCampos()
	};
	onClickModificado = (cell, row, rowIndex) => {
		console.log("click Modificado");
		console.log(row);
		this.getProyectosEditados(row);
		this.setState({ inventarioSelected: row, showModalModificado: true });

		//this.obtenerFormCampos()
	};

	/**
	 *
	 * @param {*} row
	 */
	onClickDownloadFormat = async (row) => {
		alert("Iniciando Descarga");
		console.log("click download format");

		let result = await ApiServices.dowloadInventarioFormat(row.inventarioid);

		if (result) {
			if (result.ok) {
				if (result.size > 0) {
					var element = this.refs.inventario_format;
					element.href = URL.createObjectURL(result);
					element.setAttribute("download", "formato_inventario.pdf");
					element.click();

					alert("Descarga Correcta!");
				} else {
					alert("Error en la Generación del Archivo");
				}
			} else {
				alert("Error en la Generación y Descarga del Archivo!");
			}
		}
	};

	/**
	 * Event submit of form
	 */
	handleSubmit = (e) => {
		e.preventDefault();

		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.stopPropagation();

			this.setState({ validated: false });
		} else {
			const dataCampos = new FormData(form);
			var nameCampo = [
				"folio",
				"id",
				"apaterno",
				"amaterno",
				"nombres",
				"nombrecompleto",
				"numempleado",
				"vip",
				"puesto",
				"direccion",
				"subdireccion",
				"clavesubdireccion",
				"gerencia",
				"clavegerencia",
				"depto",
				"clavecentrotrabajo",
				"correo",
				"telefono",
				"ext",
				"ubicacion",
				"colonia",
				"cp",
				"estado",
				"ubicacioncompleta",
				"zona",
				"localidad",
				"edificio",
				"piso",
				"area",
				"adscripcion",
				"apellidosjefe",
				"nombresjefe",
				"nombrecompletojefe",
				"fichajefe",
				"extjefe",
				"ubicacionjefe",
				"nombrejefeinmediato",
				"apellidosresguardo",
				"nombresresguardo",
				"nombrecompletoresguardo",
				"adscripcionresguardo",
				"extresguardo",
				"apellidosresponsable",
				"nombresresponsable",
				"nombrecompletoresponsable",
				"apellidospemex",
				"nombrespemex",
				"nombrecompletopemex",
				"tipoequipo",
				"equipo",
				"marcaequipo",
				"modeloequipo",
				"numserieequipo",
				"equipocompleto",
				"monitor",
				"marcamonitor",
				"modelomonitor",
				"numseriemonitor",
				"monitorcompleto",
				"teclado",
				"marcateclado",
				"modeloteclado",
				"numserieteclado",
				"tecladocompleto",
				"mouse",
				"marcamouse",
				"modelomause",
				"numseriemouse",
				"mousecompleto",
				"ups",
				"marcaups",
				"modeloups",
				"numserieups",
				"upscompleto",
				"maletin",
				"marcamaletin",
				"modelomaletin",
				"numseriemaletin",
				"maletincomleto",
				"candado",
				"marcacandado",
				"modelocandado",
				"numseriecandado",
				"candadocompleto",
				"bocinas",
				"marcabocinas",
				"modelobocinas",
				"numseriebocinas",
				"bocinascompleto",
				"camara",
				"marcacamara",
				"modelocamara",
				"numseriecmara",
				"camaracompleto",
				"monitor2",
				"marcamonitor2",
				"modelomonitor2",
				"numseriemonitor2",
				"monitor2completo",
				"accesorio",
				"marcaaccesorio",
				"modeloaccesorio",
				"numserieaccesorio",
				"accesoriocompleto",
				"ram",
				"discoduro",
				"procesador",
				"tipoequipocomp1",
				"modelocomp1",
				"numseriecomp1",
				"cruceclientecomp1",
				"tipoequipocomp2",
				"modelocomp2",
				"numseriecomp2",
				"cruceclientecomp2",
				"tipoequipocomp3",
				"modelocomp3",
				"numseriecomp3",
				"cruceclientecomp3",
				"tipoequipocomp4",
				"modelocomp4",
				"numseriecomp4",
				"cruceclientecomp4",
				"tipoequipocomp5",
				"modelocomp5",
				"numseriecomp5",
				"cruceclientecomp5",
				"tipoequipocomp6",
				"modelocomp6",
				"numseriecomp6",
				"cruceclientecomp6",
				"tipoequipocomp7",
				"modelocomp7",
				"numseriecomp7",
				"cruceclientecomp7",
				"validacioncomp1",
				"validacioncomp2",
				"validacioncomp3",
				"validacioncomp4",
				"validacioncomp5",
				"validacioncomp6",
				"validacioncomp7",
				"validadoscomp",
				"tecniconombre",
				"dia",
				"mes",
				"anio",
				"reqespecial1",
				"reqespecial2",
				"obsinv",
				"obsresguardo",
				"obsextras1",
				"obsextras2",
				"estatus",
				"fescalacion",
				"comentariosescalacion",
				"campolibre1",
				"campolibre2",
				"campolibre3",
				"campolibre4",
				"campolibre5",
				"campolibre6",
				"campolibre7",
				"campolibre8",
				"campolibre9",
				"campolibre10",
				"campolibre11",
				"campolibre12",
				"campolibre13",
				"campolibre14",
				"campolibre15",
				"campolibre16",
				"campolibre17",
				"campolibre18",
				"campolibre19",
				"campolibre20",
			];

			var apellido_paterno =
				dataCampos.get("apaterno") === null ? "" : dataCampos.get("apaterno");
			var apellido_materno =
				dataCampos.get("amaterno") === null ? "" : dataCampos.get("amaterno");
			var nombres =
				dataCampos.get("nombres") === null ? "" : dataCampos.get("nombres");

			//dataCampos.append("inventarioid", this.state.inventarioSelected.inventarioid);
			dataCampos.append("proyectoid", this.state.projectid);
			dataCampos.append("proyecto", this.state.project[0].proyecto);
			dataCampos.append(
				"proyectodescripcion",
				this.state.project[0].proyectodescripcion
			);

			dataCampos.append(
				"nombrecompleto",
				nombres + " " + apellido_paterno + " " + apellido_materno
			);

			// Datos Ubicacion
			var value;
			if (dataCampos.get("estadoinput") !== "") {
				value = dataCampos.get("estadoinput");
				dataCampos.delete("estado");
				dataCampos.delete("estadoinput");
				dataCampos.append("estado", value);
			}

			if (dataCampos.get("localidadinput") !== "") {
				value = dataCampos.get("localidadinput");
				dataCampos.delete("localidad");
				dataCampos.delete("localidadinput");
				dataCampos.append("localidad", value);
			}

			if (dataCampos.get("coloniainput") !== "") {
				value = dataCampos.get("coloniainput");
				dataCampos.delete("colonia");
				dataCampos.delete("coloniainput");
				dataCampos.append("colonia", value);
			}

			for (var i = 0; i < nameCampo.length; i++) {
				var name = nameCampo[i];
				console.log(name);

				if (!dataCampos.get(name)) {
					var value = dataCampos.get(name);

					if (
						name === "clavecentrotrabajo" ||
						name === "clavegerencia" ||
						name === "clavesubdireccion" ||
						name === "ext" ||
						name === "extjefe" ||
						name === "extresguardo" ||
						name === "fichajefe" ||
						name === "id" ||
						name === "numempleado" ||
						name === "validadoscomp"
					) {
						value = value === null || value === "null" ? 0 : value;
					}

					dataCampos.append(
						name,
						value !== null && value !== this.state.inventarioSelected[name]
							? value
							: value === null || value === "null"
							? null
							: this.state.inventarioSelected[name]
					);
				}
			}

			/*for(var pair of dataCampos.entries()){
              console.log(pair[0]+ ', '+ pair[1]);
            }*/

			this.loadToDBInventario(
				dataCampos,
				this.state.inventarioSelected.inventarioid
			);
		}

		this.setState({ validated: true });
	};

	/**
	 * Load data of Form to Database
	 */
	loadToDBInventario = (dataCampos, idinventario) => {
		console.log("Actualización de inventario, por proyecto");
		let url = URL_SERVICES + `inventario/${idinventario}`;
		console.log(url);

		let headers = { "Content-type": "application/json;" };

		let options = {
			method: "PUT",
			mode: "cors",
			cache: "default",
			body: dataCampos,
			header: headers,
		};

		fetch(url, options)
			.then((response) => response.text())
			.then((texto) => {
				console.log(texto);
				this.setState({ showModalInventario: false });
				this.cleanForm();
				alert("Inventario Actualizado");
			})
			.catch((err) => console.log(err));
	};

	cleanForm = () => {
		this.setState({ validated: false });
		this.cleanSelectOptions(); // Clean Select options
	};

	/**
	 * Clean All select option into form
	 */
	cleanSelectOptions = () => {
		this.setState({
			modeloequipo: [],
			modelomonitor: [],
			modeloteclado: [],
			modelomause: [],
			modeloups: [],
			modelomaletin: [],
			estado: [], // Select optios :: Lista de estados
			colonia: [], // Select optios :: Lista de colonias
			localidad: [],
		});
	};

	/**
	 *
	 * @param {*} e
	 */
	onInputFocus = (e) => {
		this.setState({ inputsBeforeValue: e.target.value });
	};

	/**
	 *
	 * @param {*} e
	 */
	onInputBlur = (e) => {
		var value = e.target.value;
		var name = e.target.name;

		if (value !== "") {
			this.refs[e.target.name].setCustomValidity("");
			e.target.value = e.target.value.trim();
		}

		if (name == "correo" && value != "") {
			var patternStr = e.target.pattern;
			var pattern = new RegExp(patternStr === "*" ? "/*/" : patternStr);

			if (!pattern.test(value)) {
				const alert = e.target.dataset.alerta;

				e.target.setCustomValidity(alert);
				e.target.reportValidity();
			} else {
				e.target.setCustomValidity("");
			}
		}

		this.setState({ inputsBeforeValue: "" });
	};

	/**
	 * Event onBlur, Codigo Potal element to update selects
	 * @param {*} e
	 */
	onInputChange = (e) => {
		var name = e.target.name;
		var value = e.target.value;

		if (name === "cp") {
			if (value !== "") this.getLocations(value);
		} else if (
			name === "estadoinput" ||
			name === "coloniainput" ||
			name === "localidadinput"
		) {
			var select = document.getElementsByName(name.replace("input", ""))[0];

			if (value === "") {
				select.required = true;
				e.target.required = true;
			} else {
				select.selectedIndex = "0";
				select.required = false;
			}
		} else {
			if (e.target.required) {
				var patternStr = e.target.pattern;

				if (patternStr === "*") patternStr = "/*/";

				console.log(patternStr);

				if (patternStr !== "no pattern") {
					var pattern = new RegExp(patternStr);

					if (name != "correo") {
						if (value != "" && !pattern.test(value)) {
							const alert = e.target.dataset.alerta;

							e.target.value = this.state.inputsBeforeValue;
							e.target.setCustomValidity(alert);
							e.target.reportValidity();
						} else {
							if (value !== "") e.target.setCustomValidity("");

							e.target.value = value.toUpperCase();

							var inventario = this.state.inventarioSelected;
							inventario[name.replace("input", "")] = value;

							this.setState({
								inputsBeforeValue:
									name != "correo" ? value : value.toUpperCase(),
								inventarioSelected: inventario,
							});
						}
					}
				}
			} else {
				if (name != "correo") e.target.value = value.toUpperCase();
			}
		}
	};

	/**
	 * Change on elements to edit
	 * @param {*} e
	 */
	handleChangeEdit = (e) => {
		var name = e.target.name;
		name = name.replace("input", "");
		var value = e.target.value;

		var inventario = this.state.inventarioSelected;
		inventario[name.replace("input", "")] = value;

		this.setState({ inventarioSelected: inventario });
	};

	getLocations = async (cp) => {
		let url = URL_SERVICES + `localidades/cp/${cp}`;

		let headers = { "Content-type": "application/json;" };

		// Request options
		let options = {
			method: "GET",
			mode: "cors",
			cache: "default",
			header: headers,
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((locations) => {
				console.log(locations);

				console.log(locations[0]); // Estados
				console.log(locations[1]); // Localidades

				this.setState({
					estado: locations[0],
					localidad: locations[1],
					colonia: locations[2],
				});
			})
			.catch((err) => console.log(err));
	};

	/**
	 * Event on elements to update value of data
	 */
	onSelectChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const idmarca = e.target.options[e.target.selectedIndex].id; // Id de la marca, ya que el value trae el valor en texto
		const selectdepend = e.target.dataset.selectdepend;
		const tipocampo = e.target.dataset.tipocampo; // Tipo campo, donde se especifica si corresponde a un select
		const catalogoid = e.target.dataset.catalogoid;

		var inventario = this.state.inventarioSelected;
		inventario[name.replace("input", "")] = value;

		this.setState({ inventarioSelected: inventario });

		if (name === "estado" || name === "colonia" || name === "localidad") {
			var input = document.getElementsByName(name + "input")[0];

			if (value === "") {
				e.target.required = false;
				input.required = true;
			} else {
				input.value = "";
				e.target.required = true;
				input.required = false;
			}
		}

		if (value !== "") {
			if (idmarca > 0) {
				if (selectdepend == 1) {
					this.obtenerSelectedModelos(idmarca, name.replace("marca", "modelo"));
				}
			} else {
				this.setState({ [name.replace("marca", "modelo")]: [] });
			}
		} else if (value === "" && selectdepend == 1) {
			this.setState({ [name.replace("marca", "modelo")]: [] });
		}
	};

	/**
	 * Obtiene los datos de los modelos de la marca seleccionada
	 */
	obtenerSelectedModelos = async (idmarca, name) => {
		console.log("obtenerSelectedModelos");
		let url = URL_SERVICES + `marcamodelo/modelos/${idmarca}`;

		let headers = { "Content-type": "application/json;" };

		// Request options
		let options = {
			method: "GET",
			mode: "cors",
			cache: "default",
			header: headers,
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((modelos) => {
				console.log(modelos);
				this.setState({ [name]: modelos });
			})
			.catch((err) => console.log(err));
	};

	render() {
		var selectRowProp = {
			mode: "checkbox",
			clickToSelect: true,
			bgColor: "rgb(15 175 204 / 18%)" 
		  };
		return (
			<>
				<NavBar perfilid={this.state.perfilid} history={this.props.history} />

				<div id="listproyect" className="manage-container">
					<div className="main-container">
						<div className="header-container">
							<div>
								<h3>Inventario</h3>
							</div>
						</div>

						<div className="container">
							<div className="excel-download">
								<a id="download-file" onClick={this.startDownload.bind(this)}>
									<svg
										className="bi bi-file-earmark-spreadsheet"
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										fill="#0fa932"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M13 9H3V8h10v1zm0 3H3v-1h10v1z"
										/>
										<path fillRule="evenodd" d="M5 14V9h1v5H5zm4 0V9h1v5H9z" />
										<path d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
										<path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z" />
									</svg>
								</a>
							</div>

							<hr></hr>
							<div className="row">
								<div className="col-sm-6 col-8">
									
									<Form.Label>Proyecto:</Form.Label>
									<Form.Control
										id="combo-projects"
										as="select"
										name="projectid"
										value={this.state.projectid> 0? this.state.projectid : undefined}
										onChange={this.selectInventarioProject.bind(this)}
									>
										<option value="0">Seleccionar Proyecto..</option>
										{
											//Respuesta recibida como lista de array [] de objetos
											this.state.projectsIds.map((item) => (
												<option key={item[0]} value={item[0]}>
													{item[1]}
												</option>
											))
										}
									</Form.Control>
								</div>

								<div className="loader">
									<img src="../loading.gif" alt="loading"></img>
								</div>
								<div className="back-loader"></div>

								<div className="col-sm-12 content-table">
									<BootstrapTable
										id="tableinventarios"
										striped={true}
										data={this.state.inventariosid}
										keyField="folio"
										version="4"
										pagination
										options={this.options}
										exportCSV
										csvFileName="inventario.csv"
									>
										<TableHeaderColumn
											dataField="inventarioid"
											hidden
											export={true}
										>
											Inventario ID
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="proyectoid"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="proyecto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="proyectodescripcion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="fcreacion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="folio"
											className="active-column-header"
											columnClassName="active-column-data"
											filter={{ type: "TextFilter", placeholder: "FOLIO" }}
										>
											FOLIO
										</TableHeaderColumn>
										<TableHeaderColumn dataField="id" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apaterno"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="amaterno"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="nombres" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombrecompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numempleado"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="vip" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="puesto" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="direccion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="subdireccion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="clavesubdireccion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="gerencia"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="clavegerencia"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="depto" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="clavecentrotrabajo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="correo" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="telefono"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="ext" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="ubicación"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="colonia" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="cp" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="estado" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="ubicacióncompleta"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="zona" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="localidad"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="edificio"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="piso" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="area" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="adscripcion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apellidosjefe"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apellidos2jefe"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombresjefe"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombrecompletojefe"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="fichajefe"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="extjefe" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="ubicaciónjefe"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombrejefeinmediato"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apellidosresguardo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apellidosres2guardo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombresresguardo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombrecompletoresguardo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="adscripcionresguardo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="extresguardo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apellidosresponsable"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apellidos2responsable"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombresresponsable"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombrecompletoresponsable"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="apellidospemex"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombrespemex"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombres2pemex"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="nombrecompletopemex"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="equipo" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcaequipo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modeloequipo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numserieequipo"
											className="active-column-header"
											columnClassName="active-column-data"
											filter={{
												type: "TextFilter",
												placeholder: "NO. DE SERIE EQUIPO",
											}}
										>
											NO. DE SERIE EQUIPO
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="equipocompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="monitor" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcamonitor"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelomonitor"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriemonitor"
											className="active-column-header"
											columnClassName="active-column-data"
											filter={{
												type: "TextFilter",
												placeholder: "NO. DE SERIE MONITOR",
											}}
										>
											NO. DE SERIE MONITOR
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="monitorcompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="teclado" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcateclado"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modeloteclado"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numserieteclado"
											className="active-column-header"
											columnClassName="active-column-data"
											filter={{
												type: "TextFilter",
												placeholder: "NO. DE SERIE TECLADO",
											}}
										>
											NO. DE SERIE TECLADO
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tecladocompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="mouse" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcamouse"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelomause"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriemouse"
											className="active-column-header"
											columnClassName="active-column-data"
											filter={{
												type: "TextFilter",
												placeholder: "NO. DE SERIE MOUSE",
											}}
										>
											NO. DE SERIE MOUSE
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="mousecompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="ups" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcaups"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modeloups"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numserieups"
											className="active-column-header"
											columnClassName="active-column-data"
											filter={{
												type: "TextFilter",
												placeholder: "NO. DE SERIE UPS",
											}}
										>
											NO. DE SERIE UPS
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="upscompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="maletin" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcamaletin"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelomaletin"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriemaletin"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="maletincomleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="candado" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcacandado"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocandado"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecandado"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="candadocompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="bocinas" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcabocinas"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelobocinas"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriebocinas"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="bocinascompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="camara" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcacamara"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocamara"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecmara"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="camaracompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="monitor2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcamonitor2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelomonitor2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriemonitor2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="monitor2completo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="accesorio"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="marcaaccesorio"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modeloaccesorio"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numserieaccesorio"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="accesoriocompleto"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="ram" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="discoduro"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="procesador"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipocomp1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocomp1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecomp1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="cruceclientecomp1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipocomp2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocomp2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecomp2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="cruceclientecomp2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipocomp3"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocomp3"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecomp3"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="cruceclientecomp3"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipocomp4"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocomp4"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecomp4"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="cruceclientecomp4"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipocomp5"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocomp5"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecomp5"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="cruceclientecomp5"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipocomp6"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocomp6"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecomp6"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="cruceclientecomp6"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tipoequipocomp7"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="modelocomp7"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="numseriecomp7"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="cruceclientecomp7"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validacioncomp1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validacioncomp2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validacioncomp3"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validacioncomp4"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validacioncomp5"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validacioncomp6"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validacioncomp7"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="validadoscomp"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="tecniconombre"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="dia" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="mes" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="anio" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="reqespecial1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="reqespecial2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="obsinv" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="obsresguardo"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="obsextras1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="obsextras2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="estatus"
											className="active-column-header"
											columnClassName="active-column-data"
											filter={{
												type: "TextFilter",
												placeholder: "ESTATUS ISAE",
											}}
										>
											ESTATUS ISAE
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="fescalacion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="comentariosescalacion"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>

										<TableHeaderColumn
											dataField="campolibre1"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre2"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre3"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre4"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre5"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre6"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre7"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre8"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre9"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre10"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre11"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre12"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre13"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre14"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre15"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre16"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre17"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre18"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre19"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											dataField="campolibre20"
											hidden
											export={true}
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn dataField="campoID" hidden export={true}>
											{" "}
										</TableHeaderColumn>
										{this.state.perfilid === 1 ||
										this.state.perfilid === 2 ||
										this.state.perfilid === 3 ||
										this.state.perfilid === 4
										? (
											<TableHeaderColumn
											dataField="button"
											export={false}
											dataFormat={this.cellButton.bind(this)}
											className="content-icon"
											columnClassName="content-icon"
										>
											{" "}
										</TableHeaderColumn>
										): <TableHeaderColumn hidden></TableHeaderColumn>}
										
										<TableHeaderColumn
												dataField="button"
												hidden
												export={false}
												dataFormat={this.cellButtonSignatureDownload.bind(this)}
												className="content-icon"
												columnClassName="content-icon"
											>
												{" "}
											</TableHeaderColumn>
										<TableHeaderColumn
											dataField="button"
											hidden
											export={false}
											dataFormat={this.cellButtonSaveSignature.bind(this)}
											className="content-icon"
											columnClassName="content-icon"
										>
											{" "}
										</TableHeaderColumn>
										
										{this.state.perfilid === 1 ||
										this.state.perfilid === 2 ||
										this.state.perfilid === 3 
										? (
											<TableHeaderColumn
											dataField="button"
											export={false}
											dataFormat={this.cellButtonDownloadFormat.bind(this)}
											className="content-icon"
											columnClassName="content-icon"
										>
											{" "}
										</TableHeaderColumn>
										): <TableHeaderColumn hidden></TableHeaderColumn>}

										<TableHeaderColumn
											dataField="button"
											export={false}
											dataFormat={this.cellButtonEdit.bind(this)}
											className="content-icon"
											columnClassName="content-icon"
										>
											{" "}
										</TableHeaderColumn>
										<TableHeaderColumn
											export={false}
											dataFormat={this.cellModificado.bind(this)}
											className="content-icon"
											
										>
											{" "}
										</TableHeaderColumn>
										
									</BootstrapTable>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Modal
					id="filesModal"
					show={this.state.showModal}
					onHide={this.displayModal.bind(this)}
					dialogClassName="general-size"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					className="modal-files"
				>
					<Modal.Header closeButton>
						<Modal.Title>Archivos</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<ListFiles
							update={this.displayModalUpdate}
							firebase={firebase}
							inventarioSelected={this.state.inventarioSelected}
							projectid={this.state.projectid}
						></ListFiles>
					</Modal.Body>
				</Modal>
				<Modal
					id="filesModal"
					show={this.state.showModalModificado}
					onHide={this.displayModificadoModal.bind(this)}
					dialogClassName="general-size"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					className="modal-files"
				>
					<Modal.Header closeButton>
						<Modal.Title>Modificaciones</Modal.Title>
					</Modal.Header>

					<Modal.Body>
					<div className="container">
              <div>
              <div className="col-sm-12 content-table">
                <BootstrapTable
                  data={this.state.modificaciones}
                  version ='4'
                  selectRow={selectRowProp}
                  keyField = "inventarioid"
                  hover
                  condensed
                  search
                  exportCSV
                  noDataIndication="Table is Empty"
                  csvFileName="Modificaciones.csv">
                    <TableHeaderColumn 
                      width="10%"
                      dataField="inventarioid" 
                      dataAlign="center">
                        Inventario ID
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="folio"  
                      dataAlign="center">
                        Folio
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="proyecto" 
                      dataAlign="center" >
                        Proyecto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                       width="10%"
                      dataField="usuario" 
                      dataAlign="center" >
                        usuario
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="15%"
                      dataField="fecha" 
                      dataAlign="center" >
                        Fecha
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="hora" 
                      dataAlign="center" >
                        hora
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="campoedit" 
                      dataAlign="center">
                        Campo editado
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="valora" 
                      dataAlign="center">
                        Valor anterior
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="valorn" 
                      dataAlign="center">
                        Valor nuevo
                    </TableHeaderColumn>
                </BootstrapTable>
              </div>  
              </div>
            </div>
					</Modal.Body>
				</Modal>

				<Modal
					id="editModal"
					show={this.state.showModalInventario}
					onHide={this.displayEditModal.bind(this)}
					dialogClassName="general-size"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Inventario</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form
							id="formCampos"
							noValidate
							name="validate"
							validated={this.state.validated}
							onSubmit={this.handleSubmit.bind(this)}
						>
							<Form.Row className="content-form-groups">
								<React.Fragment>
									<Accordion>
										{this.state.formcampos.map((item) => (
											<Card
												data-numcampos={item.listCampos.length}
												id={`card-group-` + item.agrupacionid}
												key={`card-group` + item.agrupacionid}
											>
												<Card.Header ref={`card-header-` + item.agrupacionid}>
													<CustomToggle
														refgroupid={item.agrupacionid}
														refgroup={`card-group-` + item.agrupacionid}
														eventKey={item.agrupacionid}
													>
														{item.agrupacion}
													</CustomToggle>
												</Card.Header>

												<Accordion.Collapse eventKey={item.agrupacionid}>
													<Card.Body className="row">
														{item.listCampos.map((campos) =>
															this.state.project.length > 0 &&
															this.state.project[0][campos.columnname] ? (
																<Form.Group
																	key={`group` + campos.campoid}
																	as={Col}
																	md="6"
																	controlId={`formcampo` + campos.campoid}
																>
																	<Form.Label key={`label` + campos.campoid}>
																		{campos.campo}
																	</Form.Label>

																	{
																		// Se despliega un elemento select
																		//campos.catalogoData || campos.selectdepend === 2 ?
																		Number.isInteger(
																			Number.parseInt(campos.catalogoid)
																		) || campos.selectdepend === 2 ? (
																			<>
																				<Form.Control
																					readOnly = {this.state.perfilid === 4 || this.state.perfilid === 5 ? true: false}
																					key={`select` + campos.campoid}
																					as="select"
																					onChange={this.onSelectChange.bind(
																						this
																					)}
																					ref={campos.columnname}
																					value={
																						this.state.inventarioSelected[
																							campos.columnname
																						] === "null"
																							? ""
																							: this.state.inventarioSelected[
																									campos.columnname
																							  ]
																					}
																					name={campos.columnname}
																					data-alerta={campos.alerta}
																					data-selectdepend={
																						campos.selectdepend
																					} // Tipo de Select [(NUll, 0) = Simple] [(1) = Select Padre "Marca"] [(2) = Select Hijo "Modelo"]
																					data-catalogoid={campos.catalogoid} // Almacena: Select = ID del Catalogo
																					data-tipocampo={campos.tipocampo} // Almacena: Select = ID del Catalogo, Input: Tipo Campo "Numerico", "Alfanumerico"
																					required={
																						this.state.project.length > 0
																							? this.state.project[0][
																									campos.columnname
																							  ]
																								? true
																								: false
																							: false
																					}
																					data-required={
																						this.state.project.length > 0
																							? this.state.project[0][
																									campos.columnname
																							  ]
																							: "no required"
																					}
																					data-pattern={
																						campos.pattern
																							? campos.pattern
																							: "no pattern"
																					}
																					disabled={
																						campos.columnname === "estado" ||
																						campos.columnname === "colonia" ||
																						campos.columnname === "localidad"
																							? this.state[campos.columnname]
																									.length > 0
																								? false
																								: true
																							: false
																					}
																				>
																					<option value="">
																						{`SELECCIONAR ` + campos.campo}..
																					</option>
																					{
																						// Opcion 2, select que depende de otro elemento (Marca -> Modelo, Codigo Postal)
																						campos.selectdepend === 2
																							? this.state[
																									campos.columnname
																							  ].map((modelo) => (
																									<option
																										key={modelo.idmarcamodelo}
																										id={modelo.idmarcamodelo}
																										value={modelo.modelo}
																									>
																										{modelo.modelo}
																									</option>
																							  ))
																							: // Datos Ubicación
																							campos.columnname === "estado" ||
																							  campos.columnname ===
																									"colonia" ||
																							  campos.columnname ===
																									"localidad"
																							? campos.columnname === "estado"
																								? this.state.estado.map(
																										(cat) => (
																											<option
																												key={cat.cestado}
																												id={cat.cestado}
																												value={cat.estado}
																											>
																												{cat.estado}
																											</option>
																										)
																								  )
																								: campos.columnname ===
																								  "localidad"
																								? this.state.localidad.map(
																										(cat) => (
																											<option
																												key={cat.mnpio}
																												id={cat.mnpio}
																												value={cat.mnpiodEstado}
																											>
																												{cat.mnpiodEstado}
																											</option>
																										)
																								  )
																								: campos.columnname ===
																								  "colonia"
																								? this.state.colonia.map(
																										(cat) => (
																											<option
																												key={cat.idAsentacpcons}
																												id={cat.idAsentacpcons}
																												value={cat.asenta}
																											>
																												{cat.asenta}
																											</option>
																										)
																								  )
																								: null
																							: // Select Es un select sin dependencias, se llena con el contenido del respectivo catalog
																							  campos.catalogoData.map(
																									(cat) => (
																										<option
																											key={cat.idcatalogo}
																											id={cat.idcatalogo}
																											value={cat.descripcion}
																										>
																											{cat.descripcion}
																										</option>
																									)
																							  )
																					}
																				</Form.Control>

																				{campos.columnname === "estado" ||
																				campos.columnname === "colonia" ||
																				campos.columnname === "localidad" ? (
																					<Form.Control
																						readOnly = {this.state.perfilid === 4 || this.state.perfilid === 5 ? true: false}
																						key={`input` + campos.campoid}
																						type="text"
																						onChange={this.onInputChange.bind(
																							this
																						)}
																						onFocus={this.onInputFocus.bind(
																							this
																						)}
																						value={
																							this.state.inventarioSelected[
																								campos.columnname
																							] === "null"
																								? ""
																								: this.state.inventarioSelected[
																										campos.columnname
																								  ]
																						}
																						ref={campos.columnname}
																						name={campos.columnname + `input`}
																						data-tipocampo={campos.tipocampo} // Almacena: Input: Tipo Campo "Numerico", "Alfanumerico"
																						data-alerta={campos.alerta}
																						required={
																							this.state[campos.columnname]
																								.length > 0
																								? false
																								: true
																						} //
																						data-required={
																							this.state.project.length > 0
																								? this.state.project[0][
																										campos.columnname
																								  ]
																								: "no required"
																						}
																						data-pattern={
																							campos.pattern
																								? campos.pattern
																								: "no pattern"
																						}
																						pattern={
																							this.state.project.length > 0
																								? this.state.project[0][
																										campos.columnname
																								  ]
																									? campos.pattern
																									: "*" // Verifica si el campo se valida con REDEXP
																								: "*"
																						}
																						placeholder={campos.campo}
																					/>
																				) : null}
																			</>
																		) : (
																			<>
																				<Form.Control
																					readOnly = {this.state.perfilid === 4 || this.state.perfilid === 5 ? true: false}
																					key={`input` + campos.campoid}
																					onChange={this.onInputChange.bind(
																						this
																					)}
																					onFocus={this.onInputFocus.bind(this)}
																					onBlur={this.onInputBlur.bind(this)}
																					ref={campos.columnname}
																					value={
																						this.state.inventarioSelected[
																							campos.columnname
																						] === "null"
																							? ""
																							: this.state.inventarioSelected[
																									campos.columnname
																							  ]
																					}
																					name={campos.columnname}
																					data-tipocampo={campos.tipocampo} // Almacena: Input: Tipo Campo "Numerico", "Alfanumerico"
																					data-alerta={campos.alerta}
																					required={
																						this.state.project.length > 0
																							? this.state.project[0][
																									campos.columnname
																							  ]
																								? true
																								: false
																							: false
																					}
																					data-required={
																						this.state.project.length > 0
																							? this.state.project[0][
																									campos.columnname
																							  ]
																							: "no required"
																					}
																					data-pattern={
																						campos.pattern
																							? campos.pattern
																							: "no pattern"
																					}
																					pattern={
																						this.state.project.length > 0
																							? this.state.project[0][
																									campos.columnname
																							  ]
																								? campos.pattern
																								: "*" // Verifica si el campo se valida con REDEXP
																							: "*"
																					}
																					type={
																						campos.tipocampo === "FECHA"
																							? "date"
																							: "text"
																					}
																				/>

																				<Form.Control.Feedback
																					key={`feed` + campos.campoid}
																					type="invalid"
																				>
																					{campos.alerta}
																				</Form.Control.Feedback>
																			</>
																		)
																	}
																</Form.Group>
															) : null
														)}
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										))}
									</Accordion>
								</React.Fragment>
							</Form.Row>
							{this.state.perfilid === 2 || 
							this.state.perfilid === 1 || 
							this.state.perfilid === 3 ?(
								this.state.formcampos.length > 0 ? (
									<Form.Row className="justify-content-end">
										<Col sm="auto" className="mt-4">
											<Button
												id="brn-save"
												className="float-right"
												variant="primary"
												type="submit"
											>
												Actualizar <MdSave />
											</Button>
										</Col>
									</Form.Row>
								) : null
							):null}

							
						</Form>
					</Modal.Body>
				</Modal>

				<Modal
					id="signaturemodalRef"
					ref="signaturemodalRef"
					refs={this.refs}
					show={this.state.showModalFirma}
					onHide={() => this.setState({ showModalFirma: false })}
					dialogClassName="modal-70w"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Firma Digital</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<div className="row asing-options-contect">
							<DigitalSignature
								onHide={() => this.setState({ showModalFirma: false })}
								inventarioid={this.state.inventarioSelected.inventarioid}
								download={this.state.downloadFormat}
							/>
						</div>
					</Modal.Body>
				</Modal>
				<a ref="inventario_format" id="inventario_format" className="hide">
					Descargar
				</a>
			</>
		);
	}
}

export default ListProjects;
