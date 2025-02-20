import mobxStore, { TrStruct } from "./mobx-store";

const api = 'http://0.0.0.0:8851';

export const apiTranslateSeg = async (text: string) => {
  const url = api+'/api/tr?text='+text;
  const res = await (await fetch(url)).json();

  return res;
};

export const splitInput = async (text: string) => {

  const segmenterEn = new Intl.Segmenter("en", { granularity: "sentence" });
  const segments = segmenterEn.segment(text);

  let arrOfSeg = [];
  for (const { segment } of segments) {
    arrOfSeg.push(segment);
  }
  arrOfSeg.push("\n");

  let res = '';
  let oneTr:TrStruct = {ID: 0, Text: '', Result: ''};
  let trBlock = <TrStruct[]>[];
  let i = 0;
  mobxStore.setTrBlock([]);
  for (const s of arrOfSeg) {
    
    res = await apiTranslateSeg(s);
    if (s.includes("\n")) {
      res = res+"\n";
    } else {
      res = res+" ";
    }

    oneTr = {ID: i, Text: s, Result: res};
    i = i + 1;
    trBlock.push(oneTr);

    if (s === "\n") {
      mobxStore.pushTrBlock(trBlock);
      trBlock = <TrStruct[]>[];
    }
  }
};