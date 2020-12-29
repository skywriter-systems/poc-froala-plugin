import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FroalaSharedModule } from 'app/shared/shared.module';
import { ContentcssComponent } from './contentcss.component';
import { ContentcssDetailComponent } from './contentcss-detail.component';
import { ContentcssUpdateComponent } from './contentcss-update.component';
import { ContentcssDeleteDialogComponent } from './contentcss-delete-dialog.component';
import { contentcssRoute } from './contentcss.route';

@NgModule({
  imports: [FroalaSharedModule, RouterModule.forChild(contentcssRoute)],
  declarations: [ContentcssComponent, ContentcssDetailComponent, ContentcssUpdateComponent, ContentcssDeleteDialogComponent],
  entryComponents: [ContentcssDeleteDialogComponent],
})
export class FroalaContentcssModule {}
