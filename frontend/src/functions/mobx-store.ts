import { makeAutoObservable } from 'mobx';

export interface TrStruct {
    ID: number;
    Text: string;
    Result: string;
};

export type TrBlock = TrStruct[];

class MobxStore {
    constructor() {
        makeAutoObservable(this);
    }

    updTr:boolean = false;
    setUpdTr(b:boolean) {
        this.updTr = b;
    }

    trBlock:TrBlock[] = [];
    setTrBlock(t:TrBlock[]) {
        this.trBlock = t;
    }
    pushTrBlock(t:TrBlock) {
        this.trBlock.push(t);
    }
}

const mobxStore = new MobxStore();
export default mobxStore;