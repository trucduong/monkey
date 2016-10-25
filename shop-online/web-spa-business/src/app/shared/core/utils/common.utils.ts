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
}