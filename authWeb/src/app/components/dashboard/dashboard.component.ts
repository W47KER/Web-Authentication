import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users: any = [];
  public fullName : string = "";
  role! : string 
  constructor(private authSerevice: AuthService, private api: ApiService, private userStoreService: UserStoreService){}

  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res
    })

    this.userStoreService.getRoleFromStore().subscribe((val) => {
      let getroleFromToken = this.authSerevice.getRoleFromToken()
      this.role = val || getroleFromToken;
    })

    this.userStoreService.getFullNameFromStore().subscribe((val) => {
      let getFullnameFromToken = this.authSerevice.getFullnameFromToken()
      this.fullName = val || getFullnameFromToken;
    })
  }

  

  logOut(){
    this.authSerevice.signOut()
  }
}
