import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Rent} from "../interfaces/rent";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RentService} from "../../services/rent.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {

  weeklyRentList: Rent[] = [];

  //displayedColumns = ['color', 'size', 'type', 'name', 'balance', 'notes', 'actions'];
  displayedColumns = ['color', 'size', 'type', 'name', 'balance', 'notes'];
  dataSource = new MatTableDataSource<Rent>();

  @ViewChild(MatSort) sort: MatSort;

  /*@ViewChild(MatPaginator) paginator!: MatPaginator;

*/
  constructor(private rentService: RentService, private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    //this.loadGrid();
    this.dataSource.data = this.rentService.getRentListMock();
  }


  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;*/
    this.dataSource.sort = this.sort;
  }

  loadGrid() {
    //this.weeklyRentList = this.rentService.getWeeklyRent();
    this.weeklyRentList = !this.rentService.getWeeklyRent().length
      ?[]
      :this.rentService.getWeeklyRent();
    this.dataSource = new MatTableDataSource(this.weeklyRentList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteElement(index: number) {
    this.rentService.deleteElement(index);
    this.snackBar.open('Registro de alquiler eliminado', '', {
      duration: 2000
    });
    this.loadGrid();
  }
}
