export function createEqueue(limit: number): IEqueueClass {
    let queueStacks = [];
    let limitNums: number = limit;
    /**
     * 记录堆栈
     * @param content 
     */
    const push = (content: Record<string | number, any>): void => {
        if (_length() >= limitNums) {
            queueStacks.pop()
        }
        queueStacks.unshift(content)
    }
    /**
     * 获取队列
     */
    const getStacks = (): Array<any> => {
        const stacks = queueStacks;
        _clean()
        return stacks
    }
    /**
     * 清除队列
     */
    const _clean = (): void => {
        queueStacks = []
    }
    /**
     * 获取长度
     */
    const _length = (): number => {
        return queueStacks.length || 0
    }
    return {
        push,
        getStacks,
    }
}