export class FiltersBuilder {
    private filters: string[] = [];

    constructor(name?: string, value?: string, condition: boolean = true) {
        if (name && value) {
            this.add(name, value, condition);
        }
    }

    add(name: string, value: string, condition: boolean = true): FiltersBuilder {
        if (condition) {
            this.filters.push(`${name}:${value}`);
        }

        return this;
    }

    build(separator: string = 'AND'): string {
        return this.filters.join(` ${separator} `);
    }
}
