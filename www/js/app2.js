$$(document).on('page:afterin', '.page[data-name="jaiz"]', function (e){
  changeStatusBarColor("#255a38");
});
$$(document).on('page:init', '.page[data-name="jaiz"]', function (e){

  var searchbar = app.searchbar.create({
    el: '.jaiz-searchbar',
    searchContainer : '.jaiz-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".jaiz-add-2-my-banks, .jaiz-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "jaiz") {
      $$(".jaiz-add-2-my-banks").hide();
      $$(".jaiz-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".jaiz-add-2-my-banks").show();
      $$(".jaiz-remove-from-my-banks").hide();
    }
    
  }




  $$(".jaiz-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "jaiz",
        "bank_image" : "jaiz.png",
        "bank_ussd" : "*389*301#",
        "bank_name" : "Jaiz Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".jaiz-add-2-my-banks").hide();
      $$(".jaiz-remove-from-my-banks").show();

      toastMe("Jaiz Bank added to My Bank(s)");
    }
    
  });






  $$(".jaiz-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "jaiz") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".jaiz-add-2-my-banks").show();
        $$(".jaiz-remove-from-my-banks").hide();
        
        toastMe("Jaiz Bank removed from My Bank(s)");
        break;
      }

    }  

  });



  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.jaiz-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.jaiz-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferJaiz = app.sheet.create({
        el : '.jaiz-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.jaiz-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-jaiz-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-jaiz-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-jaiz-transfer").click(function(){
          transferJaiz.stepToggle();
      });
      $$("#expand-jaiz-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#jaiz-airtime-self-btn").click(function(){
          if ($$("#jaiz-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#jaiz-airtime-self-amount").val();
            var dialCode = "*389*301*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#jaiz-airtime-others-btn").click(function(){
          if ($$("#jaiz-airtime-others-phone-no").val().trim() == "" || $$("#jaiz-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#jaiz-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#jaiz-airtime-others-phone-no").val();
            var amt = $$("#jaiz-airtime-others-amount").val();
            var dialCode = "*389*301*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#jaiz-transfer-btn").click(function(){
          if ($$("#jaiz-transfer-acc-no").val().trim() == "" || $$("#jaiz-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#jaiz-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#jaiz-transfer-acc-no").val();
            var amt = $$("#jaiz-transfer-amount").val();
            var dialCode = "*389*301*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferJaiz.close();
          }
      });

      $$("#jaiz-transfer-others-btn").click(function(){
          if ($$("#jaiz-transfer-others-acc-no").val().trim() == "" || $$("#jaiz-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#jaiz-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#jaiz-transfer-others-acc-no").val();
            var amt = $$("#jaiz-transfer-others-amount").val();
            var dialCode = "*389*301*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});











$$(document).on('page:afterin', '.page[data-name="keystone"]', function (e){
  changeStatusBarColor("#133f77");
});
$$(document).on('page:init', '.page[data-name="keystone"]', function (e){


   var searchbar = app.searchbar.create({
    el: '.keystone-searchbar',
    searchContainer : '.keystone-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".keystone-add-2-my-banks, .keystone-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "keystone") {
      $$(".keystone-add-2-my-banks").hide();
      $$(".keystone-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".keystone-add-2-my-banks").show();
      $$(".keystone-remove-from-my-banks").hide();
    }
    
  }




  $$(".keystone-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "keystone",
        "bank_image" : "keystone.png",
        "bank_ussd" : "*7111#",
        "bank_name" : "keystone Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".keystone-add-2-my-banks").hide();
      $$(".keystone-remove-from-my-banks").show();

      toastMe("Keystone Bank added to My Bank(s)");
    }
    
  });






  $$(".keystone-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "keystone") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".keystone-add-2-my-banks").show();
        $$(".keystone-remove-from-my-banks").hide();
        
        toastMe("Keystone Bank removed from My Bank(s)");
        break;
      }

    }  

  });

  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.keystone-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.keystone-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferKeystone = app.sheet.create({
        el : '.keystone-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.keystone-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-keystone-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-keystone-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-keystone-transfer").click(function(){
          transferKeystone.stepToggle();
      });
      $$("#expand-keystone-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#keystone-airtime-self-btn").click(function(){
          if ($$("#keystone-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#keystone-airtime-self-amount").val();
            var dialCode = "*7111*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#keystone-airtime-others-btn").click(function(){
          if ($$("#keystone-airtime-others-phone-no").val().trim() == "" || $$("#keystone-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#keystone-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#keystone-airtime-others-phone-no").val();
            var amt = $$("#keystone-airtime-others-amount").val();
            var dialCode = "*7111*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#keystone-transfer-btn").click(function(){
          if ($$("#keystone-transfer-acc-no").val().trim() == "" || $$("#keystone-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#keystone-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#keystone-transfer-acc-no").val();
            var amt = $$("#keystone-transfer-amount").val();
            var dialCode = "*7111*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferKeystone.close();
          }
      });

      $$("#keystone-transfer-others-btn").click(function(){
          if ($$("#keystone-transfer-others-acc-no").val().trim() == "" || $$("#keystone-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#keystone-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#keystone-transfer-others-acc-no").val();
            var amt = $$("#keystone-transfer-others-amount").val();
            var dialCode = "*7111*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});

















$$(document).on('page:afterin', '.page[data-name="opay"]', function (e){
  changeStatusBarColor("#1dcf9f");
});
$$(document).on('page:init', '.page[data-name="opay"]', function (e){


  var searchbar = app.searchbar.create({
    el: '.opay-searchbar',
    searchContainer : '.opay-search-list',
    searchIn : '.item-title, .item-after'
  });

  $$(".opay-add-2-my-banks, .opay-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "opay") {
      $$(".opay-remove-from-my-banks").show();
      $$(".opay-add-2-my-banks").hide();
      break;
    }
    else{
      $$(".opay-add-2-my-banks").show();
      $$(".opay-remove-from-my-banks").hide();
    }

  }




  $$(".opay-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "opay",
        "bank_image" : "opay.png",
        "bank_ussd" : "*955#",
        "bank_name" : "OPay"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".opay-add-2-my-banks").hide();
      $$(".opay-remove-from-my-banks").show();

      toastMe("opay added to My Bank(s)");
    }
    
  });






  $$(".opay-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "opay") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".opay-add-2-my-banks").show();
        $$(".opay-remove-from-my-banks").hide();
        
        toastMe("opay removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });

     
    
      
});












$$(document).on('page:afterin', '.page[data-name="polaris"]', function (e){
  changeStatusBarColor("#8934ad");
});
$$(document).on('page:init', '.page[data-name="polaris"]', function (e){


   var searchbar = app.searchbar.create({
    el: '.polaris-searchbar',
    searchContainer : '.polaris-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".polaris-add-2-my-banks, .polaris-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "polaris") {
      $$(".polaris-add-2-my-banks").hide();
      $$(".polaris-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".polaris-add-2-my-banks").show();
      $$(".polaris-remove-from-my-banks").hide();
    }
    
  }




  $$(".polaris-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "polaris",
        "bank_image" : "polaris.jpeg",
        "bank_ussd" : "*833#",
        "bank_name" : "Polaris Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".polaris-add-2-my-banks").hide();
      $$(".polaris-remove-from-my-banks").show();

      toastMe("Polaris Bank added to My Bank(s)");
    }
    
  });






  $$(".polaris-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "polaris") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".polaris-add-2-my-banks").show();
        $$(".polaris-remove-from-my-banks").hide();
        
        toastMe("Polaris Bank removed from My Bank(s)");
        break;
      }

    }  

  });

  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.polaris-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.polaris-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferPolaris = app.sheet.create({
        el : '.polaris-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.polaris-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-polaris-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-polaris-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-polaris-transfer").click(function(){
          transferPolaris.stepToggle();
      });
      $$("#expand-polaris-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#polaris-airtime-self-btn").click(function(){
          if ($$("#polaris-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#polaris-airtime-self-amount").val();
            var dialCode = "*833*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#polaris-airtime-others-btn").click(function(){
          if ($$("#polaris-airtime-others-phone-no").val().trim() == "" || $$("#polaris-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#polaris-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#polaris-airtime-others-phone-no").val();
            var amt = $$("#polaris-airtime-others-amount").val();
            var dialCode = "*833*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#polaris-transfer-btn").click(function(){
          if ($$("#polaris-transfer-acc-no").val().trim() == "" || $$("#polaris-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#polaris-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#polaris-transfer-acc-no").val();
            var amt = $$("#polaris-transfer-amount").val();
            var dialCode = "*833*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferPolaris.close();
          }
      });

      $$("#polaris-transfer-others-btn").click(function(){
          if ($$("#polaris-transfer-others-acc-no").val().trim() == "" || $$("#polaris-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#polaris-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#polaris-transfer-others-acc-no").val();
            var amt = $$("#polaris-transfer-others-amount").val();
            var dialCode = "*833*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});










$$(document).on('page:afterin', '.page[data-name="rubies"]', function (e){
  changeStatusBarColor("#b62226");
});












$$(document).on('page:afterin', '.page[data-name="sterling"]', function (e){
  changeStatusBarColor("#db353a");
});
$$(document).on('page:init', '.page[data-name="sterling"]', function (e){


   var searchbar = app.searchbar.create({
    el: '.sterling-searchbar',
    searchContainer : '.sterling-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".sterling-add-2-my-banks, .sterling-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "sterling") {
      $$(".sterling-add-2-my-banks").hide();
      $$(".sterling-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".sterling-add-2-my-banks").show();
      $$(".sterling-remove-from-my-banks").hide();
    }
    
  }




  $$(".sterling-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "sterling",
        "bank_image" : "sterling.png",
        "bank_ussd" : "*822#",
        "bank_name" : "Sterling Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".sterling-add-2-my-banks").hide();
      $$(".sterling-remove-from-my-banks").show();

      toastMe("Sterling Bank added to My Bank(s)");
    }
    
  });






  $$(".sterling-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "sterling") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".sterling-add-2-my-banks").show();
        $$(".sterling-remove-from-my-banks").hide();
        
        toastMe("Sterling Bank removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.sterling-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.sterling-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferSterling = app.sheet.create({
        el : '.sterling-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.sterling-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-sterling-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-sterling-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-sterling-transfer").click(function(){
          transferSterling.stepToggle();
      });
      $$("#expand-sterling-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#sterling-airtime-self-btn").click(function(){
          if ($$("#sterling-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#sterling-airtime-self-amount").val();
            var dialCode = "*822*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#sterling-airtime-others-btn").click(function(){
          if ($$("#sterling-airtime-others-phone-no").val().trim() == "" || $$("#sterling-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#sterling-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#sterling-airtime-others-phone-no").val();
            var amt = $$("#sterling-airtime-others-amount").val();
            var dialCode = "*822*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#sterling-transfer-btn").click(function(){
          if ($$("#sterling-transfer-acc-no").val().trim() == "" || $$("#sterling-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#sterling-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#sterling-transfer-acc-no").val();
            var amt = $$("#sterling-transfer-amount").val();
            var dialCode = "*822*4*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferSterling.close();
          }
      });

      $$("#sterling-transfer-others-btn").click(function(){
          if ($$("#sterling-transfer-others-acc-no").val().trim() == "" || $$("#sterling-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#sterling-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#sterling-transfer-others-acc-no").val();
            var amt = $$("#sterling-transfer-others-amount").val();
            var dialCode = "*822*5*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});
















$$(document).on('page:afterin', '.page[data-name="stanbic"]', function (e){
  changeStatusBarColor("#00529c");
});
$$(document).on('page:init', '.page[data-name="stanbic"]', function (e){


   var searchbar = app.searchbar.create({
    el: '.stanbic-searchbar',
    searchContainer : '.stanbic-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".stanbic-add-2-my-banks, .stanbic-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "stanbic") {
      $$(".stanbic-add-2-my-banks").hide();
      $$(".stanbic-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".stanbic-add-2-my-banks").show();
      $$(".stanbic-remove-from-my-banks").hide();
    }
    
  }




  $$(".stanbic-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "stanbic",
        "bank_image" : "stanbic.jpeg",
        "bank_ussd" : "*909#",
        "bank_name" : "Stanbic IBTC Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".stanbic-add-2-my-banks").hide();
      $$(".stanbic-remove-from-my-banks").show();

      toastMe("Stanbic IBTC Bank added to My Bank(s)");
    }
    
  });






  $$(".stanbic-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "stanbic") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".stanbic-add-2-my-banks").show();
        $$(".stanbic-remove-from-my-banks").hide();
        
        toastMe("Stanbic IBTC Bank removed from My Bank(s)");
        break;
      }

    }  

  });

  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.stanbic-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.stanbic-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferStanbic = app.sheet.create({
        el : '.stanbic-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.stanbic-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-stanbic-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-stanbic-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-stanbic-transfer").click(function(){
          transferStanbic.stepToggle();
      });
      $$("#expand-stanbic-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#stanbic-airtime-self-btn").click(function(){
          if ($$("#stanbic-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#stanbic-airtime-self-amount").val();
            var dialCode = "*909*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#stanbic-airtime-others-btn").click(function(){
          if ($$("#stanbic-airtime-others-phone-no").val().trim() == "" || $$("#stanbic-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#stanbic-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#stanbic-airtime-others-phone-no").val();
            var amt = $$("#stanbic-airtime-others-amount").val();
            var dialCode = "*909*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#stanbic-transfer-btn").click(function(){
          if ($$("#stanbic-transfer-acc-no").val().trim() == "" || $$("#stanbic-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#stanbic-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#stanbic-transfer-acc-no").val();
            var amt = $$("#stanbic-transfer-amount").val();
            var dialCode = "*909*11*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferStanbic.close();
          }
      });

      $$("#stanbic-transfer-others-btn").click(function(){
          if ($$("#stanbic-transfer-others-acc-no").val().trim() == "" || $$("#stanbic-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#stanbic-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#stanbic-transfer-others-acc-no").val();
            var amt = $$("#stanbic-transfer-others-amount").val();
            var dialCode = "*909*22*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});





















$$(document).on('page:afterin', '.page[data-name="uba"]', function (e){
  changeStatusBarColor("#d42e12");
});
$$(document).on('page:init', '.page[data-name="uba"]', function (e){


  var searchbar = app.searchbar.create({
    el: '.uba-searchbar',
    searchContainer : '.uba-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".uba-add-2-my-banks, .uba-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "uba") {
      $$(".uba-add-2-my-banks").hide();
      $$(".uba-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".uba-add-2-my-banks").show();
      $$(".uba-remove-from-my-banks").hide();
    }
    
  }




  $$(".uba-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "uba",
        "bank_image" : "uba.png",
        "bank_ussd" : "*919#",
        "bank_name" : "UBA"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".uba-add-2-my-banks").hide();
      $$(".uba-remove-from-my-banks").show();

      toastMe("UBA added to My Bank(s)");
    }
    
  });






  $$(".uba-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "uba") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".uba-add-2-my-banks").show();
        $$(".uba-remove-from-my-banks").hide();
        
        toastMe("UBA removed from My Bank(s)");
        break;
      }

    }  

  });



  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.uba-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.uba-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferUBA = app.sheet.create({
        el : '.uba-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.uba-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-uba-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-uba-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-uba-transfer").click(function(){
          transferUBA.stepToggle();
      });
      $$("#expand-uba-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#uba-airtime-self-btn").click(function(){
          if ($$("#uba-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#uba-airtime-self-amount").val();
            var dialCode = "*919*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#uba-airtime-others-btn").click(function(){
          if ($$("#uba-airtime-others-phone-no").val().trim() == "" || $$("#uba-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#uba-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#uba-airtime-others-phone-no").val();
            var amt = $$("#uba-airtime-others-amount").val();
            var dialCode = "*919*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#uba-transfer-btn").click(function(){
          if ($$("#uba-transfer-acc-no").val().trim() == "" || $$("#uba-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#uba-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#uba-transfer-acc-no").val();
            var amt = $$("#uba-transfer-amount").val();
            var dialCode = "*919*3*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferUBA.close();
          }
      });

      $$("#uba-transfer-others-btn").click(function(){
          if ($$("#uba-transfer-others-acc-no").val().trim() == "" || $$("#uba-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#uba-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#uba-transfer-others-acc-no").val();
            var amt = $$("#uba-transfer-others-amount").val();
            var dialCode = "*919*4*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});

















$$(document).on('page:afterin', '.page[data-name="unity"]', function (e){
  changeStatusBarColor("#314551");
});
$$(document).on('page:init', '.page[data-name="unity"]', function (e){



  var searchbar = app.searchbar.create({
    el: '.unity-searchbar',
    searchContainer : '.unity-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".unity-add-2-my-banks, .unity-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "unity") {
      $$(".unity-add-2-my-banks").hide();
      $$(".unity-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".unity-add-2-my-banks").show();
      $$(".unity-remove-from-my-banks").hide();
    }
    
  }




  $$(".unity-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "unity",
        "bank_image" : "unity.jpeg",
        "bank_ussd" : "*7799#",
        "bank_name" : "Unity Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".unity-add-2-my-banks").hide();
      $$(".unity-remove-from-my-banks").show();

      toastMe("Unity Bank added to My Bank(s)");
    }
    
  });






  $$(".unity-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "unity") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".unity-add-2-my-banks").show();
        $$(".unity-remove-from-my-banks").hide();
        
        toastMe("Unity Bank removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.unity-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.unity-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferUnity = app.sheet.create({
        el : '.unity-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.unity-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-unity-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-unity-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-unity-transfer").click(function(){
          transferUnity.stepToggle();
      });
      $$("#expand-unity-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#unity-airtime-self-btn").click(function(){
          if ($$("#unity-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#unity-airtime-self-amount").val();
            var dialCode = "*7799*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#unity-airtime-others-btn").click(function(){
          if ($$("#unity-airtime-others-phone-no").val().trim() == "" || $$("#unity-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#unity-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#unity-airtime-others-phone-no").val();
            var amt = $$("#unity-airtime-others-amount").val();
            var dialCode = "*7799*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#unity-transfer-btn").click(function(){
          if ($$("#unity-transfer-acc-no").val().trim() == "" || $$("#unity-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#unity-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#unity-transfer-acc-no").val();
            var amt = $$("#unity-transfer-amount").val();
            var dialCode = "*7799*1*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferUnity.close();
          }
      });

      $$("#unity-transfer-others-btn").click(function(){
          if ($$("#unity-transfer-others-acc-no").val().trim() == "" || $$("#unity-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#unity-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#unity-transfer-others-acc-no").val();
            var amt = $$("#unity-transfer-others-amount").val();
            var dialCode = "*7799*2*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});



















$$(document).on('page:afterin', '.page[data-name="union"]', function (e){
  changeStatusBarColor("#00aff0");
});
$$(document).on('page:init', '.page[data-name="union"]', function (e){


  var searchbar = app.searchbar.create({
    el: '.union-searchbar',
    searchContainer : '.union-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".union-add-2-my-banks, .union-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "union") {
      $$(".union-add-2-my-banks").hide();
      $$(".union-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".union-add-2-my-banks").show();
      $$(".union-remove-from-my-banks").hide();
    }
    
  }




  $$(".union-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "union",
        "bank_image" : "unionbank.png",
        "bank_ussd" : "*826#",
        "bank_name" : "Union Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".union-add-2-my-banks").hide();
      $$(".union-remove-from-my-banks").show();

      toastMe("Union Bank added to My Bank(s)");
    }
    
  });






  $$(".union-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "union") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".union-add-2-my-banks").show();
        $$(".union-remove-from-my-banks").hide();
        
        toastMe("Union Bank removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.union-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.union-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferUnion = app.sheet.create({
        el : '.union-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.union-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-union-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-union-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-union-transfer").click(function(){
          transferUnion.stepToggle();
      });
      $$("#expand-union-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#union-airtime-self-btn").click(function(){
          if ($$("#union-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#union-airtime-self-amount").val();
            var dialCode = "*826*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#union-airtime-others-btn").click(function(){
          if ($$("#union-airtime-others-phone-no").val().trim() == "" || $$("#union-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#union-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#union-airtime-others-phone-no").val();
            var amt = $$("#union-airtime-others-amount").val();
            var dialCode = "*826*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#union-transfer-btn").click(function(){
          if ($$("#union-transfer-acc-no").val().trim() == "" || $$("#union-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#union-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#union-transfer-acc-no").val();
            var amt = $$("#union-transfer-amount").val();
            var dialCode = "*826*1*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferUnion.close();
          }
      });

      $$("#union-transfer-others-btn").click(function(){
          if ($$("#union-transfer-others-acc-no").val().trim() == "" || $$("#union-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#union-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#union-transfer-others-acc-no").val();
            var amt = $$("#union-transfer-others-amount").val();
            var dialCode = "*826*2*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});




















$$(document).on('page:afterin', '.page[data-name="wema"]', function (e){
  changeStatusBarColor("#990b81");
});
$$(document).on('page:init', '.page[data-name="wema"]', function (e){




  var searchbar = app.searchbar.create({
    el: '.wema-searchbar',
    searchContainer : '.wema-search-list',
    searchIn : '.item-title, .item-after'
  });

   $$(".wema-add-2-my-banks, .wema-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "wema") {
      $$(".wema-add-2-my-banks").hide();
      $$(".wema-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".wema-add-2-my-banks").show();
      $$(".wema-remove-from-my-banks").hide();
    }
    
  }




  $$(".wema-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "wema",
        "bank_image" : "wema.jpeg",
        "bank_ussd" : "*945#",
        "bank_name" : "Wema Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".wema-add-2-my-banks").hide();
      $$(".wema-remove-from-my-banks").show();

      toastMe("Wema Bank added to My Bank(s)");
    }
    
  });






  $$(".wema-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "wema") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".wema-add-2-my-banks").show();
        $$(".wema-remove-from-my-banks").hide();
        
        toastMe("Wema Bank removed from My Bank(s)");
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
        el : '.wema-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.wema-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferWema = app.sheet.create({
        el : '.wema-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.wema-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.wema-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-wema-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-wema-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-wema-transfer").click(function(){
          transferWema.stepToggle();
      });
      $$("#expand-wema-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-wema-cardless-withdrawal").click(function(){
          cardlessWithdrawal.stepToggle();
      });
      $$("#expand-wema-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#wema-airtime-self-btn").click(function(){
          if ($$("#wema-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#wema-airtime-self-amount").val();
            var dialCode = "*945*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#wema-airtime-others-btn").click(function(){
          if ($$("#wema-airtime-others-phone-no").val().trim() == "" || $$("#wema-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#wema-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#wema-airtime-others-phone-no").val();
            var amt = $$("#wema-airtime-others-amount").val();
            var dialCode = "*945*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#wema-transfer-btn").click(function(){
          if ($$("#wema-transfer-acc-no").val().trim() == "" || $$("#wema-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#wema-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#wema-transfer-acc-no").val();
            var amt = $$("#wema-transfer-amount").val();
            var dialCode = "*945*" + acc + "*" + amt + "#";
            makeCall(dialCode);
            transferWema.close();
          }
      });

      $$("#wema-transfer-others-btn").click(function(){
          if ($$("#wema-transfer-others-acc-no").val().trim() == "" || $$("#wema-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#wema-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#wema-transfer-others-acc-no").val();
            var amt = $$("#wema-transfer-others-amount").val();
            var dialCode = "*945*" + acc + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });


      $$("#wema-pay-bills-btn").click(function(){
          if ($$("#wema-smartcard-no").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var smartcardNo = $$("#wema-smartcard-no").val();
            var dialCode = "*945*" + theMerchantCode + "*" + smartcardNo + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});














$$(document).on('page:afterin', '.page[data-name="zenith"]', function (e){
  changeStatusBarColor("#e3000f");
});
$$(document).on('page:init', '.page[data-name="zenith"]', function (e){



  var searchbar = app.searchbar.create({
    el: '.zenith-searchbar',
    searchContainer : '.zenith-search-list',
    searchIn : '.item-title, .item-after'
  });


  $$(".zenith-add-2-my-banks, .zenith-remove-from-my-banks").hide();


  var myBanks = window.localStorage.getItem("my_banks");
  myBanks = JSON.parse(myBanks);


  for(q = 0; q < myBanks.length; q++){

    if (myBanks[q]["bank_path"] == "zenith") {
      $$(".zenith-add-2-my-banks").hide();
      $$(".zenith-remove-from-my-banks").show();
      break;
    }
    else{
      $$(".zenith-add-2-my-banks").show();
      $$(".zenith-remove-from-my-banks").hide();
    }
    
  }




  $$(".zenith-add-2-my-banks").click(function(){
    if(myBanks.length == 4){
      toastMe("Maximum of 3 banks can be added to <b>My Bank(s)</b>");
    }
    else{
      var accessBankDetails = {
        "bank_path" : "zenith",
        "bank_image" : "zenith.png",
        "bank_ussd" : "*966#",
        "bank_name" : "Zenith Bank"
      }
      myBanks.push(accessBankDetails);
      window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
      $$(".zenith-add-2-my-banks").hide();
      $$(".zenith-remove-from-my-banks").show();

      toastMe("Zenith Bank added to My Bank(s)");
    }
    
  });






  $$(".zenith-remove-from-my-banks").click(function(){

    for(q = 0; q < myBanks.length; q++){

      if (myBanks[q]["bank_path"] == "zenith") {

        var theIndex = myBanks.indexOf(myBanks[q]);
        if (theIndex >  -1) {
          myBanks.splice(theIndex, 1);
          
        }

        window.localStorage.setItem("my_banks", JSON.stringify(myBanks));
        $$(".zenith-add-2-my-banks").show();
        $$(".zenith-remove-from-my-banks").hide();
        
        toastMe("Zenith Bank removed from My Bank(s)");
        break;
      }

    }  

  });


  $$(".left .link").click(function(){
      showInterstitialAd();
  });


      var airtimeSelf = app.sheet.create({
        el : '.zenith-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.zenith-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferZenith = app.sheet.create({
        el : '.zenith-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.zenith-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-zenith-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-zenith-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-zenith-transfer").click(function(){
          transferZenith.stepToggle();
      });
      $$("#expand-zenith-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#zenith-airtime-self-btn").click(function(){
          if ($$("#zenith-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#zenith-airtime-self-amount").val();
            var dialCode = "*966*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#zenith-airtime-others-btn").click(function(){
          if ($$("#zenith-airtime-others-phone-no").val().trim() == "" || $$("#zenith-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#zenith-airtime-others-phone-no").val().trim().length < 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#zenith-airtime-others-phone-no").val();
            var amt = $$("#zenith-airtime-others-amount").val();
            var dialCode = "*966*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#zenith-transfer-btn").click(function(){
          if ($$("#zenith-transfer-acc-no").val().trim() == "" || $$("#zenith-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#zenith-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#zenith-transfer-acc-no").val();
            var amt = $$("#zenith-transfer-amount").val();
            var dialCode = "*966*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferZenith.close();
          }
      });

      $$("#zenith-transfer-others-btn").click(function(){
          if ($$("#zenith-transfer-others-acc-no").val().trim() == "" || $$("#zenith-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#zenith-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#zenith-transfer-others-acc-no").val();
            var amt = $$("#zenith-transfer-others-amount").val();
            var dialCode = "*966*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});
