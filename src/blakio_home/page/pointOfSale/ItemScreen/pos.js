// The URL where the Point of Sale app will send the transaction results.
var callbackUrl = "https://blakiodashboardserver.herokuapp.com/api/confirmation";

// Your application ID
var applicationId = "sq0idp-4CVw5fpKwLHOxXyqa1LoZQ";

var currencyCode = "USD";

// The version of the Point of Sale SDK that you are using.
var sdkVersion = "v2.0";

export const openURLAndroid = (notes, total) => {
    const client = localStorage.getItem("blakio_store");
    // Configure the allowable tender types
    var tenderTypes =
        `com.squareup.pos.TENDER_CARD, \
      com.squareup.pos.TENDER_CARD_ON_FILE, \
      com.squareup.pos.TENDER_CASH, \  
      com.squareup.pos.TENDER_OTHER`;

    var posUrl =
        "intent:#Intent;" +
        "action=com.squareup.pos.action.CHARGE;" +
        "package=com.squareup;" +
        "S.com.squareup.pos.WEB_CALLBACK_URI=" + callbackUrl + ";" +
        "S.com.squareup.pos.CLIENT_ID=" + applicationId + ";" +
        "S.com.squareup.pos.API_VERSION=" + sdkVersion + ";" +
        "i.com.squareup.pos.TOTAL_AMOUNT=" + total + ";" +
        "S.com.squareup.pos.CURRENCY_CODE=" + currencyCode + ";" +
        "S.com.squareup.pos.TENDER_TYPES=" + tenderTypes + ";" +
        "S.com.squareup.pos.NOTE=" + notes + ";" +
        "S.com.squareup.pos.REQUEST_METADATA" + client + ";" +
        "end";

    window.open(posUrl);
}

export const openURLiOS = (notes, total) => {
    // const client = localStorage.getItem("blakio_store");

    var dataParameter = {
        amount_money: {
            amount: total,
            currency_code: "USD"
        },

        // Replace this value with your application's callback URL
        callback_url: callbackUrl,

        // Replace this value with your application's ID
        client_id: applicationId,

        version: "1.3",
        notes: notes,
        options: {
            supported_tender_types: ["CREDIT_CARD", "CASH", "OTHER", "SQUARE_GIFT_CARD", "CARD_ON_FILE"]
        },
        // state: client
    };

    window.location = `square-commerce-v1://payment/create?data=${encodeURIComponent(JSON.stringify(dataParameter))}`;
}




/////////////////////




//If successful, Square Point of Sale returns the following parameters.
const clientTransactionId = "com.squareup.pos.CLIENT_TRANSACTION_ID";
const transactionId = "com.squareup.pos.SERVER_TRANSACTION_ID";

//If there's an error, Square Point of Sale returns the following parameters.
const errorField = "com.squareup.pos.ERROR_CODE";

//Get the URL parameters and puts them in an array
function getUrlParams(URL) {
    var vars = {};
    var parts = URL.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;

        });
    return vars;
}

// Makes a result string for success situation
function handleSuccess(transactionInfo) {
    var resultString = "";

    if (clientTransactionId in transactionInfo) {
        resultString += `Client Transaction ID: ${transactionInfo[clientTransactionId]} `;
    }
    if (transactionId in transactionInfo) {
        resultString += `Transaction ID: ${transactionInfo[transactionId]}`;
    }
    else {
        resultString += "Transaction ID: NO CARD USED";
    }
    return resultString;
}

// Makes an error string for error situation
function handleError(transactionInfo) {
    var resultString = "";

    if (errorField in transactionInfo) {
        resultString += "Client Transaction ID: " + transactionInfo[clientTransactionId] + "<br>";
    }
    if (transactionId in transactionInfo) {
        resultString += "Transaction ID: " + transactionInfo[transactionId] + "     <br>";
    }
    else {
        resultString += "Transaction ID: PROCESSED OFFLINE OR NO CARD USED<br>";
    }
    return resultString;
}

//get the data URL and encode in JSON
function getTransactionInfo(URL) {
    var data = decodeURI(URL.searchParams.get("data"));

    console.log("data: " + data);
    var transactionInfo = JSON.parse(data);
    return transactionInfo;
}

// Determines whether error or success based on urlParams, then prints the string
export const printResponse = (showSuccess, showError) => {
    var responseUrl = window.location.href;
    var transactionInfo = getTransactionInfo(responseUrl);
    var resultString = "";

    if (errorField in transactionInfo) {
        resultString = handleError(transactionInfo);
        showError("Error", resultString);
    } else {
        resultString = handleSuccess(transactionInfo);
        showSuccess("Success", resultString);
    }
}



// //If successful, Square Point of Sale returns the following parameters.
// const clientTransactionId = "client_transaction_id";
// const transactionId = "transaction_id";

// //If there's an error, Square Point of Sale returns the following parameters.
// const errorField = "error_code";