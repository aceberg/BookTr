import { makeAutoObservable } from 'mobx';

export interface Conf {
    Host: string;
    Port: string;
    Theme: string;
    Color: string;
    NodePath: string;
};

export interface TrStruct {
    ID: string;
    Text: string;
    Result: string;
};

export type TrBlock = TrStruct[];

class MobxStore {
    constructor() {
        makeAutoObservable(this);
    }

    appConfig:Conf = {
        Host: "",
        Port: "",
        Theme: "",
        Color: "",
        NodePath: ""
    }
    setAppConfig(conf:Conf) {
        this.appConfig = conf;
    }

    updHead:boolean = false;
    setUpdHead(b:boolean) {
        this.updHead = b;
    }

    trBlock:TrBlock[] = [];
    setTrBlock(t:TrBlock[]) {
        this.trBlock = t;
    }
    pushTrBlock(t:TrBlock) {
        this.trBlock.push(t);
    }

    doneCounter:number = 0;
    setDoneCounter(n:number) {
        this.doneCounter = n;
    }
    totalCounter:number = 0;
    setTotalCounter(n:number) {
        this.totalCounter = n;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;