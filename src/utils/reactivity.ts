type SignalAction = {
    execute: () => void
};

const context: SignalAction[] = [];

const getCurrentObserver = () => {
    return context[context.length - 1];
};

export const createEffect = (fn: () => void): void => {
    const execute = () => {
        //cleanup();
        console.log('Pusing on stack');
        context.push({ execute });
        try {
            fn();
        } finally {
            context.pop();
        }
    };

    execute();
};

export const createSignal = <T>(value: T): [() => T, (val:T) => void] => {
    const subscibers = new Set<SignalAction>();

    const read = (): T => {
        const running = getCurrentObserver();
        
        // subscribers
        if (running) 
            subscibers.add(running);

        return value;
    };

    const write = (nextValue: T) => {
        value = nextValue;

        // notify subscribers
        for (const sub of subscibers) sub.execute();
    };

    return [read, write];
}