import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContentworkspace } from 'app/shared/model/contentworkspace.model';

type EntityResponseType = HttpResponse<IContentworkspace>;
type EntityArrayResponseType = HttpResponse<IContentworkspace[]>;

@Injectable({ providedIn: 'root' })
export class ContentworkspaceService {
  public resourceUrl = SERVER_API_URL + 'api/contentworkspaces';

  constructor(protected http: HttpClient) {}

  create(contentworkspace: IContentworkspace): Observable<EntityResponseType> {
    return this.http.post<IContentworkspace>(this.resourceUrl, contentworkspace, { observe: 'response' });
  }

  update(contentworkspace: IContentworkspace): Observable<EntityResponseType> {
    return this.http.put<IContentworkspace>(this.resourceUrl, contentworkspace, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContentworkspace>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContentworkspace[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
