export class Queue {
    constructor(){
        this._queue = [];
    }

    get length(){
        return this._queue.length;
    }

    enqueue(item){
        this._queue.unshift(item);
    }

    dequeue(){
        return this._queue.pop();
    }
}

export class Scheduler {
    /*getFunc::void->a
    doFunc::a->void
    nextFunc::(void->void)->void*/
    constructor(nextFunc,getFunc,doFunc){
        this.getFunc = getFunc;
        this.do = doFunc;
        this.next = nextFunc;
        this._state = 'STOPPED';
    }

    start(){
        this._state = 'RUNNING';
        _tick();
    }

    stop(){
        this._state = 'STOPPED';
    }

    processNext(){
        let item = this.getFunc();
        if(item !== undefined){
            this.do(item);
            return true;
        }else{
            return false;
        }
    }

    _tick(){
        if(this._state === 'STOPPED') return;

        this.next(_=>{
            if(this._state === 'STOPPED') return;

            processNext();
            this._tick();

        });
    }
}
