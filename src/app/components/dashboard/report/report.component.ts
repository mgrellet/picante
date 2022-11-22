import {Component, OnInit, ViewChild} from '@angular/core';
import {Rent} from "../../interfaces/rent";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RentService} from "../../../services/rent.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  weeklyRentList: Rent[] = [];

  displayedColumns: string[] = ['name', 'color', 'size', 'type', 'balance', 'notes', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rentService: RentService, private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.loadGrid();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadGrid() {
    this.weeklyRentList = this.rentService.getWeeklyRent();
    console.log(this.weeklyRentList);
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

  deleteRentRecord(rent: Rent){
    this.rentService.deleteRentRegistry(rent);
    this.snackBar.open('Registro de alquiler eliminado', '', {
      duration: 2000
    });
  }
}
