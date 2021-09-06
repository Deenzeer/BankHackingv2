"use strict"

import { $, delay, playSound } from './helpers.js'
import { doPuzzle } from './puzzle-handler.js'

// runs on site load and handles entire  flow
async function start(){

    // reset from previous
    $('.try-again').classList.add('hidden')
    $('.spy-icon').src = 'assets/spy-icon.png'

    const dialing = playSound('assets/dialing.mp3', 0.1)

    // mock loading screen
    setInformationText('NAWIĄZYWANIE POŁĄCZENIA')
    await delay(0.8)
    setInformationText('WYKONYWANIE HAKERSKICH CZYNNOŚCI...')
    await delay(3)
    setInformationText('KOD DOSTĘPU UZYSKANY; POTRZEBNA AUTORYZACJA OSOBY..')
    await delay(2)

    // hide text and show squares
    $('#text-container').classList.toggle('hidden')
    $('#number-container').classList.toggle('hidden')


    // activate puzzle 4 times, break on fail
    let submitted
    let answer
    let result = true

    for (let i = 0; i < 4 && result; i++) {
        [submitted, answer] = await doPuzzle()
        result = (submitted?.toLowerCase() == answer)
    }

    // hide squares and show text
    $('.answer-section').classList.add('hidden')
    $('.number-container').classList.add('hidden')
    $('#text-container').classList.remove('hidden')
    
    // display result
    setInformationText((result) ? 'System został złamany. ✅' : "System nie zaakceptował twoich odpowedzi ⛔️")
    if(!result) $('.spy-icon').src = 'assets/failed.png'

    $('#answer-reveal').textContent = answer

    $('#submitted-reveal').textContent = (result) ?             'Dobra robota, dokładnie' :
                                        ((submitted == null) ?  "Czas upłynął," : 
                                                                `Wpisałeś "${submitted || ' '}", the`)

    $('.try-again').classList.remove('hidden')
}


function setInformationText(text){
    
    const capitalized = text.toUpperCase()
    const infoText = `<span class="capital">${capitalized.charAt(0)}</span>${capitalized.substring(1)}`
    
    $("#loading-text").innerHTML = infoText
}


// count visitors
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-7E64QM2WXT');

// help menu
const overlay = $('#overlay')
$('#help-on').addEventListener('click', () => overlay.style.display = "block")
$('#overlay').addEventListener('click', () => overlay.style.display = "none")


$('#try-again-button').addEventListener('click', start)

start()
