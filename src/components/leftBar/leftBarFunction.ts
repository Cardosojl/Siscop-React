export function activeElement(values: string[], path: string): boolean {
    return values.includes(path);
}

export function iconRotate(itemStatus: boolean) {
    const action = showSubitens(itemStatus);
    if (action) {
        return 'LeftBar__arrow--down LeftBar__arrow--rotate_down';
    } else {
        return 'LeftBar__arrow--up LeftBar__arrow--rotate_up';
    }
}

export function showSubitens(itemStatus: boolean): string {
    return itemStatus ? '' : 'LeftBar__item--closed';
}
