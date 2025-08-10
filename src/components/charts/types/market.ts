export type Candle = {
    time: number; // or string if using business day format
    open: number;
    high: number;
    low: number;
    close: number;
};