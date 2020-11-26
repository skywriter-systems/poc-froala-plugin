import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContentpage, Contentpage } from 'app/shared/model/contentpage.model';
import { ContentpageService } from './contentpage.service';
import { ContentpageComponent } from './contentpage.component';
import { ContentpageDetailComponent } from './contentpage-detail.component';
import { ContentpageUpdateComponent } from './contentpage-update.component';

@Injectable({ providedIn: 'root' })
export class ContentpageResolve implements Resolve<IContentpage> {
  constructor(private service: ContentpageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContentpage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contentpage: HttpResponse<Contentpage>) => {
          if (contentpage.body) {
            return of(contentpage.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Contentpage());
  }
}

export const contentpageRoute: Routes = [
  {
    path: '',
    component: ContentpageComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'froalaApp.contentpage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContentpageDetailComponent,
    resolve: {
      contentpage: ContentpageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentpage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContentpageUpdateComponent,
    resolve: {
      contentpage: ContentpageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentpage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContentpageUpdateComponent,
    resolve: {
      contentpage: ContentpageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentpage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
