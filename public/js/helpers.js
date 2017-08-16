//de adus cumva variabila de limba din sesiune
var raspuns = "";
// mai bine o faci altfel, cu scriere, citire stergere in fisier, salvare direct intr-o variabila javascript, altfel se trimit prea multe request-uri asincrone, e sincron, e o nebunie
function translate_func(text) {
    $.ajax({
        url: '/language',
        dataType: 'JSON',
        success: function(language) {
            if(language == 'ro') {
                return ro_phrases[text];
                console.log(ro_phrases);
            } else if(language == 'de') {
                return de_phrases[text];
                console.log(de_phrases);
            } else {
                return text;
                console.log('am folosit default-ul');
            }
        }
    });
    return raspuns;
}