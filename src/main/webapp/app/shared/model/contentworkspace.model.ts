import { IContentcss } from 'app/shared/model/contentcss.model';

export interface IContentworkspace {
  id?: number;
  name?: string;
  contentcss?: IContentcss;
}

export class Contentworkspace implements IContentworkspace {
  constructor(public id?: number, public name?: string, public contentcss?: IContentcss) {}
}
