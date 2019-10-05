import React , {useState , useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';


function App() {

  const [ciudad , guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError ] = useState (false);
  const [resultado, guardarResultado ] = useState ({});

  useEffect(() => {
    if (ciudad === '') return ; 

    const consultarAPI = async () => {

      const apiID = '8bdcd00aa4d88df054b23b69c47c8e62';
  
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      //console.log(resultado);
      guardarResultado(resultado)
    }

    consultarAPI();
  },[ciudad , pais]);

  const datosConsulta = datos => {
    //console.log(datos)

    if(datos.ciudad ==='' || datos.pais === ''){
      //un error
      guardarError(true)
      return; 
    }
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }



  // cargar componente condicionalmente 
  let componente = null;
  if (error){
    // hay error, mostarlo
    componente = <Error mensaje='Ambos campos son oblogatorios' />
  }else if (resultado.cod ==="404"){ 
    componente = <Error mensaje='La ciudad no existe en el registro' />
  } else {
    //no error mostrar clima
    componente = <Clima resultado={resultado}/>
  }

  return (
    <div className="App">
      <Header titulo={'Clima React App'}></Header>
        

        <div className="contenedor-form">
          <div className="containner">
            <div className="row">
              <div className="col s12 m6">
                <Formulario datosConsulta={datosConsulta}/>
              </div>
              <div className="col s12 m6">
                {componente}
              </div>              
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
