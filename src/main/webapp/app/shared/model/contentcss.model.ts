export interface IContentcss {
  id?: number;
  name?: string;
  cssurl?: string;
}

export class Contentcss implements IContentcss {
  constructor(public id?: number, public name?: string, public cssurl?: string) {}
}
