import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Rent} from "../../interfaces/rent";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RentService} from "../../services/rent.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RentDialogComponent} from "../rent-dialog/rent-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {InvoiceDialogComponent} from "../invoice-dialog/invoice-dialog.component";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {

  isLoading = true;
  displayedColumns = ['name', 'reservationDate', 'notes', 'balance', 'actions'];
  dataSource = new MatTableDataSource<Rent>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rentService: RentService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {

    this.loadGrid();

  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  private loadGrid() {
    this.rentService.fetchRentList()
      .subscribe(response => {
        let rents: Rent[] = this.calculateBalance(response);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(rents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  calculateBalance(rents: Rent[]): Rent[] {
    return rents.map(item => {
      item.balance = item.price - item.advancePayment;
      return item;
    })
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRent(element: Rent) {
    this.dialog.open(RentDialogComponent, {
      width: '75%',
      data: element
    })
  }

  deleteRent(id: string) {
    this.rentService.deleteRent(id)
    this.snackBar.open('Registro de alquiler eliminado ' + id, '', {
      duration: 2000
    });

    this.loadGrid();
  }

  openInvoice(element: Rent) {
    this.dialog.open(InvoiceDialogComponent, {
      width: '75%',
      data: element
    })
  }
}
