/**
 * @description
 * @class equeue
 */
class Equeue {
    queueStacks: Array<any>;
    constructor() {
        this.queueStacks = []
    }
    push(content: Record<string | number , any>) {
        this.queueStacks.push(content)
    }
}

export default Equeue