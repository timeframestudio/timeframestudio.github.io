export interface Output {
    set root(value: string);
    setup(): Promise<void>;
}