class Pokemon {
  number;
  name;
  type;
  types = [];
  stats = [];
  photo;
  weight;
  height;
  abilities = [];
  eggGroups = [];
  constructor({ number, name, types, type, photo, abilities, weight, height, stats, eggGroups, eggCycle }) {
    this.number = number
    this.name = name
    this.types = types
    this.type = type
    this.photo = photo
    this.abilities = abilities
    this.height = height
    this.weight = weight
    this.stats = stats
    this.eggGroups = eggGroups
    this.eggCycle = eggCycle
  }
}