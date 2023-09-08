import { Filme } from '../../models/filme';
import { FilmeService } from '../../services/filme.service';
import './filme-listagem.css';


class Tela{
    container: HTMLDivElement;
    filmesEmAlta:HTMLDivElement;
    filmeService: FilmeService;

    constructor() {

        this.registrarElementos();
        this.registrarEventos();
        this.filmeService = new FilmeService();
        this.filmeService.selecionarFilmes().then(filmes => this.gerarGridFilmes(filmes));
            
    }

    registrarElementos():void{
        this.filmesEmAlta = document.getElementById('filmesEmAlta') as HTMLDivElement;
    }

    registrarEventos(): void{
    }

    buscar(titulo:string):void{
        this.pesquisarFilmePorTitulo(titulo);
    }

    private pesquisarFilmePorTitulo(titulo: string) : void{
        this.filmeService.selecionarFilmePorTitulo(titulo)
        .then(filme => this.redirecionarUsuario(filme.title))
        .catch((error: Error) => console.log(error));
    }

    private redirecionarUsuario(nome: string): any {
        window.location.href = `detalhes.html?titulo=${nome}`;
    }

    private gerarGridFilmes(filmes: Filme[]): any {

        for(let filme of filmes){
            const card = this.obterCard(filme);
            this.filmesEmAlta.appendChild(card);
        }    
    }

    private obterCard(filme: Filme) {

            const id = document.createElement("p");
            const descricaoFilme = document.createElement("p");

            id.textContent = filme.id.toString();
            descricaoFilme.textContent = filme.overview;


            const cardFilme = document.createElement('div');
            cardFilme.classList.add('col-6','col-md-4', 'col-lg-2');

            cardFilme.addEventListener('click',() => this.buscar(filme.title))

            cardFilme.innerHTML = `
                <div class="d-grid gap-2 text-center">
                <img
                    src="https://image.tmdb.org/t/p/w500/${filme.poster}"
                    class="img-fluid rounded-3"/>
                    <a href="" class="fs-5 link-warning text-decoration-none">${filme.title}</a>
                </div>
            `;

            return cardFilme;
    }

}
window.addEventListener('load', () => new Tela());