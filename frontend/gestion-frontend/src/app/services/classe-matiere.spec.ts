import { TestBed } from '@angular/core/testing';

import { ClasseMatiereService } from './classe-matiere';


describe('ClasseMatiereService', () => {


  let service: ClasseMatiereService;



  beforeEach(() => {


    TestBed.configureTestingModule({});


    service = TestBed.inject(ClasseMatiereService);


  });




  it('should be created', () => {


    expect(service).toBeTruthy();


  });


});