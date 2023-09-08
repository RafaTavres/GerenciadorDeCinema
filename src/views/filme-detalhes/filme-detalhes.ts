import { Filme } from "../../models/filme";
import { Video } from "../../models/video";
import { FilmeService } from "../../services/filme.service";
import "./filme-detalhes.css"

class DetalhesFilmes{
    filmeService: FilmeService;
    container:HTMLDivElement;
    chaveVideo:string;

    constructor() {
        this.filmeService = new FilmeService();
        const url = new URLSearchParams(window.location.search);
        const nome = url.get('titulo') as string;

        this.pesquisarFilmePorTitulo(nome);

        this.registrarElementos();
        this.registrarEventos();
      
    }
    registrarElementos():void{
        this.container = document.getElementById('container') as HTMLDivElement;
    }

    registrarEventos(): void{
    }

    private pesquisarFilmePorTitulo(nome: string) : void{
        this.filmeService.selecionarFilmePorTitulo(nome)
        .then(filme => this.gerarCard(filme));
    }


    private gerarCard(filme: Filme):void{
        
        const pnlFIlme = document.createElement("div");
        let chave = "";
        this.filmeService.BuscarVideo(filme.id).then(video => chave = video.key);
        let lista = this.filmeService.BuscarListaDeGeneros();
            console.log(lista);
            for(let r of lista){
               for(let i of r){
                console.log(i);
               }
            }
        
      
        setTimeout(() => {
            pnlFIlme.innerHTML = `
            <div class="row">
    
                <div class="d-flex align-items-center">
                    <h1 class="text-light">${filme.title}</h1>
    
                    <div class="ms-auto text-end">
                        <p class="text-light">${filme.vote_count}</p>
                        <i class="bi bi-heart fs-2 text-warning"></i>
                    </div>
                </div>  
                <small id="datalancamento"></small>
            </div>  
           
            <div class="row">
                <div class="col-lg-3">
                    <img 
                        src="https://image.tmdb.org/t/p/w500/${filme.poster}"
                        class="img-fluid rounded-3"
                        alt=""
                    />
                </div>
                <div class="col-lg">
                    <div class="ratio ratio-21x9 h-100">
                        <iframe
                        class="rounded-3"
                        id="iframeTrailer"
                        src="https://www.youtube.com/embed/${chave}?si=IaFskl1A5pV1uf6Z&amp;controls="
                        frameborder="0"
                        allowfullscreen
                        ></iframe>
                    </div> 
                </div>
            </div>
            <div class="d-flex gap-3">
                <span class="badge rounded-pill fs-5 px-4 py-2 bg-warning text-dark gap-3">Aventura</span>
                <span class="badge rounded-pill fs-5 px-4 py-2 bg-warning text-dark gap-3">Acao</span>
                <span class="badge rounded-pill fs-5 px-4 py-2 bg-warning text-dark gap-3">Ficcao</span>
            </div>
    
            <div class="rol">
                <p class="fs-5 text-light">
                    ${filme.overview}
                </p>
            </div>`;
           
            this.container.appendChild(pnlFIlme);
        }, 3000);
     
    }
}
window.addEventListener('load', () => new DetalhesFilmes());