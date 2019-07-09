import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _service: InfoPaginaService,
              public router: Router) { }

  ngOnInit() {
  }

  buscarProducto(termino: string) {
    if ( termino.length < 1) {
      return ;
    }

    this.router.navigate(['/search', termino]);

    console.log(termino);
  }

}
