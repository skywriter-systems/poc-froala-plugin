export interface IContentpage {
  id?: number;
  title?: string;
  contenthtml?: string;
  contenthtmllink?: string;
}

export class Contentpage implements IContentpage {
  constructor(public id?: number, public title?: string, public contenthtml?: string, public contenthtmllink?: string) {}
}
