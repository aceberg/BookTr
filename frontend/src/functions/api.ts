import { Conf } from "./mobx-store";

const api = 'http://0.0.0.0:8851';

export const getConfig = async () => {
  const url = api+'/api/conf';
  const conf = await (await fetch(url)).json();

  return conf;
};

export const apiSaveConf = (conf: Conf) => {
  let data = new FormData();
  
  data.set('conf', JSON.stringify(conf));

  let request = new XMLHttpRequest();
  request.open("POST", api+'/api/conf', true);
  request.send(data);
};

export const apiTranslate = async (text: string) => {
  const url = api+'/api/tr?text='+text;
  const res = await (await fetch(url)).json();

  return res;
};
