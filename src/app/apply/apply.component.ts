import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  applyForm: FormGroup;

  constructor(private httpClient: HttpClient, private backendService: BackendService, private toastr: ToastrService) { }

  ngOnInit() {
    // this.applyForm = new FormGroup({
    //   'loan': new FormGroup({
    //     'amount': new FormControl(null, Validators.required),
    //     'term': new FormControl(null, Validators.required),
    //     'assets': new FormControl(null, Validators.required),
    //     'debt': new FormControl(null)
    //   }),
    //   'corporate': new FormGroup({
    //     'cname': new FormControl(null, Validators.required),
    //     'caddress': new FormControl(null, Validators.required),
    //     'clstructure': new FormControl(null, Validators.required),
    //     'cdor': new FormControl(null, [Validators.required, this.companyAgeValidator.bind(this)]),
    //     'crevenue': new FormControl(null, [Validators.required, this.companyRevenueValidator.bind(this)]),
    //     'cloan': new FormControl(null, [this.loanValidator.bind(this)])
    //   }),
    //   'representative': new FormGroup({
    //     'rname': new FormControl(null, Validators.required),
    //     'raddress': new FormControl(null, Validators.required),
    //     'rcitizenship': new FormControl(null, Validators.required),
    //     'rage': new FormControl(null, [Validators.required, this.representiveAgeValidator.bind(this)]),
    //     'rphonenumber': new FormControl(null),
    //     'remail': new FormControl(null),
    //     'rloan': new FormControl(null, [this.loanValidator.bind(this)])
    //   })
    // });

    this.applyForm = new FormGroup({
      'amount': new FormControl(null, [Validators.required]),
      'corporateAddress': new FormControl(null, [Validators.required]),
      'corporateFinancialStatement': new FormControl(null),
      'corporateLegalStructure': new FormControl(null),
      'corporateName': new FormControl(null, [Validators.required]),
      'corporateRevenueLastYear': new FormControl(null, [Validators.required, this.companyRevenueValidator.bind(this)]),
      'puropse': new FormControl(null),
      'corporateDateOfRegister': new FormControl(null, [Validators.required, this.companyAgeValidator.bind(this)]),
      'corporateCurrentDebt': new FormControl(null, [Validators.required, this.loanValidator.bind(this)]),
      'representiveAddress': new FormControl(null),
      'representiveCitizenShip': new FormControl(null),
      'representiveDateOfBirth': new FormControl(null),
      'representiveFirstName': new FormControl(null),
      'representiveLastName': new FormControl(null),
      'representivePassportNumber': new FormControl(null),
      'representivePhoneNumber': new FormControl(null),
      "representiveEmail": new FormControl(null),
      "representiveLoan": new FormControl(null, [this.loanValidator.bind(this)]),
      'term': new FormControl(null) 
    });
  }

  companyRevenueValidator(control: FormControl): {[s: string]: boolean}{
    if(control.value <= 50000){
      return {revenue: true};
    }
    
    return null;
  }

  loanValidator(control: FormControl): {[s: string]: boolean}{
    if(control.value >= 1500000){
      return {loan: true};
    }
    
    return null;
  }

  companyAgeValidator(control: FormControl): {[s: string]: boolean}{
    if(control.value <= 2){
      return {age: true};
    }
    
    return null;
  }

  representiveAgeValidator(control: FormControl): {[s: string]: boolean}{
    if(control.value < 18){
      return {age: true};
    }
    
    return null;
  }

  onSubmit(){
    console.log('onSubmit is called');
    console.log(this.applyForm.get('corporate.crevenue'));

    let applySubscription = this.backendService.submitForm(this.applyForm.value);

    applySubscription.subscribe((response: any) => {
      console.log(response);
      this.toastr.success('Success', 'Application submitted!');
    }, error => {
      console.log(error);
      this.toastr.error('Error', 'Error occured on creating Mortgage Account!');
    });
  }

}
