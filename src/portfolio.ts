import { Portfolio, Position } from './data/models.js';
import { createPositionList } from './position-list.js';
import { build, append } from './utils/dom-helper.js';
import { createSignal, createEffect } from './utils/reactivity.js';

const SUM_STYLE = {
    'font-weight': 'bold',
    color: 'red'
};

const quantityTotal = (positions: Position[] = []) => positions.reduce((sum, position) => sum + position.quantity, 0);
const [ getUpdatedPosition, setUpdatedPosition ] = createSignal<Position | null>(null);

export const createPortfolio = ({ code, currency, positions = [] }: Portfolio): HTMLElement => {
    const summaryElement = build('span', { text: quantityTotal(positions).toString(), style: SUM_STYLE });

    createEffect(
        () => {
            const updatedPosition = getUpdatedPosition();
            if (updatedPosition == null) return;

            const position = positions.find(({ positionId }) => positionId === updatedPosition.positionId);
            if (position) {
                position.quantity = updatedPosition.quantity;
                summaryElement.innerText = quantityTotal(positions).toString();
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
        createPositionList(positions, (updatedPosition: Position) => setUpdatedPosition(updatedPosition))
    );
};
