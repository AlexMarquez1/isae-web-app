import React, { Component } from 'react';
import "../assets/css/App.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from "moment";
import { Form, Col, Row } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
} from "reactstrap";
import { URL } from "../constants/contants.js";
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            projectid: 0,
            proyectTipo: 0,
            totalRegistros: 0,
            totalCerrado: 0,
            totalPendiente: 0,
            totalEnProceso: 0,
            totalAsignados: 0,
            totalNuevos: 0,
            opcGrafica: 0,
            projectsList: [],
            projectsTipoList: ['INVENTARIO', 'MIGRACION', 'MANTENIMIENTO'],
            datosAnioActual: [],
            datosAnioPasado: [],
            primerRegistro: moment('20200925T000000'),
            start: moment().subtract(1, "year").startOf("year"),
            end: moment().endOf("year"),
        }
    }
    componentDidMount() {
        this.getProyectos();
        this.getTotal();
        this.timerID = setInterval(
            () => this.tick(),
            9000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {

        let url = URL + `inventario/filtro/${this.state.proyectTipo}/${this.state.projectid}/${this.state.start.format('YYYY-MM-DD')}/${this.state.end.format('YYYY-MM-DD')}`
        //let url = `http://localhost:8180/inventario/filtro/${this.state.proyectTipo}/${this.state.projectid}/${this.state.start.format('YYYY-MM-DD')}/${this.state.end.format('YYYY-MM-DD')}`;

        let headers = { "Content-type": "application/json;" };

        // Request options
        let options = {
            method: "POST",
            mode: "cors",
            cache: "default",
            header: headers,
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((datos) => {
                console.log(datos);
                this.setState({
                    date: new Date(),
                    totalRegistros: datos[0],
                    totalCerrado: datos[1],
                    totalPendiente: datos[2],
                    totalEnProceso: datos[3],
                    totalAsignados: datos[4],
                    totalNuevos: datos[5]
                });
            })
            .catch((err) => console.log(err));

    }

    getPrimerRegistro = async () => {
        let url = URL + `inventario/filtro/calendario`
        //let url = "http://localhost:8180/inventario/filtro/calendario";
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
            .then((fechaPrimerRegistro) => {
                console.log(fechaPrimerRegistro);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    getTotal() {

        document.querySelector(".loader").classList.add("show");
        document.querySelector(".back-loader").classList.add("show");

        let url = URL + `inventario/total`;
        //let url = `http://localhost:8180/inventario/total`;

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
            .then((datos) => {
                console.log(datos);
                this.setState({
                    totalRegistros: datos[0],
                    totalCerrado: datos[1],
                    totalPendiente: datos[2],
                    totalEnProceso: datos[3],
                    totalAsignados: datos[4],
                    totalNuevos: datos[5]
                });
            })
            .catch((err) => console.log(err));

        let urlGraficaActual = URL + `inventario/filtro/grafica/${moment().startOf("year").format('YYYY-MM-DD')}/${moment().endOf("year").format('YYYY-MM-DD')}`;
        //let urlGraficaActual = `http://localhost:8180/inventario/filtro/grafica/${moment().startOf("year").format('YYYY-MM-DD')}/${moment().endOf("year").format('YYYY-MM-DD')}`;

        let optionsGrafica = {
            method: "POST",
            mode: "cors",
            cache: "default",
            header: headers,
        };

        fetch(urlGraficaActual, optionsGrafica)
            .then((response) => response.json())
            .then((datos) => {
                console.log(datos);
                this.setState({
                    datosAnioActual: datos,
                });
            })
            .catch((err) => console.log(err));

        let urlGraficaPasado = URL + `inventario/filtro/grafica/${moment().subtract(1, "year").startOf("year").format('YYYY-MM-DD')}/${moment().subtract(1, "year").endOf("year").format('YYYY-MM-DD')}`;
        //let urlGraficaPasado = `http://localhost:8180/inventario/filtro/grafica/${moment()
        // .subtract(1, "year")
        // .startOf("year").format('YYYY-MM-DD')}/${moment()
        //     .subtract(1, "year").endOf("year").format('YYYY-MM-DD')}`;


        fetch(urlGraficaPasado, optionsGrafica)
            .then((response) => response.json())
            .then((datos) => {
                console.log(datos);
                this.setState({
                    datosAnioPasado: datos,
                });
                document.querySelector(".loader").classList.remove("show");
                document.querySelector(".back-loader").classList.remove("show");
            })
            .catch((err) => console.log(err));


    }

    getProyectos() {
        let url = URL + `lista/proyectos`;

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
            .then((datos) => {
                console.log(datos);
                this.setState({ projectsList: datos });
            })
            .catch((err) => console.log(err));
    }

    tipoSeleccionado = (e) => {
        let seleccion = e.target.value;
        document.querySelector(".loader").classList.add("show");
        document.querySelector(".back-loader").classList.add("show");

        //let url = `http://localhost:8180/inventario/filtro/${e.target.value}/${this.state.projectid}`;
        let url = URL + `inventario/filtro/${e.target.value}/${this.state.projectid}/${this.state.start.format('YYYY-MM-DD')}/${this.state.end.format('YYYY-MM-DD')}`;

        let headers = { "Content-type": "application/json;" };

        // Request options
        let options = {
            method: "POST",
            mode: "cors",
            cache: "default",
            header: headers,
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((datos) => {
                console.log(datos);
                this.setState({
                    proyectTipo: seleccion,
                    totalRegistros: datos[0],
                    totalCerrado: datos[1],
                    totalPendiente: datos[2],
                    totalEnProceso: datos[3],
                    totalAsignados: datos[4],
                    totalNuevos: datos[5]
                });
                document.querySelector(".loader").classList.remove("show");
                document.querySelector(".back-loader").classList.remove("show");
            })
            .catch((err) => console.log(err));
    }

    proyectoSeleccionado = (e) => {
        let seleccion = e.target.value;
        document.querySelector(".loader").classList.add("show");
        document.querySelector(".back-loader").classList.add("show");

        //let url = `http://localhost:8180/inventario/filtro/${this.state.proyectTipo}/${e.target.value}`;
        let url = URL + `inventario/filtro/${this.state.proyectTipo}/${e.target.value}/${this.state.start.format('YYYY-MM-DD')}/${this.state.end.format('YYYY-MM-DD')}`;

        let headers = { "Content-type": "application/json;" };

        // Request options
        let options = {
            method: "POST",
            mode: "cors",
            cache: "default",
            header: headers,
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((datos) => {
                console.log(datos);
                this.setState({
                    projectid: seleccion,
                    totalRegistros: datos[0],
                    totalCerrado: datos[1],
                    totalPendiente: datos[2],
                    totalEnProceso: datos[3],
                    totalAsignados: datos[4],
                    totalNuevos: datos[5]
                });
                document.querySelector(".loader").classList.remove("show");
                document.querySelector(".back-loader").classList.remove("show");
            })
            .catch((err) => console.log(err));
    };

    selectOpcGrafica = (e) => {
        console.log("Opcion seleccionada: " + e.target.value);
        this.setState({
            opcGrafica: e.target.value,
        });

    }

    handleSelect(date) {
        console.log(date); // native Date object
    }


    render() {
        const data = {
            labels: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
            ],
            datasets: [
                {
                    label: "Año Actual",
                    data: this.state.datosAnioActual,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    tension: 0.4,
                },
                {
                    label: "Año Pasado",
                    data: this.state.datosAnioPasado,
                    fill: true,
                    borderColor: "#742774",

                    tension: 0.4,
                }
            ]
        };
        let datospie = [this.state.totalCerrado, this.state.totalPendiente, this.state.totalEnProceso, this.state.totalAsignados, this.state.totalNuevos];
        let labelspie = ["Cerrados", "Pendientes", "En Proceso", "Asignados", "Nuevos"];
        let customLabels = labelspie.map((label) => `${label}`)
        const handleCallback = (start, end) => {
            this.setState({ start: start, end: end });
            document.querySelector(".loader").classList.add("show");
            document.querySelector(".back-loader").classList.add("show");

            let url = URL + `inventario/filtro/grafica/${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`;
            //let url = `http://localhost:8180/inventario/filtro/grafica/${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`;

            let headers = { "Content-type": "application/json;" };

            // Request options
            let options = {
                method: "POST",
                mode: "cors",
                cache: "default",
                header: headers,
            };

            fetch(url, options)
                .then((response) => response.json())
                .then((datos) => {
                    console.log(datos);
                    this.setState({
                        datosAnioActual: datos,
                    });
                    document.querySelector(".loader").classList.remove("show");
                    document.querySelector(".back-loader").classList.remove("show");
                })
                .catch((err) => console.log(err));

            console.log(start.format('YYYY-MM-DD'));
            console.log(end.format('YYYY-MM-DD'));
        };
        const label =
            this.state.start.format('MMMM D, YYYY') + ' a ' + this.state.end.format('MMMM D, YYYY');
        let estadisticastotales = {
            data: (canvas) => {
                return {
                    labels: customLabels,
                    datasets: [
                        {
                            label: "totales",
                            pointRadius: 0,
                            pointHoverRadius: 0,
                            backgroundColor: ["#008000", "#FFA500", "#FFFF00", "#42B7FC", "#949494"],
                            borderWidth: 0,
                            data: datospie,
                        },
                    ],
                };
            },
            options: {
                legend: { display: false, position: "right" },
                datalabels: {
                    display: true,
                    color: "white",
                },
                tooltips: {
                    backgroundColor: "#5a6e7f",
                },
                plugins: {
                    legend: { display: false },

                    tooltip: { enabled: true },
                },
                maintainAspectRatio: false,
                pieceLabel: {
                    render: "percentage",
                    fontColor: ["white"],
                    precision: 2,
                },
                scales: {
                    y: {
                        ticks: {
                            display: false,
                        },
                        grid: {
                            drawBorder: false,
                            display: false,
                        },
                    },
                    x: {
                        barPercentage: 1.6,
                        grid: {
                            drawBorder: false,
                            display: false,
                        },
                        ticks: {
                            display: false,
                        },
                    },
                },
            },
        };
        return (
            <>
                <div className="loader">
                    <img src="../loading.gif" alt="loading"></img>
                </div>
                <div className="back-loader"></div>

                <Row>
                    <Col sm="6" className="">
                        <Row>
                            <Col sm={11}>
                                <Form.Control
                                    as="select"
                                    className="opc"
                                    value={this.proyectTipo > 0 ? this.state.proyectTipo : undefined}
                                    onChange={this.tipoSeleccionado.bind(this)}
                                >
                                    <option value="0">Tipo de proyecto</option>
                                    {
                                        this.state.projectsTipoList.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" className="">
                        <Row>
                            <Col sm={11}>
                                <Form.Control
                                    as="select"
                                    className="opc"
                                    value={this.projectid > 0 ? this.state.projectid : undefined}
                                    onChange={this.proyectoSeleccionado.bind(this)}
                                >
                                    <option value="0">Proyecto</option>
                                    {
                                        this.state.projectsList.map((item) => (
                                            <option key={item[0]} value={item[0]}>
                                                {item[1]}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm="3">
                        <Row className="fila-datos grafica-pie">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Estadisticas totales</CardTitle>
                                </CardHeader>
                                <CardBody style={{ height: "266px" }}>
                                    <Pie
                                        data={estadisticastotales.data}
                                        options={estadisticastotales.options}
                                    />
                                </CardBody>
                            </Card>
                        </Row>
                    </Col>
                    <Col sm="3">
                        <Row className="fila-datos">
                            <div className="cuadrado total-registros">
                                <strong className="texto-datos"> {this.state.totalRegistros}</strong>
                                <div className="texto-cuadro">
                                    Total de Registros
                                </div>
                            </div>
                        </Row>
                        <Row className="fila-datos">
                            <div className="cuadrado total-en-proceso">
                                <strong className="texto-datos"> {this.state.totalEnProceso}</strong>
                                <div className="texto-cuadro">
                                    En Proceso
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <Col sm="3">
                        <Row className="fila-datos">
                            <div className="cuadrado total-cerrados">
                                <strong className="texto-datos">{this.state.totalCerrado}</strong>
                                <div className="texto-cuadro">
                                    Cerrados
                                </div>
                            </div>
                        </Row>
                        <Row className="fila-datos">
                            <div className="cuadrado total-asignados">
                                <strong className="texto-datos"> {this.state.totalAsignados}</strong>
                                <div className="texto-cuadro">
                                    Asignados
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <Col sm="3">
                        <Row className="fila-datos">
                            <div className="cuadrado total-pendiente">
                                <strong className="texto-datos"> {this.state.totalPendiente}</strong>
                                <div className="texto-cuadro">
                                    Pendientes
                                </div>
                            </div>
                        </Row>
                        <Row className="fila-datos">
                            <div className="cuadrado total-nuevos">
                                <strong className="texto-datos"> {this.state.totalNuevos}</strong>
                                <div className="texto-cuadro">
                                    Nuevos
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <Col sm="12">
                        <Card className="card-chart">
                            <CardHeader>
                                <CardTitle tag="h5">
                                    <Row className="justify-content-center">
                                        <Col sm="12" className="">
                                            <Row>
                                                <Form.Label column sm="2">
                                                    Filtrar por:
                                                </Form.Label>
                                                <Col sm={8}>
                                                    <DateRangePicker
                                                        initialSettings={{
                                                            startDate: this.state.start.toDate(),
                                                            endDate: this.state.end.toDate(),
                                                            ranges: {
                                                                'Este año': [moment().startOf("year"), moment().endOf("year")],
                                                                'Hoy': [moment().toDate(), moment().toDate()],
                                                                'Ayer': [
                                                                    moment().subtract(1, 'days').toDate(),
                                                                    moment().subtract(1, 'days').toDate(),
                                                                ],
                                                                'Ultimos 7 Dias': [
                                                                    moment().subtract(6, 'days').toDate(),
                                                                    moment().toDate(),
                                                                ],
                                                                'Ultimos 30 Dias': [
                                                                    moment().subtract(29, 'days').toDate(),
                                                                    moment().toDate(),
                                                                ],
                                                                'Este Mes': [
                                                                    moment().startOf('month').toDate(),
                                                                    moment().endOf('month').toDate(),
                                                                ],
                                                                'Mes pasado': [
                                                                    moment().subtract(1, 'month').startOf('month').toDate(),
                                                                    moment().subtract(1, 'month').endOf('month').toDate(),
                                                                ],
                                                                "Ultimo Año": [
                                                                    moment()
                                                                        .subtract(1, "year")
                                                                        .startOf("year"),
                                                                    moment()
                                                                        .subtract(1, "year")
                                                                        .endOf("year")
                                                                ]
                                                            },
                                                        }}
                                                        onCallback={handleCallback}
                                                    >
                                                        <div
                                                            id="reportrange"
                                                            style={{
                                                                background: '#fff',
                                                                cursor: 'pointer',
                                                                padding: '5px 10px',
                                                                border: '1px solid #ccc',
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <i className="fa fa-calendar"></i>&nbsp;
                                                            <span>Rango de fecha:  {label}</span> <i className="fa fa-caret-down"></i>
                                                        </div>
                                                    </DateRangePicker>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Line
                                    data={data}
                                    width={400}
                                    height={100}
                                />
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </>

        );
    }
}
export default Clock;