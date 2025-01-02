export function sleep(ms: number): Promise<number> {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise(resolve => window.setTimeout(resolve, ms));
}

export async function waitFor(func: () => boolean, cancelFunc: () => boolean = () => false): Promise<boolean> {
    while (!func()) {
        if (cancelFunc()) {
            return false;
        }
        // eslint-disable-next-line no-await-in-loop
        await sleep(10);
    }
    return true;
}