export default interface Menu {
    [displayName: string]: (() => void) | Menu | null
};
