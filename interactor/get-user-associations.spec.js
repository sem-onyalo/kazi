"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const Datasource = require('../datasource');
const Entity = require('../entity');
const GetUserAssociations = require('./get-user-associations');
const GetUserAssociationsRequest = require('./model/get-user-associations-request');

describe('GetUserAssociations', () => {
  let getUserAssociations;
  let associationRepository;

  beforeEach(function () {
    associationRepository = new Datasource.AssociationRepository();
    getUserAssociations = new GetUserAssociations(associationRepository);
  });

  describe('execute(getUserAssociationsRequest)', () => {
    it('should export function', () => {
      expect(getUserAssociations.execute).to.be.a('function');
    });

    it('should return a collection of associations', () => {
      let request = new GetUserAssociationsRequest(1);
      let expectedAssociations = [
        new Entity.Association(1, 'q3edfr443-swede-qeedwq98ek-s443ss', 'My Kazi', 'Personal'),
        new Entity.Association(2, 'xyz-inc-softball-team', 'XYZ Inc. Softball Team', 'Company')
      ];
      let getAssociationsByUserIdStub = sinon
        .stub(associationRepository, 'getByUserId')
        .returns(expectedAssociations);

      let associations = getUserAssociations.execute(request);

      getAssociationsByUserIdStub.restore();

      sinon.assert.calledOnce(getAssociationsByUserIdStub);
      sinon.assert.calledWith(getAssociationsByUserIdStub, 1);
      assert.deepEqual(associations, expectedAssociations, 'Returned associations was not expected value');
    });
  });
});
