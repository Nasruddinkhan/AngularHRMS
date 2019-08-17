// application-pipes.module.ts
// other imports
import { GrdFilterPipe } from './views/grd-filter-pipe';
import { NgModule } from '@angular/core';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    GrdFilterPipe
  ],
  exports: [
    GrdFilterPipe
  ]
})
export class ApplicationPipesModule {}