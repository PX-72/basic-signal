import { Position } from './data/models.js';
import { createPosition } from './position.js';
import { build, append } from './utils/dom-helper.js';

export const createPositionList = (
  positionListData: Position[] = [],
  updatePosition: (updatedPosition: Position) => void
): HTMLElement =>
  append(
    build('div'),
    build('h4', { text: 'Positions:' }),
    ...positionListData.map((position) => createPosition(position, updatePosition))
  );
