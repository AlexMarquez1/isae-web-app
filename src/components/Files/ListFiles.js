import React, { Fragment, useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BsUpload, BsImage } from "react-icons/bs";

export const ListFiles = (props) => {
	const firebase = props.firebase;
	const projectid = props.projectid;
	const inventarioSelected = props.inventarioSelected;
	const [filesList, setFilesList] = useState([]);

	const update = props.update;

	useEffect(() => {
		console.log("useEffect");
		listFiles(inventarioSelected);
	}, []);

	/**
	 * SAVE FILE ON BUCKET AND DATABASE
	 */
	const handleOnChange = (e) => {
		var file = e.target.files[0];
		var filename = file.name;

		console.log("project ID: " + projectid);

		console.log(inventarioSelected);

		saveFiles(file, filename);
	};

	/**
	 * Evento of input file
	 * @param {*} e
	 */
	const fileInput = (e) => {
		var inp = document.getElementById("new-file");
		inp.click();
	};

	/**
	 * Funtion to save and upload files
	 * @param {*} file
	 * @param {*} filename
	 * @param {*} overwrite
	 * @param {*} fileid
	 */
	const saveFiles = (file, filename) => {
		console.log(inventarioSelected);
		var proyectoname = inventarioSelected.proyecto;
		proyectoname = proyectoname.toUpperCase();
		var storageRef = firebase
			.storage()
			.ref(
				`Proyectos/${inventarioSelected.proyectoid}-${proyectoname}/${inventarioSelected.inventarioid}-Inventario/${filename}`
			);
		var task = storageRef.put(file);

		task.on(
			"state_changed",
			(snapshot) => {
				//let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			},
			(error) => {
				console.error(error.message);
			},
			() => {
				// Upload complete
				task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
					console.log("File available at", downloadURL);

					var files = filesList;
					files.push({
						fileid: filename,
						filename: filename,
						fileurl: downloadURL,
					});

					setFilesList(files);
					update();
				});
			}
		);
	};

	/**
	 * Obtiene la lista de los archivos de cada inventario
	 */
	const listFiles = (row) => {
		console.log("List Files");
		console.log(row);

		var proyectoname = row.proyecto;
		proyectoname = proyectoname.toUpperCase();

		// Create a reference under which you want to list
		var listRef = firebase
			.storage()
			.ref(
				`Proyectos/${row.proyectoid}-${proyectoname}/${row.inventarioid}-Inventario/`
			);

		// Find all the prefixes and items.
		listRef
			.listAll()
			.then(function (res) {
				//console.log(filesList);

				res.items.forEach(function (itemRef) {
					// All the items under listRef.
					itemRef.getDownloadURL().then(function (url) {
						var files = filesList;
						files.push({
							fileid: itemRef.name,
							filename: itemRef.name,
							fileurl: url,
						});

						setFilesList(files);
						update();
					});
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<>
			<div className="row asing-options-contect">
				<div className="col-sm-12">
					<input
						id="new-file"
						hidden
						type="file"
						type="file"
						name="avatar"
						//accept="image/jpeg, image/jpeg, image/png, application/pdf"
						accept="application/pdf"
						onChange={handleOnChange.bind(this)}
					/>

					<Button onClick={fileInput.bind(this)}>
						<BsUpload />
					</Button>
				</div>

				<div className="col-sm-12 content-table">
					<table id="contenedor-table" className="table table-bordered">
						<thead>
							<tr>
								<th>Nombre Archivo</th>
								<th colSpan="2">Archivo</th>
							</tr>
						</thead>

						<tbody id="tbody-table">
							{filesList.map((item) => (
								<tr key={item.fileid}>
									<td>{item.filename}</td>
									<td className="content-icon">
										<a
											className="btn-icon btn-icon-color file-image"
											title="Ver"
											href={item.fileurl}
											target="_blank"
										>
											<BsImage />
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
