import { TouchPoint } from '../data/type';
declare const _default: {
    isOverBoundary: (options: {
        min: number;
        max: number;
        delta: number;
        value: number;
    }) => boolean;
    calcReboundTranslate: (delta: number) => number;
    calcInertialShfitInPx: (touchPoints: TouchPoint[]) => number;
    adjustValue: (options: {
        min: number;
        max: number;
        precision: number;
        value: number;
    }) => number;
    calcNumberOfDecimalPlace: (precision: number) => number;
    getBasis: (direction: string, width: number, height: number) => number;
    calcFromTo: (options: {
        min: number;
        max: number;
        precision: number;
        gap: number;
        basis: number;
        value: number;
    }) => object;
};
export default _default;
