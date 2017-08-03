"use strict";

const expect = require('chai').expect;

const Constants = require('../../util/constants');
const GetTaskComponentsDataRequest = require('./get-task-components-data-request');

describe('GetTaskComponentsDataRequest', () => {
  it('should define the properties: TaskId, DiplayType and set them on init', () => {
    let request = new GetTaskComponentsDataRequest(1, Constants.ComponentDisplayType.TASK_ADDON);
    expect(request).to.have.property('TaskId');
    expect(request).to.have.property('DisplayType');
    expect(request.TaskId).to.equal(1);
    expect(request.DisplayType).to.equal(Constants.ComponentDisplayType.TASK_ADDON);
  });
});
