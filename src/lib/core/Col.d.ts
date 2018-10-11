export interface Col {
    prop: string;
    title: string;
    alight?: 'left' | 'center' | 'right';
    cellTemplate?: (item: any) => HTMLElement | string;
    filteringSelect?: { val: any, text: string }[];
}