export const LOCAL_CACHE = {locale: 'vi'};

export class CacheUtils {
    public static get(key: string): any {
        return LOCAL_CACHE[key];
    }

    public static set(key: string, value: any) {
        LOCAL_CACHE[key] = value;
    }
}