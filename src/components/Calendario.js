import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from "moment";


class Calendario extends Component {

    constructor(props) {
        super(props);
        this.state ={
            primerRegistro: moment('20200925T000000'),
            start : moment('20200925T000000'),
            end: moment(),
        }

    }
    componentDidMount(){
        this.getPrimerRegistro();
    }

    getPrimerRegistro = async()=>{
        let url = "http://localhost:8180/inventario/filtro/calendario";
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

    render() {
        const handleCallback = (start, end) => {
            this.setState({ start: start, end: end });
            console.log(start.format('YYYY-MM-DD'));
            console.log(end.format('YYYY-MM-DD'));
        };
        const label =
            this.state.start.format('MMMM D, YYYY') + ' a ' + this.state.end.format('MMMM D, YYYY');
        return (
            <>
                <DateRangePicker
                    initialSettings={{
                        startDate: this.state.start.toDate(),
                        endDate: this.state.end.toDate(),
                        ranges: {
                            'Todos los registros': [moment('20200925T000000'), moment().toDate()],
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
            </>
        );
    }
}

export default Calendario;