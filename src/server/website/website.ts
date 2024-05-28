export interface Website {
    set root(value: string);
    setup(): Promise<void>;
}