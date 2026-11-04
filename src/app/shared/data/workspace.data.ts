/**
 * Cada seção do portfólio é tratada como um "arquivo" aberto na IDE:
 * vira uma aba no header, aparece no breadcrumb e define o modo de linguagem da barra de status.
 */
export interface WorkspaceFile {
  /** id do elemento da seção na página (também usado na âncora do link) */
  id: string;
  /** chave de tradução do nome do arquivo (ex.: "sobre.md" / "about.md") */
  file: string;
  /** chave de tradução do nome da seção, usada em tooltips e no menu mobile */
  label: string;
  /** rótulo do "ícone" do tipo de arquivo */
  badge: string;
  /** cor do ícone do tipo de arquivo */
  color: string;
  /** modo de linguagem mostrado na barra de status */
  language: string;
}

/** Arquivo "aberto" enquanto o usuário está no hero (a janela de código person.ts). */
export const HERO_FILE: WorkspaceFile = {
  id: 'hero', file: 'app.files.hero', label: 'app.files.hero', badge: 'TS', color: '#3178c6', language: 'TypeScript',
};

/** Mesma ordem das seções na página — vira a ordem das abas. */
export const WORKSPACE_FILES: WorkspaceFile[] = [
  {id: 'about', file: 'app.files.about', label: 'app.menu.about', badge: 'MD', color: '#519aba', language: 'Markdown'},
  {id: 'experience', file: 'app.files.experience', label: 'app.menu.experiences', badge: 'TS', color: '#3178c6', language: 'TypeScript'},
  {id: 'education', file: 'app.files.education', label: 'app.menu.education', badge: '{}', color: '#cbcb41', language: 'JSON'},
  {id: 'skills', file: 'app.files.skills', label: 'app.menu.skills', badge: 'YML', color: '#a074c4', language: 'YAML'},
  {id: 'projects', file: 'app.files.projects', label: 'app.menu.projects', badge: 'TSX', color: '#61dafb', language: 'TypeScript JSX'},
  {id: 'contact', file: 'app.files.contact', label: 'app.footer.contact', badge: '$_', color: '#16f2b3', language: 'Shell Script'},
];
