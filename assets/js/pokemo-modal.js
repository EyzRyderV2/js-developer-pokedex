class Pokemon {
  number;
  name;
  type;
  types = [];
  photo;
  constructor({ number, name, types, type, photo }) {
    this.number = number
    this.name = name
    this.types = types
    this.type = type
    this.photo = photo
  }
}