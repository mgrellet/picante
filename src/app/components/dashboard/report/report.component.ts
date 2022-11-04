import {Component, OnInit, ViewChild} from '@angular/core';
import {WeeklyRent} from "../../interfaces/weeklyRent";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  weeklyRentList: WeeklyRent[] = [
    {
      color: 'gris',
      size: 56,
      clothes: 'saco',
      fullName: 'Claudio Argañaraz',
      balance: 1000,
      recipeNumber: 1234,
      notes: 'debe 2000',
      date: '10/11/2022'
    },
    {
      color: 'azul',
      size: 54,
      clothes: 'ambo',
      fullName: 'Martín Grellet',
      balance: 0,
      recipeNumber: 4567,
      notes: '',
      date: '10/11/2022'
    },
    {
      color: 'azul',
      size: 54,
      clothes: 'ambo',
      fullName: 'Martín Grellet',
      balance: 0,
      recipeNumber: 4567,
      notes: '',
      date: '10/11/2022'
    },
    {
      color: 'azul',
      size: 54,
      clothes: 'ambo',
      fullName: 'Martín Grellet',
      balance: 0,
      recipeNumber: 4567,
      notes: '',
      date: '10/11/2022'
    },
    {
      color: 'azul',
      size: 54,
      clothes: 'ambo',
      fullName: 'Martín Grellet',
      balance: 0,
      recipeNumber: 4567,
      notes: '',
      date: '10/11/2022'
    },
    {
      color: 'azul',
      size: 54,
      clothes: 'ambo',
      fullName: 'Martín Grellet',
      balance: 0,
      recipeNumber: 4567,
      notes: '',
      date: '10/11/2022'
    },
    {
      color: 'azul',
      size: 54,
      clothes: 'ambo',
      fullName: 'Martín Grellet',
      balance: 0,
      recipeNumber: 4567,
      notes: '',
      date: '10/11/2022'
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  displayedColumns: string[] = ['color', 'size', 'clothes', 'fullName', 'balance', 'recipeNumber', 'notes', 'actions'];
  dataSource = new MatTableDataSource(this.weeklyRentList);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
