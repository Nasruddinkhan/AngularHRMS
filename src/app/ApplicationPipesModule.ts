// application-pipes.module.ts
// other imports
import { GrdFilterPipe } from './views/grd-filter-pipe';
import { NgModule } from '@angular/core';

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