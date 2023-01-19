import {Component, Inject} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Rent} from "../../interfaces/rent";

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})
export class InvoiceDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public rent: Rent) {
  }

  currentRent = {...this.rent}

  downloadPdf() {
    const DATA = document.getElementById('invoice');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    // @ts-ignore
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });

  }
}
