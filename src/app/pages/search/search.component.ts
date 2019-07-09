import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public productosService: ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe( parametros => {
      console.log(parametros['terminos']);
      this.productosService.buscarProducto(parametros['termino']);
    });
  }

}
