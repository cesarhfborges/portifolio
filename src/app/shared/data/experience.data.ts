import {Experience} from '../models/experience.interface';
import {parse} from 'date-fns';

export const experiences: Experience[] = [
  {
    id: 1,
    company: "CooperSystem (Banco do brasil)",
    title: 'Analista desenvolvedor sênior',
    // duration: "October 2023 - Present (1 year 3 months)"
    duration: {
      from: parse('08/02/2021', 'dd/MM/yyyy', new Date())
    }
  },
  {
    id: 2,
    company: "Brasal",
    title: 'Programador Pleno',
    duration: {
      from: parse('01/08/2020', 'dd/MM/yyyy', new Date()),
      to: parse('01/12/2020', 'dd/MM/yyyy', new Date()),
    }
  },
  {
    id: 3,
    company: "Campanha Nacional das Escolas da Comunidade - CNEC",
    title: 'Programador Pleno',
    duration: {
      from: parse('01/01/2019', 'dd/MM/yyyy', new Date()),
      to: parse('01/08/2020', 'dd/MM/yyyy', new Date()),
    }
  },
  {
    id: 4,
    company: "Sebrae DF",
    title: 'Programador Pleno',
    duration: {
      from: parse('01/10/2019', 'dd/MM/yyyy', new Date()),
      to: parse('01/12/2019', 'dd/MM/yyyy', new Date()),
    }
  },
  {
    id: 5,
    company: "SdRedes",
    title: 'Programador Pleno / Coordenador de Desenvolvimento',
    duration: {
      from: parse('01/08/2018', 'dd/MM/yyyy', new Date()),
      to: parse('01/10/2019', 'dd/MM/yyyy', new Date()),
    }
  },
  {
    id: 6,
    company: "PlatoFlex Embreagens",
    title: 'Programador',
    duration: {
      from: parse('01/03/2011', 'dd/MM/yyyy', new Date()),
      to: parse('01/07/2018', 'dd/MM/yyyy', new Date()),
    }
  }
]
