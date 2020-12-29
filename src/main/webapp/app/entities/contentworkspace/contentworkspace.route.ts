import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContentworkspace, Contentworkspace } from 'app/shared/model/contentworkspace.model';
import { ContentworkspaceService } from './contentworkspace.service';
import { ContentworkspaceComponent } from './contentworkspace.component';
import { ContentworkspaceDetailComponent } from './contentworkspace-detail.component';
import { ContentworkspaceUpdateComponent } from './contentworkspace-update.component';

@Injectable({ providedIn: 'root' })
export class ContentworkspaceResolve implements Resolve<IContentworkspace> {
  constructor(private service: ContentworkspaceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContentworkspace> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contentworkspace: HttpResponse<Contentworkspace>) => {
          if (contentworkspace.body) {
            return of(contentworkspace.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Contentworkspace());
  }
}

export const contentworkspaceRoute: Routes = [
  {
    path: '',
    component: ContentworkspaceComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'froalaApp.contentworkspace.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContentworkspaceDetailComponent,
    resolve: {
      contentworkspace: ContentworkspaceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentworkspace.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContentworkspaceUpdateComponent,
    resolve: {
      contentworkspace: ContentworkspaceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentworkspace.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContentworkspaceUpdateComponent,
    resolve: {
      contentworkspace: ContentworkspaceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentworkspace.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
