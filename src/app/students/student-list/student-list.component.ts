import { Component, OnInit } from '@angular/core';
import { Mstudent } from 'src/app/shared/models/mstudent.model';
import { MstudentService } from 'src/app/shared/services/mstudent.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Mstudent[];
  flagSur = true;
  flagGr = true;
  flagDir = true;

  directionName = ['01 "Bachelor course"', '02 "Specialist degree"', '03 "Magistracy"']

  constructor(private mstudentSetvice: MstudentService, private router: Router) { }  
  
  getInitials(student: Mstudent) {
    let surname = student.surname;
    let name = student.name.slice(0,1).toUpperCase();
    let middlename = student.middlename.slice(0,1).toUpperCase();
    return `${surname} ${name}. ${middlename}.`
  }

  getDirection(direction: number) {
    return this.directionName[direction];
  }

  sortBySurname() {
    if (this.flagSur) {
      this.students.sort((a, b) => a.surname.localeCompare(b.surname));
      this.flagSur = false;
    } else {
      this.students.sort((a, b) => b.surname.localeCompare(a.surname));
      this.flagSur = true;
    }
  }

  sortByGroup() {
    if (this.flagGr) {
      this.students.sort((a, b) => a.group > b.group ? 1 : -1);
      this.flagGr = false;
    } else {
      this.students.sort((a, b) => a.group > b.group ? -1 : 1);
      this.flagGr = true;
    }
  }

  sortByDirection() {
    if (this.flagDir) {
      this.students.sort((a, b) => a.direction > b.direction ? 1 : -1);
      this.flagDir = false;
    } else {
      this.students.sort((a, b) => a.direction > b.direction ? -1 : 1);
      this.flagDir = true;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let students = this.mstudentSetvice.getAll();
      this.students = isNullOrUndefined(await students) ? [] : await students;
    } catch (error) {
      console.error(error);
    }
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onEditProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async onDeleteProfile(id: number) {
    try {
      await this.mstudentSetvice.deleteOneById(id);
    } catch (error) {
      console.error(error);
    } finally { this.getData(); }
  }
}
