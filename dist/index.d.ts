/// <reference types="react" />
import './assets/styles/index.css';
interface Props {
    onSelect: (day: DateItem) => void;
    customHeader?: (headerProps: any) => JSX.Element;
}
export declare function Calendar(props: Props): JSX.Element;
export {};
