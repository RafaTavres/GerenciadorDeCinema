import { API_KEY } from "../../secrets";
import { Filme } from "../models/filme";

export class FilmeService{

    selecionarFilmePorTitulo(titulo:string): Promise<Filme>{
         const url = `https://api.themoviedb.org/3/search/movie?query=${titulo}&include_adult=false&language=pt-BR&page=1`;

         return fetch(url,this.ObterHeaderDeAutorizacao())
         .then((res: Response): Promise<any> => this.processarResposta(res))
         .then((obj: any): Filme => this.mapearFilme(obj.results))
    }  

    selecionarFilmes(): Promise<Filme[]>{
        const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR`;

        return fetch(url,this.ObterHeaderDeAutorizacao())
        .then((res) => this.processarResposta(res))
        .then((obj) => this.mapearListaFilme(obj.results));
    }

    private processarResposta(res: Response): Promise<any>{
        if(res.ok)
            return res.json();

        throw new Error('Filme nao encontrado');
        
    }

    private mapearFilme(obj: any): Filme{  
        let m = {
            id: obj[0].id,
            title:obj[0].title,
            overview:obj[0].overview,
            video: obj[0].video,
            poster: obj[0].poster_path
        };
        console.log(m)
        return m;
    }

    private mapearListaFilme(objs: any[]):Promise<Filme[]>{
        const listaDeFilme = objs.map(obj =>{
           return this.selecionarFilmePorTitulo(obj.title)
        });

       
        return Promise.all(listaDeFilme);
    }

    private ObterHeaderDeAutorizacao(){
        return {
            method:'GET',
            headers:{
                accept:'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        }
    }
}