"use strict";

module.exports = class GetComponents {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  async execute() {
    return await this._componentRepository.get();
  }
}
