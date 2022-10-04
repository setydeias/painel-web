export function testValidPhone(number) {

  if(number.length < 10) return false;
  
  /*if(number.length === 10) {

    if(number.charAt(2) === '4' || number.charAt(2) === '3') {
      return true;
    }
    else {
      return false;      
    }
  }

  if(number.length === 11) { 
    
    if((number.charAt(2) === '9') && ((number.charAt(4) === '9') || (number.charAt(4) === '8') )) {     
     
      return true;
    }
    else {
     
      return false;
    }
  }*/ 
  return true;
    
}

export function isValibCep (cep) {
	const pattern = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
	return pattern.test(cep);
}

export function isValidUf (uf) {
	const pattern = /^[A-Z]{2}$/;
	return pattern.test(uf);
}

export function isValidCPF (cpf) {
  
  cpf = cpf.replace(/[^\d]+/g,'');	
	
  if(cpf === '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length !== 11 || 
		cpf === "00000000000" || 
		cpf === "11111111111" || 
		cpf === "22222222222" || 
		cpf === "33333333333" || 
		cpf === "44444444444" || 
		cpf === "55555555555" || 
		cpf === "66666666666" || 
		cpf === "77777777777" || 
		cpf === "88888888888" || 
		cpf === "99999999999")
			return false;		
	// Valida 1o digito	
	let add = 0;	
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		let rev = 11 - (add % 11);	
		if (rev === 10 || rev === 11)		
			rev = 0;	
		if (rev !== parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev === 10 || rev === 11)	
		rev = 0;	
	if (rev !== parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

export function isValidCNPJ (cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
   
	if(cnpj === '') return false;
	
    if (cnpj.length !== 14)
	return false;
	
	
    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" || 
        cnpj === "11111111111111" || 
        cnpj === "22222222222222" || 
        cnpj === "33333333333333" || 
        cnpj === "44444444444444" || 
        cnpj === "55555555555555" || 
        cnpj === "66666666666666" || 
        cnpj === "77777777777777" || 
        cnpj === "88888888888888" || 
        cnpj === "99999999999999")
        return false;
		
    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
	var soma = 0;
    var pos = tamanho - 7;
    
	for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    
	if (resultado != digitos.charAt(0))
        return false;
    
		
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1))
          return false;
        
	return true;
    
}

export function isValidData (data) {

  var aAr = data.split("/"),
  lDay = parseInt(aAr[0]), lMon = parseInt(aAr[1]), lYear = parseInt(aAr[2]),
  BiY = (lYear % 4 === 0 && lYear % 100 !== 0) || lYear % 400 === 0,
  MT = [1, BiY ? -1 : -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];
  return lMon <= 12 && lMon > 0 && lDay <= MT[lMon - 1] + 30 && lDay > 0;

}

export function formatDate (date, format) {

   const map = {
        mm: ("0"+(date.getMonth() + 1)).toString().slice(-2),
        dd: ("0"+date.getDate()).toString().slice(-2),
        aaaa: date.getFullYear()
    }

    return format.replace(/mm|dd|aaaa/gi, matched => map[matched])
}

export function formatDateForType (date, type) {

  let d = '';
  let m = '';
  let y = '';

  switch (type) {
    //2022-11-28 to 28/11/2022
    case 1:
        date = date.split('-');
        d = date[2];
        m = date[1];
        y = date[0];

        date = `${d}/${m}/${y}`
      break;
  
    default:
      break;
  }

  return date;

}

export function formatDateHour(timestamp, lang, tz) {

  let dateObj = new Date(timestamp)
  
  return dateObj.toLocaleString(lang, {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute:'2-digit',
      second:'2-digit'
  }).replace(/\//g, '-')
  
}

export function testAge(type, date) {

  let newData1 = date.split("-");
  let data_1 = new Date(newData1[0], newData1[1], newData1[2]);
  
  let data = new Date();
  let data_atual = new Date(data.getFullYear(), String(data.getMonth() + 1).padStart(2, '0'), String(data.getDate()).padStart(2,'0'));
  
  let age = data_atual.getFullYear() - data_1.getFullYear();
  
  if(type === 1) return under18(age);
  
  return over120(age);

}

function under18(age) {
   if( age > 18) { 
    return true;
  }
  return false;
}

function over120(age) {
  if( age > 120) { 
    return true;
  }
  return false;
}


export function isValidEMail (mail) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(mail)
}

export function isSite (site) {

  let reDot = /[.]/g
  return reDot.test(site) // retorna -1 pois não conseguiu encontrar o ponto "."
}

export function isValibCnae (cnae) {
  const pattern = /^[0-9]{2}.[0-9]{2}-[0-9]{1}-[0-9]{2}$/;
	return pattern.test(cnae);
}

export function totalCaracters (caracters, total) {
  if(parseInt(caracters.length) > parseInt(total)) {
    return false;
  }
  return true;
}


export function clearForm () {
  var arrForms = document.forms
    for (var j=0,f;f = arrForms[j];j++) {
      f.reset()
    }
}

export function startSessionTime (duration, display, test) {

  var timer = duration, minutes, seconds;

  var meuInterval = setInterval(function() {

    minutes =  parseInt(timer / 60, 10);
    seconds =  parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if(--timer < 0) {
      timer = duration;
    }

  }, 1000)

  /*if(test){
    clearInterval(meuInterval);
  }*/

}
