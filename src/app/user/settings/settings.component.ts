import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	
	ngOnInit() {
  }

  constructor(public dialog:MatDialog){}

  
  deleteAcc(): void {
    const dialogRef = this.dialog.open(SetDelComponent, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
	
}
@Component({
  selector: 'app-set-del',
  templateUrl: './set-del.component.html',
})
export class SetDelComponent {

  constructor(
    public dialogRef: MatDialogRef<SetDelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsComponent) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
