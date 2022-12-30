import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable()
export class UIService {

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackBar(message: string, action: string, duration: number) {
    this.snackbar.open(message
      , action
      , {
        duration: duration,
        panelClass: ['red-snackbar']
      });
  }
}
