import { API_KEY } from "../../secrets";
import { Filme } from "../models/filme";
import { Generos } from "../models/generos";
import { Video } from "../models/video";

export class FilmeService{

    BuscarVideo(id: number) {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

         return fetch(url,this.ObterHeaderDeAutorizacao())
         .then((res: Response): Promise<any> => this.processarResposta(res))
         .then((obj: any): Video => this.mapearVideo(obj.results))
    }
    
    BuscarListaDeGeneros():string[]{
        let listaDeGeneros:string[] = [];
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.ObterHeaderDeAutorizacao())
        .then(response => response.json())
        .then(response => listaDeGeneros.push(response))
        .catch(err => console.error(err));

        return listaDeGeneros;
    }

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

    private mapearVideo(obj: any): Video{
        let m = {
            key: obj[0].key
        };
        console.log(m)
        return m;
    }

    private mapearGeneros(obj: any): Generos{
        let m = {
            id:obj[0].id,
            name: obj[0].name
        };
        console.log(m)
        return m;   
    }

    private mapearFilme(obj: any): Filme{  
        let m = {
            id: obj[0].id,
            title:obj[0].title,
            overview:obj[0].overview,
            video: obj[0].video,
            poster: obj[0].poster_path,
            vote_count: obj[0].vote_count
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