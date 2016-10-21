const MAX_ROW = 5;

export class PaginationInfo {
    current: number;
    total: number;
    constructor(totalRow: number) {
        this.setTotalRow(totalRow);
    }

    getMaxRow(): number {
        return MAX_ROW;
    }
    setTotalRow(totalRow: number) {
        let totalPage = totalRow/MAX_ROW;
        if (totalRow % MAX_ROW != 0) {
            totalPage += 1;
        }

        this.current = 1;
        this.total = parseInt(totalPage.toString(), 10);
    }

    setCurrent(current: number) {
        this.current = current;
    }

    update(current:number, totalRow: number) {
        let totalPage = totalRow/MAX_ROW;
        if (totalRow % MAX_ROW == 0) {
            totalPage += 1;
        }

        if (current < 1) {
            current = 1;
        } else if (current > totalPage) {
            current = totalPage;
        }

        this.current = this.total = parseInt(current.toString(), 10);
        this.total = this.total = parseInt(totalPage.toString(), 10);
    }
}