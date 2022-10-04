import React, { useState, useContext } from 'react';
import './style.css';
import { Form, FormGroup, Button, Alert } from 'reactstrap';
import { login } from '../../api/User/Login';
import Spinner from '../../components/Spinner';
import Logomarca from '../../assets/imgs/logo.png';
import { AuthContext } from '../../provider/auth';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const menuShow = useContext(AuthContext);
    const navigate = useNavigate();

    const stateDfault = {
        //message: props.location.state ? props.location.state.message : '',
        statusSpinner: false,
        statusPassword: false,
        //setMenuvisible: props.setMenuvisible,
        description_user: '',
        password_user: ''
    }
    
    const [state, setState] = useState(stateDfault)

    const input_description_user = document.getElementById('description_user');
    const input_password_user = document.getElementById('password_user');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault(); 
        
        try {

           state.statusSpinner = true;

            const data = { description_user: state.description_user, password_user: state.password_user }; 

            if (testUserName() && testUserPassword()) {
                                
                const resp = await login(data) 

                if (resp.status === 200) {
                  state.statusSpinner = false;
                  localStorage.setItem('token', resp.data.access_token)
                  localStorage.setItem('description_user', resp.data.user.description_user)
                  menuShow.setMenuShow(true);
                  navigate("/admin");
                  return;
                }
            }
        }            
        catch (error) {
            state.statusSpinner = false;
            if (error.message === 'Request failed with status code 401') {
                setState({ ...state, message: 'Usuário ou senha inválidos.'});
                return; 
            }
            if(error.message === 'Network Error') {
                setState({ ...state, message: 'Não foi possível a conexão com a API. Verifique sua conexão com a internet ou entre em contato: Setydeias (85) 3290-3496/(85) 9.8627-7777.'});
                return; 
            }          
            setState({ ...state, message: error.message});          
        }
        state.statusSpinner = false;
    }

    const handleShowPassword = (e) => {

        e.preventDefault();
        setState({ ...state, statusPassword : !state.statusPassword });
    }

    const testUserName = () => { 
        
        setState({ ...state, message: ''});

        if(state.description_user ===  undefined){   
            input_description_user.focus();         
            setState({ ...state, message: 'Favor informar o usuário.'});
            return false;
        }
        return true;
    }

    const testUserPassword= () => { 
        
        setState({ ...state, message: ''});

        if(state.password_user === undefined){
            input_password_user.focus(); 
            setState({ ...state, message: 'Favor informar a senha.'});
            return false;
        }
        return true;
    }
 
    return(
        <div className='container sty-font pt-5'>
             <div className='col-md-10 mx-auto col-lg-5 '>
                 <img src={ Logomarca } alt='Logo' className='logo' />
                 <h1>SetYdeias<sup>®</sup></h1>                    
                 <h5 style={{'color' : 'lightslategray', 'marginTop' : '-0.5em', 'textAlign' : 'center'}}>Painel Administrativo</h5>
                 <hr className='my-3'/>                    
                 <Form className='mt-4 mb-4' onSubmit={(e) => handleSubmit(e)}>
                     <FormGroup>         
                        <div className="input-group flex-nowra">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                            <input type='text' id='description_user' name='description_user' className='form-control'  onChange={ handleChange } placeholder='Informe o usuário' />
                        </div>
                     </FormGroup>
                     <FormGroup>

                         <div className="input-group flex-nowra">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                            <input type={state.statusPassword ? 'text' : 'password'} id='password_user' name='password_user' className='form-control' onChange={ handleChange } placeholder='Informe a senha' />
                            <span 
                                 type="button" 
                                 className="input-group-text" 
                                 id="basic-addon1"
                                 onClick={(e) => handleShowPassword(e)}
                             >
                                 <i className={ state.statusPassword? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                             </span>
                         </div> 
                     </FormGroup>
                     <Button 
                         type='submit' 
                         color='info' 
                         block
                     >
                         Acessar                             
                     </Button>
                 </Form>
                 <hr className='my-4 '/>  
                 <Spinner status={state.statusSpinner}/>                  
                 {                        
                     state.message !== '' ? (
                         <Alert color='danger'>{ state.message }</Alert>
                     ) : ''
                 }
             </div>
         </div>
     ) 
}

export default Login;