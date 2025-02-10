import { makeAutoObservable } from 'mobx';

class MobxStore {
    constructor() {
        makeAutoObservable(this);
    }

    trResult:string = "";
    setTrResult(b:string) {
        this.trResult = b;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;