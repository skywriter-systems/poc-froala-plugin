import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'contentcss',
        loadChildren: () => import('./contentcss/contentcss.module').then(m => m.FroalaContentcssModule),
      },
      {
        path: 'contentpage',
        loadChildren: () => import('./contentpage/contentpage.module').then(m => m.FroalaContentpageModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class FroalaEntityModule {}
