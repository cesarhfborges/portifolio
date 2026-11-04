import {Component, computed, signal} from '@angular/core';
import {faChevronDown, faChevronRight, faFolder, faFolderOpen} from '@fortawesome/free-solid-svg-icons';
import {educationsData} from '../../../../utils/data/educations.data';
import {Education} from '../../../shared/models/education.interface';

export interface EducationFile extends Education {
  /** nome de arquivo exibido na árvore, ex.: "curso-php-7.md" */
  fileName: string;
}

export interface YearFolder {
  year: string;
  files: EducationFile[];
}

/** "Curso PHP 7" → "curso-php-7.md" (no máximo 4 palavras, sem acentos). */
export function toFileName(title: string): string {
  const slug = title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s.]/g, ' ')
    .replace(/\./g, '-')
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join('-');
  return `${slug || 'curso'}.md`;
}

/** Linha do "arquivo markdown" mostrado no editor. */
interface MdLine {
  kind: 'h1' | 'meta' | 'h2' | 'item' | 'blank';
  label?: string;
  text?: string;
}

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  readonly faFolder = faFolder;
  readonly faFolderOpen = faFolderOpen;
  readonly faChevronDown = faChevronDown;
  readonly faChevronRight = faChevronRight;

  /** Cursos agrupados em pastas por ano, do mais recente para o mais antigo. */
  readonly folders: YearFolder[] = this.buildFolders(educationsData);

  readonly total = educationsData.length;

  /** Curso aberto no editor — começa pelo mais recente. */
  readonly selectedId = signal<number>(this.folders[0]?.files[0]?.id ?? 0);

  /** Pastas expandidas — começa só com a mais recente. */
  readonly expanded = signal<Set<string>>(new Set(this.folders.slice(0, 1).map(f => f.year)));

  readonly selected = computed<EducationFile | undefined>(() =>
    this.folders.flatMap(f => f.files).find(f => f.id === this.selectedId())
  );

  isExpanded(year: string): boolean {
    return this.expanded().has(year);
  }

  toggleFolder(year: string): void {
    const next = new Set(this.expanded());
    if (next.has(year)) {
      next.delete(year);
    } else {
      next.add(year);
    }
    this.expanded.set(next);
  }

  open(file: EducationFile): void {
    this.selectedId.set(file.id);
  }

  /** Conteúdo do "arquivo" em linhas, para o editor numerar. */
  lines(file: EducationFile): MdLine[] {
    return [
      {kind: 'h1', text: file.title},
      {kind: 'blank'},
      {kind: 'meta', label: 'app.academic.institution', text: file.institution},
      {kind: 'meta', label: 'app.academic.year', text: file.duration},
      {kind: 'blank'},
      {kind: 'h2', label: 'app.academic.topics'},
      ...file.topics.map(t => ({kind: 'item' as const, text: t})),
    ];
  }

  private buildFolders(data: Education[]): YearFolder[] {
    const byYear = new Map<string, EducationFile[]>();
    for (const item of data) {
      const list = byYear.get(item.duration) ?? [];
      list.push({...item, fileName: toFileName(item.title)});
      byYear.set(item.duration, list);
    }
    return [...byYear.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([year, files]) => ({year, files}));
  }
}
