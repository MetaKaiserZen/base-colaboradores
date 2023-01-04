import 'bootstrap/dist/css/bootstrap.min.css';

import { colaboradores } from './database/colaboradores';

import Formulario from './Components/Formulario';

function App()
{
  	return (
        <div className="App">
            <Formulario colaboradores={colaboradores}></Formulario>
        </div>
  	);
}

export default App;
