var shareApp, changeStatusBarColor, makeCall, setMerchantCode, routeTo, prepareIntAd, showInterstitialAd, showBottomBannerAd, pickContact;
// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  name : 'Quick Banking',
  id: 'com.codegreenie.quickbankcodes',
  root: '#app',
  theme: 'auto',
  language: 'en',
  routes: routes
});

var mainView = app.views.create('.view-main', {
  url : './main.html',
  name : 'main',
  iosSwipeBack : false,
  router : true
});

toastMe = function(toastMessage){

    var toastMe = app.toast.create({
    text: toastMessage,
    position: 'center',
    closeTimeout: 2000,
  });

    toastMe.open();

}




       

document.addEventListener("deviceready", deviceIsReady, false);



function deviceIsReady(){


  pickContact = function(theFieldId){

    navigator.contacts.pickContact(function(contact){
        
        var phoneNumber = contact.phoneNumbers[0].value;
        $$("#" + theFieldId).val(phoneNumber);

    },function(err){
        toastMe('Please enable <b>Contacts</b> access in Phone settings');
    });

  }

  StatusBar.styleLightContent();
  StatusBar.backgroundColorByHexString("#043a7a");

  
      changeStatusBarColor = function(suppliedColor){
        StatusBar.backgroundColorByHexString(suppliedColor);
      }

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  // Set your iOS Settings
  var iosSettings = {};
  iosSettings["kOSSettingsKeyAutoPrompt"] = false;
  iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

   window.plugins.OneSignal
    .startInit("5bb0517e-54d7-407b-94da-21fb6b9c03cc")
    .handleNotificationOpened(notificationOpenedCallback)
    .iOSSettings(iosSettings)
    .inFocusDisplaying("none")
    .endInit();


shareApp = function(){

// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {

  message: 'USSD banking made perfect! Download Quick Banking App on Google Play Store - 5MB', 
  subject: 'Quick Banking', // fi. for email
  files: [], // an array of filenames either locally or remotely
  url: 'https://play.google.com/store/apps/details?id=com.codegreenie.quickbankcodes',
  chooserTitle: 'Share via'
};

var onSuccess = function(result) {
  //console.log("Share was successful");
};

var onError = function(msg) {
  //console.log("Sharing Failed!");
};

window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

}


  makeCall = function(theUSSD){

    window.plugins.CallNumber.callNumber(onSuccess, onError, theUSSD, true);
    function onSuccess(){ toastMe(theUSSD); }
    function onError(){ toastMe("Unable to complete request to " + theUSSD); }

  }




                //Google Admob Monetization here :)

                var admobid = {};
                if(app.theme == "md"){
                  admobid = {
                    banner: 'ca-app-pub-8716485588609849/1279938259',
                    interstitial: 'ca-app-pub-8716485588609849/2663859039'
                  };
                }else{
                  admobid = {
                    banner: 'ca-app-pub-8716485588609849/1215664542',
                    interstitial: 'ca-app-pub-8716485588609849/3270487402'
                  };

                }


                var interstitialReady = false;


                // update the state when ad preloaded
                document.addEventListener('onAdLoaded', function(e){
                    if(e.adType == 'interstitial') {
                        interstitialReady = true;
                    }
                });

                // when dismissed, preload one for next show
                document.addEventListener('onAdDismiss', function(e){
                    if(e.adType == 'interstitial') {
                        interstitialReady = false;
                        prepareIntAd();
                    }
                });

                // if Interstitial failes to laod, request another immediately
                document.addEventListener('onAdFailLoad', function(e){
                    if(e.adType == 'interstitial') {
                        interstitialReady = false;
                        window.setTimeout(function(){
                          prepareIntAd();
                        }, 1000);
                        
                    }
                });




                prepareIntAd = function(){

                  if(window.AdMob) AdMob.prepareInterstitial({
                      adId:admobid.interstitial, 
                      autoShow:false,
                      isTesting:false
                  });

              }


             



              showInterstitialAd = function(){
                if(interstitialReady == true) AdMob.showInterstitial();
              }


              showBottomBannerAd = function(){
                    if(window.AdMob) AdMob.createBanner({
                    adId:admobid.banner,  
                    position:AdMob.AD_POSITION.BOTTOM_CENTER,
                    overlap: true,
                    autoShow: false,
                    isTesting : false,
                    success : function(){
                      console.log("Yay! Banner ad is active");
                    },
                    error : function(){
                      console.log("oops! Banner didn't load. retrying");
                      window.setTimeout(function(){
                        showBottomBannerAd();
                      }, 1500);
                    }
                  });
              }


              
              setTimeout(function(){
                  prepareIntAd();
              }, 300);

              setTimeout(function(){
                  showBottomBannerAd();
              }, 500);




        

  

  document.addEventListener("backbutton", function (){

    app.sheet.close();
    
    var currentPage = mainView.router.currentRoute.name;
    
    //Re-route to Dashboard
    if(currentPage == "dashboard"){

        navigator.app.exitApp();
    }
    else{
      
    
      showInterstitialAd();

      mainView.router.back({
        ignoreCache : true,
        force : true
      });

    }

}, false);



}




$$(document).on('page:init', function(e){

var pageName = e.detail.name;

  $$(".how-to-use-button").click(function(){
    window.localStorage.removeItem("intro");
    if (pageName == "dashboard") {
      mainView.router.refreshPage();
    }
    else{
      mainView.router.navigate("/dashboard/");
    }          
  });

    
      if (pageName != "main"){
        setTimeout(function(){
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
         }, 500);
      }
   

    var bankSheet = $$('.sheet-modal');

    bankSheet.on("sheet:open", function(){
      if (pageName != "about" && pageName != "main" && pageName != "dashboard" || pageName != "privacy") {
        AdMob.hideBanner();
      }
    });

    bankSheet.on("sheet:closed", function(){
      if (pageName != "about" && pageName != "main" && pageName != "dashboard" || pageName != "privacy") {
        AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
      }
    });



    $$('.sheet-modal input').focus(function(){
      if (pageName != "about" && pageName != "main" && pageName != "dashboard") {
        app.sheet.stepClose();
      }
    });



});



$$(document).on('page:beforeout', function (e) {
  // hide before exiting to keep it clean
  AdMob.hideBanner();
});



$$(document).on('page:afterin', '.page[data-name="about"]', function (e){
  changeStatusBarColor("#043a7a");
});
$$(document).on('page:init', '.page[data-name="about"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
        showInterstitialAd();  
      }, 7000);


  $$(".share-btn").click(function(){
    shareApp();
  });


  $$("#goto-privacy-btn").click(function(){
    mainView.router.navigate("/privacy/");
  });


});







$$(document).on('page:afterin', '.page[data-name="privacy"]', function (e){
  changeStatusBarColor("#043a7a");
});
$$(document).on('page:init', '.page[data-name="privacy"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
        showInterstitialAd();  
      }, 7000);


  $$(".share-btn").click(function(){
    shareApp();
  });


});



$$(document).on('page:afterin', '.page[data-name="dashboard"]', function (e){
  
  changeStatusBarColor("#043a7a");

  });
  
$$(document).on('page:init', '.page[data-name="dashboard"]', function (e){

  if (!window.localStorage.getItem("my_banks")) {
    
    var emptyBankArray = [];
    var emptyBankDetails = {
      "bank_path" : "",
      "bank_image" : "",
      "bank_ussd" : "",
      "bank_name" : ""
    }
    emptyBankArray.push(emptyBankDetails);
    window.localStorage.setItem("my_banks", JSON.stringify(emptyBankArray));

  }

  var introSheet;

  if (!window.localStorage.getItem("intro")) {

    app.dialog.close();
    
    introSheet = app.sheet.create({
        el : '.my-sheet-swipe-to-close',
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
    });
    
    setTimeout(function(){
      AdMob.hideBanner();
      introSheet.open();
      window.localStorage.setItem("intro", true);
    },2000); 

  }


    var intSheet = $$('.my-sheet-swipe-to-close');
    intSheet.on("sheet:closed", function(){
        AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
    });


  $$("#close-intro-button").click(function(){
    introSheet.close();
  });

  $$("#block-title-my-banks, #favorite-banks-list").hide();

  

  // now look for my banks

  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);

  if (myBanks.length != 1) {
    for(q = 1; q < myBanks.length; q++){

        var bankName = myBanks[q]["bank_name"];
        var bankPath = myBanks[q]["bank_path"];
        var bankImage = myBanks[q]["bank_image"];
        var bankUssd = myBanks[q]["bank_ussd"];

        $$("#favorite-banks-list-ul").append("<li style='padding-bottom:10px;'><div class='item-content'><div class='item-media' style='border:solid 2px #ededed;border-radius:50%; width:60px;height:60px;background:url(imgs/" + bankImage + "); background-size:cover; background-repeat:no-repeat;' onclick=routeTo('" + bankPath + "')></div><div class='item-inner'><div class='item-title'><a href='/" + bankPath + "/' class='text-color-black'>" + bankName + "</a></div><div class='item-after text-color-black'><a href='/" + bankPath + "/' class='text-color-black'  style='margin-top:10px;'><span style='margin-top:10px;'>" + bankUssd + "</span>&nbsp;</a><a href='#' style='color:#043a7a;' onclick=makeCall('" + bankUssd + "')><i class='f7-icons' style='font-size:38px;'>phone_round</i></a></div></div></div></li>");
    }

    $$("#block-title-my-banks, #favorite-banks-list").show();
    $$("#block-title-all-banks").css({"margin-top" : "15px"});
  }
  else{

    $$("#block-title-my-banks, #favorite-banks-list").hide();
    $$("#block-title-all-banks").removeAttr("style");
  }



 

  



  routeTo = function(theRoute){
    mainView.router.navigate("/" + theRoute + "/");
  }

  function returnGuess(){
    var guessNo = Math.floor(Math.random() * 11) + 1;
    return guessNo;  
  }
    var luckyNumber = returnGuess();
    if (luckyNumber == 3) {
      //wait for 5 seconds because ad may be preparing
      setTimeout(function(){
        showInterstitialAd();  
      }, 5000);
        
    }
  

  
      var searchbar = app.searchbar.create({
        el: '.searchbar',
        searchContainer : '.search-list',
        searchIn : '.item-title, .item-after'
      });

      $$(".share-btn").click(function(){
        shareApp();
      });



    function returnShareGuess(){
      var guessNo = Math.floor(Math.random() * 30) + 1;
      return guessNo;  
    }
    var luckyShareNumber = returnShareGuess();
    if (luckyShareNumber == 7) {

     
      app.dialog.confirm("Like Quick Banking? <br> Share with Friends!", function(){
          $$("i.share-btn").trigger("click");
      }, function(){});
      
    }








    function returnShakeGuess(){
      var guessNo = Math.floor(Math.random() * 25) + 1;
      return guessNo;  
    }
    var luckyShakeNumber = returnShakeGuess();
    console.log(luckyShakeNumber);
    if (luckyShakeNumber == 9) {
      window.setTimeout(function(){
       $$("#lightbulb").addClass("shake");
      }, 2500);
      window.setTimeout(function(){
        $$("#lightbulb").removeClass("shake");
      }, 2000);
      
    }

});







$$(document).on('page:afterin', '.page[data-name="accessbank"]', function (e){
  changeStatusBarColor("#043a7a");
});
$$(document).on('page:init', '.page[data-name="accessbank"]', function (e){


  var searchbar = app.searchbar.create({
    el: '.accessbank-searchbar',
    searchContainer : '.accessbank-search-list',
    searchIn : '.item-title, .item-after'
  });

  $$(".accessbank-add-2-my-banks, .accessbank-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "accessbank") {
      $$(".accessbank-add-2-my-banks").hide();
      $$(".accessbank-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".accessbank-add-2-my-banks").show();
      $$(".accessbank-remove-from-my-banks").hide();
    }
    
  }




  $$(".accessbank-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "accessbank",
        "bank_image" : "accessbank.png",
        "bank_ussd" : "*901#",
        "bank_name" : "Access Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".accessbank-add-2-my-banks").hide();
      $$(".accessbank-remove-from-my-banks").show();

      toastMe("Access Bank added to My Bank(s)");
    }
    
  });






  $$(".accessbank-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "accessbank") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".accessbank-add-2-my-banks").show();
        $$(".accessbank-remove-from-my-banks").hide();
        
        toastMe("Access Bank removed from My Bank(s)");
        break;
      }

    }  

  });



  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.access-bank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.access-bank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferAccess = app.sheet.create({
        el : '.access-bank-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.access-bank-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-access-bank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-access-bank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-access-bank-transfer").click(function(){
          transferAccess.stepToggle();
      });
      $$("#expand-access-bank-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#access-bank-airtime-self-btn").click(function(){
          if ($$("#access-bank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#access-bank-airtime-self-amount").val();
            var dialCode = "*901*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#access-bank-airtime-others-btn").click(function(){
          if ($$("#access-bank-airtime-others-phone-no").val().trim() == "" || $$("#access-bank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#access-bank-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#access-bank-airtime-others-phone-no").val();
            var amt = $$("#access-bank-airtime-others-amount").val();
            var dialCode = "*901*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#access-bank-transfer-btn").click(function(){
          if ($$("#access-bank-transfer-acc-no").val().trim() == "" || $$("#access-bank-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#access-bank-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#access-bank-transfer-acc-no").val();
            var amt = $$("#access-bank-transfer-amount").val();
            var dialCode = "*901*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferAccess.close();
          }
      });

      $$("#access-bank-transfer-others-btn").click(function(){
          if ($$("#access-bank-transfer-others-acc-no").val().trim() == "" || $$("#access-bank-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#access-bank-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#access-bank-transfer-others-acc-no").val();
            var amt = $$("#access-bank-transfer-others-amount").val();
            var dialCode = "*901*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});

















$$(document).on('page:afterin', '.page[data-name="diamond"]', function (e){
  changeStatusBarColor("#b3d03a");
});
$$(document).on('page:init', '.page[data-name="diamond"]', function (e){

  var searchbar = app.searchbar.create({
    el: '.diamond-searchbar',
    searchContainer : '.diamond-search-list',
    searchIn : '.item-title, .item-after'
  });

  $$(".diamond-add-2-my-banks, .diamond-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "diamond") {
      $$(".diamond-remove-from-my-banks").show();
      $$(".diamond-add-2-my-banks").hide();
      break;
    }
    else{
      $$(".diamond-add-2-my-banks").show();
      $$(".diamond-remove-from-my-banks").hide();
    }

  }




  $$(".diamond-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "diamond",
        "bank_image" : "diamond.png",
        "bank_ussd" : "*426#",
        "bank_name" : "Diamond Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".diamond-add-2-my-banks").hide();
      $$(".diamond-remove-from-my-banks").show();

      toastMe("Diamond Bank added to My Bank(s)");
    }
    
  });






  $$(".diamond-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "diamond") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".diamond-add-2-my-banks").show();
        $$(".diamond-remove-from-my-banks").hide();
        
        toastMe("Diamond Bank removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });

      var airtimeSelf = app.sheet.create({
        el : '.diamond-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.diamond-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferDiamond = app.sheet.create({
        el : '.diamond-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.diamond-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-diamond-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-diamond-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-diamond-transfer").click(function(){
          transferDiamond.stepToggle();
      });
      $$("#expand-diamond-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#diamond-airtime-self-btn").click(function(){
          if ($$("#diamond-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#diamond-airtime-self-amount").val();
            var dialCode = "*426*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#diamond-airtime-others-btn").click(function(){
          if ($$("#diamond-airtime-others-phone-no").val().trim() == "" || $$("#diamond-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#diamond-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#diamond-airtime-others-phone-no").val();
            var amt = $$("#diamond-airtime-others-amount").val();
            var dialCode = "*426*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#diamond-transfer-btn").click(function(){
          if ($$("#diamond-transfer-acc-no").val().trim() == "" || $$("#diamond-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#diamond-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#diamond-transfer-acc-no").val();
            var amt = $$("#diamond-transfer-amount").val();
            var dialCode = "*426*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferDiamond.close();
          }
      });

      $$("#diamond-transfer-others-btn").click(function(){
          if ($$("#diamond-transfer-others-acc-no").val().trim() == "" || $$("#diamond-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#diamond-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#diamond-transfer-others-acc-no").val();
            var amt = $$("#diamond-transfer-others-amount").val();
            var dialCode = "*426*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});














$$(document).on('page:afterin', '.page[data-name="ecobank"]', function (e){
  changeStatusBarColor("#016098");
});
$$(document).on('page:init', '.page[data-name="ecobank"]', function (e){


  var searchbar = app.searchbar.create({
    el: '.ecobank-searchbar',
    searchContainer : '.ecobank-search-list',
    searchIn : '.item-title, .item-after'
  });

  $$(".ecobank-add-2-my-banks, .ecobank-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "ecobank") {
      $$(".ecobank-remove-from-my-banks").show();
      $$(".ecobank-add-2-my-banks").hide();
      break;
    }
    else{
      $$(".ecobank-add-2-my-banks").show();
      $$(".ecobank-remove-from-my-banks").hide();
    }

  }




  $$(".ecobank-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "ecobank",
        "bank_image" : "ecobank.jpeg",
        "bank_ussd" : "*326#",
        "bank_name" : "Ecobank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".ecobank-add-2-my-banks").hide();
      $$(".ecobank-remove-from-my-banks").show();

      toastMe("Ecobank added to My Bank(s)");
    }
    
  });






  $$(".ecobank-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "ecobank") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".ecobank-add-2-my-banks").show();
        $$(".ecobank-remove-from-my-banks").hide();
        
        toastMe("Ecobank removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });

      var airtimeSelf = app.sheet.create({
        el : '.ecobank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.ecobank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      


      $$("#expand-ecobank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-ecobank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
     



      $$("#ecobank-airtime-self-btn").click(function(){
          if ($$("#ecobank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#ecobank-airtime-self-amount").val();
            var dialCode = "*326*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#ecobank-airtime-others-btn").click(function(){
          if ($$("#ecobank-airtime-others-phone-no").val().trim() == "" || $$("#ecobank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#ecobank-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#ecobank-airtime-others-phone-no").val();
            var amt = $$("#ecobank-airtime-others-amount").val();
            var dialCode = "*326*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });


      
});









$$(document).on('page:afterin', '.page[data-name="firstbank"]', function (e){
  changeStatusBarColor("#03476e");
});
$$(document).on('page:init', '.page[data-name="firstbank"]', function (e){

  var searchbar = app.searchbar.create({
    el: '.firstbank-searchbar',
    searchContainer : '.firstbank-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".firstbank-add-2-my-banks, .firstbank-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "firstbank") {
      $$(".firstbank-add-2-my-banks").hide();
      $$(".firstbank-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".firstbank-add-2-my-banks").show();
      $$(".firstbank-remove-from-my-banks").hide();
    }
    
  }




  $$(".firstbank-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "firstbank",
        "bank_image" : "firstbank.png",
        "bank_ussd" : "*894#",
        "bank_name" : "First Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".firstbank-add-2-my-banks").hide();
      $$(".firstbank-remove-from-my-banks").show();

      toastMe("First Bank added to My Bank(s)");
    }
    
  });






  $$(".firstbank-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "firstbank") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".firstbank-add-2-my-banks").show();
        $$(".firstbank-remove-from-my-banks").hide();
        
        toastMe("First Bank removed from My Bank(s)");
        break;
      }

    }  

  });



  $$(".left .link").click(function(){
      showInterstitialAd();
  });

      var airtimeSelf = app.sheet.create({
        el : '.firstbank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.firstbank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferFirst = app.sheet.create({
        el : '.firstbank-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.firstbank-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var miniStatement = app.sheet.create({
        el : '.firstbank-mini-statement',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-firstbank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-firstbank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-firstbank-transfer").click(function(){
          transferFirst.stepToggle();
      });
      $$("#expand-firstbank-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-firstbank-mini-statement").click(function(){
          miniStatement.stepToggle();
      });



      $$("#firstbank-airtime-self-btn").click(function(){
          if ($$("#firstbank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#firstbank-airtime-self-amount").val();
            var dialCode = "*894*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#firstbank-airtime-others-btn").click(function(){
          if ($$("#firstbank-airtime-others-phone-no").val().trim() == "" || $$("#firstbank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#firstbank-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#firstbank-airtime-others-phone-no").val();
            var amt = $$("#firstbank-airtime-others-amount").val();
            var dialCode = "*894*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#firstbank-transfer-btn").click(function(){
          if ($$("#firstbank-transfer-acc-no").val().trim() == "" || $$("#firstbank-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#firstbank-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#firstbank-transfer-acc-no").val();
            var amt = $$("#firstbank-transfer-amount").val();
            var dialCode = "*894*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferFirst.close();
          }
      });

      $$("#firstbank-transfer-others-btn").click(function(){
          if ($$("#firstbank-transfer-others-acc-no").val().trim() == "" || $$("#firstbank-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#firstbank-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#firstbank-transfer-others-acc-no").val();
            var amt = $$("#firstbank-transfer-others-amount").val();
            var dialCode = "*894*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });



      $$("#firstbank-mini-statement-btn").click(function(){
          if ($$("#firstbank-mini-statement-account-no").val().trim() == "" || $$("#firstbank-mini-statement-account-no").val().trim().length != 10) {
            app.dialog.alert("Please complete the fields");
          }
          else{
            var accno = $$("#firstbank-mini-statement-account-no").val();
            var dialCode = "*894*" + accno + "#";
            makeCall(dialCode);
            miniStatement.close();
          }
      });

      
});









$$(document).on('page:afterin', '.page[data-name="fidelity"]', function (e){
  changeStatusBarColor("#0f227e");
});
$$(document).on('page:init', '.page[data-name="fidelity"]', function (e){

  var searchbar = app.searchbar.create({
    el: '.fidelity-searchbar',
    searchContainer : '.fidelity-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".fidelity-add-2-my-banks, .fidelity-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "fidelity") {
      $$(".fidelity-add-2-my-banks").hide();
      $$(".fidelity-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".fidelity-add-2-my-banks").show();
      $$(".fidelity-remove-from-my-banks").hide();
    }
    
  }




  $$(".fidelity-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "fidelity",
        "bank_image" : "fidelity.jpeg",
        "bank_ussd" : "*770#",
        "bank_name" : "Fidelity Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".fidelity-add-2-my-banks").hide();
      $$(".fidelity-remove-from-my-banks").show();

      toastMe("Fidelity Bank added to My Bank(s)");
    }
    
  });






  $$(".fidelity-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "fidelity") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".fidelity-add-2-my-banks").show();
        $$(".fidelity-remove-from-my-banks").hide();
        
        toastMe("Fidelity Bank removed from My Bank(s)");
        break;
      }

    }  

  });

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setMerchantCode = function(theCode){
    window.localStorage.setItem("merchant_code", theCode);
  }

      var airtimeSelf = app.sheet.create({
        el : '.fidelity-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.fidelity-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferFidelity = app.sheet.create({
        el : '.fidelity-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.fidelity-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var cardlessWithdrawal = app.sheet.create({
        el : '.fidelity-cardless-withdrawal',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.fidelity-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-fidelity-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-fidelity-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-fidelity-transfer").click(function(){
          transferFidelity.stepToggle();
      });
      $$("#expand-fidelity-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-fidelity-cardless-withdrawal").click(function(){
          cardlessWithdrawal.stepToggle();
      });
      $$("#expand-fidelity-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#fidelity-airtime-self-btn").click(function(){
          if ($$("#fidelity-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#fidelity-airtime-self-amount").val();
            var dialCode = "*770*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#fidelity-airtime-others-btn").click(function(){
          if ($$("#fidelity-airtime-others-phone-no").val().trim() == "" || $$("#fidelity-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fidelity-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#fidelity-airtime-others-phone-no").val();
            var amt = $$("#fidelity-airtime-others-amount").val();
            var dialCode = "*770*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#fidelity-transfer-btn").click(function(){
          if ($$("#fidelity-transfer-acc-no").val().trim() == "" || $$("#fidelity-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fidelity-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fidelity-transfer-acc-no").val();
            var amt = $$("#fidelity-transfer-amount").val();
            var dialCode = "*770*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferFidelity.close();
          }
      });

      $$("#fidelity-transfer-others-btn").click(function(){
          if ($$("#fidelity-transfer-others-acc-no").val().trim() == "" || $$("#fidelity-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fidelity-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fidelity-transfer-others-acc-no").val();
            var amt = $$("#fidelity-transfer-others-amount").val();
            var dialCode = "*770*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });


      $$("#fidelity-cardless-withdrawal-btn").click(function(){
          if ($$("#fidelity-cardless-withdrawal-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#fidelity-cardless-withdrawal-amount").val();
            var dialCode = "*770*8*" + amt + "#";
            makeCall(dialCode);
            cardlessWithdrawal.close();
          }
      });

      $$("#fidelity-pay-bills-btn").click(function(){
          if ($$("#fidelity-pay-bills-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var amt = $$("#fidelity-pay-bills-amount").val();
            var dialCode = "*770*" + theMerchantCode + "*" + amt + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});












$$(document).on('page:afterin', '.page[data-name="fcmb"]', function (e){
  changeStatusBarColor("#5c2684");
});
$$(document).on('page:init', '.page[data-name="fcmb"]', function (e){

  var searchbar = app.searchbar.create({
    el: '.fcmb-searchbar',
    searchContainer : '.fcmb-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".fcmb-add-2-my-banks, .fcmb-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "fcmb") {
      $$(".fcmb-add-2-my-banks").hide();
      $$(".fcmb-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".fcmb-add-2-my-banks").show();
      $$(".fcmb-remove-from-my-banks").hide();
    }
    
  }




  $$(".fcmb-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "fcmb",
        "bank_image" : "fcmb.png",
        "bank_ussd" : "*329#",
        "bank_name" : "FCMB"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".fcmb-add-2-my-banks").hide();
      $$(".fcmb-remove-from-my-banks").show();

      toastMe("FCMB added to My Bank(s)");
    }
    
  });






  $$(".fcmb-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "fcmb") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".fcmb-add-2-my-banks").show();
        $$(".fcmb-remove-from-my-banks").hide();
        
        toastMe("FCMB removed from My Bank(s)");
        break;
      }

    }  

  });

  

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

      var airtimeSelf = app.sheet.create({
        el : '.fcmb-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.fcmb-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferFCMB = app.sheet.create({
        el : '.fcmb-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.fcmb-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var buyData = app.sheet.create({
        el : '.fcmb-buy-data',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payTV = app.sheet.create({
        el : '.fcmb-pay-tv',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-fcmb-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-fcmb-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-fcmb-transfer").click(function(){
          transferFCMB.stepToggle();
      });
      $$("#expand-fcmb-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-fcmb-buy-data").click(function(){
          buyData.stepToggle();
      });
      $$("#expand-fcmb-pay-tv").click(function(){
          payTV.stepToggle();
      });



      $$("#fcmb-airtime-self-btn").click(function(){
          if ($$("#fcmb-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#fcmb-airtime-self-amount").val();
            var dialCode = "*329*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#fcmb-airtime-others-btn").click(function(){
          if ($$("#fcmb-airtime-others-phone-no").val().trim() == "" || $$("#fcmb-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fcmb-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#fcmb-airtime-others-phone-no").val();
            var amt = $$("#fcmb-airtime-others-amount").val();
            var dialCode = "*329*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#fcmb-transfer-btn").click(function(){
          if ($$("#fcmb-transfer-acc-no").val().trim() == "" || $$("#fcmb-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fcmb-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fcmb-transfer-acc-no").val();
            var amt = $$("#fcmb-transfer-amount").val();
            var dialCode = "*329*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferFCMB.close();
          }
      });

      $$("#fcmb-transfer-others-btn").click(function(){
          if ($$("#fcmb-transfer-others-acc-no").val().trim() == "" || $$("#fcmb-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fcmb-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fcmb-transfer-others-acc-no").val();
            var amt = $$("#fcmb-transfer-others-amount").val();
            var dialCode = "*329*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      $$("#fcmb-buy-data-btn").click(function(){
          if ($$("#fcmb-buy-data-phone").val().trim() == "" || $$("#fcmb-buy-data-phone").val().trim().length < 11) {
            app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#fcmb-buy-data-phone").val();
            var dialCode = "*329*1*" + phone + "#";
            makeCall(dialCode);
            buyData.close();
          }
      });

      $$("#fcmb-pay-tv-btn").click(function(){
          if ($$("#fcmb-pay-tv-number").val().trim() == "" || $$("#fcmb-pay-tv-amount").val().trim() == "") {
            app.dialog.alert("Please enter a valid smartcard/IUC number");
          }
          else{
            var smartNumber = $$("#fcmb-pay-tv-number").val();
            var amt = $$("#fcmb-pay-tv-amount").val();
            var dialCode = "*329*2*" + amt + "*" + smartNumber + "#";
            makeCall(dialCode);
            payTV.close();
          }
      });

      
});











$$(document).on('page:afterin', '.page[data-name="gtbank"]', function (e){
  changeStatusBarColor("#df4308");
});
$$(document).on('page:init', '.page[data-name="gtbank"]', function (e){


  var searchbar = app.searchbar.create({
    el: '.gtbank-searchbar',
    searchContainer : '.gtbank-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".gtbank-add-2-my-banks, .gtbank-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "gtbank") {
      $$(".gtbank-add-2-my-banks").hide();
      $$(".gtbank-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".gtbank-add-2-my-banks").show();
      $$(".gtbank-remove-from-my-banks").hide();
    }
    
  }




  $$(".gtbank-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "gtbank",
        "bank_image" : "gtb.jpeg",
        "bank_ussd" : "*737#",
        "bank_name" : "GT Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".gtbank-add-2-my-banks").hide();
      $$(".gtbank-remove-from-my-banks").show();

      toastMe("GT Bank added to My Bank(s)");
    }
    
  });






  $$(".gtbank-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "gtbank") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".gtbank-add-2-my-banks").show();
        $$(".gtbank-remove-from-my-banks").hide();
        
        toastMe("GT Bank removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });
  
  setMerchantCode = function(theCode){
    window.localStorage.setItem("merchant_code", theCode);
  }
      var airtimeSelf = app.sheet.create({
        el : '.gtbank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.gtbank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferGTB = app.sheet.create({
        el : '.gtbank-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.gtbank-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var cardlessWithdrawal = app.sheet.create({
        el : '.gtbank-cardless-withdrawal',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.gtbank-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-gtbank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-gtbank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-gtbank-transfer").click(function(){
          transferGTB.stepToggle();
      });
      $$("#expand-gtbank-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-gtbank-cardless-withdrawal").click(function(){
          cardlessWithdrawal.stepToggle();
      });
      $$("#expand-gtbank-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#gtbank-airtime-self-btn").click(function(){
          if ($$("#gtbank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#gtbank-airtime-self-amount").val();
            var dialCode = "*737*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#gtbank-airtime-others-btn").click(function(){
          if ($$("#gtbank-airtime-others-phone-no").val().trim() == "" || $$("#gtbank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#gtbank-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#gtbank-airtime-others-phone-no").val();
            var amt = $$("#gtbank-airtime-others-amount").val();
            var dialCode = "*737*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#gtbank-transfer-btn").click(function(){
          if ($$("#gtbank-transfer-acc-no").val().trim() == "" || $$("#gtbank-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#gtbank-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#gtbank-transfer-acc-no").val();
            var amt = $$("#gtbank-transfer-amount").val();
            var dialCode = "*737*1*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferGTB.close();
          }
      });

      $$("#gtbank-transfer-others-btn").click(function(){
          if ($$("#gtbank-transfer-others-acc-no").val().trim() == "" || $$("#gtbank-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#gtbank-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#gtbank-transfer-others-acc-no").val();
            var amt = $$("#gtbank-transfer-others-amount").val();
            var dialCode = "*737*2*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      $$("#gtbank-cardless-withdrawal-btn").click(function(){
          if ($$("#gtbank-cardless-withdrawal-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#gtbank-cardless-withdrawal-amount").val();
            var dialCode = "*737*3*" + amt + "#";
            makeCall(dialCode);
            cardlessWithdrawal.close();
          }
      });
      $$("#gtbank-pay-bills-btn").click(function(){
          if ($$("#gtbank-pay-bills-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var amt = $$("#gtbank-pay-bills-amount").val();
            var dialCode = "*737*50*" + amt + "*" + theMerchantCode + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});











$$(document).on('page:afterin', '.page[data-name="heritage"]', function (e){
  changeStatusBarColor("#4ba146");
});
$$(document).on('page:init', '.page[data-name="heritage"]', function (e){


  var searchbar = app.searchbar.create({
    el: '.heritage-searchbar',
    searchContainer : '.heritage-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".heritage-add-2-my-banks, .heritage-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "heritage") {
      $$(".heritage-add-2-my-banks").hide();
      $$(".heritage-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".heritage-add-2-my-banks").show();
      $$(".heritage-remove-from-my-banks").hide();
    }
    
  }




  $$(".heritage-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "heritage",
        "bank_image" : "heritage.jpg",
        "bank_ussd" : "*322*030#",
        "bank_name" : "Heritage Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".heritage-add-2-my-banks").hide();
      $$(".heritage-remove-from-my-banks").show();

      toastMe("Heritage Bank added to My Bank(s)");
    }
    
  });






  $$(".heritage-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "heritage") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".heritage-add-2-my-banks").show();
        $$(".heritage-remove-from-my-banks").hide();
        
        toastMe("GT Bank removed from My Bank(s)");
        break;
      }

    }  

  });
  


  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setMerchantCode = function(theCode){
    window.localStorage.setItem("merchant_code", theCode);
  }

      var airtimeSelf = app.sheet.create({
        el : '.heritage-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.heritage-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferHeritage = app.sheet.create({
        el : '.heritage-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.heritage-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.heritage-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-heritage-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-heritage-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-heritage-transfer").click(function(){
          transferHeritage.stepToggle();
      });
      $$("#expand-heritage-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-heritage-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#heritage-airtime-self-btn").click(function(){
          if ($$("#heritage-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#heritage-airtime-self-amount").val();
            var dialCode = "*322*030*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#heritage-airtime-others-btn").click(function(){
          if ($$("#heritage-airtime-others-phone-no").val().trim() == "" || $$("#heritage-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#heritage-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#heritage-airtime-others-phone-no").val();
            var amt = $$("#heritage-airtime-others-amount").val();
            var dialCode = "*322*030*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#heritage-transfer-btn").click(function(){
          if ($$("#heritage-transfer-acc-no").val().trim() == "" || $$("#heritage-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#heritage-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#heritage-transfer-acc-no").val();
            var amt = $$("#heritage-transfer-amount").val();
            var dialCode = "*322*030*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferHeritage.close();
          }
      });

      $$("#heritage-transfer-others-btn").click(function(){
          if ($$("#heritage-transfer-others-acc-no").val().trim() == "" || $$("#heritage-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#heritage-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#heritage-transfer-others-acc-no").val();
            var amt = $$("#heritage-transfer-others-amount").val();
            var dialCode = "*322*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      $$("#heritage-pay-bills-btn").click(function(){
          if ($$("#heritage-pay-bills-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var amt = $$("#heritage-pay-bills-amount").val();
            var dialCode = "*322*030*" + theMerchantCode + "*" + amt + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});








