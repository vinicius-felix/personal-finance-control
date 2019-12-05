import * as ptBr from './ptBR.json';

export const text = JSON.parse(localStorage.getItem('text'));

const verifyLanguage = async () => {
  console.log('Verificando linguagem...');

  if(!localStorage.getItem('text')){
    console.log('Nao foi encontrado linguagem. Retornando para padrao');
    localStorage.setItem('text', JSON.stringify(ptBr.default));
    document.location.reload(true);
    return
  }

  console.log('Verificação concluida.');

}


let layout = {
  "header": "#349beb",
  "menu": "#596370",
  "background": "#ffffff",
  "footer": "#d1dee8"
};

const verifyLayoutColors = async () => {
  
  console.log('Verificando layout...');

  if(!localStorage.getItem('layoutColors')){
    console.log('Nao foi possivel encontrar o layout. Retornando para padrao');
    localStorage.setItem('layoutColors', JSON.stringify(layout))
    document.location.reload(true);
    return
  }

  Object.assign(layout, JSON.parse(localStorage.getItem('layoutColors')))
  console.log('Verificação concluida.', layout);
}

verifyLanguage();
verifyLayoutColors();

console.log(localStorage)