window.language = "en";
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