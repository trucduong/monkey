export class CommonUtils {
    public static formatStr(str: string, params: string[]): string {
        let result = str;
        if (params && params.length > 0) {
            params.forEach((element, index) => {
                result = result.replace('{' + index + '}', element);
            });
        }

        return result;
    }

    // {{value}}
    public static formatMessage(str: string, param: any): string {
        let result = str;
        for (let key in param) {
            result = result.replace('{{' + key + '}}', param[key]);
        }
        
        return result;
    }
}