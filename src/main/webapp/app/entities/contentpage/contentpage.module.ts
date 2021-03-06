import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FroalaSharedModule } from 'app/shared/shared.module';
import { ContentpageComponent } from './contentpage.component';
import { ContentpageDetailComponent } from './contentpage-detail.component';
import { ContentpageUpdateComponent } from './contentpage-update.component';
import { ContentpageDeleteDialogComponent } from './contentpage-delete-dialog.component';
import { contentpageRoute } from './contentpage.route';

@NgModule({
  imports: [FroalaSharedModule, RouterModule.forChild(contentpageRoute)],
  declarations: [ContentpageComponent, ContentpageDetailComponent, ContentpageUpdateComponent, ContentpageDeleteDialogComponent],
  entryComponents: [ContentpageDeleteDialogComponent],
})
export class FroalaContentpageModule {}
