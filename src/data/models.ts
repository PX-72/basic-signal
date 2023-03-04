export type Position = {
    positionId: number,
    insightId: string,
    quantity: number  
};

export type Portfolio = {
    code: string,
    currency: string,
    positions: Array<Position>
};

export type Context = {
    id: number,
    definition: string,
    isRiskDefault: boolean,
    portfolio: Portfolio
};
