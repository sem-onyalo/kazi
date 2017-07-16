"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const DependencyFactory = require('./dependency-factory');
const IocContainer = require('node-ioc');

describe('DependencyFactory', () => {
  describe('resolve(type, container)', () => {
    it('should export function', () => {
      expect(DependencyFactory.resolve).to.be.a('function');
    });

    it('should return the instance of a class by its type', () => {
      class TireRepository {
        constructor(tireType) {
          this.type = tireType;
        }
        getInfo() {
          return this.type;
        }
      }

      class RimRepository {
        constructor(rimType) {
          this.type = rimType;
        }
        getInfo() {
          return this.type;
        }
      }

      class WheelInteractor {
        constructor(tireRepository, rimRepository) {
          this.tireRepository = tireRepository;
          this.rimRepository = rimRepository;
        }
        getInfo() {
          return this.tireRepository.getInfo() + 's on ' + this.rimRepository.getInfo();
        }
      }

      let container = new IocContainer();
      container.register(() => new TireRepository('Pirelli')).as(TireRepository);
      container.register(() => new RimRepository('Lexani')).as(RimRepository);
      container.registerWithTypes(TireRepository, RimRepository).as(WheelInteractor);

      let result = DependencyFactory.resolve(WheelInteractor, container);

      expect(result).to.be.an.instanceof(WheelInteractor);
      assert.strictEqual(result.getInfo(), 'Pirellis on Lexani')
    });

    it('should resolve DirectoryRepository', () => {
      let DirectoryRepository = require('../datasource/directory-repository');
      let instance = DependencyFactory.resolve(DirectoryRepository);
      expect(instance).to.be.an.instanceof(DirectoryRepository);
    });

    it('should resolve TaskRepository', () => {
      let TaskRepository = require('../datasource/task-repository');
      let instance = DependencyFactory.resolve(TaskRepository);
      expect(instance).to.be.an.instanceof(TaskRepository);
    });

    it('should resolve CreateTaskInteractor', () => {
      let CreateTaskInteractor = require('../interactor/create-task');
      let DirectoryRepository = require('../datasource/directory-repository');
      let TaskRepository = require('../datasource/task-repository');
      let instance = DependencyFactory.resolve(CreateTaskInteractor);
      expect(instance).to.be.an.instanceof(CreateTaskInteractor);
      expect(instance._directoryRepository).to.be.an.instanceof(DirectoryRepository);
      expect(instance._taskRepository).to.be.an.instanceof(TaskRepository);
    });

    it('should resolve DeleteTaskInteractor', () => {
      let TaskRepository = require('../datasource/task-repository');
      let DeleteTaskInteractor = require('../interactor/delete-task');
      let instance = DependencyFactory.resolve(DeleteTaskInteractor);
      expect(instance).to.be.an.instanceof(DeleteTaskInteractor);
      expect(instance._taskRepository).to.be.an.instanceof(TaskRepository);
    });

    it('should resolve GetTasksInteractor', () => {
      let TaskRepository = require('../datasource/task-repository');
      let GetTasksInteractor = require('../interactor/get-tasks');
      let instance = DependencyFactory.resolve(GetTasksInteractor);
      expect(instance).to.be.an.instanceof(GetTasksInteractor);
      expect(instance._taskRepository).to.be.an.instanceof(TaskRepository);
    });

    it('should resolve UpdateTaskInteractor', () => {
      let TaskRepository = require('../datasource/task-repository');
      let UpdateTaskInteractor = require('../interactor/update-task');
      let instance = DependencyFactory.resolve(UpdateTaskInteractor);
      expect(instance).to.be.an.instanceof(UpdateTaskInteractor);
      expect(instance._taskRepository).to.be.an.instanceof(TaskRepository);
    });
  });
});
