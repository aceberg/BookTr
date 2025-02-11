import mobxStore from "./mobx-store";

const api = 'http://0.0.0.0:8851';

export const apiTranslate = async (text: string) => {
    let res:string = "Error";
    let data = new FormData();
    
    data.set('text', text);
  
    let request = new XMLHttpRequest();
    request.open("POST", api+'/api/tr', true);

    request.onreadystatechange = function() {
      if(request.status == 200) {
        res = request.responseText;
      }
      mobxStore.setTrResult(res);
      console.log("API: TR RES:", res);
    }

    request.send(data);
};