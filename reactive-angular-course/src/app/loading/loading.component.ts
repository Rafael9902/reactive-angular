import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loadingService = inject(LoadingService);



  ngOnInit() {

  }


}
