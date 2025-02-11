import { makeAutoObservable } from 'mobx';

class MobxStore {
    constructor() {
        makeAutoObservable(this);
    }

    trText:string = "";
    setTrText(b:string) {
        this.trText = b;
    }

    trResult:string = "";
    setTrResult(b:string) {
        this.trResult = b;
    }

    updTr:boolean = false;
    setUpdTr(b:boolean) {
        this.updTr = b;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;