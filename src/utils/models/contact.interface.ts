export default interface Contact {
  type: 'phone' | 'email' | 'location' | 'website' |  'other';
  value: string;
  label?: string;
}
