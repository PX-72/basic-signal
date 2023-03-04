import { Position } from './data/models.js';
import { build, append, toggleVisibility } from './utils/dom-helper.js';

const CONTAINER_STYLE = {
    margin: '0.8rem',
    'border-top': '1px solid #336',
    'padding-top': '0.4rem'
};

const SUM_CONTAINER_STYLE = {
    display: 'flex'
};

const BUTTON_STYLE = {
    'margin-left': '0.5rem',
    cursor: 'pointer',
    dispay: 'inline-block'
};

const INPUT_STYLE = {
    'margin-left': '0.5rem',
    width: '3rem',
    dispay: 'inline-block'
};

const TEXT_BLOCK_STYLE = {
    'margin-left': '0.5rem'
};

export const createPosition = (positionData: Position, posQtyChanged: (posId: number, newQty: number) => void): HTMLElement => {
    const { positionId, insightId, quantity = 0 } = positionData;

    const qtyText = build('span', { 
        text: quantity.toString(), 
        style: TEXT_BLOCK_STYLE 
    });

    const qtyInput = build('input', {
        attributes: { value: quantity, type: 'text' }, 
        style: INPUT_STYLE, 
        visible: false, 
        eventType: 'input', 
        eventCallback: () => {
            if (!Number.isFinite(Number(qtyInput.value))) {
                qtyInput.value = qtyText.innerText;
                return;
            }

            qtyText.innerText = qtyInput.value || '0';
        } 
    }) as HTMLInputElement;

    const editButton = build('button', {
        text: 'edit', 
        style: BUTTON_STYLE, 
        eventType: 'click', 
        eventCallback: () => {
            toggleVisibility([editButton, saveButton, qtyText, qtyInput], 'inline-block');
            qtyInput.value = qtyText.innerText;
        } 
    });

    const saveButton = build('button', {
        text: 'save', 
        visible: false, 
        style: BUTTON_STYLE, 
        eventType: 'click', 
        eventCallback: () => {
            toggleVisibility([editButton, saveButton, qtyText, qtyInput], 'inline-block');
            posQtyChanged(positionId, Number(qtyInput.value));
        }
    });

    return append(
        build('div', { style: CONTAINER_STYLE }),
        build('p', { text: `Position ID: ${positionId}` }),
        build('p', { text: `Insight ID: ${insightId}` }),
        build('div', { style: SUM_CONTAINER_STYLE }),
        build('span', { text: 'Quantity: ' }),
        qtyText,
        qtyInput,
        editButton,
        saveButton
    );
};
