import XLSX from "xlsx";
import React from 'react';
import "../assets/css/Catalogos.css"
import { Form, Col, Row, Button } from 'react-bootstrap';
import * as ApiServices from "../Services/ApiServices";
import {NavBar} from "./NavBar"

// SpreadJS imports
import '@grapecity/spread-sheets-react';
/* eslint-disable */
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";

class ModeloCatalogos extends React.Component{
      
    constructor(props) {
        super(props);
        this.state = {
            catalogs: [],
            brands: [],
            modelscatalog: [],
            active_brands: false, // not used
            catalogSelected: 0, // Selected currect brand catalog
            brandSelected: 0, // Selected currect brand
            options: // Option to Table of Employs
            { 
              sizePerPageList: [ {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: '15', value: 15
                //text: 'All', value: inventariosid.length
              } ], // you can change the dropdown list for size per page      
              sizePerPage: 5,  // which size per page you want to locate as default
              paginationPosition: 'top',  // default is bottom, top and both is all available
              noDataText: 'Sin registros'
            },
            perfilid: JSON.parse(this.props.userdata).perfilid,
        }
    }

    componentDidMount() {
        this.getCatalogs();        
    }

    /**
     * Get Catalogs
     */
    getCatalogs = async () => {
        let result = await ApiServices.getFormBrandsCatalogs();
        
        if(result !== null)
            this.setState({catalogs: result});
                
    }

    /**
     * Evento of Input File
     * @param {*} e 
     */
    fileChangedHandler = async (e) => {
        e.preventDefault();

            if(e.target.files.length>0){
                var f = e.target.files[0];

                console.log(this.state.brandSelected);
                if(this.state.brandSelected > 0){

                    let dataCampos = new FormData();
                    dataCampos.append('file', f);
                    dataCampos.append('catalogoid', this.state.catalogSelected);
                    dataCampos.append('marcaid', this.state.brandSelected);
                    dataCampos.append('marca', this.refs.selectBrands.options[this.refs.selectBrands.selectedIndex].text);

                    let result = await ApiServices.loadCatalogFile(dataCampos);

                    alert(result.message);                                        

                    if(result.ok){                        
                        this.refs.refBrands.cleanFiltered();
                        this.getCatalogBrandsModels(this.state.catalogSelected);
                        this.setState({ brandSelected: 0 });
                    }

                }else{
                    alert("Selecciona una marca");                    
                }

                var inpf = this.refs.fileInput;
                inpf.value='';
            }else{
                console.log("no File");
            }       
    }

    /**
     * Even to open FileUpload
     * @param {*} e 
     */
    clickUpload = (e) => {
        e.preventDefault();
        this.refs.fileInput.click();
    }
        
    /**
     * Select catalog
     * @param {*} e 
     */
    selectBrandCatalog = async (e) =>{
        e.preventDefault();
        const {name, value} = e.target;

        this.setState({ catalogSelected: value });        
        this.refs.refBrands.cleanFiltered();
        this.refs.refModels.cleanFiltered();

        if(value>0){            
            this.getCatalogBrands(value);
            this.getCatalogBrandsModels(value);            
        }else{
            this.setState({ modelscatalog: [], brands: [] });            
        }

    }

    /**
     * 
     * @param {*} value 
     */
    getCatalogBrands = async (value) => {
        let brands = await ApiServices.getCatalogBrands(value);

            if(brands !== null)
                this.setState({brands: brands});
    }

    /**
     * Set Data for table
     * @param {*} value 
     */
    getCatalogBrandsModels = async (value) => {
        let result = await ApiServices.getCatalogBrandsModels(value);
        
        if(result !== null)
            this.setState({modelscatalog: result});
    }

    /**
     * Select brand
     * @param {*} e 
     */
    selectBrand = (e) => {
        e.preventDefault();
        const {value} = e.target;
        let textvalue = e.target.options[e.target.selectedIndex].text;

        this.setState({ brandSelected: value });
        this.refs.refBrands.cleanFiltered();
        this.refs.refModels.cleanFiltered();

        if(value > 0){
            this.refs.refBrands.applyFilter(textvalue);
        }
    }
    
    render(){
        return(   
            <>
            <NavBar perfilid={this.state.perfilid} history={this.props.history}/>

            <div id='catalogs' className='manage-container'>
                 
                <input id='input-file' hidden type='file' type="file" name="upload_project" accept=".xlsx"
                    onChange={this.fileChangedHandler.bind(this)}
                    ref="fileInput"/>
            
                    <div className='main-container'>
                    
                        <div className='header-container'>
                            <div >
                                <h3>Catalogos</h3>
                            </div>
                             
                        </div>
            
                        <div className="container body-container">

                        <Row>
                            <Col>
                                <div className="btn-action">
                                    <button onClick={this.clickUpload.bind(this)} disabled={this.state.show_btn_alta}>
                                        <svg className="bi bi-file-plus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"/>
                                            <path fillRule="evenodd" d="M13.5 1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z" clipRule="evenodd"/>
                                            <path fillRule="evenodd" d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="6" className="">                                
                                <Form.Label>Catalogo</Form.Label>                                    
                                <Form.Control as="select"
                                    value={this.state.catalogSelected || "0"}
                                    onChange={this.selectBrandCatalog.bind(this)}>
                                        <option value="0">Seleccionar Catalogo..</option>
                                        {
                                        this.state.catalogs.map(catalog => (
                                            <option key={catalog.catalogoid} value={catalog.catalogoid}>{catalog.campo}</option>
                                        ))
                                        }
                                </Form.Control>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="6" className="">                                
                                <Form.Label>Marcas</Form.Label>                                    
                                <Form.Control as="select"
                                    ref='selectBrands'
                                    value={this.state.brandSelected || "0"}
                                    onChange={this.selectBrand.bind(this)}>
                                        <option value="0">Seleccionar Marca..</option>
                                        {
                                        this.state.brands.map(catalog => (
                                            <option key={catalog.idcatalogo} value={catalog.idcatalogo}>{catalog.descripcion}</option>
                                        ))
                                        }
                                </Form.Control>
                            </Col>
                        </Row>

                        <div className={'row content-table'}>
                            <div className='col-sm-12'>
                                <BootstrapTable ref="tablecatalogs" id="tablecatalogs" striped={true} data={ this.state.modelscatalog } 
                                    keyField="idmarcamodelo" version ="4" pagination options = { this.state.options } >
                                    <TableHeaderColumn dataField='idmarcamodelo' hidden className='active-column-header' columnClassName='active-column-data'>ID MARCA</TableHeaderColumn>
                                    <TableHeaderColumn ref='refBrands' dataField='marca' className='active-column-header' filter={ { type: 'TextFilter', placeholder: 'MARCA' } } columnClassName='active-column-data'>MARCA</TableHeaderColumn>
                                    <TableHeaderColumn ref='refModels' dataField='modelo' className='active-column-header' filter={ { type: 'TextFilter', placeholder: 'MODELO' } } columnClassName='active-column-data'>MODELO</TableHeaderColumn>
                                    <TableHeaderColumn dataField='idmarca' hidden className='active-column-header' columnClassName='active-column-data'>FOLIO</TableHeaderColumn>                                    
                                </BootstrapTable>

                            </div>
                        </div>
                        
                        </div>
            
                    </div>
            </div>
            </>
            )
    }
}

export default ModeloCatalogos;