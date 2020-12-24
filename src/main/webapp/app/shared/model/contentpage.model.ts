export interface IContentpage {
  id?: number;
  title?: string;
  contenthtml?: string;
  contenthtmllink?: string;
  contentcss?: any[];
}

export class Contentpage implements IContentpage {
  constructor(
    public id?: number,
    public title?: string,
    public contenthtml?: string,
    public contenthtmllink?: string,
    public contentcss?: any[]
  ) {}
}
