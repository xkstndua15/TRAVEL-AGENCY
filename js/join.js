const form = document.querySelector("#member");
const submitButton = form.querySelector("input[type=submit]");

submitButton.addEventListener("click", (e) => {
    // User Id Check
    if(!textLenCheck("userId", 5)) {
        e.preventDefault();
        return false;
    }

    // Password Check
    if(!pwdCheck("pwd", "pwdRe", 10)) {
        e.preventDefault();
        return false;
    }

    // Email Check
    if(!emailCheck("userEmail")) {
        e.preventDefault();
        return false;
    }

    // Gender Check
    if(!isChecked("gender")) {
        e.preventDefault();
        return false;
    }
    
    // Hobby Check
    if(!isChecked("hobby")) {
        e.preventDefault();
        return false;
    }

    // Introduce Check
    if(!textLenCheck("introduce", 10)) {
        e.preventDefault();
        return false;
    }
});

// User Id, Introduce Check
function textLenCheck(text, len) {
    if(len === undefined) return false;

    const input = form.querySelector(`[name=${text}]`);
    const textLen = input.value.length;

    const errMsgs = input.closest("td").querySelectorAll("p");
    if(errMsgs.length > 0) {
        input.closest("td").querySelector("p").remove();
    }

    if(textLen > len) {
        return true;
    } else {
        const errMsg = document.createElement("p");
        errMsg.append(`Please enter at least ${len} characters`);
        input.closest("td").append(errMsg);
        
        return false;
    }
}

function pwdCheck(pwdName, pwdReName, len) {
    const pwd = form.querySelector(`[name=${pwdName}]`);
    const pwdRe = form.querySelector(`[name=${pwdReName}]`);
    const pwdValue = pwd.value;
    const pwdReValue = pwdRe.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/
    const spc = /[~!@#$%^&*()_+?<>]/;

    const pwdErrMsgs = pwd.closest("td").querySelectorAll("p");
    if(pwdErrMsgs.length > 0) {
        pwd.closest("td").querySelector("p").remove();
    }
    const pwdReErrMsgs = pwdRe.closest("td").querySelectorAll("p");
    if(pwdReErrMsgs.length > 0) {
        pwdRe.closest("td").querySelector("p").remove();
    }

    if(pwdValue.length > len && num.test(pwdValue) && eng.test(pwdValue) && spc.test(pwdValue)) {
        if(pwdValue === pwdReValue) {
            return true;
        } else {
            const errMsg = document.createElement("p");
            errMsg.append(`recorrect password`);
            pwdRe.closest("td").append(errMsg);

            return false;
        }
    } else {
        const errMsg = document.createElement("p");
        errMsg.append(`Please re enter password`);
        pwd.closest("td").append(errMsg);

        return false;
    }
}

function emailCheck(email) {
    const userEmail = form.querySelector(`[name=${email}]`);
    const userEmailValue = userEmail.value;

    const errMsgs = userEmail.closest("td").querySelectorAll("p");
    if(errMsgs.length > 0) {
        userEmail.closest("td").querySelector("p").remove();
    }

    if(/[@]/.test(userEmailValue)) {
        return true;
    } else {
        const errMsg = document.createElement("p");
        errMsg.append(`Please re enter email`);
        userEmail.closest("td").append(errMsg);

        return false;
    }
}

function isChecked(name) {
    const inputs = form.querySelectorAll(`[name=${name}]`);
    let isCheck = false;

    for(let el of inputs){
        if(el.checked) isCheck = true;
    }

    const errMsgs = inputs[0].closest("td").querySelectorAll("p");
    if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

    if(isCheck){
        return true;
    }else{
        const errMsg = document.createElement('p');
        errMsg.append(`Please check your ${name}`);
        inputs[0].closest("td").append(errMsg);

        return false;
    }
}