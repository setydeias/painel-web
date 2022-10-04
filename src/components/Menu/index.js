import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logImg from '../img/logo.png';
import { getTopNav } from '../../data/navbars';
import ModalSection from '../../components/Modal/Section';
//import { startSessionTime } from '../../utilities/Utilities';
import { login } from '../../api/User/Login';

const Menu = () => {

    const [navItems, setNavItems] = useState([]);
    const [collapse, setCollapse] = useState("nav__menu");
    const [toggleIcon, setToggleIcon] = useState("toggler__icon");

    const [sectionTime, setSectionTime] = useState('')

    const modalDefault = { 
      modal: false, 
      titulo: 'Atenção!', 
      texto: 'A seção irá expirar em:' + sectionTime + 'segundos. Deseja continuar?', 
      acao1: 'Sim', 
      acao2: 'Não' 
    }
  
    const [modal, setModal] = useState(modalDefault);
    const toggle = () => setModal(!modal);

    useEffect(()=>{
        setNavItems(getTopNav());
    }, [])
    
    useEffect(() => {

      startSessionTime(false);    

  }, []);

  useEffect(() => {

    if (sectionTime === '00:30') {
      setModal({...modal, modal: true});
    }
    if (sectionTime === '00:00') {
      window.location.href ='/logout';
    }
  }, [sectionTime]);

  const onToggle = () => {
     collapse === "nav__menu"
         ? setCollapse("nav__menu nav__collapse")
         : setCollapse("nav__menu");
     toggleIcon === "toggler__icon"
         ? setToggleIcon("toggler__icon toggle")
         : setToggleIcon("toggler__icon");
  };


  const startSessionTime = (reset) => {

    var duration = 60 *  30;
    var timer = duration, minutes, seconds;

    var meuInterval = setInterval(function() {
  
      minutes =  parseInt(timer / 60, 10);
      seconds =  parseInt(timer % 60, 10);
     
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      
      setSectionTime(minutes + ":" + seconds);
      
      if (reset) {        
        clearInterval(meuInterval);
        return;
      }

      if(--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  const resetSession = async () => {

    try {

      const resp = await login({ description_user: 'admin', password_user : '@LG10sty7' }) 

      if (resp.status === 200) {
        localStorage.setItem('token', resp.data.access_token);
        localStorage.setItem('description_user', resp.data.user.description_user);
        setModal({...modal, modal: false});
        startSessionTime(true);
        return;
      }
    }            
    catch (error) {
      console.log(error.message);
    }
  }

  return(
      <>       
      <div className="nav__wrapper">
          <div className="container">
            <nav className="nav">
              <Link to="#" className="nav__brand" style={{ color: '#fff', textDecoration: 'none'}}>
                {/*<img src="http://setydeias.com.br/wp-content/uploads/2020/02/Nome-da-Logo-1-1.png" width="200" height="40" alt="" loading="lazy" />*/}
                <img src={logImg} width="50" height="50" alt="" loading="lazy" /> Painel Setydeias
              </Link>
              <ul className={collapse}>
                <li className="nav__item">
                  <Link to={"/admin"} className="nav__link" style={{ color: '#fff', textDecoration: 'none'}}><i className="fas fa-home fa-1x"></i> Início <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav__item dropdown">
                  <li className="nav__link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff', textDecoration: 'none'}}><i className="fas fa-users fa-1x"></i> Clientes <span className="sr-only">(current)</span></li>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={"/customer/register"}><i className="fas fa-user-plus"></i> Cadastrar</Link>
                    <Link className="dropdown-item" to={"/customer"}><i className="fas fa-user-edit"></i> Alterar</Link>
                    <Link className="dropdown-item" to={"/customer"}><i className="fas fa-search"></i> Consultar</Link>
                    <Link className="dropdown-item" to={"/customer"}><i className="fas fa-user-minus"></i> Excluir</Link>
                  </div>
                </li>
                <li className="nav__item">
                  <Link to={"/logout"} className="nav__link"  id="link_logout" style={{ color: '#fff', textDecoration: 'none'}}><i className="fas fa-sign-out-alt fa-1x"></i> Sair<span className="sr-only">(current)</span></Link>
                </li>
              </ul>
              <div className={toggleIcon} onClick={onToggle}>
                <div className="line__1"></div>
                <div className="line__2"></div>
                <div className="line__3"></div>
              </div>
            </nav>
          </div>
      </div>
      <label style={{color: 'GrayText', marginLeft: '5px'}}>Sessão: <span id='timerSession'> { sectionTime } </span></label>
      <ModalSection 
          modal={modal} toggle={toggle}
          resetSession={resetSession}
      />
      </>
  )
}

export default Menu;