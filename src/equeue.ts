/**
 * @description
 * @class equeue
 */
class Equeue {
    queueStacks: Array<unknown>;
    constructor() {
        this.queueStacks = []
    }
    push(content: Record<string | number , unknown>): void {
        this.queueStacks.push(content)
    }
}

export default Equeue