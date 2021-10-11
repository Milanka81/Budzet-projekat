
const inputOpis = document.querySelector(`#opis`);
const inputIznos = document.querySelector(`#iznos`);
const inputTip = document.querySelector(`#tip`);

const forma = document.querySelector(`#form`);

const divPrihodi = document.querySelector(`.prihodi`);
const divRashodi = document.querySelector(`.rashodi`);

const btnDodaj = document.querySelector(`.potvrdi`);
const ukupnoPrihod = document.querySelector(`.sum-prihod`);
const ukupnoRashod = document.querySelector(`.sum-rashod`);
const budzet = document.querySelector(`.rest`);

const errOpis = document.querySelector(`#errOpis`);
const errTip = document.querySelector(`#errTip`);
const errIznos = document.querySelector(`#errIznos`);

let transakcije = [];

const deleteTr = (transakcija) => {
  transakcije.splice(transakcije.indexOf(transakcija), 1);
};

function ukupanPrihod() {
  let sum = 0;
  transakcije.forEach(transakcija => {
    if (transakcija.tip == "1"){

     sum += transakcija.iznos;
   } });

  return sum;
}

function ukupanRashod() {
  let sum = 0;
  transakcije.forEach(transakcija => {
    if (transakcija.tip == "2") {
        sum += transakcija.iznos;
   } });

  return sum;
}

function budzetSum() {
  ukupnoPrihod.innerHTML = `Ukupno prihoda: ${ ukupanPrihod()}`
  ukupnoRashod.innerHTML = `Ukupno rashoda: ${ukupanRashod()}`
  budzet.innerHTML = `Raspoloživa suma: ${ukupanPrihod() - ukupanRashod()}`
}

function addToDom(transakcija) {
  const divTransakcija = document.createElement("div");
  const div1 = document.createElement('p')

  div1.innerHTML = `
    <p id="input-opis">${transakcija.opis}</p>
    <p id="input-iznos">${transakcija.iznos}</p>`;

  const btnObrisi = document.createElement("button");
  btnObrisi.textContent = "Obrisi";
  divTransakcija.append(div1, btnObrisi)
  

  btnObrisi.addEventListener("click", () => {
      divTransakcija.remove() 
     let index = transakcije.indexOf(transakcija)
     transakcije.splice(index,1)
    
     budzetSum();
  });
 

  if (transakcija.tip == "1") {
    divPrihodi.append(divTransakcija);
    
  } else if(transakcija.tip == "2" ) {
    const procenat = document.createElement('span')
    procenat.innerHTML = ` ${transakcija.iznos * 100 / ukupanPrihod()} %`
    divTransakcija.appendChild(procenat)
    divRashodi.append(divTransakcija)
  }
}

btnDodaj.addEventListener('click', ()=>{
    let transakcija = {
        opis: inputOpis.value,
        iznos: Number(inputIznos.value),
        tip: inputTip.value
       
    }

    if (inputTip.value == 0) {
        errTip.innerHTML = `Izaberite tip transakcije`
          
    } else if (inputOpis.value == ``) {
        errTip.innerHTML = ''
        errOpis.innerHTML = `Unesite opis transakcije`
        

    } else if (inputIznos.value <= 0) {
            errOpis.innerHTML = '' 
            errIznos.innerHTML = `Unesite iznos veci od nule`
            
    } else{
    errTip.innerHTML = ''
    errOpis.innerHTML= ''
    errIznos.innerHTML = ''
    transakcije.push(transakcija)
    addToDom(transakcija)
    budzetSum()
}})


