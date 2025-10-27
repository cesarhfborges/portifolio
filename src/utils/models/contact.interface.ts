export default interface Contact {
  type: 'phone' | 'email' | 'location' | 'website' |  'other' | string;
  value: string;
  label?: string;
}
