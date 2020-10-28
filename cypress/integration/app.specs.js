describe('Stop searc', function() {
    it('front page can be opened', function() {
      cy.visit('https://grandinkulma-next-buses-ts.vercel.app/');
      cy.contains('PYSÄKKIHAKU'); 
    })

    /* it('response to empty search', function() {  
      cy.get('button').click(); 
      cy.contains('Haun "Norotie" tulo- ja lähtöajat'); 
      cy.contains('Elielinaukio-Martinlaakso-Kalajärvi');
    }) */

    it('fill and submit stop search form ', function() { 
      cy.get('input').type('Norotie'); 
      cy.get('button').click(); 
      cy.contains('Haun "Norotie" tulo- ja lähtöajat'); 
      cy.contains('Elielinaukio-Martinlaakso-Kalajärvi');
    }) 

    it('response to invalid search', function() {
      cy.get('input').type('Toppila');   
      cy.get('button').click();  
      cy.contains('Ei pysäkkejä');
    })
  });