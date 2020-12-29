import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContentcss, Contentcss } from 'app/shared/model/contentcss.model';
import { ContentcssService } from './contentcss.service';
import { ContentcssComponent } from './contentcss.component';
import { ContentcssDetailComponent } from './contentcss-detail.component';
import { ContentcssUpdateComponent } from './contentcss-update.component';

@Injectable({ providedIn: 'root' })
export class ContentcssResolve implements Resolve<IContentcss> {
  constructor(private service: ContentcssService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContentcss> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contentcss: HttpResponse<Contentcss>) => {
          if (contentcss.body) {
            return of(contentcss.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Contentcss());
  }
}

export const contentcssRoute: Routes = [
  {
    path: '',
    component: ContentcssComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'froalaApp.contentcss.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContentcssDetailComponent,
    resolve: {
      contentcss: ContentcssResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentcss.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContentcssUpdateComponent,
    resolve: {
      contentcss: ContentcssResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentcss.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContentcssUpdateComponent,
    resolve: {
      contentcss: ContentcssResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'froalaApp.contentcss.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
