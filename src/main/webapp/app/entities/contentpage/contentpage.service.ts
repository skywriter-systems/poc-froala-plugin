import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContentpage } from 'app/shared/model/contentpage.model';
import { Contentcss } from 'app/shared/model/contentcss.model';

type EntityResponseType = HttpResponse<IContentpage>;
type EntityArrayResponseType = HttpResponse<IContentpage[]>;

@Injectable({ providedIn: 'root' })
export class ContentpageService {
  public resourceUrl = SERVER_API_URL + 'api/contentpages';
  public resourceCssUrl = SERVER_API_URL + 'api/contentcss';

  constructor(protected http: HttpClient) {}

  getAllCss(): Observable<any> {
    return this.http.get<Contentcss[]>(this.resourceCssUrl, { observe: 'response' });
  }

  create(contentpage: IContentpage): Observable<EntityResponseType> {
    return this.http.post<IContentpage>(this.resourceUrl, contentpage, { observe: 'response' });
  }

  update(contentpage: IContentpage): Observable<EntityResponseType> {
    return this.http.put<IContentpage>(this.resourceUrl, contentpage, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContentpage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContentpage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
