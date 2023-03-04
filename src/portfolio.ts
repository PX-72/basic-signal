import { Portfolio, Position } from './data/models.js';
import { createPositionList } from './position-list.js';
import { build, append } from './utils/dom-helper.js';
import { createSignal, createEffect } from './utils/reactivity.js';

const SUM_STYLE = {
    'font-weight': 'bold',
    color: 'red'
};

const sum = (quantities: number[] = []) => quantities.reduce((sum, qty) => sum + qty, 0);

const updateQtySum = (sumElement: HTMLElement, positions: Position[], posId: number, newQty: number): void => {
    const position = positions.find(({ positionId }) => positionId === posId);
    if (position) {
        position.quantity = newQty;
        sumElement.innerText = sum(positions.map(p => p.quantity))?.toString();
    }
};

export const createPortfolio = ({ code, currency, positions = [] }: Portfolio): HTMLElement => {
    const total = sum(positions.map(p => p.quantity));
    const summaryElement = build('span', { text: total.toString(), style: SUM_STYLE });

    console.log('createPortfolio is called');

    const [ getSum, readSum ] = createSignal(total);
    createEffect(
        () => {
            console.log('createEffect is called');
            const position = positions.find(({ positionId }) => positionId === 1);
            if (position) {
                position.quantity = getSum();
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
        createPositionList(positions, 
            (posId: number, newQty: number) => readSum(newQty))
            //(posId: number, newQty: number) => updateQtySum(summaryElement, positions, posId, newQty))
    );
};
