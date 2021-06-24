export const HEADERS_JSON_REQUEST = { "Content-type": "application/json;" };
export const HEADERS_JSON_REQUEST_FORM_DATA = {
	"Content-type": "multipart/form-data",
};

export const METHOD_REQUEST = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};

export const OPTIONS_DEFAULT_GET_REQUEST = {
	method: METHOD_REQUEST.GET,
	mode: "cors",
	cache: "default",
	headers: HEADERS_JSON_REQUEST,
};

export const OPTIONS_DEF_HEADERS_REQUEST = {
	method: null,
	mode: "cors",
	cache: "default",
	headers: HEADERS_JSON_REQUEST,
	body: null,
};

export const OPTIONS_BUILD_REQUEST = {
	method: null,
	mode: "cors",
	cache: "default",
};

export const firebaseConfig = {
	apiKey: "AIzaSyDYsaRLxNsjG-N2sMi5NAruxN0h6QzfkFA",
	authDomain: "isae-de6da.firebaseapp.com",
	databaseURL: "https://isae-de6da.firebaseio.com",
	projectId: "isae-de6da",
	storageBucket: "isae-de6da.appspot.com",
	messagingSenderId: "972087423452",
	appId: "1:972087423452:web:2a371fa79ca495c6f75f19",
	measurementId: "G-JBGG7LMCDR",
};

export const TABLE_OPTIONS_DEFAULT = {
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
	sizePerPage: 5, // which size per page you want to locate as default
	paginationPosition: "top", // default is bottom, top and both is all available
	noDataText: "Sin registros",
};

//export const URL_SERVICES = 'http://pagelab.io:8080/'; // server pagelab.io
// export const URL_SERVICES = "http://localhost:8080/"; // Local - jar file
// export const URL_SERVICES = 'http://127.0.0.1:8080/' // Local - jar file
//export const URL_SERVICES = 'http://localhost:8180/inventario-0.0.1-SNAPSHOT/' // Local - on server with war file
//export const URL_SERVICES = "https://cookysoft.com/inventario-0.0.1-SNAPSHOT/"; // Prod
export const URL_SERVICES = "http://springbotwebapptomcat-env.eba-mhq9vbpm.us-east-2.elasticbeanstalk.com/"; // TODO: comprobar si esta funcionando correctamente
export const URL = "http://springbotwebapptomcat-env-1.us-east-2.elasticbeanstalk.com/"; // TODO: Comprobar si esta funcionando como deberia
export const URL_API = "http://springbotwebapptomcat-env-1.us-east-2.elasticbeanstalk.com/"; 