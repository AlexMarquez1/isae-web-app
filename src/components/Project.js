import XLSX from "xlsx";
import React from "react";
import "../assets/css/Project.css";
import { Form, Col, Row, Button } from "react-bootstrap";
import {
	BsSearch,
	BsUpload,
	BsFolderPlus,
	BsFillTrashFill,
} from "react-icons/bs";
import { MdSave } from "react-icons/md";
import { URL_SERVICES } from "../constants/contants.js";
import { NavBar } from "../components/NavBar";

// SpreadJS imports
import "@grapecity/spread-sheets-react";
/* eslint-disable */
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";

//const Project = () => {
class Project extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show_btn_alta: false,
			describe: "Buscar",
			newProjectInputs: [],
			validated: false, // Validate to Form
			projectSelect: 0, // Selected currect project
			projectsIds: [], // Lista de proyectos, llena la lista
			projectData: [], // Detalle del proyecto
			formcampos: [], // Detalle de la tabla cat_campos
			nameCampos: [
				"folio",
				"id",
				"apaterno",
				"amaterno",
				"nombres",
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
				"estado",
				"cp",
				"colonia",
				"zona",
				"localidad",
				"edificio",
				"piso",
				"area",
				"adscripcion",
				"apellidosjefe",
				"apellidos2jefe",
				"nombresjefe",
				"fichajefe",
				"extjefe",
				"ubicacionjefe",
				"nombrejefeinmediato",
				"apellidosresguardo",
				"apellidos2resguardo",
				"nombresresguardo",
				"adscripcionresguardo",
				"extresguardo",
				"apellidosresponsable",
				"apellidos2responsable",
				"nombresresponsable",
				"apellidospemex",
				"apellidos2pemex",
				"nombrespemex",
				"tipoequipo",
				"equipo",
				"marcaequipo",
				"modeloequipo",
				"numserieequipo",
				"monitor",
				"marcamonitor",
				"modelomonitor",
				"numseriemonitor",
				"teclado",
				"marcateclado",
				"modeloteclado",
				"numserieteclado",
				"mouse",
				"marcamouse",
				"modelomause",
				"numseriemouse",
				"ups",
				"marcaups",
				"modeloups",
				"numserieups",
				"maletin",
				"marcamaletin",
				"modelomaletin",
				"numseriemaletin",
				"candado",
				"marcacandado",
				"modelocandado",
				"numseriecandado",
				"bocinas",
				"marcabocinas",
				"modelobocinas",
				"numseriebocinas",
				"camara",
				"marcacamara",
				"modelocamara",
				"numseriecmara",
				"monitor2",
				"marcamonitor2",
				"modelomonitor2",
				"numseriemonitor2",
				"accesorio",
				"marcaaccesorio",
				"modeloaccesorio",
				"numserieaccesorio",
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
			],
			nameCampo: { proyecto: "", proyectodescripcion: "", fcreacion: "" },
			selectProjectDesc: [],
			perfilid: JSON.parse(this.props.userdata).perfilid,
		};
	}

	fileChangedHandler = (e) => {
		e.preventDefault();
		console.log("up file");

		if (e.target.files.length > 0) {
			var f = e.target.files[0];
			var reader = new FileReader();
			var exceljsonObj = [];

			reader.onload = (e) => {
				var data = e.target.result;
				let readedData = XLSX.read(data, { type: "binary" });
				const wsname = readedData.SheetNames[0];
				const ws = readedData.Sheets[wsname];

				var exceljsonObj = XLSX.utils.sheet_to_row_object_array(ws);
				console.log(exceljsonObj);
				//set data
				var campos = this.state.nameCampo;
				campos.proyecto = exceljsonObj[0].VALIDAR;
				campos.proyectodescripcion = exceljsonObj[1].VALIDAR;

				console.log(this.state.nameCampos.length + 3);
				console.log(exceljsonObj.length);

				if (this.state.nameCampos.length + 3 === exceljsonObj.length) {
					this.getProjectsDesc();
					this.setState({ newProjectInputs: exceljsonObj, nameCampo: campos });
				} else {
					alert("Lay Out Invalido");
				}
			};

			reader.readAsBinaryString(f);

			var inpf = document.getElementById("input-file");
			inpf.value = "";
		} else {
			console.log("no File");
		}
	};

	loadToDB = (dataCampos) => {
		let url = URL_SERVICES + "project";

		let headers = { "Content-type": "application/json;" };
		// Request options
		let options = {
			method: "POST",
			mode: "cors",
			cache: "default",
			body: dataCampos,
			header: headers,
		};

		fetch(url, options)
			.then((response) => response.text())
			.then((texto) => {
				console.log(texto);

				this.setState({ newProjectInputs: [], validated: false });

				alert("Proyecto Cargado");
			})
			.catch((err) => console.log(err));
	};

	updateToDB = (dataCampos, idproject) => {
		console.log("Update Project: " + idproject);

		let url = URL_SERVICES + `project/${idproject}`;

		let headers = { "Content-type": "application/json;" };
		// Request options
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

				this.setState({ projectData: [], projectSelect: 0, validated: false });

				alert("Proyecto Actualizado");
			})
			.catch((err) => console.log(err));
	};

	clickUpload = (e) => {
		e.preventDefault();
		console.log("active inputfile");
		var input_file = document.getElementById("input-file");
		input_file.click();
	};

	toogleCheck = (e) => {
		e.preventDefault();
		console.log("click to checked");

		var el = e.target;
		console.log(el.className);

		el.classList.toggle("checked");
	};

	/**
	 * Even on inputs to update value of data
	 */
	handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value,
		});
	};

	/**
	 * Even on inputs to update value of data in input with variables dinamicas
	 */
	handleChangeDinamic = (e) => {
		const name = e.target.name.toLowerCase();
		const value = e.target.value;
		var campos = this.state.nameCampo;
		campos[name] = value;

		this.setState({
			campos: campos,
		});
	};

	/**
	 * Event select project description
	 */
	handleChangeSelect = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		console.log(value);

		var campos = this.state.nameCampo;
		campos.proyectodescripcion = value;

		this.setState({ nameCampo: campos });
	};

	/**
	 * Event submit of form
	 */
	handleSubmit = (e) => {
		e.preventDefault();
		console.log("Save Data");

		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.stopPropagation();

			this.setState({ validated: false });

			alert("Ingresa un Nombre y Descripcion validos");
		} else {
			const dataCampos = new FormData(form);

			console.log("bandera: " + this.state.show_btn_alta);

			var data = document.getElementsByClassName("content-checkbox");

			if (this.state.show_btn_alta) {
				console.log("Actualiza");
				console.log(dataCampos.get("proyecto"));
				console.log(dataCampos.get("proyectodescripcion"));

				for (var i = 0; i < data.length; i++) {
					var content = data[i];
					var input = content.getElementsByClassName("input-checkbox");

					var columnname = input[0].dataset.column;
					console.log(columnname);

					dataCampos.append(
						columnname,
						input[0].className.includes("checked") ? 1 : 0
					);
				}

				this.updateToDB(dataCampos, this.state.projectSelect);
			} else if (
				this.state.show_btn_alta === false &&
				this.state.newProjectInputs.length > 0
			) {
				console.log(dataCampos.get("PROYECTO"));
				console.log(dataCampos.get("PROYECTODESCRIPCION"));

				var proyecto = dataCampos.get("PROYECTO");
				var proyectodes = dataCampos.get("PROYECTODESCRIPCION");

				if (proyecto !== "" && proyectodes !== "") {
					console.log(proyecto);
					/*Se agregan los datos del proyecto*/
					const dataCampos = new FormData();
					dataCampos.append("proyecto", proyecto);
					dataCampos.append("proyectodescripcion", proyectodes);

					for (var i = 0; i < data.length; i++) {
						var content = data[i];
						var input = content.getElementsByClassName("input-checkbox");

						dataCampos.append(
							this.state.nameCampos[i],
							input[0].className.includes("checked") ? 1 : 0
						);
					}

					this.loadToDB(dataCampos);
				} else {
					alert("Ingresa un Nombre y Descripcion validos");
				}
			} else {
				alert("Carga un archivo");
			}
		}
		this.setState({ validated: true });
	};

	/**
	 * Event reset of form
	 */
	handleReset = (e) => {
		console.log("Reset Form");

		var campos = this.state.nameCampo;
		campos.proyecto = "";
		campos.proyectodescripcion = "";

		this.setState({
			validated: true,
			nameCampo: campos,
			newProjectInputs: [],
			projectData: [],
		});

		if (this.state.show_btn_alta) {
			this.setState({ projectSelect: 0 });
		}

		/*En caso solo dequerer limpiar los check, falta implementar */
		//var data = document.getElementsByClassName('input-checkbox');
	};

	/**
	 * Selecciona el boton con la accion a realziar
	 * @param {*} e
	 */
	selectAction = (e) => {
		e.preventDefault();

		this.setState({ newProjectInputs: [], projectData: [], projectSelect: 0 });

		if (this.state.show_btn_alta === true) {
			this.setState({ show_btn_alta: false, describe: "Buscar" });
		} else {
			this.setState({ show_btn_alta: true, describe: "Nuevo" });
			this.getProjects();
		}
	};

	/**
	 * List of projects :: Select project onChancge
	 * @param {*} e
	 */
	selectProject = (e) => {
		e.preventDefault();

		this.setState({ projectSelect: e.target.value });

		if (e.target.value > 0) {
			console.log("Proyecto id: " + this.state.projectSelect);
			console.log("Proyecto id: " + e.target.value);

			this.getDataProject(e.target.value);
		} else {
			this.setState({ projectData: [] });
		}
	};

	/**
	 * Get List of Projects
	 */
	getProjects() {
		let url = URL_SERVICES + `projects`;

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
			.then((projects) => {
				console.log(projects);
				this.setState({ projectsIds: projects });
			})
			.catch((err) => console.log(err));
	}

	/**
	 * Obtiene el proyecto de la tabla proyectos, (Campos con Banderas para validar o no el campo)
	 */
	getDataProject = async (id) => {
		console.log("get by ID");
		let url = URL_SERVICES + `projectDataValues/${id}`;

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
				console.log("Project Data");
				console.log(project);

				/*Set project data*/
				var campos = this.state.nameCampo;
				campos.proyecto = project[0].value;
				campos.proyectodescripcion = project[1].value;
				campos.fcreacion =
					project[2].value === null || project[2].value == "null"
						? ""
						: project[2].value;

				this.getProjectsDesc(project[1].value);

				this.setState({ projectData: project, nameCampo: campos });
			})
			.catch((err) => console.log(err));
	};

	/**
	 * Get Catalogo descripciones
	 */
	getProjectsDesc(selectedvalue) {
		let url = URL_SERVICES + `catalogos/catalogo/${2}`;

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
			.then((projectsdesc) => {
				console.log(projectsdesc);

				if (selectedvalue !== null) {
					this.refs.selectedDescription.selectedIndex = selectedvalue;
				}

				this.setState({ selectProjectDesc: projectsdesc });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<>
				<NavBar perfilid={this.state.perfilid} history={this.props.history} />

				<div id="newproyect" className="manage-container">
					<input
						id="input-file"
						hidden
						type="file"
						name="upload_project"
						accept=".xlsx"
						onChange={this.fileChangedHandler.bind(this)}
						ref={(fileInput) => (fileInput = fileInput)}
					/>

					<div className="main-container">
						<div className="header-container">
							<div>
								<h3>CMDB Proyectos</h3>
							</div>
						</div>

						<div className="container body-container">
							<Row>
								<div className="btn-action">
									<Button onClick={this.selectAction.bind(this)}>
										{this.state.describe + " "}

										{this.state.describe === "Buscar" ? (
											<BsSearch />
										) : (
											<BsFolderPlus />
										)}
									</Button>
								</div>

								<div className="btn-action">
									<Button
										onClick={this.clickUpload.bind(this)}
										disabled={this.state.show_btn_alta}
									>
										Archivo <BsUpload />
									</Button>
								</div>
							</Row>

							{this.state.show_btn_alta ? (
								<Row>
									<Col sm="6" className="">
										<Form.Label>Proyecto</Form.Label>
										<Form.Control
											as="select"
											value={this.state.projectSelect || "0"}
											onChange={this.selectProject.bind(this)}
										>
											<option value="0">Seleccionar Proyecto..</option>
											{this.state.projectsIds.map((item) => (
												<option key={item.proyectoid} value={item.proyectoid}>
													{item.proyecto}
												</option>
											))}
										</Form.Control>
									</Col>
								</Row>
							) : null}

							<Form
								id="projectFileds"
								noValidate
								name="validate"
								validated={this.state.validated}
								onSubmit={this.handleSubmit.bind(this)}
								onReset={this.handleReset.bind(this)}
							>
								<Row className="justify-content-start">
									{this.state.show_btn_alta ? (
										<>
											{this.state.projectData.map((item) =>
												item.name === "proyecto" ||
												item.name === "proyectodescripcion" ||
												item.name === "fcreacion" ? (
													<Form.Group
														key={`group` + item.name}
														as={Col}
														md="4"
														controlId={`projectFileds` + item.name}
														className="content-input col-6"
													>
														<Form.Label key={`label` + item.name}>
															{item.descripcion}
														</Form.Label>

														{item.name === "proyectodescripcion" ? (
															<Form.Control
																ref="selectedDescription"
																key={`select` + item.name}
																as="select"
																data-column={item.name}
																name={item.name}
																value={this.state.nameCampo.proyectodescripcion}
																onChange={this.handleChangeSelect.bind(this)}
															>
																<option value={""}>
																	{`SELECCIONAR ` + item.descripcion}..
																</option>
																{this.state.selectProjectDesc.map(
																	(projectdesc) => (
																		<option
																			key={projectdesc.descripcion}
																			id={projectdesc.descripcion}
																			value={projectdesc.descripcion}
																		>
																			{projectdesc.descripcion}
																		</option>
																	)
																)}
															</Form.Control>
														) : (
															<Form.Control
																key={`input` + item.name}
																type="text"
																data-column={item.name}
																name={item.name}
																required
																disabled={
																	item.name === "fcreacion" ? true : false
																}
																value={
																	item.name === "proyecto"
																		? this.state.nameCampo.proyecto || ""
																		: item.name === "fcreacion"
																		? this.state.nameCampo.fcreacion || ""
																		: ""
																}
																onChange={this.handleChangeDinamic.bind(this)}
															/>
														)}
														<Form.Control.Feedback
															key={`feed-` + item.name}
															type="invalid"
														>
															Ingresa {item.name}.
														</Form.Control.Feedback>
													</Form.Group>
												) : (
													<Form.Group
														key={`group` + item.name}
														as={Col}
														md="4"
														controlId={`projectFileds` + item.name}
														className="content-checkbox col-6"
													>
														<label title={item.descripcion}>
															{item.descripcion}
														</label>

														<div className="checkbox">
															<button
																data-column={item.name}
																className={
																	item.value === 1
																		? "input-checkbox checked"
																		: "input-checkbox"
																}
																onClick={this.toogleCheck.bind(this)}
															></button>
														</div>
													</Form.Group>
												)
											)}
										</>
									) : (
										this.state.newProjectInputs.map((item) =>
											item.CAMPOS === "PROYECTO" ||
											item.CAMPOS === "DESCRIPCIÓN PROYECTO" ||
											item.CAMPOS === "DESCRIPCION PROYECTO" ||
											item.CAMPOS ===
												"FECHA DE ÚLTIMA MODIFICACIÓN DE REGISTRO" ||
											item.CAMPOS ===
												"FECHA DE ULTIMA MODIFICACION DE REGISTRO" ? (
												<Form.Group
													key={`group` + item.CAMPOS}
													as={Col}
													md="4"
													controlId={`projectFileds` + item.CAMPOS}
													className={
														item.CAMPOS ===
															"FECHA DE ÚLTIMA MODIFICACIÓN DE REGISTRO" ||
														item.CAMPOS ===
															"FECHA DE ULTIMA MODIFICACION DE REGISTRO"
															? "hidden"
															: "content-input"
													}
												>
													<Form.Label key={`label` + item.CAMPOS}>
														{item.CAMPOS}
													</Form.Label>

													{item.CAMPOS === "DESCRIPCIÓN PROYECTO" ||
													item.CAMPOS === "DESCRIPCION PROYECTO" ? (
														<Form.Control
															ref="selectedDescription"
															key={`select` + item.CAMPOS}
															as="select"
															name="PROYECTODESCRIPCION"
															value={
																this.state.nameCampo.proyectodescripcion || ""
															}
															onChange={this.handleChangeSelect.bind(this)}
															required
														>
															<option value="">
																{`SELECCIONAR ` + item.CAMPOS}..
															</option>
															{this.state.selectProjectDesc.map(
																(projectdesc) => (
																	<option
																		key={projectdesc.descripcion}
																		id={projectdesc.descripcion}
																		value={projectdesc.descripcion}
																	>
																		{projectdesc.descripcion}
																	</option>
																)
															)}
														</Form.Control>
													) : (
														<Form.Control
															key={`input` + item.CAMPOS}
															type="text"
															name={
																item.CAMPOS ===
																	"FECHA DE ÚLTIMA MODIFICACIÓN DE REGISTRO" ||
																item.CAMPOS ===
																	"FECHA DE ULTIMA MODIFICACION DE REGISTRO"
																	? "FMODIFICAFILES"
																	: item.CAMPOS
															}
															required
															value={
																item.CAMPOS === "PROYECTO"
																	? this.state.nameCampo.proyecto || ""
																	: ""
															}
															onChange={this.handleChangeDinamic.bind(this)}
															disabled={
																item.CAMPOS ===
																	"FECHA DE ÚLTIMA MODIFICACIÓN DE REGISTRO" ||
																item.CAMPOS ===
																	"FECHA DE ULTIMA MODIFICACION DE REGISTRO"
																	? true
																	: false
															}
														/>
													)}

													<Form.Control.Feedback
														key={`feed-` + item.CAMPOS}
														type="invalid"
													>
														Ingresa {item.CAMPOS}.
													</Form.Control.Feedback>
												</Form.Group>
											) : (
												<Form.Group
													key={`group` + item.CAMPOS}
													as={Col}
													md="4"
													controlId={`projectFileds` + item.CAMPOS}
													className="content-checkbox"
												>
													<label title={item.CAMPOS}>{item.CAMPOS}</label>

													<div className="checkbox">
														<button
															className={
																item.VALIDAR == "si" ||
																item.VALIDAR == "Si" ||
																item.VALIDAR == "SI" ||
																item.VALIDAR == "sI"
																	? "input-checkbox checked"
																	: "input-checkbox"
															}
															onClick={this.toogleCheck.bind(this)}
														></button>
														{/*<input type="radio" value ={item.VALIDAR='Si' ? 1 : 0} ></input>*/}
													</div>
												</Form.Group>
											)
										)
									)}
								</Row>

								{this.state.newProjectInputs.length > 0 ||
								this.state.projectData.length > 0 ? (
									<Form.Row className="justify-content-end">
										<Col sm="auto" className="mb-2">
											<Button
												id="btn-clean"
												className="float-right"
												variant="primary"
												type="reset"
											>
												Limpiar <BsFillTrashFill />
											</Button>
										</Col>

										<Col sm="auto" className="mb-2">
											<Button
												id="brn-save"
												className="float-right"
												variant="primary"
												type="submit"
											>
												{this.state.newProjectInputs.length > 0
													? "Guardar "
													: null}
												{this.state.projectData.length > 0
													? "Actualizar "
													: null}

												{this.state.newProjectInputs.length > 0 ? (
													<BsFolderPlus />
												) : null}
												{this.state.projectData.length > 0 ? <MdSave /> : null}
											</Button>
										</Col>
									</Form.Row>
								) : null}
							</Form>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Project;
