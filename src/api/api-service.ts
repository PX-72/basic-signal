import { Context } from "../data/models.js";

const CONTEXT_DATA: Context = {
    id: 123,
    definition: 'portfolio-only',
    isRiskDefault: true,
    portfolio: {
        code: 'EMC1',
        currency: 'USD',
        positions: [
            {
                positionId: 1,
                insightId: '1483783',
                quantity: 200       
            },
            {
                positionId: 2,
                insightId: '2847347',
                quantity: 1_000       
            },
            {
                positionId: 3,
                insightId: '3837493',
                quantity: 1       
            },
            {
                positionId: 4,
                insightId: '18374837',
                quantity: 100      
            }
        ]
    }
};

const delay = (time: number) => new Promise<void>(resolve => setTimeout(resolve, time));

export const getContext = async (networkDelay: number): Promise<Context> => {
    await delay(networkDelay);
    return structuredClone(CONTEXT_DATA) as Context;
};
