import React, { useState, useRef } from "react";
import { Form, FormGroup } from "reactstrap";
import './style.css';
import { login } from '../../api/User/Login';
//import User from '../../globals/UserSettings';



export default function Login(props) {

    const userDefault = {
        description_user: '',
        password_user: ''
    } 

    const [user, setUser] = useState(()=> userDefault);
    const [message, setMessage] = useState(() => props.props.location.state ? props.props.location.state.message : '');

    const inputName = useRef(null);
    const inputPassword = useRef(null);

    const handleSetUserDescription = (e) => {
        if(e.target.getAttribute('name')  === 'user-name'){
            setUser({...user, description_user: e.target.value})
        }
    }

    const handleSetUserPassWord = (e) => {
        if(e.target.getAttribute('name')  === 'user-password'){
            setUser({...user, password_user: e.target.value})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {

            if(testUserName() && testUserPassowrd()) {

                var resp = await login(user);  

                if (resp.status === 200) {                    
                  localStorage.setItem('token', resp.data.access_token)
                  props.props.history.push("/admin");
                  return;
                }
            }
            
          } catch (error) {
                if (error.message === 'Request failed with status code 401') {
                    setMessage('Usuário ou senha inválidos.');
                    return; 
                }          
                setMessage(error.message)            
          }
    }
 
    const testUserName = () => {
        setMessage('');
        if(user.description_user.length === 0) {
            setMessage('Favor informar o Usuário.');   
            inputName.current.focus();
            return false;        
        }
        return true;
    }

    const testUserPassowrd = () => {
        setMessage('');
        if(user.password_user.length === 0) {
            setMessage('Favor informar a senha.');   
            inputPassword.current.focus();
            return false;         
        }
        return true
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>SetYdeias®</h3>
                        {/*<div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>*/}
                    </div>
                    <div className="card-body">
                        <Form>
                            <FormGroup>                                 
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input
                                        type="text" 
                                        name='user-name' 
                                        className="form-control" 
                                        placeholder="usuário" 
                                        autoFocus
                                        ref={ inputName }
                                        onChange={(e)=> handleSetUserDescription(e)}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input 
						        		type="password" 
						        		name='user-password' 
						        		className="form-control" 
						        		placeholder="senha" 
                                        ref={ inputPassword }
						        		onChange={(e)=> handleSetUserPassWord(e)}
                                    />
                                </div>
                            </FormGroup>
                            <div className="form-group">
                                <input 
                                    type="submit" 
                                    value="Acessar" 
                                    className="btn float-right login_btn"
                                    onClick={(e)=> handleSubmit(e)} 
                                />
                            </div>
                        </Form>                            
                    </div>
                    <div className="card-footer">                        
                        {/*<div className="d-flex justify-content-center links">
                           
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div>*/}
                    </div>
                        <div className="links">{message !== '' ? message  : ''}</div>   
                </div>
            </div>
        </div>        
    )
}

                

               