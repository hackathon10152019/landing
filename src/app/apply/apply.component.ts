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
    this.applyForm = new FormGroup({
      'loan': new FormGroup({
        'amount': new FormControl(null, Validators.required),
        'term': new FormControl(null, Validators.required),
        'assets': new FormControl(null, Validators.required),
        'debt': new FormControl(null)
      }),
      'corporate': new FormGroup({
        'cname': new FormControl(null, Validators.required),
        'caddress': new FormControl(null, Validators.required),
        'clstructure': new FormControl(null, Validators.required),
        'cdor': new FormControl(null, Validators.required),
        'crevenue': new FormControl(null, [Validators.required, this.companyRevenueValidator.bind(this)]),
        'cloan': new FormControl(null, [Validators.required, this.loanValidator.bind(this)])
      }),
      'representative': new FormGroup({
        'rname': new FormControl(null, Validators.required),
        'raddress': new FormControl(null, Validators.required),
        'rcitizenship': new FormControl(null, Validators.required),
        'rdob': new FormControl(null, Validators.required),
        'rphonenumber': new FormControl(null),
        'remail': new FormControl(null),
        'rloan': new FormControl(null)
      })
    });
  }

  companyRevenueValidator(control: FormControl): {[s: string]: boolean}{
    if(control.value < 50000){
      return {revenue: true};
    }
    
    return null;
  }

  loanValidator(control: FormControl): {[s: string]: boolean}{
    if(control.value > 1500000){
      return {loan: true};
    }
    
    return null;
  }

  onSubmit(){
    console.log('onSubmit is called');

    let applySubscription = this.backendService.submitForm(this.applyForm.value);

    applySubscription.subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error('Error', 'Error occured on creating Mortgage Account!');
    });
  }

}
