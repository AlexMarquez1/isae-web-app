import * as CONSTANTS from "../constants/contants.js";

/**
 * Services For Login
 */

/**
 * Validate If User Exist
 * @param {*} user
 */
export const validateUserExists = async (user, bandera) => {
	let url = CONSTANTS.URL_SERVICES + `users/searchuser/${user}`;

	try {
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		return await res.json();
	} catch (e) {
		// alert("El Usuario no existe");
		hadlerErrors(
			e,
			"Login",
			"validateUserExists([user])",
			"El Usuario no existe",
			url,
			bandera
		);
		return null;
	}
};

/**
 * Search by Email
 * @param {*} email
 */
export const validateEmailExists = async (email) => {
	let url = CONSTANTS.URL_SERVICES + `users/searchemail/${email}`;

	try {
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		return await res.json();
	} catch (e) {
		hadlerErrors(
			e,
			"validateEmail",
			"validateEmailExists([email])",
			"El Correo no esta ligado a un usuario",
			url
		);
		return null;
	}
};

/**
 * * Validate the name of user on data base before Insert a new User
 * @param {*} name
 */
export const validateNameExists = async (name) => {
	let url = CONSTANTS.URL_SERVICES + `users/search/${name}`;

	try {
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		return await res.json();
	} catch (e) {
		hadlerErrors(
			e,
			"validateName",
			"validateNameExists([email])",
			"El Nombre de UsuarioCorreo no existe",
			url
		);
		return null;
	}
};

/**
 * Get Login
 * @param {*} iduser
 */
export const getLoginUser = async (iduser) => {
	let url = CONSTANTS.URL_SERVICES + `users/${iduser}`;

	try {
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		return await res.json();
	} catch (e) {
		console.log(e);
		alert("El Usuario no cuenta con acceso");
		return null;
	}
};

/**
 * Update Password
 * @param {*} dataCampos
 */
export const updatePassword = async (dataCampos) => {
	let url = CONSTANTS.URL_SERVICES + `users/updatepass`;

	// Request options, It does not work with the value of
	// const options = CONSTANTS.OPTIONS_DEF_HEADERS_REQUEST;
	let options = {
		method: CONSTANTS.METHOD_REQUEST.PUT,
		mode: "cors",
		cache: "default",
		header: CONSTANTS.HEADERS_JSON_REQUEST,
		body: dataCampos,
	};

	try {
		alert("Contraseña actualizada");
		let res = await fetch(url, options);
		return await res.text();
	} catch (e) {
		console.log(e);
		alert("Error, Actualizar Contraseña");
		return null;
	}
};

/**
 * Email for Reset password
 * @param {*} dataCampos
 */
export const sendEmailPassReset = async (dataCampos) => {
	let url = CONSTANTS.URL_SERVICES + `users/sendEmailPassReset`;

	let options = {
		method: CONSTANTS.METHOD_REQUEST.PUT,
		mode: "cors",
		cache: "default",
		header: CONSTANTS.HEADERS_JSON_REQUEST,
		body: dataCampos,
	};

	try {
		let res = await fetch(url, options);
		if (res.ok) {
			return await res.json();
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
		alert("Error, Restablecer Contraseña");
		return null;
	}
};

/**
 * Services for Data Users
 *
 */
export const getListUsers = async () => {
	let url = CONSTANTS.URL_SERVICES + "users";

	try {
		console.log("Users - List all users :: Get");
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);

		if (res.ok) {
			return await res.json();
		} else {
			return false;
		}
	} catch (e) {
		hadlerErrors(
			e,
			"Users",
			"getListUsers([datefilter])",
			"Error, Get List User",
			url,
			true
		);
		return null;
	}
};

/**
 * Services for Manage Inventario
 */

/**
 * Download Inventario Format File
 * @param {*}  inventarioid
 */
export const dowloadInventarioFormat = async (inventarioid) => {
	let url = CONSTANTS.URL + `inventario/downloadformat/${inventarioid}`;
	//let url = `http://localhost:8180/inventario/downloadformat/${inventarioid}`;
		console.log(url);

	let options = {
		method: CONSTANTS.METHOD_REQUEST.GET,
		mode: "cors",
		cache: "default",
		header: CONSTANTS.HEADERS_JSON_REQUEST_FORM_DATA,
	};

	try {
		console.log("Download Inventario Format File");
		let res = await fetch(url, options);
		let response = await res.blob();
		response.ok = res.ok; // concatena ok
		response.status = res.status; // concatena status

		return response;
	} catch (e) {
		hadlerErrors(
			e,
			"Inventario",
			"dowloadFormat([inventarioid])",
			"Error, Download Inventario Format File",
			url,
			true
		);
		return null;
	}
};

/**
 * Services for Manage General Catalogs
 */

/**
 * Upload Catalogs
 * @param {*} dataCampos
 */
export const loadGeneralCatalogsFile = async (dataCampos) => {
	let url = CONSTANTS.URL_SERVICES + "catalogos/uploadfile";

	let options = {
		method: CONSTANTS.METHOD_REQUEST.POST,
		mode: "cors",
		cache: "default",
		header: CONSTANTS.HEADERS_JSON_REQUEST_FORM_DATA,
		body: dataCampos,
	};

	try {
		console.log("Upload Files - General Catalogs :: Init");
		let res = await fetch(url, options);
		let response = await res.blob();
		response.ok = res.ok; // concatena ok
		response.status = res.status; // concatena status

		return response;
	} catch (e) {
		hadlerErrors(
			e,
			"Login",
			"loadGeneralCatalogsFile([dataCampos])",
			"Error, Upload Files - Models",
			url,
			true
		);
		return null;
	}
};

export const getCatModel = async () => {
	let url = CONSTANTS.URL_SERVICES + "/catalogos/catModel";

	try {
		console.log("Catalogs - General Catalogs :: Get");
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		let response = await res.json();
		response.ok = res.ok; // concatena ok
		response.status = res.status; // concatena status

		return response;
	} catch (e) {
		hadlerErrors(
			e,
			"Login",
			"loadGeneralCatalogsFile([dataCampos])",
			"Error, Upload Files - Models",
			url,
			true
		);
		return null;
	}
};

/**
 * Services for Manage Models Catalogs
 */

/**
 * Get Catalogs
 */
export const getFormBrandsCatalogs = async () => {
	let url = CONSTANTS.URL_SERVICES + `formcampos/brandscatalogs`;

	try {
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		return res.json();
	} catch (e) {
		hadlerErrors(
			e,
			"Brands Catalogs",
			"getFormBrandsCatalogs()",
			"Error, Obtener Catalogos de Marcas",
			url,
			true
		);
		return null;
	}
};

/**
 * Get Brands by Catalogs
 */
export const getCatalogBrands = async (idcatalogo) => {
	let url = CONSTANTS.URL_SERVICES + `catalogos/catalogo/${idcatalogo}`;

	try {
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		console.log(res);
		return res.json();
	} catch (e) {
		console.log(e);
		alert("Error, catalogos");
		return null;
	}
};

/**
 * Get Catalogs Brand-Models
 */
export const getCatalogBrandsModels = async (idcatalogo) => {
	let url = CONSTANTS.URL_SERVICES + `marcamodelo/catmodelos/${idcatalogo}`;

	try {
		let res = await fetch(url, CONSTANTS.OPTIONS_DEFAULT_GET_REQUEST);
		return res.json();
	} catch (e) {
		console.log(e);
		alert("Error, catalogos marca-modelo");
		return null;
	}
};

/**
 * Upload Models
 * @param {*} dataCampos
 */
export const loadCatalogFile = async (dataCampos) => {
	let url = CONSTANTS.URL_SERVICES + "marcamodelo/uploadfile";

	let options = {
		method: CONSTANTS.METHOD_REQUEST.POST,
		mode: "cors",
		cache: "default",
		header: CONSTANTS.HEADERS_JSON_REQUEST,
		body: dataCampos,
	};

	try {
		console.log("Upload Files - Models :: Init");
		let res = await fetch(url, options);
		let response = await res.json();
		response.ok = res.ok;

		return response;
	} catch (e) {
		console.log(e);
		alert("Error, Upload Files - Models");
		return null;
	}
};

/**
 * Services for Geolocation
 */

export const getFilesLocationUser = async (dataCampos) => {
	let url = CONSTANTS.URL_SERVICES + "fileslocation/fregistro/user";

	let options = {
		method: CONSTANTS.METHOD_REQUEST.POST,
		mode: "cors",
		cache: "default",
		header: CONSTANTS.HEADERS_JSON_REQUEST,
		body: dataCampos,
	};

	try {
		console.log("Geolocation - Location Files by User :: Get");
		let res = await fetch(url, options);

		if (res.ok) {
			return await res.json();
		} else {
			return false;
		}
	} catch (e) {
		hadlerErrors(
			e,
			"Geolocation",
			"getFilesLocationUser([datefilter])",
			"Error, Get User Location Files",
			url,
			true
		);
		return null;
	}
};

/**
 * Handle Errors
 * @param {*} e
 * @param {*} module
 * @param {*} method
 * @param {*} editmessage
 * @param {*} url
 */
function hadlerErrors(e, module, method, editmessage, url, showalert) {
	console.log(e);
	console.log(e.message);

	if (e.message === "Failed to fetch") editmessage = "Error de Conexión";

	if (showalert === true) alert(editmessage);
}
