import { Portfolio, Position } from './data/models.js';
import { createPositionList } from './position-list.js';
import { build, append } from './utils/dom-helper.js';

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

    const sumElement = build('span', { text: sum(positions.map(p => p.quantity)).toString(), style: SUM_STYLE });

    return append(
        build('div'),
        build('p', { text: `Portfolio code: ${code}` }),
        build('p', { text: `Portfolio CCY: ${currency}` }),
        append(
            build('p', { text: 'Position qty total: ' }),
            sumElement
        ),
        createPositionList(positions, 
            (posId: number, newQty: number) => updateQtySum(sumElement, positions, posId, newQty))
    );
};
