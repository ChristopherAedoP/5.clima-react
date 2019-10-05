import React, { useState } from 'react'

function Formulario({datosConsulta}) {

	//busqueda = state , guardarBusqueda = this.setState ({})
	const [busqueda, guardarBusqueda] = useState({
		ciudad:'',
		pais:''
	})

	const handleChange = e => {
		//cambiar state
		guardarBusqueda({
			...busqueda,
			[e.target.name] : e.target.value
		})
	}
	const consultarClima = e => {
		e.preventDefault();
		datosConsulta(busqueda)
	}
	return(
		<form
			onSubmit={consultarClima}
		>
			<div className="input-field col s12">
				<input
					type="text"
					name="ciudad"
					id="ciudad"
					onChange={handleChange}
				/>
				<label htmlFor="ciudad" >Ciudad :</label>
			</div>

			<div className="input-field col s12">
				<select onChange={handleChange} name="pais">
					<option value="">Selecciona un pais</option>
					<option value="CL">Chile</option>
					<option value="JP">Japon</option>
					<option value="US">Estados Unidos</option>
				</select>
			</div>
			<div className="input-field col s12">
				<input type="submit"  
				className="waves-effect waves-light btn-large btn-block yellow accent-4 " 
				value="Buscar Clima" />

				
			</div>
		</form>

	)
}

export default Formulario;