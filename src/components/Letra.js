import React ,{Fragment} from 'react';


function Letra({letra})
{
    

    if(letra.length === 0) return null;
    return (
        <Fragment>
            <h2>Letra Canción</h2>
            <p className="letra">{letra}</p>
        </Fragment>
    )
}


export default Letra;