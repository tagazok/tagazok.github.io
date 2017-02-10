/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConferenceService } from './conference.service';

describe('ConferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConferenceService]
    });
  });

  it('should ...', inject([ConferenceService], (service: ConferenceService) => {
    expect(service).toBeTruthy();
  }));
});
