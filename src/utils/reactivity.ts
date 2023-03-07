type Execute = () => void;

const context: Execute[] = [];

export const createEffect = (fn: () => void): void => {
  const execute = () => {
    context.push(execute);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

  execute();
};

export const createSignal = <T>(value: T): [() => T, (val: T) => void] => {
  const executeFns = new Set<Execute>();

  const get = (): T => {
    const execute = context.at(-1);
    if (execute) executeFns.add(execute);

    return value;
  };

  const set = (nextValue: T) => {
    value = nextValue;
    for (const execute of executeFns) execute();
  };

  return [get, set];
};
