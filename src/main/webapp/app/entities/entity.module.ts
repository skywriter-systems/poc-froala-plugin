import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'contentpage',
        loadChildren: () => import('./contentpage/contentpage.module').then(m => m.FroalaContentpageModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class FroalaEntityModule {}
