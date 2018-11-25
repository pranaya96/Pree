import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RadiusService } from '../../radius.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	
	radius: number;
	
	ngOnInit() {
  }

  constructor(public dialog:MatDialog, private rad: RadiusService){}

  
  deleteAcc(): void {
    const dialogRef = this.dialog.open(SetDelComponent, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
  radiusSetting() {
	  this.rad.setRadius(this.radius);
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
