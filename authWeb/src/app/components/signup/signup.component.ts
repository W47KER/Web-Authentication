import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit(){
    if(this.signupForm.valid){
     
      this.authService.singUp(this.signupForm.value).subscribe({
        next: (res)=>{
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error:((err)=>{
          alert(err?.error.message)
        })

      })
    }
    else{
      alert("Form is invalid!")
    }
  }

}
