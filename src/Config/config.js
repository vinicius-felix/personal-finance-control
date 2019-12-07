import * as ptBr from './ptBR.json';

export const text = JSON.parse(localStorage.getItem('text'));

const verifyLanguage = () => {

  if(!localStorage.getItem('text')){
    console.log('Nao foi encontrado linguagem. Retornando para padrao');
    localStorage.setItem('text', JSON.stringify(ptBr.default));
    document.location.reload(true);
    return 0;
  }
}

let layout = {
  "header": "#349beb",
  "menu": "#596370",
  "background": "#ffffff",
  "footer": "#d1dee8"
};

const verifyLayoutColors = () => {
  
  if(!localStorage.getItem('layoutColors')){
    console.log('Nao foi possivel encontrar o layout. Retornando para padrao');
    localStorage.setItem('layoutColors', JSON.stringify(layout))
    document.location.reload(true);
    return 0;
  }

  Object.assign(layout, JSON.parse(localStorage.getItem('layoutColors')))
  
}

verifyLanguage();
verifyLayoutColors();