import { apiTranslate } from "./api";
import mobxStore, { TrStruct } from "./mobx-store";

export const splitAndTranslate = async (text: string) => {

  const segmenterEn = new Intl.Segmenter("en", { granularity: "sentence" });
  const segments = segmenterEn.segment(text);

  let arrOfSeg = [];
  for (const { segment } of segments) {
    arrOfSeg.push(segment);
  }
  arrOfSeg.push("\n");
  mobxStore.setTotalCounter(arrOfSeg.length);

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
    mobxStore.setDoneCounter(i);
    // console.log("Done "+i+" of "+arrOfSeg.length);
    trBlock.push(oneTr);

    if (s === "\n") {
      mobxStore.pushTrBlock(trBlock);
      trBlock = <TrStruct[]>[];
    }
  }
};