export interface Col {
    prop: string;
    title: string;
    filtering?: boolean;
    sorting?: boolean;
    width?: number;
    alight?: 'left' | 'center' | 'right';
    cellTemplate?: (item: any) => HTMLElement | string;
    filteringSelect?: { val: any, text: string }[];
}