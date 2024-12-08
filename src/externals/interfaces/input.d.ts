import { DetailedHTMLProps, InputHTMLAttributes } from "react"


declare global {
    interface typeStateForm {
        values?: Record<string, any>;
        labels?: Record<string, any>;
        invalids?: Record<string, string[]>;
        uncompleteds?: string[];
        statusCode?: number;
        valuePrimaryKey?: any;
    }


    interface typeValidations {
        required?: boolean;
        max?: number;
        min?: number;
        length?: number;
        allowedTypes?: string[];
        confirmationColumn?: string;
    }
}
export { };