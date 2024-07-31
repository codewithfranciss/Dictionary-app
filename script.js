let word_title = document.getElementById("title");
let meaning_container = document.getElementById("meaning-container");
let word_meaning = document.getElementById("meaning");
let audio = document.querySelector("audio");

document.getElementById("searchbtn").addEventListener("click", function() {
    const input = document.getElementById("search").value.trim(); // Move this line inside the event listener
    fetchApi(input);
});

document.getElementById("resetbtn").addEventListener("click", function() {
    resetInput(); 
});

async function fetchApi(word){
    try{
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url);
        const resultInJson = await result.json();

        if(resultInJson.title){
            meaning_container.style.display ="block";
            word_title.innerText = "Word not found";
            word_meaning.innerText = "N/A";
            audio.style.display = "none";
        }else{
            meaning_container.style.display ="block";
            word_title.innerText = resultInJson[0].word;
            word_meaning.innerText = resultInJson[0].meanings[0].definitions[0].definition;
            audio.src = resultInJson[0].phonetics[0].audio || resultInJson[0].phonetics[1].audio;
        }      
    } catch(e){
        meaning_container.innerText = `An Error Occurred.. Try Again`;
    }
}

function resetInput(){
    document.getElementById("search").value = "";
    meaning_container.style.display ="none";
}
