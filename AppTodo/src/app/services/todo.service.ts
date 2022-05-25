import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor( private http: HttpClient ) { }

  adicionaTarefa(tarefa: string, realizada: any){
    const url = 'http://localhost/ApiTodo/api.php';

      listaTarefa(){
        const url = 'http://localhost/ApiTodo/api.php';

       return this.http.get(url).toPromise();
    }

    const param = { tarefa: tarefa, realizada: realizada };

    return this.http.post(url,param).toPromise();
  }
}
