const chai = require('chai');
const expect = chai.expect;
const index = require('../src/index')
const Desconto = index.Desconto;


describe('Desconto()', () => {
    it('Desconto 10% Deveria retornar 90', () => {
        expect(Desconto(100,10)).to.equal(90);
    });
    it('Desconto 50% deveria retornar 50.5',()=>{
        expect(Desconto(101,50)).to.equal(50.5);
    });
    it('Desconto 100% deveria retornar 0',()=>{
        expect(Desconto(100,100)).to.equal(0);
    });
    it('Desconto 120% deveria retornar 0',()=>{
        expect(Desconto(100,120)).to.equal(0);
    });
    it('Desconto 0% deveria retornar 100',()=>{
        expect(Desconto(100,0)).to.equal(100);
    });
    it('Desconto -30% deveria retornar 100',()=>{
        expect(Desconto(100,-30)).to.equal(100);
    });
    it('Desconto 25.5% deveria retornar 74.5',()=>{
        expect(Desconto(100,25.5)).to.equal(74.5);
    });
});