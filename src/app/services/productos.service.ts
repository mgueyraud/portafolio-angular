import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProducto();
  }

  private cargarProducto() {

    return new Promise((resolve,reject) => {
      this.http.get('https://angular-html-60b82.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          console.log(resp);
          this.productos = resp; 
          this.cargando = false;
          resolve();
        });
      
    });

  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-60b82.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string){

    this.cargando = true;

    if(this.productos.length === 0 ){
      //cargar productos
      this.cargarProducto().then( () => {
        this.filtrarProductos(termino);
      });
    }else{
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string){
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino)>=0 ){
        this.productosFiltrado.push(prod);
        this.cargando = false;
      }
    });
  }
}
