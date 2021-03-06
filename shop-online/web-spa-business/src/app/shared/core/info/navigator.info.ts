class NavigatorStack {
    private stack: string[];
    constructor() {
        this.reset();
    }

    reset() {
        this.stack = [];
    }

    push(url: string) {
        this.stack.push(url);
    }

    pop(): string {
        return this.stack.pop();
    }

    isEmpty(): boolean {
        return this.stack.length == 0;
    }
    
}

export const NAVIGATOR_INFO = new NavigatorStack();