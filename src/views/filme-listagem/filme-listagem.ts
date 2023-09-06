import { Filme } from '../../models/filme';
import { FilmeService } from '../../services/filme.service';
import './filme-listagem.css';


class Tela{
    container: HTMLDivElement;
    filmeService: FilmeService;

    constructor() {

        this.registrarElementos();
        this.registrarEventos();
        this.filmeService = new FilmeService();
        this.filmeService.selecionarFilmes().then(filmes => this.gerarGridFilmes(filmes));
            
    }

    registrarElementos():void{
        this.container = document.getElementById('container') as HTMLDivElement;
    }

    registrarEventos(): void{
    }


    private gerarGridFilmes(filmes: Filme[]): any {
        let filmesEmAlta:HTMLDivElement = document.createElement("div");
        filmesEmAlta.innerHTML = `<div class="row"></div>`;

        for(let filme of filmes){
            const card = this.obterCard(filme);
            filmesEmAlta.appendChild(card);
        }

        this.container.appendChild(filmesEmAlta);
    }

    private obterCard(filme: Filme) {

            const id = document.createElement("p");
            const descricaoFilme = document.createElement("p");

            id.textContent = filme.id.toString();
            descricaoFilme.textContent = filme.overview;


            const cardFilme = document.createElement('div');
            cardFilme.classList.add('card-filme');

            cardFilme.addEventListener('click',() => {window.location.href = `detalhes.html?nome=${filme.title}`})

            cardFilme.innerHTML = `
            <div class="col-6 col-md-4 col-lg-2">
                <div class="d-grid gap-2 text-center">
                <img
                    src="https://image.tmdb.org/t/p/w500/${filme.poster}"
                    class="img-fluid rounded-3"/>
                    <a href="" class="fs-5 link-warning text-decoration-none">${filme.title}</a>
                </div>
            </div>`;
            return cardFilme;
    }
}
window.addEventListener('load', () => new Tela());