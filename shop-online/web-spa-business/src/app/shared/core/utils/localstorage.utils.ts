export const LOCAL_STORAGE = {locale: 'vi'};

export class LocalStorageUtils {
    public static get(key: string): any {
        return LOCAL_STORAGE[key];
    }

    public static set(key: string, value: any) {
        LOCAL_STORAGE[key] = value;
    }
}