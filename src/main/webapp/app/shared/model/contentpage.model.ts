import { IContentcss } from 'app/shared/model/contentcss.model';

export interface IContentpage {
  id?: number;
  title?: string;
  contenthtml?: string;
  contentcss?: IContentcss;
}

export class Contentpage implements IContentpage {
  constructor(public id?: number, public title?: string, public contenthtml?: string, public contentcss?: IContentcss) {}
}
