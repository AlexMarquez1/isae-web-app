import React from "react";
import "../assets/css/Geolocation.css";
import { Form, Col, Row } from "react-bootstrap";
import { BsGeoAlt, BsImage } from "react-icons/bs";
import * as ApiServices from "../Services/ApiServices";
import * as CONSTANTS from "../constants/contants.js";
import { NavBar } from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

// SpreadJS imports
import "@grapecity/spread-sheets-react";
/* eslint-disable */
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";

class Geolocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filesLocation: [],
			usersList: [],
			userListsSelect: 0,
			currentDate: null,
			minDate: Date("2019-01-01"),
			options: CONSTANTS.TABLE_OPTIONS_DEFAULT, // Option to Table
			perfilid: JSON.parse(this.props.userdata).perfilid,
		};
	}

	componentDidMount() {
		this.getListUsers();
		this.setState({ currentDate: new Date() });
	}

	/**
	 * Data Users functions
	 */

	/**
	 * Get List of Users
	 */
	getListUsers = async () => {
		let result = await ApiServices.getListUsers();

		if (result) this.setState({ usersList: result });
	};

	/**
	 * Show a specifi user after select
	 */
	selectUser = (e) => {
		const userid = e.target.value;
		this.setState({ userListsSelect: userid });

		if (e.target.value > 0) {
			this.getFilesLocationUser(userid, this.state.currentDate);
		} else {
			this.setState({ filesLocation: [] });
		}
	};

	/**
	 * Date Functions
	 */
	selectDate = (date) => {
		this.setState({ currentDate: date });

		if (this.state.userListsSelect > 0)
			this.getFilesLocationUser(this.state.userListsSelect, date);
	};

	/**
	 * Get list of files location
	 */
	getFilesLocationUser = async (userid, currentdate) => {
		let date = new Date(currentdate);

		let simpledate =
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1 < 10 ? "0" : "") +
			(date.getMonth() + 1) +
			"-" +
			(date.getDate() < 10 ? "0" : "") +
			date.getDate();

		let dataCampos = new FormData();
		dataCampos.append("datefilter", simpledate);
		dataCampos.append("iduser", userid);

		let result = await ApiServices.getFilesLocationUser(dataCampos);
		console.log(result);
		if (result) this.setState({ filesLocation: result });
	};

	/**
	 *
	 */
	cellLocationIconLink(cell, row, enumObject, rowIndex) {
		let ltlg = cell;
		let maplocation =
			ltlg === null || ltlg === "null"
				? ""
				: `https://www.google.es/maps?q=` +
				  ltlg.replace("LatLng(", "").replace(")", "");

		return (
			<a className="btn-icon btn-icon-color" target="_blank" href={maplocation}>
				<BsGeoAlt />
			</a>
		);
	}

	/**
	 * Button to Download format
	 */
	cellPictureIconLink(cell, row, enumObject, rowIndex) {
		return (
			<a className="btn-icon btn-icon-color" target="_blank" href={cell}>
				<BsImage />
			</a>
		);
	}

	render() {
		return (
			<>
				<NavBar perfilid={this.state.perfilid} history={this.props.history} />

				<div id="geolocation" className="manage-container">
					<div className="main-container">
						<div className="header-container">
							<div>
								<h3>Ubicación</h3>
							</div>
						</div>

						<div className="container body-container">
							<Row className="justify-content-center">
								<Col sm="6" className="">
									<Row>
										<Form.Label column sm="3">
											Usuario:
										</Form.Label>
										<Col sm={9}>
											<Form.Control
												as="select"
												value={this.state.userListsSelect || ""}
												onChange={this.selectUser.bind(this)}
											>
												<option value="0">Seleccionar Usuario..</option>
												{this.state.usersList.map((item) => (
													<option key={item.usuarioid} value={item.usuarioid}>
														{item.nombrecompleto}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</Col>

								<Col>
									<div className="btn-action row">
										<Form.Label column sm="3">
											Fecha:
										</Form.Label>

										<Col sm={9}>
											<DatePicker
												// minDate={this.state.minDate}
												selected={this.state.currentDate}
												locale={es}
												closeOnScroll={true}
												placeholderText="Fecha"
												// todayButton="Hoy"
												peekNextMonth
												// showMonthDropdown
												// showYearDropdown
												dateFormat="yyyy-MM-dd"
												dateFormatCalendar={"MMMM yyyy"}
												onChange={(date) => this.selectDate(date)}
											/>
										</Col>
									</div>
								</Col>
							</Row>

							<div className={"row content-table"}>
								<div className="col-sm-12">
									<BootstrapTable
										ref="tablegeolocation"
										id="tablegeolocation"
										className="tablegeolocation"
										striped={true}
										data={this.state.filesLocation}
										keyField="fileid"
										version="4"
										pagination
										options={this.state.options}
									>
										<TableHeaderColumn dataField="fileid" hidden>
											FILE ID
										</TableHeaderColumn>

										<TableHeaderColumn
											ref="refRegitroTime"
											dataField="fregistrotime"
										>
											HORA
										</TableHeaderColumn>

										<TableHeaderColumn
											ref="refFileCordenadas"
											dataField="filecordenadas"
											className="content-icon active-column-header"
											columnClassName="content-icon active-column-data"
											dataFormat={this.cellLocationIconLink.bind(this)}
										>
											UBICACIÓN
										</TableHeaderColumn>

										<TableHeaderColumn
											ref="refFileUrl"
											dataField="fileurl"
											className="content-icon active-column-header"
											columnClassName="content-icon active-column-data"
											dataFormat={this.cellPictureIconLink.bind(this)}
										>
											IMAGEN
										</TableHeaderColumn>
									</BootstrapTable>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Geolocation;
