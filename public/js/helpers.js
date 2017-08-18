//de adus cumva variabila de limba din sesiune
window.language = "en";
// mai bine o faci altfel, cu scriere, citire stergere in fisier, salvare direct intr-o variabila javascript, altfel se trimit prea multe request-uri asincrone, e sincron, e o nebunie
function translate_func(text) {
    if(window.language == 'ro') {
        if(ro_phrases[text] == null) {
            return text;
        } else {
            return ro_phrases[text];
        }
    } else if(window.language == 'de') {
        if(de_phrases[text] == null) {
            return text;
        } else {
            return de_phrases[text];
        }
    } else {
        return text;
    }
}