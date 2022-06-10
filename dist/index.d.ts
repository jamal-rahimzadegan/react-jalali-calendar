/// <reference types="react" />
import "./assets/styles/index.css";
interface Props {
    onSelect: (day: DateItem) => void;
    style?: StyleObject;
    className?: string;
}
export declare function Calendar(props: Props): JSX.Element;
export {};
