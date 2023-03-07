import { createPortfolio } from './portfolio.js';
import { build, append } from './utils/dom-helper.js';
import { Context } from './data/models';
import { createSignal, createEffect } from './utils/reactivity.js';

export const createContext = (contextData: Context): HTMLElement => {
  const [getCounter, setCounter] = createSignal(0);

  const counterDiv = build('div');

  createEffect(() => {
    counterDiv.innerText = getCounter().toString();
  });

  return append(
    build('div'),
    build('p', { text: `Context ID: ${contextData.id}` }),
    build('p', { text: `Definition: ${contextData.definition}` }),
    build('p', { text: `Risk Default: ${contextData.isRiskDefault}` }),
    createPortfolio(contextData.portfolio),
    counterDiv,
    build('button', { text: 'Add', eventType: 'click', eventCallback: () => setCounter(getCounter() + 1) })
  );
};
