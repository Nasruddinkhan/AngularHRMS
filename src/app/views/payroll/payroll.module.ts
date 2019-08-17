import { NgModule } from '@angular/core';
import { SalarySlipComponent } from './salary-slip/salary-slip.component';
import { IncrementLetterComponent } from './increment-letter/increment-letter.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { ConfirmationLetterComponent } from './confirmation-letter/confirmation-letter.component';
import { AppointmentLetterComponent } from './appointment-letter/appointment-letter.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { PayrollRoutingModule } from './payroll-routing.module';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@NgModule({
    imports: [
        PayrollRoutingModule
    ],
    declarations: [
        SalarySlipComponent,
        IncrementLetterComponent,
        OfferLetterComponent,
        ConfirmationLetterComponent,
        AppointmentLetterComponent,
        PayrollsComponent
    ]
})
export class PayrollModule { }