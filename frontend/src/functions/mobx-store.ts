import { makeAutoObservable } from 'mobx';

export interface Conf {
    Host: string;
    Port: string;
    Theme: string;
    Color: string;
    NodePath: string;
    LangFrom: string;
    LangTo: string;
    LtrPath: string;
    LtrKey: string;
};

export interface TrStruct {
    ID: string;
    Text: string;
    Result: string;
};

export type TrBlock = TrStruct[];

interface InfoBlock {
    Text: string;
    Note: string;
}

class MobxStore {
    constructor() {
        makeAutoObservable(this);
    }

    appConfig:Conf = {
        Host: "",
        Port: "",
        Theme: "",
        Color: "",
        NodePath: "",
        LangFrom: "",
        LangTo: "",
        LtrPath: "",
        LtrKey: "",
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

    trDetails:TrStruct[] = [];
    setTrDetails(t:TrStruct[]) {
        this.trDetails = t;
    }
    pushTrDetails(t:TrStruct) {
        this.trDetails.push(t);
    }

    // topInfoLine:string = '';
    // setTopInfoLine(n:string){
    //     this.topInfoLine = n;
    // }

    topInfoBlock:InfoBlock = {Text: '', Note: ''};
    setTopInfoBlock(text:string, note:string){
        this.topInfoBlock = {Text: text, Note: note};
    }

    tooltipText:string = '';
    setTooltipText(n:string){
        this.tooltipText = n;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;