import { apiTranslate, apiTranslateAlt } from "./api";
import mobxStore, { TrStruct } from "./mobx-store";

export const splitAndTranslate = async (text: string) => {

  const segmenterEn = new Intl.Segmenter("en", { granularity: "sentence" });
  const segments = segmenterEn.segment(text);

  let arrOfSeg = [];
  for (const { segment } of segments) {
    arrOfSeg.push(segment);
  }
  arrOfSeg.push("\n");
  const totalCounter = arrOfSeg.length;

  let res = '';
  let oneTr:TrStruct = {ID: '', Text: '', Result: ''};
  let trBlock = <TrStruct[]>[];
  let i = 0;
  mobxStore.setTrBlock([]);
  for (const s of arrOfSeg) {
    
    res = await apiTranslate(s);
    if (s.includes("\n")) {
      res = res+"\n";
    } else {
      res = res+" ";
    }

    oneTr = {ID: "id"+i, Text: s, Result: res};
    i = i + 1;
    mobxStore.setTopInfoLine('Translated '+i+' of '+totalCounter);
    // console.log("Done "+i+" of "+arrOfSeg.length);
    trBlock.push(oneTr);

    if (s === "\n") {
      mobxStore.pushTrBlock(trBlock);
      trBlock = <TrStruct[]>[];
    }
  }
};

export const trSentence = async (text: string) => {
  let res = '';
  let oneTr:TrStruct = {ID: '', Text: '', Result: ''};
  mobxStore.setTrDetails([]);

  const text1 = text.split('.').join("");

  for (const word of text1.split(" ")) {
    res = await apiTranslateAlt(word);
    oneTr = {ID: '', Text: word, Result: res};
    mobxStore.pushTrDetails(oneTr);
  }
};