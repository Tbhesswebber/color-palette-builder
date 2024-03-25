declare global {
    type MaybeArray<T> = T | Array<T>;

    type Require<T, K extends keyof T> = {
        [L in Exclude<keyof T, K>]: T[L];
    } & {
        [M in Extract<keyof T, K>]-?: T[M];
    }
}

export {}
