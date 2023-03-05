import { Portfolio, Position } from './data/models.js';
import { createPositionList } from './position-list.js';
import { build, append } from './utils/dom-helper.js';
import { createSignal, createEffect } from './utils/reactivity.js';

const SUM_STYLE = {
    'font-weight': 'bold',
    color: 'red'
};

const sum = (quantities: number[] = []) => quantities.reduce((sum, qty) => sum + qty, 0);

export const createPortfolio = ({ code, currency, positions = [] }: Portfolio): HTMLElement => {
    const total = sum(positions.map(p => p.quantity));
    const summaryElement = build('span', { text: total.toString(), style: SUM_STYLE });

    const [ getSum, setSum ] = createSignal(total);
    createEffect(
        () => {
            const position = positions.find(({ positionId }) => positionId === 1);
            const newQty = getSum();
            if (position) {
                position.quantity = newQty;
                summaryElement.innerText = sum(positions.map(p => p.quantity))?.toString();
            }
        }
    );

    return append(
        build('div'),
        build('p', { text: `Portfolio code: ${code}` }),
        build('p', { text: `Portfolio CCY: ${currency}` }),
        append(
            build('p', { text: 'Position qty total: ' }),
            summaryElement
        ),
        createPositionList(positions, (posId: number, newQty: number) => setSum(newQty))
    );
};
