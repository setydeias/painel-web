export function maskTelefone(e) {
    
  e.currentTarget.maxLength = 16;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  
  value = value.replace(/^0/, "");
  if (value.length > 10) {
    value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (value.length > 5) {
    if (value.length === 6 && value.code === "Backspace") { 
      // necessário pois senão o "-" fica sempre voltando ao dar backspace
      return; 
    } 
    value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    if (value.length !== 0) {
      value = value.replace(/^(\d*)/, "($1");
    }
  }
    
  e.currentTarget.value = value;
  return e;
}

export function setMaskTelefone(number) {
  
  if(number != null){
    let value =number;

    value = value.replace(/\D/g, "");
    
    value = value.replace(/^0/, "");
    if (value.length > 10) {
      value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
      if (value.length === 6 && value.code === "Backspace") { 
        // necessário pois senão o "-" fica sempre voltando ao dar backspace
        return; 
      } 
      value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      if (value.length !== 0) {
        value = value.replace(/^(\d*)/, "($1");
      }
    }

    return value;
  }
}

export function noMask(numero) {

  let padrao = '';
  
  for (let i = 0; i < numero.length; i++) {
    
    if(
        numero.charAt(i) !== '.' && 
        numero.charAt(i) !== '-' && 
        numero.charAt(i) !== '/' &&
        numero.charAt(i) !== '(' &&
        numero.charAt(i) !== ')' &&
        numero.charAt(i) !== ' '
      ) {
      padrao = padrao + numero.charAt(i);
    }      
  }
  
  return padrao;   
}

export function maskCep(e) {
    
  e.currentTarget.maxLength = 10;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/(\d)(\d{3})$/, "$1-$2"); 
    
  e.currentTarget.value = value;
  return e;
}

export function setMaskCep(cep) {
  
  let value = cep;

  if(cep) {  
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d)(\d{3})$/, "$1-$2"); 
  }  
  return value;
}

export function maskCPF(e) {
    
  e.currentTarget.maxLength = 14;
  let value =  e.currentTarget.value;
  value = value.replace(/\D/g, "");

  value = value.replace(/^(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1-$2");
  value = value.replace(/(\d)(\d{2})/, "$1$2");

  e.currentTarget.value = value;
  return e;
}

export function setMaskCPF(cpf) {
    
  let value =  cpf;

  value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return value;
}

export function maskCNPJ(e) {
    
  e.currentTarget.maxLength = 18;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  
  //value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");
  value = value.replace(/(\d)(\d{2})/, "$1$2");

  e.currentTarget.value = value;
  return e;
}

export function setMaskCNPJ(cnpj) {
    
  if(cnpj) {
    
    let value = cnpj;
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    return value;
  }
}

export function maskCnae(e) {
    
  e.currentTarget.maxLength = 10;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");

  value = value.replace(/^(\d{2})(\d{2})(\d{1})(\d{2})/, "$1.$2-$3-$4");

  e.currentTarget.value = value;
  return e;
}

export function setMaskCnae(cnae) {
  
  if(cnae) {
    let value = cnae;
    value = value.replace(/^(\d{2})(\d{2})(\d{1})(\d{2})/, "$1.$2-$3-$4");
    return value;
  }
  
}



export function maskMoney(event) {
  const onlyDigits = event.target.value
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0,00")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  event.target.value = maskCurrency(digitsFloat)
}

function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor)
}

// usa vírgula como separador decimal, ponto como separador de milhar, sempre com 2 casas decimais
const formatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function maskMoney2(e) {
    const input = e.target;
    // elimina tudo que não é dígito
    input.value = input.value.replace(/\D+/g, '');
    if (input.value.length === 0) // se não tem nada preenchido, não tem o que fazer
        return;
    // verifica se ultrapassou a quantidade máxima de dígitos (pegar o valor no dataset)
    const maxDigits = parseInt(input.dataset.maxDigits);
    if (input.value.length > maxDigits) {
        // O que fazer nesse caso? Decidi pegar somente os primeiros dígitos
        input.value = input.value.substring(0, maxDigits);
    }
    // lembrando que o valor é a quantidade de centavos, então precisa dividir por 100
    input.value = formatter.format(parseInt(input.value) / 100);
}
