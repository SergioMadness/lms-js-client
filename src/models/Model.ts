export abstract class Model {
    public id: string;

    setId(id: any): Model {
        this.id = id;

        return this;
    }

    getId(): any {
        return this.id;
    }
}