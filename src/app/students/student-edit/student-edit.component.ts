import { Component, OnInit } from '@angular/core';
import { Mstudent, MstudentDirection } from 'src/app/shared/models/mstudent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MstudentService } from 'src/app/shared/services/mstudent.service';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  id: number;
  public phone = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  student: Mstudent;
  studentForm: FormGroup;

  
  mstudentDirection = MstudentDirection;

  constructor(private activatedRoute: ActivatedRoute, private mstudentservice: MstudentService, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      if (!isNullOrUndefined(params.id)) {
        this.id = + params.id;
      } else {
        this.id = null;
      }
    })
  }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      id: new FormControl(),
      surname: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      middlename: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthday: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      direction: new FormControl({ value: 0, disabled: false }, [Validators.required])
    })

    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let student = this.mstudentservice.getOneById(this.id);
        this.student = await student;
      } catch (error) {
        console.error(error);
      }
      
      this.studentForm.patchValue({
        id: this.student.id,
        surname: this.student.surname,
        name: this.student.name,
        middlename: this.student.middlename,
        phone: this.student.phone,
        email: this.student.email,
        birthday: this.student.birthday,
        group: this.student.group,
        direction: this.student.direction        
      });
    }
  }

  async onDelete() {
    try {
      await this.mstudentservice.deleteOneById(this.id);
    } catch (error) {
      console.error(error);
    }
    this.router.navigate(['/students']);
  }

  async onSave() {
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.mstudentservice.putOneById(this.id, this.studentForm.value);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        let res = await this.mstudentservice.postOne(this.studentForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (error) {
        console.error(error);
      }
    }
    this.router.navigate(['/students']);
  }
}
