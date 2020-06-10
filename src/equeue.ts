/**
 * @description
 * @class equeue
 */
class Equeue {
    queueStacks: Array<any>;
    constructor() {}
    push(content: Record<string | number , any>) {
        this.queueStacks.push(content)
    }
}

export default Equeue