function checkStructure(mail) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}

function checkEmail(emailList) {
    var array = emailList.split(' ');

    var wrongEmails = []

    if(emailList != '') {
        array.forEach(element => {
            if (!checkStructure(element.trim())) {
                wrongEmails.push(element.trim())
            }
        });
    }

    return wrongEmails
}

export { checkEmail }

