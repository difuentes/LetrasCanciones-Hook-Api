import React,{useState,useEffect,Fragment} from 'react';
import Formulario from './components/Formulario';
import axios  from 'axios';
import Letra from './components/Letra';
import Informacion from './components/Informacion';

function App(){


    //utilizar use state con 3 state direntes

    const[artista,agregarArtista] = useState('');
    const[letra,agregarLetra] =  useState ([]);
    const [info,agregarInfoArtista ] =  useState({});

    //Metodo Para consultar la api de letras de canciones
    const  consultarApiLetras = async busqueda =>
    {
        const{artista,cancion} =  busqueda;

        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
        
         // consultar la api
        const resultado = await axios(url);

         //agregar artista de de la api al state
         agregarArtista(artista);

        //agregar letra de la api al state
        agregarLetra(resultado.data.lyrics)    
    }


    //metodos para consultar api de informacion de artistas

    const consultarApiInfoArtista = async () =>
    {
        if(artista){
            const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
        const resultado = await axios(url);
        agregarInfoArtista(resultado.data.artists[0]);
       
        }
    }

    useEffect(
      () =>{
          consultarApiInfoArtista();
      },[artista]
    )
   


    return(
        <Fragment>
            
            <Formulario consultarApiLetras={consultarApiLetras}
            />

          <div className="container mt-5">

            <div className="row">
                <div className="col-md-6">
                <Informacion 
                    info={info}
                  />  
                </div>

                <div className="col-md-6">
                    
                    <Letra letra ={letra}/>
                </div>

            </div>

          </div>

        </Fragment>


    )
    
}

export default App;