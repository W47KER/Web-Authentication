import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup;
  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router, private userStoreService: UserStoreService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value)

      this.authService.login(this.loginForm.value).subscribe({
        next: (res)=>{
          alert(res.message)
          this.loginForm.reset();
          this.authService.storeToken(res.token)
          const userPayload = this.authService.decodedToken()
          this.userStoreService.setRoleFromStore(userPayload.role)
          this.userStoreService.setFullNameFromStore(userPayload.unique_name)
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      alert("Form is invalid!")
    }
  }
}
