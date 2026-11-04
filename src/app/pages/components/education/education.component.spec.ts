import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import {EducationComponent, toFileName} from './education.component';
import {educationsData} from '../../../../utils/data/educations.data';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationComponent],
      imports: [TranslateModule.forRoot({fallbackLang: 'pt'})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toFileName: deve gerar nomes de arquivo .md sem acentos', () => {
    expect(toFileName('Curso PHP 7')).toBe('curso-php-7.md');
    expect(toFileName('Curso Algoritmos de Programação')).toBe('curso-algoritmos-de-programacao.md');
    expect(toFileName('Curso Laravel 5.8')).toBe('curso-laravel-5-8.md');
  });

  it('folders: deve agrupar todos os cursos por ano, do mais recente ao mais antigo', () => {
    const years = component.folders.map(f => f.year);
    expect(years).toEqual([...years].sort().reverse());
    const count = component.folders.reduce((n, f) => n + f.files.length, 0);
    expect(count).toBe(educationsData.length);
  });

  it('deve abrir o curso mais recente e expandir apenas a pasta dele', () => {
    const newest = component.folders[0];
    expect(component.selected()?.id).toBe(newest.files[0].id);
    expect(component.isExpanded(newest.year)).toBeTrue();
    expect(component.folders.slice(1).some(f => component.isExpanded(f.year))).toBeFalse();
  });

  it('toggleFolder e open: devem expandir pastas e trocar o arquivo aberto', () => {
    const other = component.folders[1];
    component.toggleFolder(other.year);
    expect(component.isExpanded(other.year)).toBeTrue();
    component.open(other.files[0]);
    expect(component.selected()?.id).toBe(other.files[0].id);
    component.toggleFolder(other.year);
    expect(component.isExpanded(other.year)).toBeFalse();
  });

  it('lines: deve montar o markdown com título, metadados e tópicos', () => {
    const file = component.selected()!;
    const lines = component.lines(file);
    expect(lines[0]).toEqual({kind: 'h1', text: file.title});
    expect(lines.filter(l => l.kind === 'item').length).toBe(file.topics.length);
  });
});
