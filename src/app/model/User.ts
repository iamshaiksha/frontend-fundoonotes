export class User{
  name:string;
    email:string;
    mobileNumber:number;
    password:string;
    constructor(name:string,email:string,mobileNumber:number,password:string){
          this.email=email;
          this.mobileNumber=mobileNumber;
          this.name=name;
          this.password=password;  
         }
}