export declare class InterceptorManager {
    protected handlers: Array<{
        fulfilled: Function;
        rejected: Function;
    }>;
    constructor();
    use(fulfilled: any, rejected: any): number;
    forEach(fn: any): void;
}
