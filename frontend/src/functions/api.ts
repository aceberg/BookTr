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

export const apiTranslate = async (text: string, alt: string) => {
  let data = new FormData();

  const treq = {Text: text.trim(), Alt: alt};

  data.set('treq', JSON.stringify(treq));

  try {
    let response = await fetch(api + '/api/tr', {
        method: "POST",
        body: data
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};