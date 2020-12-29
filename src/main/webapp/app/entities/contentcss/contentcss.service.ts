import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContentcss } from 'app/shared/model/contentcss.model';

type EntityResponseType = HttpResponse<IContentcss>;
type EntityArrayResponseType = HttpResponse<IContentcss[]>;

@Injectable({ providedIn: 'root' })
export class ContentcssService {
  public resourceUrl = SERVER_API_URL + 'api/contentcsses';

  constructor(protected http: HttpClient) {}

  create(contentcss: IContentcss): Observable<EntityResponseType> {
    return this.http.post<IContentcss>(this.resourceUrl, contentcss, { observe: 'response' });
  }

  update(contentcss: IContentcss): Observable<EntityResponseType> {
    return this.http.put<IContentcss>(this.resourceUrl, contentcss, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContentcss>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContentcss[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
