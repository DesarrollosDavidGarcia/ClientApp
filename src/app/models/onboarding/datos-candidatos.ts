import { Bancos } from "../catalogos/bancos";
import { CategoriaDocumentos } from "../catalogos/categoria-documentos";
import { Ciudades } from "../catalogos/ciudad";
import { DocumentacionCandidato } from "../catalogos/documentacion-colaborador";
import { EstadoCivil } from "../catalogos/estado-civil";
import { Estados } from "../catalogos/estados";
import { Generos } from "../catalogos/generos";
import { GradoEscolaridad } from "../catalogos/grado-escolaridad";
import { Paises } from "../catalogos/paises";
import { Parentescos } from "../catalogos/parentescos";
import { RelacionParental } from "../catalogos/relacion-parental";
import { SintomasMedicos } from "../catalogos/sintomas-medicos";

 
export class DatosCandidatos {
  generos: Generos[] =[];
  estadosCiviles: EstadoCivil [] = [];
  paises: Paises [] = [];
  estados: Estados [] = [];
  ciudades: Ciudades [] = [];
  parentescos: Parentescos [] = [];
  relacionParental: RelacionParental [] = [];
  bancos: Bancos [] = [];
  sintomasMedicos: SintomasMedicos [] = [];
  categoriaDocumentos: CategoriaDocumentos[] = [];
  gradoEscolaridad: GradoEscolaridad[] = [];






}
