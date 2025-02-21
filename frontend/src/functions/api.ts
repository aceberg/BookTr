import mobxStore, { Conf, TrBlock } from "./mobx-store";

const api = 'http://0.0.0.0:8856';

export interface ToSave {
  Name: string;
  Bookmark: string;
  Blocks: TrBlock[];
};

export const getConfig = async () => {
  const url = api+'/api/conf';
  const conf = await (await fetch(url)).json();

  return conf;
};

export const apiSaveConf = async (conf: Conf) => {
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

export const apiTranslateAlt = async (text: string) => {
  const url = api+'/api/tralt?text='+text;
  const res = await (await fetch(url)).json();

  return res;
};

export const apiSaveTr = async (name: string) => {
  let data = new FormData();
  
  const toSave:ToSave = {Name: name, Bookmark: '', Blocks: mobxStore.trBlock};

  data.set('tosave', JSON.stringify(toSave));

  let request = new XMLHttpRequest();
  request.open("POST", api+'/api/file', true);
  request.send(data);
};

export const apiGetList = async () => {
  const url = api+'/api/list';
  const list = await (await fetch(url)).json();

  return list;
};

export const apiGetFile = async (name: string) => {
  const url = api+'/api/file?name='+name;
  const list = await (await fetch(url)).json();

  return list;
};

export const apiDelFile = async (name: string) => {
  const url = api+'/api/del?name='+name;
  const list = await (await fetch(url)).json();

  return list;
};