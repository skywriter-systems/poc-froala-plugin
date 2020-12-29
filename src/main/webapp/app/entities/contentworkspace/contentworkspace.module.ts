import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FroalaSharedModule } from 'app/shared/shared.module';
import { ContentworkspaceComponent } from './contentworkspace.component';
import { ContentworkspaceDetailComponent } from './contentworkspace-detail.component';
import { ContentworkspaceUpdateComponent } from './contentworkspace-update.component';
import { ContentworkspaceDeleteDialogComponent } from './contentworkspace-delete-dialog.component';
import { contentworkspaceRoute } from './contentworkspace.route';

@NgModule({
  imports: [FroalaSharedModule, RouterModule.forChild(contentworkspaceRoute)],
  declarations: [
    ContentworkspaceComponent,
    ContentworkspaceDetailComponent,
    ContentworkspaceUpdateComponent,
    ContentworkspaceDeleteDialogComponent,
  ],
  entryComponents: [ContentworkspaceDeleteDialogComponent],
})
export class FroalaContentworkspaceModule {}
