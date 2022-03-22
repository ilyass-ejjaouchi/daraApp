window.global = {
    Backand_AppName :'xxxxxxxxxx',
    Backand_Token   :'xxxxxxxxxx', // FROM Backand->Security & Auth->Configuration

    Facebook_APP_ID :'xxxxxxxxxx', // Get this from https://developers.facebook.com
    Google_OAUTH_ID :'xxxxxxxxxx', // Get this from https://console.developers.google.com

    GCM_SENDER_ID   :'174507835196', // Get this from https://console.developers.google.com
    GCM_SERVER_KEY  :'AIzaSyByXz82QXw4Aj7xpFWEeNB0fljMkSwDGJE', // Get this from https://console.developers.google.com

    Admob_Unit_ID   :'xxxxxxxxxx'
}

angular.module('visa',
    ['ionic',
        'topscroller',
        'ngCordova',
        'ngCordovaOauth',
        'visa.controllers',
        'visa.services',
        'pascalprecht.translate',
    ])

    .run(function($ionicPlatform,$http,$locale,$translate,$cordovaDialogs,$cordovaVibration,$ionicLoading, BackandService ,$ionicPopup, $rootScope) {
        $ionicPlatform.ready(function() {

            /*if(window.Connection) {
             if(navigator.connection.type == Connection.NONE) {
             $ionicPopup.confirm({
             title: "Internet Disconnected",
             content: "The internet is disconnected on your device."
             })
             .then(function(result) {
             if(!result) {
             ionic.Platform.exitApp();
             }
             });
             }
             }*/
            var notificationOpenedCallback = function(jsonData) {
                console.log('notification opened');
                console.log(jsonData.notification.payload.additionalData.from);

                if(jsonData.notification.payload.additionalData.from == 'admin' || jsonData.notification.payload.additionalData.from == 'Admin')
                {
                    var guard= JSON.parse(window.localStorage.getItem('user'));
                    data = {
                        guard_id:guard.user.user.id,
                        company_id:guard.user.user.user_detail.company_id,
                        notification:'I have Accepted the call',
                        status:1
                    };
                    $http.post($rootScope.domain+'api/create/call/notification' ,data)
                        .success(function () {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Check Call Notification',
                                template: 'You have Successfully Accepted the Call'
                            });
                        })
                        .error(function (data) {
                            $ionicLoading.hide();
                            console.log(data);
                            $ionicPopup.alert({
                                title: 'Check Call Notification',
                                template: 'You have missed the Check Call!'
                            });
                        });
                }

            };

            /*window.plugins.OneSignal
             .startInit("80251a35-e63a-4208-b1e2-7b44ae08fdcc")
             .handleNotificationOpened(notificationOpenedCallback)
             .endInit();
             window.plugins.OneSignal.enableVibrate(true);*/
            // Sync hashed email if you have a login system or collect it.
            //   Will be used to reach the user at the most optimal time of day.
            // window.plugins.OneSignal.syncHashedEmail(userEmail);



            /*cordova.plugins.backgroundMode.enable();*/


            function onRequestSuccess(success){
                console.log("Successfully requested accuracy: "+success.message);
            }

            function onRequestFailure(error){
                console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                    if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            }
            cordova.plugins.locationAccuracy.canRequest(function(canRequest){
                if(canRequest){
                    cordova.plugins.locationAccuracy.request(function(){
                            console.log("Request successful");
                        }, function (error){
                            console.error("Request failed");
                            if(error){
                                // Android only
                                console.error("error code="+error.code+"; error message="+error.message);
                                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                                    if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                                        cordova.plugins.diagnostic.switchToLocationSettings();
                                    }
                                }
                            }
                        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
                    );
                }
            });
            //cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            if(window.cordova && window.cordova.plugins.Keyboard) {

                //Change this to false to return accessory bar
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            /*if (window.cordova && window.cordova.plugins.Keyboard) {
             cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
             cordova.plugins.Keyboard.disableScroll(true);*/


        });
        $rootScope.domain = "http://visaapp.dara-international.com/";


    })



    .config(function($stateProvider ,$urlRouterProvider,$translateProvider,$sceDelegateProvider,ionicDatePickerProvider,ionicTimePickerProvider, $ionicConfigProvider) {

        $translateProvider.translations('eng', {
            //Report Page Translation

            REPORT: 'Report',
            YOUR_REG_NUMBER: 'Your number plate',
            DAMAGE_TO_YOUR_VEHICLE: 'Damage to your vehicle',
            WHAT_HAPPENED: 'What happened?',
            YOUR_EMAIL: 'Your email',
            SUBMIT: 'Submit',
            OTHERS_INVOLVED: 'If others are involved,',
            INSURANCE: 'Insurance',
            GOTO: 'Go To',

            //Dashboard Translation
            ABOUT: 'About',
            EMERGENCY: 'EMERGENCY',
            LOCATION: 'Location',
            PHOTOS: 'Photos',
            REMINDERS: 'Reminders',
            ASSOCIATES: 'Associates',
            TERMS: 'Terms',

            //Location Page

            GET_MYPOS_BTN: 'Record your location (use Get My Position)',
            ROAD_NAME: 'Road name',
            TRAVEL_DIRECTION: 'Travel direction',
            POSITION: 'Position',

            //Reminders Page
            ANNUAL_TEST: 'Annual Test',
            DETAIL: 'You should set reminders for insurance renewal, tax and testing requirements on your mobile or computer.',
            DETAIL1: 'If an accident is investigated, the loss adjuster will seek reasons to reduce your claim. These may include the following:',
            RAISON1: '• Fraud ',
            RAISON2: '• Illegal vehicle',
            RAISON3: '• Driver impairment',
            RAISON4: '• Insurance application inaccuracies',
            RAISON1_EXPL: 'untrue claims about the person driving or the extent of vehicle damage.',
            RAISON2_EXPL: 'not taxed, not tested or with defective parts (tyres, brakes). ',
            RAISON3_EXPL: 'alcohol, drugs, eyesight, driving license problem.',
            RAISON4_EXPL: 'anything relevant that is not declared on your insurance application.',
            RAISON5_EXPL: 'Any of these could void your insurance. ',
            VEHICLE_MANUFAC: 'Vehicle Manufacturer',
            MODEL: 'Model',
            TAX_EXPIRY: 'Tax Expiry',
            INS_EXPIRY: 'Insurance Expiry',

            //Insurance Page
            REGISTRATION_NUMBER: 'Their number plate (or write cyclist/pedestrian)',
            THEIR_NAME: 'Their name',
            THEIR_PHONE: 'Their phone number',
            THEIR_ADDRESS: 'Their address',
            THEIR_INSURER: 'Their insurer',
            DATE: 'Date',
            TIME: 'Time',
            THEIR_VEHICLE_MAKE: 'Their vehicle make',
            COLOR: 'Colour',
            PASSENGERS: 'Number of passengers',
            DAMAGE_TO_OTHER: 'Damage to the other vehicle',
            SEE_OTHER_VEHICLE: 'Did you clearly see into the other vehicle? (if not, why?).',
            OTHER_OBJECT_CALL: 'Did the other driver object to calling police?',
            WHAT_THEY_SAY: 'What did they actually say?',
            WEATHER_LIKE: 'What was the weather like?',
            ANYTHING_ELSE: 'Anything else that contributed?',
            ID_OF_POLICE: 'ID numbers of police attending',
            ACCIDENT_REF: 'Police accident reference number',
            WITNESS: 'Witness contacts',
            REPEAT: 'Repeat if more vehicles are involved.',

        });

        $translateProvider.translations('dut', {
            //Report Page Translation

            REPORT: 'Rapport',
            YOUR_REG_NUMBER: 'Uw registratien ummer',
            DAMAGE_TO_YOUR_VEHICLE: 'Schade aan uw voertuig',
            WHAT_HAPPENED: 'Wat is er gebeurd?',
            YOUR_EMAIL: 'Jouw email',
            SUBMIT: 'Submit',
            OTHERS_INVOLVED: 'Als anderen betrokken zijn,',
            INSURANCE: 'Verzekering',
            GOTO: 'Ga Naar',

            //Dashboard Translation
            ABOUT: 'Over',
            EMERGENCY: 'NOOD',
            LOCATION: 'Plaats',
            PHOTOS: 'Fotos',
            REMINDERS: 'Herinneringen',
            ASSOCIATES: 'Associates',
            TERMS: 'Voorwaarden',

            //Location Page
            GET_MYPOS_BTN: 'Plaats uw locatiegebruik op Mijn positie krijgen',
            ROAD_NAME: 'Wegnaam',
            TRAVEL_DIRECTION: 'Reisrichting',
            POSITION: 'Positie',

            //Reminders Page
            DETAIL: 'Voer de details van uw voertuig in en de vervaldatums van het testcertificaat, belasting en verzekering. U wordt 1 week voor elke verlengingsdatum herinnerd.',
            VEHICLE_MANUFAC: 'Voertuigfabrikant',
            MODEL: 'Model',
            ANNUAL_TEST: 'Jaarlijkse Test',
            TAX_EXPIRY: 'Belastinguitval',
            INS_EXPIRY: 'Verzekeringsuitval',

            //Insurance Page
            REGISTRATION_NUMBER: 'Hun registratienummer of schrijf fietser / voetganger',
            THEIR_NAME: 'Hun naam',
            THEIR_PHONE: 'Hun telefoonnummer',
            THEIR_ADDRESS: 'Hun adres',
            THEIR_INSURER: 'Hun verzekeraar',
            DATE: 'Datum',
            TIME: 'Tijd',
            THEIR_VEHICLE_MAKE: 'Hun voertuig maken',
            COLOR: 'Kleur',
            PASSENGERS: 'Aantal passagiers',
            DAMAGE_TO_OTHER: 'Schade aan het andere voertuig',
            SEE_OTHER_VEHICLE: 'Heb je het andere voertuig duidelijk gezien? Zo niet waarom?',
            OTHER_OBJECT_CALL: 'Heeft de andere bestuurder bezwaar tegen de politie te bellen?',
            WHAT_THEY_SAY: 'Wat hebben ze eigenlijk gezegd?',
            WEATHER_LIKE: 'Hoe was het weer?',
            ANYTHING_ELSE: 'Enigiets anders dat bijgedragen?',
            ID_OF_POLICE: 'ID nummers van de politie bijwonen',
            ACCIDENT_REF: 'Politie ongeval referentienummer',
            WITNESS: 'Getuige contacten',
            REPEAT: 'Herhaal als er meer voertuigen zijn betrokken.',
        });

        $translateProvider.translations('urd', {
            //Report Page Translation

            REPORT: 'رپورٹ',
            YOUR_REG_NUMBER: 'آپ کا رجسٹریشن نمبر',
            DAMAGE_TO_YOUR_VEHICLE: 'آپ کی گاڑی کے نقصان',
            WHAT_HAPPENED: 'کیا ہوا؟',
            YOUR_EMAIL: 'آپ کا ای میل',
            SUBMIT: 'جمع',
            OTHERS_INVOLVED: 'اگر دوسروں میں ملوث ہیں,',
            INSURANCE: 'انشورنس',
            GOTO: 'کے پاس جاؤ',

            //Dashboard Translation
            ABOUT: 'کے بارے میں',
            EMERGENCY: 'ایمرجنسی',
            LOCATION: 'مقام',
            PHOTOS: 'فوٹو',
            REMINDERS: 'یاد دہانیوں',
            ASSOCIATES: 'ایسوسی ایٹس',
            TERMS: 'شرائط',

            //Location Page

            GET_MYPOS_BTN: 'اپنے مقام کو ریکارڈ کریں (میرا اپنا مقام حاصل کریں استعمال کریں) ',
            ROAD_NAME: 'روڈ کا نام',
            TRAVEL_DIRECTION: 'سفر کی سمت',
            POSITION: 'مقام',

            //Reminders Page
            DETAIL: 'اپنی گاڑی کی تفصیلات درج کریں اور ٹیسٹ سرٹیفکیٹ، ٹیکس اور انشورنس کی اختتامی تاریخوں میں درج کریں. آپ کو ہر تجدید کی تاریخ کے 1 ہفتہ پہلے یاد رکھا جائے گا.',
            VEHICLE_MANUFAC: 'گاڑی کے ڈویلپر',
            MODEL: 'ماڈل',
            ANNUAL_TEST: 'سالانہ ٹیسٹ',
            TAX_EXPIRY: 'ٹیکس ختم ہونے',
            INS_EXPIRY: 'انشورنس ختم ہونے',

            //Insurance Page
            REGISTRATION_NUMBER: 'ان کے رجسٹریشن نمبر (یا سائیکل سائیکل / پیڈسٹریٹر لکھیں) ',
            THEIR_NAME: 'انکے نام',
            THEIR_PHONE: 'ان کے فون نمبر',
            THEIR_ADDRESS: 'ان کا پتہ',
            THEIR_INSURER: 'ان کے انشورٹری',
            DATE: 'تاریخ',
            TIME: 'وقت',
            THEIR_VEHICLE_MAKE: 'ان کی گاڑی',
            COLOR: 'رنگ',
            PASSENGERS: 'مسافروں کی تعدا',
            DAMAGE_TO_OTHER: 'دوسری گاڑی کو نقصان پہنچا',
            SEE_OTHER_VEHICLE: 'کیا تم نے دوسری گاڑی میں واضح طور پر دیکھا؟ (اگر نہیں، کیوں؟.',
            OTHER_OBJECT_CALL: 'کیا دوسرے ڈرائیور نے پولیس کو بلا کر اعتراض کیا؟',
            WHAT_THEY_SAY: 'وہ اصل میں کیا کہتے تھے؟',
            WEATHER_LIKE: 'موسم کیسا تھا؟',
            ANYTHING_ELSE: 'کچھ اور جس نے حصہ لیا؟',
            ID_OF_POLICE: 'پولیس میں شرکت کرنے والی شناختی نمبر',
            ACCIDENT_REF: 'پولیس حادثے کا حوالہ نمبر',
            WITNESS: 'گواہ رابطے',
            REPEAT: 'مزید گاڑیوں میں ملوث ہوتے ہیں تو دوبارہ دوبارہ کریں',

        });


        $translateProvider.translations('bos', {
            //Report Page Translation

            REPORT: 'Izveštaj',
            YOUR_REG_NUMBER: 'Vaš registarski broj',
            DAMAGE_TO_YOUR_VEHICLE: 'Oštećenje vašeg vozila',
            WHAT_HAPPENED: 'Šta se desilo?',
            YOUR_EMAIL: 'Vaš email',
            SUBMIT: 'Pošalji',
            OTHERS_INVOLVED: 'Ako su drugi uključeni,',
            INSURANCE: 'Osiguranje',
            GOTO: 'Idi',

            //Dashboard Translation
            ABOUT: 'O',
            EMERGENCY: 'NUŽNA',
            LOCATION: 'Lokacija',
            PHOTOS: 'Fotografije',
            REMINDERS: 'Podsetnici',
            ASSOCIATES: 'Associates',
            TERMS: 'Uslovi',

            //Location Page

            GET_MYPOS_BTN: 'Snimite svoju lokaciju (Use Get My Position)',
            ROAD_NAME: 'Naziv puta',
            TRAVEL_DIRECTION: 'Putni pravac',
            POSITION: 'Pozicija',

            //Reminders Page
            DETAIL: 'Unesite podatke o vašem vozilu i datume isteka sertifikata o testiranju, porezu i osiguranju. Biće vam podsetili 1 nedelju pre svakog datuma obnove.',
            VEHICLE_MANUFAC: 'Proizvođač vozila',
            MODEL: 'Model',
            ANNUAL_TEST: 'Godišnji test',
            TAX_EXPIRY: 'Porezna dozvola',
            INS_EXPIRY: 'Insurance Expiry',

            //Insurance Page
            REGISTRATION_NUMBER: 'Njihov registracioni broj (ili napisati bicikl / pešač)',
            THEIR_NAME: 'Njihovo ime',
            THEIR_PHONE: 'Njihov broj telefona',
            THEIR_ADDRESS: 'Njihova adresa',
            THEIR_INSURER: 'Njihov osiguravač',
            DATE: 'Datum',
            TIME: 'Vrijeme',
            THEIR_VEHICLE_MAKE: 'Njihovo vozilo proizvod',
            COLOR: 'Boja',
            PASSENGERS: 'Broj putnika',
            DAMAGE_TO_OTHER: 'Oštećenje drugog vozila',
            SEE_OTHER_VEHICLE: 'Da li ste jasno videli drugo vozilo? (ako ne, zašto?).',
            OTHER_OBJECT_CALL: 'Da li je drugi vozač protivio pozivu policije?',
            WHAT_THEY_SAY: 'Šta su zapravo rekli ?',
            WEATHER_LIKE: 'Kakvo je bilo vrijeme?',
            ANYTHING_ELSE: 'Još nešto što je doprinijelo ?',
            ID_OF_POLICE: 'Broj brojeva policije koji pohađaju',
            ACCIDENT_REF: 'Referentni broj policijske nesreće',
            WITNESS: 'Kontakti svedoka',
            REPEAT: 'Ponovite ako je uključeno više vozila.',

        });


        $translateProvider.translations('bul', {
            //Report Page Translation

            REPORT: 'Доклад',
            YOUR_REG_NUMBER: 'Вашият регистрационен номер',
            DAMAGE_TO_YOUR_VEHICLE: 'Повреда на вашия автомобил',
            WHAT_HAPPENED: 'Какво стана?',
            YOUR_EMAIL: 'Твоят имейл',
            SUBMIT: 'Подайте',
            OTHERS_INVOLVED: 'Ако са замесени други',
            INSURANCE: 'Застраховка,',
            GOTO: 'Отидете',

            //Dashboard Translation
            ABOUT: 'Относно',
            EMERGENCY: 'СПЕШЕН СЛУЧАЙ',
            LOCATION: 'местоположение',
            PHOTOS: 'Снимки',
            REMINDERS: 'напомняния',
            ASSOCIATES: 'Associates',
            TERMS: 'Условия',

            //Location Page

            GET_MYPOS_BTN: 'Запишете местоположението си (използвайте "Получи моята позиция")',
            ROAD_NAME: 'Името на пътя',
            TRAVEL_DIRECTION: 'Посока на движение',
            POSITION: 'Позиция',

            //Reminders Page
            DETAIL: 'Въведете данните за вашето превозно средство и датите на валидност на сертификата за изпитване, данък и застраховка. Ще ви бъде напомнено 1 седмица преди всяка дата на подновяване.',
            VEHICLE_MANUFAC: 'Производител на автомобили',
            MODEL: 'Модел',
            ANNUAL_TEST: 'Годишен тест,',
            TAX_EXPIRY: 'Данъчното изтичане',
            INS_EXPIRY: 'Застрахователно изтичане',

            //Insurance Page
            REGISTRATION_NUMBER: 'Техният регистрационен номер (или пишете колоездач / пешеходец)',
            THEIR_NAME: 'Тяхното име',
            THEIR_PHONE: 'Техният телефонен номер',
            THEIR_ADDRESS: 'Техният адрес,',
            THEIR_INSURER: 'Техният застраховател',
            DATE: 'Дата',
            TIME: 'Време',
            THEIR_VEHICLE_MAKE: 'Техният автомобил прави',
            COLOR: 'Цвят',
            PASSENGERS: 'Брой пътници',
            DAMAGE_TO_OTHER: 'Повреда на другото превозно средство',
            SEE_OTHER_VEHICLE: 'Видяхте ли ясно в другото превозно средство? (ако не, защо?).',
            OTHER_OBJECT_CALL: 'Дали другият шофьор възрази срещу обаждането на полицията?',
            WHAT_THEY_SAY: 'Какво всъщност казаха?',
            WEATHER_LIKE: 'Какво беше времето?',
            ANYTHING_ELSE: 'Всичко друго, което допринесе ?',
            ID_OF_POLICE: 'Идентификационните номера на полицията',
            ACCIDENT_REF: 'Референтен номер на полицията',
            WITNESS: 'Свидетелски контакти',
            REPEAT: 'Повторете, ако са замесени повече превозни средства',

        });

        $translateProvider.translations('hrv', {
            //Report Page Translation

            REPORT: 'Izvješće',
            YOUR_REG_NUMBER: 'Vaš registracijski broj',
            DAMAGE_TO_YOUR_VEHICLE: 'Oštećenje vašeg vozila',
            WHAT_HAPPENED: 'Što se dogodilo?',
            YOUR_EMAIL: 'Tvoj email',
            SUBMIT: 'Pošaljite',
            OTHERS_INVOLVED: 'Ako su uključeni drugi,',
            INSURANCE: 'Osiguranje',
            GOTO: 'Ići',

            //Dashboard Translation
            ABOUT: 'Oko',
            EMERGENCY: 'HITNI',
            LOCATION: 'Mjesto',
            PHOTOS: 'fotografije',
            REMINDERS: 'Podsjetnici',
            ASSOCIATES: 'Associates',
            TERMS: 'Uvjeti',

            //Location Page

            GET_MYPOS_BTN: 'Zabilježite svoju lokaciju (upotreba "Preuzmi moj položaj")',
            ROAD_NAME: 'Naziv ceste',
            TRAVEL_DIRECTION: 'Smjer vožnje',
            POSITION: 'Položaj',

            //Reminders Page
            DETAIL: 'Unesite podatke o vozilu i datum isteka potvrde o ispitivanju, poreza i osiguranja. Bit ćete podsjetni 1 tjedan prije svakog datuma obnove.',
            VEHICLE_MANUFAC: 'Proizvođač vozila',
            MODEL: 'Model',
            ANNUAL_TEST: 'Godišnji test',
            TAX_EXPIRY: 'Isplata poreza',
            INS_EXPIRY: 'Osiguranje isteka',

            //Insurance Page
            REGISTRATION_NUMBER: 'Njihov registarski broj (ili pišite bicikliste / pješake)',
            THEIR_NAME: 'Njihovo ime',
            THEIR_PHONE: 'Njihov telefonski broj',
            THEIR_ADDRESS: 'Njihova adresa',
            THEIR_INSURER: 'Njihov osiguravatel',
            DATE: 'Datum',
            TIME: 'Vrijeme',
            THEIR_VEHICLE_MAKE: 'Njihovo vozilo čini',
            COLOR: 'Boja',
            PASSENGERS: 'Broj putnika',
            DAMAGE_TO_OTHER: 'Oštećenje drugog vozila',
            SEE_OTHER_VEHICLE: 'Jeste li se jasno vidjeli u drugom vozilu? (ako ne, zašto?)..',
            OTHER_OBJECT_CALL: 'Je li se drugi vozač suprotstavio zvanju policije ?',
            WHAT_THEY_SAY: 'Što su zapravo rekli ?',
            WEATHER_LIKE: 'Kakvo je bilo vrijeme?',
            ANYTHING_ELSE: 'Sve ostalo što je pridonijelo ?',
            ID_OF_POLICE: 'ID brojevi policije pohađaju',
            ACCIDENT_REF: 'Referentni broj policije',
            WITNESS: 'Svjedoci kontakti',
            REPEAT: 'Ponovite ako je uključeno više vozila',

        });

        $translateProvider.translations('cze', {
            //Report Page Translation

            REPORT: 'Zpráva',
            YOUR_REG_NUMBER: 'Vaše registrační číslo',
            DAMAGE_TO_YOUR_VEHICLE: 'Poškození vašeho vozidla',
            WHAT_HAPPENED: 'ŠCo se stalo?',
            YOUR_EMAIL: 'Tvůj e-mail',
            SUBMIT: 'Předložit',
            OTHERS_INVOLVED: 'Pokud se jedná o jiné,',
            INSURANCE: 'Pojištění',
            GOTO: 'Jít do',

            //Dashboard Translation
            ABOUT: 'O',
            EMERGENCY: 'NOUZOVÝ',
            LOCATION: 'Umístění',
            PHOTOS: 'Fotky',
            REMINDERS: 'Připomenutí',
            ASSOCIATES: 'Associates',
            TERMS: 'Podmínky',

            //Location Page

            GET_MYPOS_BTN: 'Zaznamenejte svou polohu (použijte Get My Position)',
            ROAD_NAME: 'Název silnice',
            TRAVEL_DIRECTION: 'Směr jízdy',
            POSITION: 'Pozice',

            //Reminders Page
            DETAIL: 'Zadejte údaje o Vašem vozidle a datum ukončení platnosti osvědčení o zkoušce, daně a pojištění. Bude vám připomenuto 1 týden před každým datem obnovení',
            VEHICLE_MANUFAC: 'Výrobce vozidla',
            MODEL: 'Model',
            ANNUAL_TEST: 'Roční test,',
            TAX_EXPIRY: 'Zánik daně',
            INS_EXPIRY: 'Pojištění',

            //Insurance Page
            REGISTRATION_NUMBER: 'Jejich registrační číslo (nebo cyklista / chodec)',
            THEIR_NAME: 'Jejich jména',
            THEIR_PHONE: 'Jejich telefonní číslo',
            THEIR_ADDRESS: 'Jejich adresa',
            THEIR_INSURER: 'Jejich pojistitel',
            DATE: 'Datum',
            TIME: 'Čas',
            THEIR_VEHICLE_MAKE: 'Jejich vozidlo vyrábí',
            COLOR: 'Barva',
            PASSENGERS: 'Počet cestujících',
            DAMAGE_TO_OTHER: 'Poškození druhého vozidla',
            SEE_OTHER_VEHICLE: 'Viděl jste jasně do druhého vozidla? (pokud ne, proč?).',
            OTHER_OBJECT_CALL: 'Četl druhý řidič proti tomu, aby zavolal policii ?',
            WHAT_THEY_SAY: 'Jaké bylo počasí?',
            WEATHER_LIKE: 'Co jiného přispělo?',
            ANYTHING_ELSE: 'Identifikační čísla policisty',
            ID_OF_POLICE: 'Identifikační čísla policisty',
            ACCIDENT_REF: 'Policejní referenční číslo nehody',
            WITNESS: 'Svědečné kontakty',
            REPEAT: 'Opakujte, pokud se jedná o více vozidel',

        });

        $translateProvider.translations('est', {
            //Report Page Translation

            REPORT: 'Aruanne',
            YOUR_REG_NUMBER: 'Teie registreerimisnumber',
            DAMAGE_TO_YOUR_VEHICLE: 'Teie auto kahjustused',
            WHAT_HAPPENED: 'Mis juhtus?',
            YOUR_EMAIL: 'Sinu email',
            SUBMIT: 'Esita',
            OTHERS_INVOLVED: 'Kui teised on kaasatud',
            INSURANCE: 'Kindlustus',
            GOTO: 'Minema',

            //Dashboard Translation
            ABOUT: 'Umbes',
            EMERGENCY: 'HÄDAABI',
            LOCATION: 'Asukoht',
            PHOTOS: 'Fotod',
            REMINDERS: 'Meeldetuletused',
            ASSOCIATES: 'Associates',
            TERMS: 'Tingimused',

            //Location Page

            GET_MYPOS_BTN: 'Salvestage oma asukoht (kasutage Minu positsiooni hankimist)',
            ROAD_NAME: 'Tee nimi',
            TRAVEL_DIRECTION: 'Sõidu suund',
            POSITION: 'Positsioon',

            //Reminders Page
            DETAIL: 'Sisestage oma sõiduki andmed ja katse sertifikaadi, maksu ja kindlustuse aegumiskuupäevad. Teile tuleb meelde tuletada 1 nädal enne iga uuenduskuupäeva. .',
            VEHICLE_MANUFAC: 'Sõiduki tootja',
            MODEL: 'Mudel',
            ANNUAL_TEST: 'Aastane test',
            TAX_EXPIRY: 'TMaksutähtaeg',
            INS_EXPIRY: 'Kindlustusperiood',

            //Insurance Page
            REGISTRATION_NUMBER: 'Nende registreerimisnumber (või kirjuta jalgrattur / jalakäija)',
            THEIR_NAME: 'Nende nimi',
            THEIR_PHONE: 'Nende telefoninumber',
            THEIR_ADDRESS: 'Nende aadress',
            THEIR_INSURER: 'Nende kindlustusandja',
            DATE: 'Kuupäev',
            TIME: 'Aeg',
            THEIR_VEHICLE_MAKE: 'Nende sõiduk teeb',
            COLOR: 'Värv',
            PASSENGERS: 'Reisijate arv',
            DAMAGE_TO_OTHER: 'Teise sõiduki kahjustus;',
            SEE_OTHER_VEHICLE: 'Kas sa nägid selgelt teisele sõidukile? (kui mitte, siis miks?).',
            OTHER_OBJECT_CALL: 'Kas teine ​​juht keeldus politsei kutsumisest?',
            WHAT_THEY_SAY: 'Mida nad tegelikult ütlesid?',
            WEATHER_LIKE: 'Milline ilm oli?',
            ANYTHING_ELSE: 'Mis muu asjasse pani ?',
            ID_OF_POLICE: 'Politsei ID-numbrid',
            ACCIDENT_REF: 'Politseiõnnetuste viitenumber',
            WITNESS: 'Tunnistajate kontaktid',
            REPEAT: 'Korrake rohkem sõidukeid..',

        });

        $translateProvider.translations('fin', {
            //Report Page Translation

            REPORT: 'raportti',
            YOUR_REG_NUMBER: 'Sinun rekisterinumero',
            DAMAGE_TO_YOUR_VEHICLE: 'Auton vaurioituminen',
            WHAT_HAPPENED: 'Mitä tapahtui?',
            YOUR_EMAIL: 'Sähköpostisi',
            SUBMIT: 'Lähetä',
            OTHERS_INVOLVED: 'Jos muut ovat mukana,',
            INSURANCE: 'vakuutus',
            GOTO: 'Mene',

            //Dashboard Translation
            ABOUT: 'Noin',
            EMERGENCY: 'HÄTÄ,',
            LOCATION: 'Sijainti',
            PHOTOS: 'Valokuvat',
            REMINDERS: 'muistutuksia',
            ASSOCIATES: 'Associates',
            TERMS: 'Ehdot',

            //Location Page

            GET_MYPOS_BTN: 'Merkitse sijaintisi (Hae Oma sijainti)',
            ROAD_NAME: 'Tien nimi',
            TRAVEL_DIRECTION: 'Ajosuunta',
            POSITION: 'asennossa',

            //Reminders Page
            DETAIL: 'Anna ajoneuvosi tiedot ja testitodistuksen, verotuksen ja vakuutuksen viimeiset voimassaolopäivät. Sinua muistutetaan 1 viikko ennen jokaista uusimispäivää..',
            VEHICLE_MANUFAC: 'Ajoneuvon valmistaja',
            MODEL: 'Malli',
            ANNUAL_TEST: 'Vuotuinen testi',
            TAX_EXPIRY: 'Verotuksen päättyminen',
            INS_EXPIRY: 'Vakuutusajan päättyminen',

            //Insurance Page
            REGISTRATION_NUMBER: 'Niiden rekisterinumero (tai kirjoittaa pyöräilijä / jalankulkija)',
            THEIR_NAME: 'Heidän nimensä',
            THEIR_PHONE: 'Heidän puhelinnumeronsar',
            THEIR_ADDRESS: 'Heidän osoitteensa',
            THEIR_INSURER: 'Heidän vakuutuksenantajansa',
            DATE: 'Treffi',
            TIME: 'Aika',
            THEIR_VEHICLE_MAKE: 'Heidän ajoneuvonsa tekevät',
            COLOR: 'Väri',
            PASSENGERS: 'Matkustajien määrä',
            DAMAGE_TO_OTHER: 'Muun ajoneuvon vahingot',
            SEE_OTHER_VEHICLE: 'Näitkö selvästi toisen ajoneuvon? (jos ei, miksi?).',
            OTHER_OBJECT_CALL: 'Oliko toinen kuljettaja vastustaa soittamalla poliisiin?',
            WHAT_THEY_SAY: 'Mitä he todella sanoivat?',
            WEATHER_LIKE: 'Millainen sää oli?',
            ANYTHING_ELSE: 'Mitä muuta tapahtui ?',
            ID_OF_POLICE: 'Poliisin henkilötunnus',
            ACCIDENT_REF: 'Poliisihäiriöiden viitenumero,',
            WITNESS: 'Todistajien yhteystiedot',
            REPEAT: 'Toista, jos mukana on enemmän ajoneuvoja.',

        });

        $translateProvider.translations('gre', {
            //Report Page Translation

            REPORT: 'Κανω ΑΝΑΦΟΡΑ',
            YOUR_REG_NUMBER: 'Ο αριθμός εγγραφής σας',
            DAMAGE_TO_YOUR_VEHICLE: 'Ζημιές στο όχημά σας',
            WHAT_HAPPENED: 'Τι συνέβη',
            YOUR_EMAIL: 'Η διεύθυνση του ηλεκτρονικού σου ταχυδρομείου',
            SUBMIT: 'Υποβάλλουν',
            OTHERS_INVOLVED: 'Εάν εμπλέκονται και άλλοι,',
            INSURANCE: 'ΑΣΦΑΛΙΣΗ',
            GOTO: 'Παω σε',

            //Dashboard Translation
            ABOUT: 'Σχετικά με,',
            EMERGENCY: 'ΕΠΕΙΓΟΝ',
            LOCATION: 'Τοποθεσία',
            PHOTOS: 'Φωτογραφίες',
            REMINDERS: 'Υπενθυμίσεις',
            ASSOCIATES: 'Συνεργάτες',
            TERMS: 'Οροι',

            //Location Page

            GET_MYPOS_BTN: 'Καταγράψτε την τοποθεσία σας (χρησιμοποιήστε τη Λήψη της θέσης μου),',
            ROAD_NAME: 'Όνομα οδού',
            TRAVEL_DIRECTION: 'Κατεύθυνση ταξιδιού',
            POSITION: 'Θέση',

            //Reminders Page
            DETAIL: 'Πληκτρολογήστε τα στοιχεία του οχήματός σας και τις ημερομηνίες λήξης του πιστοποιητικού εξέτασης, του φόρου και της ασφάλισης. Θα σας υπενθυμιστεί μία εβδομάδα πριν από κάθε ημερομηνία ανανέωσης.',
            VEHICLE_MANUFAC: 'Κατασκευαστής οχήματος',
            MODEL: 'Μοντέλο',
            ANNUAL_TEST: 'Ετήσια δοκιμή',
            TAX_EXPIRY: 'Φορολογική Λήξη',
            INS_EXPIRY: 'Ασφάλεια Λήξη',

            //Insurance Page
            REGISTRATION_NUMBER: 'Ο αριθμός εγγραφής (ή ο ποδηλάτης)',
            THEIR_NAME: 'Το ονομα τους',
            THEIR_PHONE: 'Ο αριθμός τηλεφώνου τους',
            THEIR_ADDRESS: 'Η διεύθυνσή τους',
            THEIR_INSURER: 'Ο ασφαλιστής τους',
            DATE: 'Ημερομηνία',
            TIME: 'Χρόνος',
            THEIR_VEHICLE_MAKE: 'Το όχημά τους',
            COLOR: 'Χρώμα',
            PASSENGERS: 'Αριθμός επιβατών',
            DAMAGE_TO_OTHER: 'Ζημιά στο άλλο όχημα',
            SEE_OTHER_VEHICLE: 'Έχετε δει καθαρά το άλλο όχημα; (αν όχι, γιατί;).',
            OTHER_OBJECT_CALL: 'Ο άλλος οδηγός αντιτάχθηκε στην κλήση της ',
            WHAT_THEY_SAY: 'Τι πραγματικά έλεγαν;',
            WEATHER_LIKE: 'Πώς ήταν ο καιρός?',
            ANYTHING_ELSE: 'Οτιδήποτε άλλο συνέβαλε',
            ID_OF_POLICE: 'Οι αριθμοί ταυτότητας της αστυνομίας που παρακολουθούν',
            ACCIDENT_REF: 'Αριθμός αναφοράς αστυνομικού ατυχήματος',
            WITNESS: 'Οι επαφές των μαρτύρων',
            REPEAT: 'Επαναλάβετε εάν εμπλέκονται περισσότερα οχήματα',

        });

        $translateProvider.translations('nor', {
            //Report Page Translation

            REPORT: 'Rapportere',
            YOUR_REG_NUMBER: 'Ditt registreringsnummer',
            DAMAGE_TO_YOUR_VEHICLE: 'Skader på kjøretøyet ditt',
            WHAT_HAPPENED: 'Hva skjedde?',
            YOUR_EMAIL: 'Din epos',
            SUBMIT: 'Sende inn',
            OTHERS_INVOLVED: 'Hvis andre er involvert,',
            INSURANCE: 'Insurance',
            GOTO: 'Gå til',

            //Dashboard Translation
            ABOUT: 'Handle om',
            EMERGENCY: 'NØDSITUASJON',
            LOCATION: 'Plassering',
            PHOTOS: 'påminnelser',
            REMINDERS: 'Reminders',
            ASSOCIATES: 'Associates',
            TERMS: 'vilkår',

            //Location Page

            GET_MYPOS_BTN: 'Ta opp posisjonen din (bruk Få min posisjon)',
            ROAD_NAME: 'Veienavn',
            TRAVEL_DIRECTION: 'Reise retning',
            POSITION: 'Posisjon',

            //Reminders Page
            DETAIL: 'Skriv inn detaljene for kjøretøyet ditt og utløpsdatoen for testbevis, skatt og forsikring. Du blir påminnet 1 uke før hver fornyelsesdato..',
            VEHICLE_MANUFAC: 'Kjøretøy Produsent',
            MODEL: 'Modell',
            ANNUAL_TEST: 'Årlig Test',
            TAX_EXPIRY: 'Skatteutløp',
            INS_EXPIRY: 'Forsikring Utløp',

            //Insurance Page
            REGISTRATION_NUMBER: 'Deres registreringsnummer (eller skrive syklist / fotgjenger))',
            THEIR_NAME: 'Navnet deres',
            THEIR_PHONE: 'Deres telefonnummer',
            THEIR_ADDRESS: 'Deres adresse',
            THEIR_INSURER: 'Deres forsikringsselskap',
            DATE: 'Dato',
            TIME: 'Tid',
            THEIR_VEHICLE_MAKE: 'Deres kjøretøy gjør',
            COLOR: 'Farge',
            PASSENGERS: 'Antall passasjerer',
            DAMAGE_TO_OTHER: 'Skader på det andre kjøretøyet',
            SEE_OTHER_VEHICLE: 'Har du klart sett inn i det andre kjøretøyet? (hvis ikke, hvorfor?)..',
            OTHER_OBJECT_CALL: 'Gjorde den andre driveren motstand for å ringe politiet ?',
            WHAT_THEY_SAY: 'Hva sa de faktisk ?',
            WEATHER_LIKE: 'Hvordan var været?',
            ANYTHING_ELSE: 'Alt annet som bidro ?',
            ID_OF_POLICE: 'ID-nummer for politiet som deltar',
            ACCIDENT_REF: 'Politiulykke referansenummer',
            WITNESS: 'Vitne kontakter',
            REPEAT: 'Gjenta hvis flere biler er involvert.',

        });

        $translateProvider.translations('swe', {
            //Report Page Translation

            REPORT: 'Rapportera',
            YOUR_REG_NUMBER: 'Ditt registreringsnummer',
            DAMAGE_TO_YOUR_VEHICLE: 'Skador på ditt fordon',
            WHAT_HAPPENED: 'Vad hände?',
            YOUR_EMAIL: 'Din email',
            SUBMIT: 'Skicka',
            OTHERS_INVOLVED: 'Om andra är inblandade,',
            INSURANCE: 'försäkring',
            GOTO: 'Gå till',

            //Dashboard Translation
            ABOUT: 'om',
            EMERGENCY: 'EMERGENCY',
            LOCATION: 'Location',
            PHOTOS: 'foton',
            REMINDERS: 'påminnelser',
            ASSOCIATES: 'Associates',
            TERMS: 'Villkor',

            //Location Page

            GET_MYPOS_BTN: 'Spela in din plats (använd Get My Position)',
            ROAD_NAME: 'Vägnamn',
            TRAVEL_DIRECTION: 'Reseriktning',
            POSITION: 'Position',

            //Reminders Page
            DETAIL: 'Ange uppgifter om ditt fordon och utgångsdatum för testbevis, skatt och försäkring. Du kommer bli påminnet 1 vecka före varje förnyelsedatum.',
            VEHICLE_MANUFAC: 'Fordonstillverkare ',
            MODEL: 'Model',
            ANNUAL_TEST: 'Årligt test',
            TAX_EXPIRY: 'Skatteutgång',
            INS_EXPIRY: 'Försäkringens utgång',

            //Insurance Page
            REGISTRATION_NUMBER: 'Deras registreringsnummer (eller skriv cyklist / fotgängare)',
            THEIR_NAME: 'Deras namn',
            THEIR_PHONE: 'Deras telefonnummer',
            THEIR_ADDRESS: 'Deras adress',
            THEIR_INSURER: 'Deras försäkringsgivare',
            DATE: 'Datum',
            TIME: 'tid',
            THEIR_VEHICLE_MAKE: 'Deras fordon gör',
            COLOR: 'färg',
            PASSENGERS: 'Antal passagerare',
            DAMAGE_TO_OTHER: 'Skada på det andra fordonet',
            SEE_OTHER_VEHICLE: 'Visste du tydligt in i det andra fordonet? (om inte, varför?).',
            OTHER_OBJECT_CALL: 'Gjorde den andra enheten ett objekt att ringa polis?',
            WHAT_THEY_SAY: 'Vad sa de faktiskt?',
            WEATHER_LIKE: 'Hur var vädret?',
            ANYTHING_ELSE: 'Något annat som bidragit?',
            ID_OF_POLICE: 'ID-nummer för polis närvaro',
            ACCIDENT_REF: 'Polisolycka referensnummer',
            WITNESS: 'Vittne kontakter',
            REPEAT: 'Upprepa om flera fordon är inblandade',

        });

        $translateProvider.translations('ben', {
            //Report Page Translation
            REPORT: 'প্রতিবেদন',
            YOUR_REG_NUMBER: 'আপনার রেজিস্ট্রেশন নম্বর',
            DAMAGE_TO_YOUR_VEHICLE: 'আপনার গাড়ির ক্ষতি',
            WHAT_HAPPENED: 'কি ঘটেছে?',
            YOUR_EMAIL: 'তোমার ইমেইল',
            SUBMIT: 'জমা দিন',
            OTHERS_INVOLVED: 'যদি অন্যদের জড়িত থাকে',
            INSURANCE: 'বীমা',
            GOTO: 'যাও',

            //Dashboard Translation
            ABOUT: 'সম্বন্ধে',
            EMERGENCY: 'জরুরী',
            LOCATION: 'অবস্থান',
            PHOTOS: 'ফটো',
            REMINDERS: 'অনুস্মারক',
            ASSOCIATES: 'সঙ্ঘ',
            TERMS: 'শর্তাবলী',

            //Location Page

            GET_MYPOS_BTN: 'আপনার অবস্থান রেকর্ড করুন (আমার অবস্থান পান ব্যবহার করুন)',
            ROAD_NAME: 'রোড নাম',
            TRAVEL_DIRECTION: 'ভ্রমণের দিকনির্দেশনা',
            POSITION: 'অবস্থান',

            //Reminders Page
            DETAIL: 'আপনার গাড়ির বিশদ এবং পরীক্ষা শংসাপত্র, ট্যাক্স এবং বীমা সমাপ্তি তারিখ লিখুন। আপনাকে প্রতিটি নবায়ন তারিখের 1 সপ্তাহ আগে স্মরণ করিয়ে দেওয়া হবে.',
            VEHICLE_MANUFAC: 'যানবাহন প্রস্তুতকারক',
            MODEL: 'মডেল',
            ANNUAL_TEST: 'বার্ষিক পরীক্ষা,',
            TAX_EXPIRY: 'ট্যাক্স মেয়াদ',
            INS_EXPIRY: 'বীমা মেয়াদ শেষ',

            //Insurance Page
            REGISTRATION_NUMBER: 'তাদের নিবন্ধন নম্বর (বা সাইক্লিস্ট / পথচারী লিখুন)',
            THEIR_NAME: 'তাদের নাম',
            THEIR_PHONE: 'তাদের ফোন নম্বর',
            THEIR_ADDRESS: 'তাদের ঠিকানা',
            THEIR_INSURER: 'তাদের বীমা',
            DATE: 'তারিখ',
            TIME: 'সময়',
            THEIR_VEHICLE_MAKE: 'তাদের গাড়ির করা',
            COLOR: 'রঙ',
            PASSENGERS: 'যাত্রীদের সংখ্যা',
            DAMAGE_TO_OTHER: 'অন্য গাড়ির ক্ষতি',
            SEE_OTHER_VEHICLE: 'আপনি স্পষ্টভাবে অন্য গাড়ির মধ্যে দেখতে হয়নি? (যদি না, কেন?).',
            OTHER_OBJECT_CALL: 'পুলিশকে কল করার জন্য অন্য ড্রাইভারটি কি কাজ করেছিল? ',
            WHAT_THEY_SAY: 'তারা আসলে কি বলে ?',
            WEATHER_LIKE: 'আবহাওয়া কি ছিল ?',
            ANYTHING_ELSE: 'অন্য কিছু যে অবদান ?',
            ID_OF_POLICE: 'পুলিশ আসার আইডি নম্বর',
            ACCIDENT_REF: 'পুলিশ দুর্ঘটনা রেফারেন্স নম্বর',
            WITNESS: 'সাক্ষী যোগাযোগ',
            REPEAT: 'আরো যানবাহন জড়িত থাকলে পুনরাবৃত্তি করুন।',

        });

        $translateProvider.translations('fil', {
            //Report Page Translation

            REPORT: 'Iulat',
            YOUR_REG_NUMBER: 'Ang iyong numero ng pagpaparehistro',
            DAMAGE_TO_YOUR_VEHICLE: 'Pinsala sa iyong sasakyan',
            WHAT_HAPPENED: 'Anong nangyari?',
            YOUR_EMAIL: 'Ang email mo',
            SUBMIT: 'Ipasa',
            OTHERS_INVOLVED: 'Kung ang iba ay kasangkot,',
            INSURANCE: 'Seguro',
            GOTO: 'Pumunta sa',

            //Dashboard Translation
            ABOUT: 'Tungkol sa  ',
            EMERGENCY: 'EMERGENCY',
            LOCATION: 'Lokasyon',
            PHOTOS: 'Mga larawan',
            REMINDERS: 'Mga Paalala',
            ASSOCIATES: 'Associates',
            TERMS: 'Mga Tuntunin',

            //Location Page

            GET_MYPOS_BTN: 'I-record ang iyong lokasyon (gamitin ang Kumuha ng Aking Posisyon)',
            ROAD_NAME: 'Pangalan ng kalye',
            TRAVEL_DIRECTION: 'Direksyon sa paglalakbay',
            POSITION: 'Posisyon',

            //Reminders Page
            DETAIL: 'Ipasok ang mga detalye ng iyong sasakyan at ang mga petsa ng pag-expire ng sertipiko ng pagsubok, buwis at seguro. Pinaalalahanan ka ng 1 linggo bago ang bawat petsa ng pag-renew.',
            VEHICLE_MANUFAC: 'Tagagawa ng Sasakyan',
            MODEL: 'Modelo',
            ANNUAL_TEST: 'Taunang Pagsubok',
            TAX_EXPIRY: 'Pag-expire ng Buwis',
            INS_EXPIRY: 'pag-expire ng seguro',

            //Insurance Page
            REGISTRATION_NUMBER: 'Ang kanilang numero ng pagpaparehistro (o sumulat ng siklista / pedestrian)',
            THEIR_NAME: 'Pangalan nila',
            THEIR_PHONE: 'Ang kanilang numero ng telepono',
            THEIR_ADDRESS: 'Ang kanilang address',
            THEIR_INSURER: 'Ang kanilang tagatangkilik',
            DATE: 'Petsa',
            TIME: 'Oras',
            THEIR_VEHICLE_MAKE: 'Ang kanilang sasakyan ay gumagawa',
            COLOR: 'Kulay',
            PASSENGERS: 'Bilang ng mga pasahero',
            DAMAGE_TO_OTHER: 'Pinsala sa ibang sasakyan',
            SEE_OTHER_VEHICLE: 'Malinaw na nakikita mo ba ang iba pang sasakyan? (kung hindi, bakit?).',
            OTHER_OBJECT_CALL: 'Nagtalo ba ang iba pang mga drayber sa pagtawag ng pulisya?',
            WHAT_THEY_SAY: 'Ano ang sinabi nila talaga ?',
            WEATHER_LIKE: 'Ano ba ang lagay ng panahon?',
            ANYTHING_ELSE: 'Ano pa ang nag-aambag ?',
            ID_OF_POLICE: 'Mga numero ng ID ng pulis na pumapasok',
            ACCIDENT_REF: 'Numero ng reference ng aksidente sa pulis',
            WITNESS: 'Mga kontak sa Saksi,',
            REPEAT: 'Ulitin kung mas maraming sasakyan ang nasasangkot  ',

        });


        $translateProvider.translations('chi', {
            //Report Page Translation

            REPORT: '报告',
            YOUR_REG_NUMBER: '您的注册号码',
            DAMAGE_TO_YOUR_VEHICLE: '损坏你的车',
            WHAT_HAPPENED: '发生了什么？',
            YOUR_EMAIL: '你的邮件',
            SUBMIT: '提交',
            OTHERS_INVOLVED: '如果涉及其他人',
            INSURANCE: '保险',
            GOTO: '去',

            //Dashboard Translation
            ABOUT: '关于',
            EMERGENCY: '紧急情况下',
            LOCATION: '位置',
            PHOTOS: '相片',
            REMINDERS: '提醒',
            ASSOCIATES: '协会',
            TERMS: '条款',

            //Location Page

            GET_MYPOS_BTN: '记录您的位置（使用获取我的位置）',
            ROAD_NAME: '道路名称',
            TRAVEL_DIRECTION: '旅行方向',
            POSITION: '位置',

            //Reminders Page
            DETAIL: '输入您的车辆的详细信息和测试证书，税费和保险的有效期。您将在每个续约日期前一周提醒您',
            VEHICLE_MANUFAC: '车辆制造商',
            MODEL: '模型',
            ANNUAL_TEST: '年度考试',
            TAX_EXPIRY: '税期满',
            INS_EXPIRY: '保险到期',

            //Insurance Page
            REGISTRATION_NUMBER: '他们的注册号（或写骑自行车者/行人）',
            THEIR_NAME: '他们的名字',
            THEIR_PHONE: '他们的电话号码',
            THEIR_ADDRESS: '他们的地址',
            THEIR_INSURER: 'T他们的保险公司',
            DATE: '日期',
            TIME: '时间',
            THEIR_VEHICLE_MAKE: '他们的车',
            COLOR: '颜色',
            PASSENGERS: '乘客人数',
            DAMAGE_TO_OTHER: '对另一辆车的伤害',
            SEE_OTHER_VEHICLE: '你清楚看到另一辆车吗？ （如果不是，为什么？）.',
            OTHER_OBJECT_CALL: '另一个司机是否反对派警察呢？',
            WHAT_THEY_SAY: '他们实际上说了什么？',
            WEATHER_LIKE: '天气怎么样？',
            ANYTHING_ELSE: '还有哪些贡献？',
            ID_OF_POLICE: '警察身份证号码',
            ACCIDENT_REF: '警察事故参考号码',
            WITNESS: '证人联络人',
            REPEAT: '如果涉及更多的车辆，重复',

        });

        $translateProvider.translations('heb', {
            //Report Page Translation

            REPORT: 'להגיש תלונה',
            YOUR_REG_NUMBER: 'מספר הרישום שלך',
            DAMAGE_TO_YOUR_VEHICLE: 'נזק לרכב שלך',
            WHAT_HAPPENED: 'מה קרה?',
            YOUR_EMAIL: 'האימייל שלך',
            SUBMIT: 'שלח',
            OTHERS_INVOLVED: 'אם אחרים מעורבים',
            INSURANCE: 'ביטוח',
            GOTO: 'לך ל',

            //Dashboard Translation
            ABOUT: 'על אודות',
            EMERGENCY: 'חרום',
            LOCATION: 'מקום',
            PHOTOS: 'תמונות',
            REMINDERS: 'תזכורות ',
            ASSOCIATES: 'שותפים',
            TERMS: 'תנא',

            //Location Page

            GET_MYPOS_BTN: 'רשום את המיקום שלך (השתמש בקבלת המיקום שלי) ',
            ROAD_NAME: 'שם כביש',
            TRAVEL_DIRECTION: 'נסיעה',
            POSITION: 'עמדה',

            //Reminders Page
            DETAIL: 'ghhghhhhhhhhhh',
            VEHICLE_MANUFAC: 'Vehicle Manufacturer',
            MODEL: 'Model',
            ANNUAL_TEST: 'Annual Test',
            TAX_EXPIRY: 'Tax Expiry',
            INS_EXPIRY: 'Insurance Expiry',

            //Insurance Page
            REGISTRATION_NUMBER: 'הזן את פרטי הרכב שלך ואת תאריכי התפוגה של תעודת הבדיקה, מס וביטוח. תזכרו 1 שבוע לפני כל תאריך חידוש',
            THEIR_NAME: 'צרן רכב',
            THEIR_PHONE: 'מבחן שנת',
            THEIR_ADDRESS: 'תוקף מס',
            THEIR_INSURER: '- פקיעת ביטוח',
            DATE: 'תַאֲרִיך',
            TIME: 'זְמַן',
            THEIR_VEHICLE_MAKE: 'הרכב שלהם לעשות',
            COLOR: 'צֶבַע',
            PASSENGERS: 'מספר נוסעים',
            DAMAGE_TO_OTHER: 'נזק לרכב האחר',
            SEE_OTHER_VEHICLE: 'האם ראית בבירור את הרכב השני? (אם לא, למה?).',
            OTHER_OBJECT_CALL: 'האם הנהג האחר מתנגד להתקשר למשטרה?',
            WHAT_THEY_SAY: 'מה הם בעצם אומרים ?',
            WEATHER_LIKE: 'מה היה מזג האוויר ?',
            ANYTHING_ELSE: 'כל דבר אחר שתרם ?',
            ID_OF_POLICE: 'תעודות זהות של שוטרים',
            ACCIDENT_REF: 'מספר תאונה במשטרה',
            WITNESS: 'אנשי קשר,',
            REPEAT: 'חזור אם כלי רכב נוספים מעורבים',

        });

        $translateProvider.translations('hin', {
            //Report Page Translation

            REPORT: 'रिपोर्ट',
            YOUR_REG_NUMBER: 'आपका पंजीकरण नंबर',
            DAMAGE_TO_YOUR_VEHICLE: 'आपके वाहन को नुकसान',
            WHAT_HAPPENED: 'क्या हुआ?',
            YOUR_EMAIL: 'तुम्हारा ईमेल',
            SUBMIT: 'जमा करें',
            OTHERS_INVOLVED: 'यदि अन्य शामिल हैं,',
            INSURANCE: 'बीमा',
            GOTO: 'के लिए जाओ',

            //Dashboard Translation
            ABOUT: 'के बारे में',
            EMERGENCY: 'आपातकालीन',
            LOCATION: 'स्थान',
            PHOTOS: 'तस्वीरें',
            REMINDERS: 'अनुस्मारक',
            ASSOCIATES: 'एसोसिएट्स',
            TERMS: 'शर्तें',

            //Location Page

            GET_MYPOS_BTN: 'अपना स्थान दर्ज करें (मेरी स्थिति प्राप्त करें)',
            ROAD_NAME: 'रोड का नाम',
            TRAVEL_DIRECTION: 'यात्रा दिशा',
            POSITION: 'पद',

            //Reminders Page
            DETAIL: 'अपने वाहन का विवरण और परीक्षण प्रमाणपत्र, कर और बीमा की समाप्ति तिथि दर्ज करें। आपको प्रत्येक नवीनीकरण तिथि के 1 सप्ताह पहले याद दिलाया जाएगा,',
            VEHICLE_MANUFAC: 'वाहन निर्माता',
            MODEL: 'आदर्श',
            ANNUAL_TEST: 'वार्षिक टेस्ट',
            TAX_EXPIRY: 'टैक्स की समाप्ति',
            INS_EXPIRY: 'बीमा समाप्ति',

            //Insurance Page
            REGISTRATION_NUMBER: 'उनका पंजीकरण संख्या (या साइकिल चालक / पैदल यात्री लिखना)',
            THEIR_NAME: 'उनका नाम',
            THEIR_PHONE: 'उनका फोन नंबर',
            THEIR_ADDRESS: 'उनका पता',
            THEIR_INSURER: 'उनका बीमाकर्ता',
            DATE: 'तारीख',
            TIME: 'पहर',
            THEIR_VEHICLE_MAKE: 'उनके वाहन बनाते हैं',
            COLOR: 'रंग',
            PASSENGERS: 'यात्रियों की संख्यां',
            DAMAGE_TO_OTHER: 'दूसरे वाहन को नुकसान',
            SEE_OTHER_VEHICLE: 'क्या आप स्पष्ट रूप से दूसरे वाहन में देखते हैं? (यदि नहीं, तो क्यों?).',
            OTHER_OBJECT_CALL: 'क्या अन्य चालक ने पुलिस को फोन करने के लिए कहा?',
            WHAT_THEY_SAY: 'उन्होंने वास्तव में क्या कहा ?',
            WEATHER_LIKE: 'मौसम कैसा था?',
            ANYTHING_ELSE: 'कुछ और जो योगदान दिया ?',
            ID_OF_POLICE: 'पुलिस की आईडी संख्या में भाग लेना',
            ACCIDENT_REF: 'पुलिस दुर्घटना संदर्भ संख्या',
            WITNESS: 'साक्षी संपर्क',
            REPEAT: 'दोहराएं यदि अधिक वाहन शामिल हैं',

        });

        /*$translateProvider.translations('ind', {
         //Report Page Translation

         REPORT: 'रिपोर्ट',
         YOUR_REG_NUMBER: 'आपका पंजीकरण नंबर',
         DAMAGE_TO_YOUR_VEHICLE: 'आपके वाहन को नुकसान',
         WHAT_HAPPENED: 'क्या हुआ?',
         YOUR_EMAIL: 'तुम्हारा ईमेल',
         SUBMIT: 'जमा करें',
         OTHERS_INVOLVED: 'यदि अन्य शामिल हैं,',
         INSURANCE: 'बीमा',
         GOTO: 'के लिए जाओ,',

         //Dashboard Translation
         ABOUT: 'के बारे में',
         EMERGENCY: 'आपातकालीन',
         LOCATION: 'स्थान',
         PHOTOS: 'तस्वीरें',
         REMINDERS: 'अनुस्मारक',
         ASSOCIATES: 'एसोसिएट्स',
         TERMS: 'शर्तें',

         //Location Page

         GET_MYPOS_BTN: 'अपना स्थान दर्ज करें (मेरी स्थिति प्राप्त करें)',
         ROAD_NAME: 'रोड का नाम,',
         TRAVEL_DIRECTION: 'यात्रा दिशा',
         POSITION: 'पद',

         //Reminders Page
         DETAIL: 'अपने वाहन का विवरण और परीक्षण प्रमाणपत्र, कर और बीमा की समाप्ति तिथि दर्ज करें। आपको प्रत्येक नवीनीकरण तिथि के 1 सप्ताह पहले याद दिलाया जाएगा.',
         VEHICLE_MANUFAC: 'वाहन निर्माता',
         MODEL: 'आदर्श',
         ANNUAL_TEST: 'वार्षिक टेस्ट',
         TAX_EXPIRY: 'टैक्स की समाप्ति',
         INS_EXPIRY: 'बीमा समाप्ति',

         //Insurance Page
         REGISTRATION_NUMBER: 'उनका पंजीकरण संख्या (या साइकिल चालक / पैदल यात्री लिखना)',
         THEIR_NAME: 'उनका नाम',
         THEIR_PHONE: 'उनका फोन नंबर',
         THEIR_ADDRESS: 'उनका पता',
         THEIR_INSURER: 'उनका बीमाकर्ता',
         DATE: 'तारीख',
         TIME: 'पहर',
         THEIR_VEHICLE_MAKE: 'उनके वाहन बनाते हैं',
         COLOR: 'रंग',
         PASSENGERS: 'यात्रियों की संख्यां',
         DAMAGE_TO_OTHER: 'दूसरे वाहन को नुकसान  ',
         SEE_OTHER_VEHICLE: 'क्या आप स्पष्ट रूप से दूसरे वाहन में देखते हैं? (यदि नहीं, तो क्यों?)।.',
         OTHER_OBJECT_CALL: 'क्या अन्य चालक ने पुलिस को फोन करने के लिए कहा?',
         WHAT_THEY_SAY: 'उन्होंने वास्तव में क्या कहा ?',
         WEATHER_LIKE: 'मौसम कैसा था?',
         ANYTHING_ELSE: 'कुछ और जो योगदान दिया ?',
         ID_OF_POLICE: 'पुलिस की आईडी संख्या में भाग लेना',
         ACCIDENT_REF: 'पुलिस दुर्घटना संदर्भ संख्या,',
         WITNESS: 'साक्षी संपर्क',
         REPEAT: 'दोहराएं यदि अधिक वाहन शामिल हैं.',

         });*/

        $translateProvider.translations('jpn', {
            //Report Page Translation

            REPORT: '報告する',
            YOUR_REG_NUMBER: 'あなたの登録番号 ',
            DAMAGE_TO_YOUR_VEHICLE: 'あなたの車の損傷',
            WHAT_HAPPENED: '何が起こった？',
            YOUR_EMAIL: 'あなたの電子メール',
            SUBMIT: '送信',
            OTHERS_INVOLVED: '他の人が関わっている場合',
            INSURANCE: '保険',
            GOTO: 'Go To',

            //Dashboard Translation
            ABOUT: '約',
            EMERGENCY: '緊急',
            LOCATION: 'ロケーション',
            PHOTOS: '写真',
            REMINDERS: 'リマインダー',
            ASSOCIATES: 'アソシエイツ',
            TERMS: '条項',

            //Location Page

            GET_MYPOS_BTN: 'あなたの場所を記録する（自分の位置を取得する',
            ROAD_NAME: '道路名',
            TRAVEL_DIRECTION: '旅行の方向',
            POSITION: 'ポジション',

            //Reminders Page
            DETAIL: 'あなたの車の詳細とテスト証明書、税金と保険の有効期限を入力してください。各更新日の1週間前に通知されます.',
            VEHICLE_MANUFAC: '自動車メーカー',
            MODEL: 'モデル',
            ANNUAL_TEST: '年間テスト',
            TAX_EXPIRY: '税金満了',
            INS_EXPIRY: '保険満了',

            //Insurance Page
            REGISTRATION_NUMBER: '彼らの登録番号（またはサイクリスト/歩行者を書く）',
            THEIR_NAME: '彼らの名前',
            THEIR_PHONE: '彼らの電話番号',
            THEIR_ADDRESS: '彼らの住所',
            THEIR_INSURER: '彼らの保険会社',
            DATE: '日付',
            TIME: '時間',
            THEIR_VEHICLE_MAKE: '彼らの車両は',
            COLOR: '色',
            PASSENGERS: '乗客数',
            DAMAGE_TO_OTHER: '他車両へのダメージ',
            SEE_OTHER_VEHICLE: '他の車両をはっきりと見ましたか？ （もしそうでなければ、なぜ？）.',
            OTHER_OBJECT_CALL: '他の運転手は警察に電話したのですか？',
            WHAT_THEY_SAY: '彼らは実際に何を言ったのですか？',
            WEATHER_LIKE: '天気はどうだった？',
            ANYTHING_ELSE: '貢献したものは何ですか？',
            ID_OF_POLICE: '出席する警察のID番号',
            ACCIDENT_REF: '警察の事故の参照番号',
            WITNESS: '目撃者の連絡先',
            REPEAT: 'より多くの車両が関与している場合は',

        });

        $translateProvider.translations('ind', {
            //Report Page Translation

            REPORT: 'Melaporkan',
            YOUR_REG_NUMBER: 'Nomor registrasi anda',
            DAMAGE_TO_YOUR_VEHICLE: 'Kerusakan pada kendaraan Anda',
            WHAT_HAPPENED: 'Apa yang terjadi?',
            YOUR_EMAIL: 'Email mu',
            SUBMIT: 'Menyerahkan',
            OTHERS_INVOLVED: 'Jika orang lain terlibat',
            INSURANCE: 'Asuransi',
            GOTO: 'Pergi ke',

            //Dashboard Translation
            ABOUT: 'Tentang',
            EMERGENCY: 'KEADAAN DARURAT',
            LOCATION: 'Lokasi',
            PHOTOS: 'Foto',
            REMINDERS: 'Pengingat',
            ASSOCIATES: 'Associates',
            TERMS: 'Syarat',

            //Location Page

            GET_MYPOS_BTN: 'Catat lokasi Anda (gunakan Get My Position) ',
            ROAD_NAME: 'Nama jalan',
            TRAVEL_DIRECTION: 'Arah perjalanan',
            POSITION: 'Posisi',

            //Reminders Page
            DETAIL: 'Masukkan rincian kendaraan Anda dan tanggal kadaluarsa sertifikat uji, pajak dan asuransi. Anda akan diingatkan 1 minggu sebelum setiap tanggal perpanjangan,\n.',
            VEHICLE_MANUFAC: 'Produsen Kendaraan',
            MODEL: 'Model',
            ANNUAL_TEST: 'Uji Tahunan',
            TAX_EXPIRY: 'Taksiran pajak',
            INS_EXPIRY: 'habis masa berlakunya asuransi',

            //Insurance Page
            REGISTRATION_NUMBER: 'Nomor registrasi mereka (atau tulis pengendara sepeda / pejalan kaki) ',
            THEIR_NAME: 'Nama mereka',
            THEIR_PHONE: 'Nomor telepon mereka',
            THEIR_ADDRESS: 'Alamat mereka',
            THEIR_INSURER: 'Perusahaan asuransi mereka',
            DATE: 'Tanggal',
            TIME: 'Waktu',
            THEIR_VEHICLE_MAKE: 'Kendaraan mereka membuat',
            COLOR: 'Warna',
            PASSENGERS: 'Jumlah penumpang',
            DAMAGE_TO_OTHER: 'Kerusakan pada kendaraan lain',
            SEE_OTHER_VEHICLE: 'Apakah Anda melihat dengan jelas ke kendaraan lain? (jika tidak, mengapa?).',
            OTHER_OBJECT_CALL: 'Did the other driver object to calling police?',
            WHAT_THEY_SAY: 'Apakah sopir lain keberatan memanggil polisi?',
            WEATHER_LIKE: 'Apa yang sebenarnya mereka katakan?',
            ANYTHING_ELSE: 'Seperti apa cuacanya ?',
            ID_OF_POLICE: 'Ada lagi yang menyumbang ?',
            ACCIDENT_REF: 'Nomor polisi yang hadir',
            WITNESS: 'Nomor referensi kecelakaan polisi',
            REPEAT: 'Ulangi jika lebih banyak kendaraan yang terlibat',

        });

        $translateProvider.translations('kor', {
            //Report Page Translation

            REPORT: '보고서',
            YOUR_REG_NUMBER: '귀하의 등록 번호',
            DAMAGE_TO_YOUR_VEHICLE: '차량 손상',
            WHAT_HAPPENED: '어떻게 된 거예요?',
            YOUR_EMAIL: '귀하의 이메일',
            SUBMIT: '제출',
            OTHERS_INVOLVED: '다른 사람들이 관련되어 있다면',
            INSURANCE: '보험',
            GOTO: '이동',

            //Dashboard Translation
            ABOUT: '약',
            EMERGENCY: '비상 사태',
            LOCATION: '위치',
            PHOTOS: '사진',
            REMINDERS: '알리미',
            ASSOCIATES: '어소시에이츠',
            TERMS: '자귀',

            //Location Page

            GET_MYPOS_BTN: '내 위치 가져 오기 \'를 사용하여 내 위치 기록\'',
            ROAD_NAME: '도로 이름',
            TRAVEL_DIRECTION: '여행 방향',
            POSITION: '위치',

            //Reminders Page
            DETAIL: '차량의 세부 사항과 시험 인증서, 세금 및 보험의 만료일을 입력하십시오. 각 갱신 날짜 1 주 전에 알림을 받게되며,.',
            VEHICLE_MANUFAC: '차량 제조업체',
            MODEL: '모델',
            ANNUAL_TEST: '연간 시험',
            TAX_EXPIRY: '세금 만료',
            INS_EXPIRY: '보험 만료',

            //Insurance Page
            REGISTRATION_NUMBER: '\n' +
            '그들의 등록 번호 (또는 쓰기 사이클리스트 / 보행자) ',
            THEIR_NAME: '그들의 이름',
            THEIR_PHONE: '그들의 전화 번호',
            THEIR_ADDRESS: '그들의 주소',
            THEIR_INSURER: '그들의 보험 회사',
            DATE: '날짜',
            TIME: '시각',
            THEIR_VEHICLE_MAKE: '그들의 차량은',
            COLOR: '색깔',
            PASSENGERS: '승객 수',
            DAMAGE_TO_OTHER: '다른 차량의 손상',
            SEE_OTHER_VEHICLE: '다른 차량을 분명히 보았 니? (그렇지 않다면, 왜?)).',
            OTHER_OBJECT_CALL: '다른 운전자가 경찰을 부르는 것에 반대 했습니까?',
            WHAT_THEY_SAY: '그들은 실제로 뭐라고 말 했나요?',
            WEATHER_LIKE: '날씨는 어땠어?',
            ANYTHING_ELSE: '기여한 다른 건?',
            ID_OF_POLICE: '참석하는 경찰의 ID 번호',
            ACCIDENT_REF: '경찰 사고 번호',
            WITNESS: '목격자 연락처',
            REPEAT: '더 많은 차량이 관련되면 반복합니다',

        });

        $translateProvider.translations('swa', {
            //Report Page Translation

            REPORT: 'Ripoti',
            YOUR_REG_NUMBER: 'Nambari yako ya usajili',
            DAMAGE_TO_YOUR_VEHICLE: 'Uharibifu wa gari lako',
            WHAT_HAPPENED: 'Nini kimetokea?',
            YOUR_EMAIL: 'Barua pepe yako',
            SUBMIT: 'Wasilisha',
            OTHERS_INVOLVED: 'Ikiwa wengine wanahusika',
            INSURANCE: 'Bima',
            GOTO: 'Enda kwa',

            //Dashboard Translation
            ABOUT: 'Kuhusu',
            EMERGENCY: 'UFUMU',
            LOCATION: 'Eneo',
            PHOTOS: 'Picha',
            REMINDERS: 'Wakumbusho',
            ASSOCIATES: 'Washirika',
            TERMS: 'Masharti',

            //Location Page

            GET_MYPOS_BTN: 'Andika eneo lako (tumia Position Yangu)',
            ROAD_NAME: 'Jina la barabara,',
            TRAVEL_DIRECTION: 'Mwelekeo wa kusafiri',
            POSITION: 'Nafasi',

            //Reminders Page
            DETAIL: 'ngiza maelezo ya gari lako na tarehe za kumalizia hati ya mtihani, kodi na bima. Utakumbuka wiki 1 kabla ya kila tarehe ya upya',
            VEHICLE_MANUFAC: 'Mtengenezaji wa Magari',
            MODEL: 'Mfano',
            ANNUAL_TEST: 'Mtihani wa Mwaka',
            TAX_EXPIRY: 'Utoaji wa Kodi',
            INS_EXPIRY: 'mwisho wa bima',

            //Insurance Page
            REGISTRATION_NUMBER: 'Nambari yao ya usajili (au kuandika baiskeli / wahamiaji)',
            THEIR_NAME: 'Jina lao',
            THEIR_PHONE: 'Namba yao ya simu',
            THEIR_ADDRESS: 'Anwani yao',
            THEIR_INSURER: 'Bima yao',
            DATE: 'Tarehe',
            TIME: 'Muda',
            THEIR_VEHICLE_MAKE: 'Gari yao hufanya',
            COLOR: 'Rangi',
            PASSENGERS: 'Idadi ya abiria',
            DAMAGE_TO_OTHER: 'Uharibifu wa gari lingine',
            SEE_OTHER_VEHICLE: 'Je! Umeona wazi kwenye gari lingine? (ikiwa sio, kwa nini?).',
            OTHER_OBJECT_CALL: 'Je, dereva mwingine alikataa kupigia polisi',
            WHAT_THEY_SAY: 'Walisema nini ?',
            WEATHER_LIKE: 'Hali ya hewa ilikuwa kama nini ?',
            ANYTHING_ELSE: 'Kitu kingine kilichochangia ?',
            ID_OF_POLICE: 'Nambari za ID ya polisi kuhudhuria',
            ACCIDENT_REF: 'Nambari ya kumbukumbu ya ajali ya polisi',
            WITNESS: 'Mashahidi wa mawasiliano',
            REPEAT: 'Rudia kama magari zaidi yanahusika.',

        });

        $translateProvider.translations('lav', {
            //Report Page Translation

            REPORT: 'Ziņojums',
            YOUR_REG_NUMBER: 'Jūsu reģistrācijas numurs',
            DAMAGE_TO_YOUR_VEHICLE: 'Jūsu automašīnas bojājums',
            WHAT_HAPPENED: 'Kas notika?',
            YOUR_EMAIL: 'Tavs e-pasts',
            SUBMIT: 'Iesniegt',
            OTHERS_INVOLVED: 'Ja citi ir iesaistīti,',
            INSURANCE: 'Apdrošināšana,',
            GOTO: 'Iet uz',

            //Dashboard Translation
            ABOUT: 'Par',
            EMERGENCY: 'ĀRKĀRTAS',
            LOCATION: 'Atrašanās vieta',
            PHOTOS: 'Fotogrāfijas',
            REMINDERS: 'Atgādinājumi',
            ASSOCIATES: 'Associates',
            TERMS: 'Noteikumi',

            //Location Page

            GET_MYPOS_BTN: 'Ierakstiet savu atrašanās vietu (izmantojiet Get My Position)',
            ROAD_NAME: 'Ceļa nosaukums',
            TRAVEL_DIRECTION: 'Ceļojuma virziens',
            POSITION: 'Amats',

            //Reminders Page
            DETAIL: 'Ievadiet transportlīdzekļa datus un pārbaudes sertifikāta, nodokļa un apdrošināšanas derīguma termiņus. Jums tiks atgādināts 1 nedēļu pirms katra atjaunošanas datuma',
            VEHICLE_MANUFAC: 'Transportlīdzekļa ražotājs',
            MODEL: 'Modelis',
            ANNUAL_TEST: 'Gada pārbaudījums',
            TAX_EXPIRY: 'Nodokļu termiņš',
            INS_EXPIRY: 'apdrošināšanas beigu termiņš',

            //Insurance Page
            REGISTRATION_NUMBER: 'Viņu reģistrācijas numurs (vai rakstīt riteņbraucēju / gājēju)',
            THEIR_NAME: 'Viņu vārds',
            THEIR_PHONE: 'Viņu tālruņa numurs',
            THEIR_ADDRESS: 'Viņu adrese',
            THEIR_INSURER: 'Viņu apdrošinātājs',
            DATE: 'Datums',
            TIME: 'Laiks',
            THEIR_VEHICLE_MAKE: 'Viņu transportlīdzeklis izgatavo',
            COLOR: 'Krāsa',
            PASSENGERS: 'Pasažieru skaits',
            DAMAGE_TO_OTHER: 'Cits transportlīdzekļa bojājums',
            SEE_OTHER_VEHICLE: 'Vai jūs skaidri redzat otru transportlīdzekli? (ja nē, kāpēc?).',
            OTHER_OBJECT_CALL: 'Vai cits vadītājs iebilst pret policijas izsaukšanu?',
            WHAT_THEY_SAY: 'Ko viņi patiesībā saka?',
            WEATHER_LIKE: 'Kāds bija laika apstākļi ?',
            ANYTHING_ELSE: 'Vai kaut kas cits, kas veicināja ?',
            ID_OF_POLICE: 'Policijas personu identifikācijas numuri',
            ACCIDENT_REF: 'Policijas nelaimes gadījumu atsauces numurs',
            WITNESS: 'Liecinieku kontakti',
            REPEAT: 'Atkārtojiet, ja ir iesaistīti vairāk transportlīdzekļu',

        });

        $translateProvider.translations('ara', {
            //Report Page Translation

            REPORT: 'أبلغ عن',
            YOUR_REG_NUMBER: 'رقم التسجيل الخاص بك',
            DAMAGE_TO_YOUR_VEHICLE: 'الأضرار التي لحقت سيارتك',
            WHAT_HAPPENED: 'ماذا حدث؟',
            YOUR_EMAIL: 'بريدك الالكتروني',
            SUBMIT: 'عرض',
            OTHERS_INVOLVED: 'إذا كان الآخرون متورطين،',
            INSURANCE: 'تأمين،',
            GOTO: 'اذهب إلى،',

            //Dashboard Translation
            ABOUT: 'حول،',
            EMERGENCY: 'حالة طوارئ،',
            LOCATION: 'موقعك،',
            PHOTOS: 'الصور،',
            REMINDERS: 'تذكير،',
            ASSOCIATES: 'المرتبطين،',
            TERMS: 'شروط',

            //Location Page

            GET_MYPOS_BTN: 'تسجيل موقعك (استخدام الحصول على موقعي) ',
            ROAD_NAME: 'اسم الطريق،',
            TRAVEL_DIRECTION: 'السفر الاتجاه،',
            POSITION: 'موضع،',

            //Reminders Page
            DETAIL: 'أدخل تفاصيل سيارتك وتاريخ انتهاء صلاحية شهادة الاختبار والضرائب والتأمين. سيتم تذكيرك قبل أسبوع من تاريخ التجديد.',
            VEHICLE_MANUFAC: 'الشركة المصنعة للسيارات،',
            MODEL: 'نموذج،',
            ANNUAL_TEST: 'الاختبار السنوي،',
            TAX_EXPIRY: 'انتهاء صلاحية الضرائب،',
            INS_EXPIRY: 'التأمين انتهاء،',

            //Insurance Page
            REGISTRATION_NUMBER: 'رقم تسجيلهم (أو كتابة الدراج / المشاة)',
            THEIR_NAME: 'أسماؤهم،',
            THEIR_PHONE: 'رقم هاتفهم،',
            THEIR_ADDRESS: 'إن عنوانهم،',
            THEIR_INSURER: 'شركة التأمين،',
            DATE: 'تاريخ',
            TIME: 'زمن،',
            THEIR_VEHICLE_MAKE: 'جعلت سيارتهم،',
            COLOR: 'اللون،',
            PASSENGERS: 'عدد الركاب،',
            DAMAGE_TO_OTHER: 'الأضرار التي لحقت السيارة الأخرى،',
            SEE_OTHER_VEHICLE: 'هل رأيت بوضوح في السيارة الأخرى؟ (إن لم يكن، لماذا؟)',
            OTHER_OBJECT_CALL: 'هل اعترض السائق الآخر على استدعاء الشرطة؟ ',
            WHAT_THEY_SAY: 'ماذا قالوا فعلا ؟',
            WEATHER_LIKE: 'كيف كان الجو؟',
            ANYTHING_ELSE: 'أي شيء آخر ساهم ؟',
            ID_OF_POLICE: 'أرقام الهوية من حضور الشرطة،',
            ACCIDENT_REF: 'الشرطة إشارة رقم الحادث،',
            WITNESS: 'اتصالات الشهود،',
            REPEAT: 'كرر إذا كان هناك المزيد من المركبات المعنية،',

        });

        $translateProvider.translations('afr', {
            //Report Page Translation

            REPORT: 'Verslag',
            YOUR_REG_NUMBER: 'Jou registrasienommer',
            DAMAGE_TO_YOUR_VEHICLE: 'Skade aan u voertuig',
            WHAT_HAPPENED: 'Wat het gebeur?',
            YOUR_EMAIL: 'Jou epos,',
            SUBMIT: 'Indien',
            OTHERS_INVOLVED: 'As ander betrokke is',
            INSURANCE: 'versekering',
            GOTO: 'Gaan na',

            //Dashboard Translation
            ABOUT: 'oor',
            EMERGENCY: 'NOOD',
            LOCATION: 'plek',
            PHOTOS: 'foto',
            REMINDERS: 'aanmanings',
            ASSOCIATES: 'Associates',
            TERMS: 'terme',

            //Location Page
            GET_MYPOS_BTN: 'Teken jou ligging op (gebruik Get My Position)',
            ROAD_NAME: 'Padnaam',
            TRAVEL_DIRECTION: 'Reisrigting',
            POSITION: 'posisie',

            //Reminders Page
            DETAIL: 'Vul die besonderhede van u voertuig in en die vervaldatums van toetssertifikaat, belasting en versekering. U sal 1 week voor elke hernuwingsdatum herinner word.',
            VEHICLE_MANUFAC: 'Voertuig Vervaardiger',
            MODEL: 'model',
            ANNUAL_TEST: 'Jaarlikse toets',
            TAX_EXPIRY: 'Belastinguitgawe',
            INS_EXPIRY: 'Versekering Vervaldatum',

            //Insurance Page
            REGISTRATION_NUMBER: 'Hul registrasienommer (of skryf fietsryer / voetganger)',
            THEIR_NAME: 'Hulle naam',
            THEIR_PHONE: 'Hul telefoonnommer',
            THEIR_ADDRESS: 'Hul adres',
            THEIR_INSURER: 'Hul versekeraar',
            DATE: 'datum',
            TIME: 'tyd',
            THEIR_VEHICLE_MAKE: 'Hul voertuig maak',
            COLOR: 'Kleur',
            PASSENGERS: 'Aantal passasiers,',
            DAMAGE_TO_OTHER: 'Skade aan die ander voertuig',
            SEE_OTHER_VEHICLE: 'Het jy die ander voertuig duidelik gesien? (indien nie, hoekom?).',
            OTHER_OBJECT_CALL: 'Het die ander bestuurder beswaar teen die polisie gebel?',
            WHAT_THEY_SAY: 'Wat het hulle eintlik gesê ?',
            WEATHER_LIKE: 'Hoe was die weer?',
            ANYTHING_ELSE: 'Enigiets anders wat bygedra het ?',
            ID_OF_POLICE: 'ID-nommers van die polisie wat bywoon',
            ACCIDENT_REF: 'Polisie ongeluk verwysingsnommer',
            WITNESS: 'Getuie kontakte',
            REPEAT: 'Herhaal indien meer voertuie betrokke is',
        });

        $translateProvider.translations('vie', {
            //Report Page Translation

            REPORT: 'Bài báo cáo',
            YOUR_REG_NUMBER: 'Số đăng ký của bạn',
            DAMAGE_TO_YOUR_VEHICLE: 'Thiệt hại cho chiếc xe của bạn',
            WHAT_HAPPENED: 'Chuyện gì đã xảy ra?',
            YOUR_EMAIL: 'Email của bạn',
            SUBMIT: 'Đệ trình',
            OTHERS_INVOLVED: 'Nếu có người khác tham gia',
            INSURANCE: 'Bảo hiểm',
            GOTO: 'Đi đến',

            //Dashboard Translation
            ABOUT: 'Trong khoảng',
            EMERGENCY: 'TRƯỜNG HỢP KHẨN CẤP',
            LOCATION: 'Vị trí',
            PHOTOS: 'Hình ảnh',
            REMINDERS: 'Nhắc nhở',
            ASSOCIATES: 'Liên kết',
            TERMS: 'Điều kiện',

            //Location Page
            GET_MYPOS_BTN: 'Ghi lại vị trí của bạn (sử dụng Vị trí của tôi) ',
            ROAD_NAME: 'Tên đường',
            TRAVEL_DIRECTION: 'Hướng đi',
            POSITION: 'Chức vụ',

            //Reminders Page
            DETAIL: 'Nhập chi tiết về chiếc xe của bạn và ngày hết hạn của giấy chứng nhận kiểm tra, thuế và bảo hiểm. Bạn sẽ được nhắc nhở 1 tuần trước mỗi ngày gia hạn.',
            VEHICLE_MANUFAC: 'Nhà sản xuất xe',
            MODEL: 'Mô hình',
            ANNUAL_TEST: 'Kiểm tra hàng năm',
            TAX_EXPIRY: 'Hết hạn thuế',
            INS_EXPIRY: 'Hết hạn bảo hiểm',

            //Insurance Page
            REGISTRATION_NUMBER: 'Số đăng ký của họ (hoặc viết người đi xe đạp / người đi bộ)',
            THEIR_NAME: 'Tên của họ',
            THEIR_PHONE: 'Số điện thoại của họ',
            THEIR_ADDRESS: 'Địa chỉ của họ',
            THEIR_INSURER: 'Công ty bảo hiểm của họ',
            DATE: 'Ngày',
            TIME: 'Thời gian',
            THEIR_VEHICLE_MAKE: 'Xe của họ làm',
            COLOR: 'Màu',
            PASSENGERS: 'Số lượng hành khách',
            DAMAGE_TO_OTHER: 'Thiệt hại cho chiếc xe khác',
            SEE_OTHER_VEHICLE: 'Bạn có nhìn thấy rõ ràng vào chiếc xe khác? (nếu không, tại sao?). ',
            OTHER_OBJECT_CALL: 'Người lái xe kia có phản đối gọi cảnh sát không?',
            WHAT_THEY_SAY: 'Họ thực sự nói gì ?',
            WEATHER_LIKE: 'Thời tiết đa như thế nào?',
            ANYTHING_ELSE: 'Mọi thứ khác đóng góp ?,',
            ID_OF_POLICE: 'Số ID của cảnh sát tham dự',
            ACCIDENT_REF: 'Số tham chiếu tai nạn của cảnh sát',
            WITNESS: 'Nhân chứng liên lạc',
            REPEAT: 'Lặp lại nếu có nhiều xe hơn',
        });

        $translateProvider.translations('urd', {
            //Report Page Translation

            REPORT: 'رپورٹ',
            YOUR_REG_NUMBER: 'آپ کا رجسٹریشن نمبر',
            DAMAGE_TO_YOUR_VEHICLE: 'آپ کی گاڑی کی نقصان',
            WHAT_HAPPENED: 'کیا ہوا؟',
            YOUR_EMAIL: 'آپ کا ای میل',
            SUBMIT: 'جمع',
            OTHERS_INVOLVED: 'اگر دوسروں میں ملوث ہیں',
            INSURANCE: 'انشورنس',
            GOTO: 'کے پاس جاؤ',

            //Dashboard Translation
            ABOUT: 'کے بارے میں',
            EMERGENCY: 'ایمرجنسی',
            LOCATION: 'مقام',
            PHOTOS: 'فوٹو',
            REMINDERS: 'یاد دہانیوں',
            ASSOCIATES: 'ایسوسی ایٹس',
            TERMS: 'شرائط',

            //Location Page
            GET_MYPOS_BTN: 'اپنے مقام کو ریکارڈ کریں (میرا اپنا مقام حاصل کریں استعمال کریں)',
            ROAD_NAME: 'روڈ کا نام',
            TRAVEL_DIRECTION: 'سفر کی سمت',
            POSITION: 'مقام',

            //Reminders Page
            DETAIL: 'اپنی گاڑی کی تفصیلات درج کریں اور ٹیسٹ سرٹیفکیٹ، ٹیکس اور انشورنس کی اختتامی تاریخوں میں درج کریں. آپ کو ہر تجدید کی تاریخ کے 1 ہفتہ پہلے یاد رکھا جائے گا',
            VEHICLE_MANUFAC: 'گاڑی کے ڈویلپر',
            MODEL: 'ماڈل',
            ANNUAL_TEST: 'سالانہ ٹیسٹ',
            TAX_EXPIRY: 'ٹیکس ختم ہونے',
            INS_EXPIRY: 'انشورنس ختم ہونے',

            //Insurance Page
            REGISTRATION_NUMBER: 'ان کے رجسٹریشن نمبر (یا سائیکل سائیکل / پیڈسٹریٹر لکھیں)',
            THEIR_NAME: 'انکے نام',
            THEIR_PHONE: 'ان کے فون نمبر',
            THEIR_ADDRESS: 'ان کا پتہ',
            THEIR_INSURER: 'ان کے انشورنس',
            DATE: 'تاریخ',
            TIME: 'وقت',
            THEIR_VEHICLE_MAKE: 'ان کی گاڑی',
            COLOR: 'رنگ',
            PASSENGERS: 'مسافروں کی تعداد',
            DAMAGE_TO_OTHER: 'دوسری گاڑی کو نقصان پہنچا',
            SEE_OTHER_VEHICLE: 'کیا تم نے دوسری گاڑی میں واضح طور پر دیکھا؟ (اگر نہیں، کیوں؟).',
            OTHER_OBJECT_CALL: 'کیا دوسرے ڈرائیور نے پولیس کو بلا کر اعتراض کیا؟',
            WHAT_THEY_SAY: 'وہ اصل میں کیا کہتے تھے؟',
            WEATHER_LIKE: 'موسم کیسا تھا؟',
            ANYTHING_ELSE: 'کچھ اور جس نے حصہ لیا؟',
            ID_OF_POLICE: 'پولیس میں شرکت کرنے والی شناختی نمبر',
            ACCIDENT_REF: 'پولیس حادثے کا حوالہ نمبر',
            WITNESS: 'گواہ رابطے',
            REPEAT: 'مزید گاڑیوں میں ملوث ہوتے ہیں تو پھر دوبارہ کریں',
        });

        $translateProvider.translations('tha', {
            //Report Page Translation

            REPORT: 'รายงาน',
            YOUR_REG_NUMBER: 'หมายเลขทะเบียนของคุณ',
            DAMAGE_TO_YOUR_VEHICLE: 'ความเสียหายต่อรถของคุณ',
            WHAT_HAPPENED: 'เกิดอะไรขึ้น?',
            YOUR_EMAIL: 'อีเมลของคุณ',
            SUBMIT: 'ส่ง',
            OTHERS_INVOLVED: 'ถ้าคนอื่นมีส่วนเกี่ยวข้อง',
            INSURANCE: 'ประกันภัย',
            GOTO: 'ไปที่',

            //Dashboard Translation
            ABOUT: 'เกี่ยวกับ',
            EMERGENCY: 'ฉุกเฉิน',
            LOCATION: 'สถานที่ตั้ง',
            PHOTOS: 'ภาพถ่าย',
            REMINDERS: 'การแจ้งเตือน',
            ASSOCIATES: 'ร่วม',
            TERMS: 'ข้อกำหนด',

            //Location Page
            GET_MYPOS_BTN: 'บันทึกตำแหน่งของคุณ (ใช้) ',
            ROAD_NAME: 'ชื่อถนน',
            TRAVEL_DIRECTION: 'ทิศทางการเดินทาง',
            POSITION: 'ตำแหน่ง',

            //Reminders Page
            DETAIL: 'ใส่รายละเอียดของยานพาหนะของคุณและวันหมดอายุของใบรับรองการทดสอบภาษีและการประกัน คุณจะได้รับการเตือนล่วงหน้า 1 สัปดาห์ก่อนวันที่ต่ออายุ ',
            VEHICLE_MANUFAC: 'ผู้ผลิตยานยนต์',
            MODEL: 'รุ่น',
            ANNUAL_TEST: 'การทดสอบประจำปี',
            TAX_EXPIRY: 'หมดอายุภาษี',
            INS_EXPIRY: 'ประกันหมดอายุ',

            //Insurance Page
            REGISTRATION_NUMBER: 'หมายเลขทะเบียนของพวกเขา (หรือเขียนปั่นจักรยาน / คนเดินเท้า)',
            THEIR_NAME: 'ชื่อของพวกเขา',
            THEIR_PHONE: 'หมายเลขโทรศัพท์ของพวกเขา',
            THEIR_ADDRESS: 'ที่อยู่',
            THEIR_INSURER: 'บริษัท ประกันภัยของพวกเขา',
            DATE: 'วัน',
            TIME: 'เวลา',
            THEIR_VEHICLE_MAKE: 'รถของพวกเขาทำให้,',
            COLOR: 'สี',
            PASSENGERS: 'จำนวนผู้โดยสาร',
            DAMAGE_TO_OTHER: 'ความเสียหายต่อรถคันอื่น',
            SEE_OTHER_VEHICLE: 'คุณเห็นอย่างชัดเจนในรถคันอื่นหรือไม่? (ถ้าไม่, ทำไม?)',
            OTHER_OBJECT_CALL: 'คนขับรถคนอื่น ๆ เรียกร้องให้ตำรวจหรือไม่? ',
            WHAT_THEY_SAY: 'พวกเขาพูดอะไรจริงๆ?',
            WEATHER_LIKE: 'อากาศตอนนั้นเป็นไง?',
            ANYTHING_ELSE: 'อะไรอื่นที่สนับสนุน ?',
            ID_OF_POLICE: 'หมายเลขบัตรประจำตัวตำรวจ',
            ACCIDENT_REF: 'หมายเลขอ้างอิงอุบัติเหตุตำรวจ',
            WITNESS: 'พยานที่ติดต่อ',
            REPEAT: 'ทำซ้ำถ้ายานพาหนะมีส่วนร่วมมากขึ้น',
        });

        $translateProvider.translations('slv', {
            //Report Page Translation

            REPORT: 'Poročilo',
            YOUR_REG_NUMBER: 'Vaša registracijska številka',
            DAMAGE_TO_YOUR_VEHICLE: 'Poškodbe vašega vozila',
            WHAT_HAPPENED: 'Kaj se je zgodilo?',
            YOUR_EMAIL: 'Vaš e-poštni naslov',
            SUBMIT: 'Pošlji',
            OTHERS_INVOLVED: 'Če so vpleteni drugi',
            INSURANCE: 'Zavarovanje',
            GOTO: 'Pojdi do',

            //Dashboard Translation
            ABOUT: 'O',
            EMERGENCY: 'V SILI',
            LOCATION: 'Lokacija',
            PHOTOS: 'Fotografije',
            REMINDERS: 'Opomniki',
            ASSOCIATES: 'Associates',
            TERMS: 'Pogoji',

            //Location Page
            GET_MYPOS_BTN: 'Zapišite svojo lokacijo (uporabite Get My Position)',
            ROAD_NAME: 'Ime ceste',
            TRAVEL_DIRECTION: 'Smer vožnje',
            POSITION: 'Položaj',

            //Reminders Page
            DETAIL: 'Vnesite podatke o vašem vozilu in datume poteka potrdila o preskusu, davka in zavarovanja. Opozorili vas bomo 1 teden pred vsakim podaljšanjem.',
            VEHICLE_MANUFAC: 'Proizvajalec vozil',
            MODEL: 'Model',
            ANNUAL_TEST: 'Letni preizkus',
            TAX_EXPIRY: 'Izterjava davkov',
            INS_EXPIRY: 'Zavarovalni iztek',

            //Insurance Page
            REGISTRATION_NUMBER: 'Njihova registrska številka (ali pisanje kolesarjev / pešcev)',
            THEIR_NAME: 'Njihovo ime',
            THEIR_PHONE: 'Njihova telefonska številka',
            THEIR_ADDRESS: 'Njihov naslov',
            THEIR_INSURER: 'Njihova zavarovalnica',
            DATE: 'Datum',
            TIME: 'Čas',
            THEIR_VEHICLE_MAKE: 'Njihovo vozilo naredi',
            COLOR: 'Barva',
            PASSENGERS: 'Število potnikov',
            DAMAGE_TO_OTHER: 'Poškodbe drugim vozilom',
            SEE_OTHER_VEHICLE: 'Ali ste jasno videli drugo vozilo? (če ne, zakaj?).',
            OTHER_OBJECT_CALL: 'Ali je drugi voznik nasprotoval pozivu policije?',
            WHAT_THEY_SAY: 'Kaj so dejansko rekli ?',
            WEATHER_LIKE: 'Kakšno je bilo vreme?',
            ANYTHING_ELSE: 'Je kaj drugega, ki je prispevalo ?',
            ID_OF_POLICE: 'Identifikacijske številke policije',
            ACCIDENT_REF: 'Referenčna številka policijske nesreče',
            WITNESS: 'Stiki prič',
            REPEAT: 'Ponovite, če gre za več vozil',
        });

        $translateProvider.translations('slk', {
            //Report Page Translation

            REPORT: 'Správa',
            YOUR_REG_NUMBER: 'Vaše registračné číslo',
            DAMAGE_TO_YOUR_VEHICLE: 'Poškodenie vášho vozidla',
            WHAT_HAPPENED: 'Čo sa stalo?',
            YOUR_EMAIL: 'Tvoj email,',
            SUBMIT: 'Predložiť',
            OTHERS_INVOLVED: 'Ak sú iné',
            INSURANCE: 'poistenie',
            GOTO: 'Ísť do',

            //Dashboard Translation
            ABOUT: 'o',
            EMERGENCY: 'núdzový',
            LOCATION: 'miesto',
            PHOTOS: 'fotky',
            REMINDERS: 'upomienky',
            ASSOCIATES: 'Associates',
            TERMS: 'Podmienky',

            //Location Page
            GET_MYPOS_BTN: 'Zaznamenajte svoju polohu (použite funkciu Získať svoju pozíciu)',
            ROAD_NAME: 'Názov cesty',
            TRAVEL_DIRECTION: 'Smer jazdy',
            POSITION: 'poloha',

            //Reminders Page
            DETAIL: 'Zadajte podrobnosti o vašom vozidle a dátumy skončenia platnosti osvedčenia o skúške, dane a poistení. Bude vám pripomenutý 1 týždeň pred každým dátumom obnovenia.',
            VEHICLE_MANUFAC: 'Výrobca vozidla',
            MODEL: 'Model',
            ANNUAL_TEST: 'Ročný test',
            TAX_EXPIRY: 'Daňové uplynutie platnosti',
            INS_EXPIRY: 'Vypršanie poistenia',

            //Insurance Page
            REGISTRATION_NUMBER: 'Ich registračné číslo (alebo písať cyklistu / chodca)',
            THEIR_NAME: 'Ich meno',
            THEIR_PHONE: 'Ich telefónne číslo',
            THEIR_ADDRESS: 'Ich adresa',
            THEIR_INSURER: 'Ich poisťovateľ',
            DATE: 'dátum',
            TIME: 'doba',
            THEIR_VEHICLE_MAKE: 'Ich vozidlo vyrába',
            COLOR: 'farba',
            PASSENGERS: 'Počet cestujúcich',
            DAMAGE_TO_OTHER: 'Poškodenie druhého vozidla',
            SEE_OTHER_VEHICLE: 'Zreteľne ste sa videli na druhom vozidle? (ak nie, prečo?). ',
            OTHER_OBJECT_CALL: 'Vzal druhý vodič protest proti polícii? ',
            WHAT_THEY_SAY: 'Čo vlastne povedali ?',
            WEATHER_LIKE: 'Aké bolo počasie?',
            ANYTHING_ELSE: 'Čokoľvek, čo prispelo ?',
            ID_OF_POLICE: 'Identifikačné čísla príslušníkov polície',
            ACCIDENT_REF: 'Referenčné číslo policajného úrazu',
            WITNESS: 'Kontakty svedkov',
            REPEAT: 'Opakujte, ak sú zapojené viac vozidiel',
        });

        $translateProvider.translations('srp', {
            //Report Page Translation

            REPORT: 'Извештај',
            YOUR_REG_NUMBER: 'Ваш регистарски број',
            DAMAGE_TO_YOUR_VEHICLE: 'Оштећење вашег возила',
            WHAT_HAPPENED: 'Шта се десило?',
            YOUR_EMAIL: 'Ваш е-маил',
            SUBMIT: 'Прихвати',
            OTHERS_INVOLVED: 'Ако су други укључени',
            INSURANCE: 'Осигурање',
            GOTO: 'Иди на',

            //Dashboard Translation
            ABOUT: 'О томе',
            EMERGENCY: 'ХИТАН',
            LOCATION: 'Локација',
            PHOTOS: 'Фотографије',
            REMINDERS: 'Подсетници',
            ASSOCIATES: 'Ассоциатес',
            TERMS: 'Услови',

            //Location Page
            GET_MYPOS_BTN: 'Снимите своју локацију (користите Гет Ми Поситион) ',
            ROAD_NAME: 'Назив пута,',
            TRAVEL_DIRECTION: 'Путни правац',
            POSITION: 'Позиција',

            //Reminders Page
            DETAIL: 'Унесите податке о вашем возилу и датуме истека сертификата о тестирању, порезу и осигурању. Биће вас подсетили 1 недељу пре сваког датума обнове. ',
            VEHICLE_MANUFAC: 'Произвођач возила',
            MODEL: 'Модел',
            ANNUAL_TEST: 'Годишњи тест',
            TAX_EXPIRY: 'Порезна дозвола',
            INS_EXPIRY: 'Инсуранце Екпири',

            //Insurance Page
            REGISTRATION_NUMBER: 'Њихов регистарски број (или написати бицикл / пешак) ',
            THEIR_NAME: 'Њихово име',
            THEIR_PHONE: 'Њихов број телефона',
            THEIR_ADDRESS: 'Њихова адреса',
            THEIR_INSURER: 'Њихов осигуравач',
            DATE: 'Датум',
            TIME: 'Време',
            THEIR_VEHICLE_MAKE: 'Њихово возило производи',
            COLOR: 'Боја',
            PASSENGERS: 'Број путника',
            DAMAGE_TO_OTHER: 'Оштећење другог возила',
            SEE_OTHER_VEHICLE: 'Да ли сте јасно видели друго возило? (ако не, зашто?).',
            OTHER_OBJECT_CALL: 'Да ли је други возач противио позиву полиције?',
            WHAT_THEY_SAY: 'Шта су заправо рекли ?',
            WEATHER_LIKE: 'Какво је било време?',
            ANYTHING_ELSE: 'Још нешто што је допринијело ?',
            ID_OF_POLICE: 'Бројеви полицијских службеника',
            ACCIDENT_REF: 'Референтни број полицијске незгоде',
            WITNESS: 'Контакти сведока',
            REPEAT: 'Поновите ако је укључено више возила',
        });

        $translateProvider.translations('fas', {
            //Report Page Translation

            REPORT: 'گزارش',
            YOUR_REG_NUMBER: 'شماره ثبت نام شما',
            DAMAGE_TO_YOUR_VEHICLE: 'آسیب به وسیله نقلیه شما',
            WHAT_HAPPENED: 'چی شد؟',
            YOUR_EMAIL: 'ایمیل شما',
            SUBMIT: 'ارسال',
            OTHERS_INVOLVED: 'اگر دیگران درگیر باشند',
            INSURANCE: 'بیمه',
            GOTO: 'برو به',

            //Dashboard Translation
            ABOUT: 'در باره',
            EMERGENCY: 'اضطراری',
            LOCATION: 'محل',
            PHOTOS: 'عکس ها',
            REMINDERS: 'یادآوری ها',
            ASSOCIATES: 'همکاران',
            TERMS: 'اصطلاحات',

            //Location Page
            GET_MYPOS_BTN: 'محل سکونت خود را ضبط کنید (استفاده از)',
            ROAD_NAME: 'نام جاده',
            TRAVEL_DIRECTION: 'جهت حرکت',
            POSITION: 'موقعیت',

            //Reminders Page
            DETAIL: 'جزئیات خودرو خود و تاریخ انقضای گواهینامه آزمون، مالیات و بیمه را وارد کنید. 1 هفته قبل از تاریخ تمدید، شما یادآوری خواهید شد.',
            VEHICLE_MANUFAC: 'سازنده خودرو',
            MODEL: 'مدل',
            ANNUAL_TEST: 'آزمایش سالانه',
            TAX_EXPIRY: 'انقضا مالیات',
            INS_EXPIRY: 'تاریخ انقضا بیمه',

            //Insurance Page
            REGISTRATION_NUMBER: 'شماره ثبت آنها (یا نوشتن دوچرخه سوار / پیاده)',
            THEIR_NAME: 'نام آنها',
            THEIR_PHONE: 'شماره تلفن آنها',
            THEIR_ADDRESS: 'آدرس آنها',
            THEIR_INSURER: 'بیمه کننده آنها',
            DATE: 'تاریخ',
            TIME: 'زمان',
            THEIR_VEHICLE_MAKE: 'وسیله نقلیه خود را،',
            COLOR: 'رنگ، رنگ',
            PASSENGERS: 'تعداد مسافرین',
            DAMAGE_TO_OTHER: 'آسیب به وسیله نقلیه دیگر',
            SEE_OTHER_VEHICLE: 'آیا به وضوح به وسیله نقلیه دیگر دیدید؟ (اگر نه، چرا؟)',
            OTHER_OBJECT_CALL: 'آیا راننده دیگر به تماس پلیس متوسل شد؟',
            WHAT_THEY_SAY: 'آنها واقعا چه گفتند؟',
            WEATHER_LIKE: 'هوا چطور بود؟',
            ANYTHING_ELSE: 'هر چیز دیگری که کمک می کند ؟',
            ID_OF_POLICE: 'شماره شناسایی از حضور پلیس',
            ACCIDENT_REF: 'شماره رانندگی پلیس',
            WITNESS: 'تماس با شاهد',
            REPEAT: 'تکرار کنید اگر وسیله نقلیه بیشتر باشد',
        });

        $translateProvider.translations('mlt', {
            //Report Page Translation

            REPORT: 'Rapport',
            YOUR_REG_NUMBER: 'In-numru tar-reġistrazzjoni tiegħek',
            DAMAGE_TO_YOUR_VEHICLE: 'Ħsara lill-vettura tiegħek,',
            WHAT_HAPPENED: 'X ġara?',
            YOUR_EMAIL: 'L-email tieghek',
            SUBMIT: 'Ibgħat',
            OTHERS_INVOLVED: 'Jekk ikunu involuti oħrajn',
            INSURANCE: 'Assigurazzjoni',
            GOTO: 'Mur Għal',

            //Dashboard Translation
            ABOUT: 'Dwar',
            EMERGENCY: 'EMERĠENZA',
            LOCATION: 'Post',
            PHOTOS: 'Ritratti',
            REMINDERS: 'Tifkiriet',
            ASSOCIATES: 'Assoċjati',
            TERMS: 'Termini',

            //Location Page
            GET_MYPOS_BTN: 'Irreġistra l-lokalità tiegħek (uża Pożizzjoni Tiegħek)',
            ROAD_NAME: 'Isem tat-triq',
            TRAVEL_DIRECTION: 'Id-direzzjoni ta',
            POSITION: 'Pożizzjoni',

            //Reminders Page
            DETAIL: 'Daħħal id-dettalji tal-vettura tiegħek u d-dati ta',
            VEHICLE_MANUFAC: 'Manifattur tal-Vettura',
            MODEL: 'Mudell',
            ANNUAL_TEST: 'It-Test Annwali',
            TAX_EXPIRY: 'L-iskadenza tat-Taxxa',
            INS_EXPIRY: 'Skadenza tal-Assigurazzjoni',

            //Insurance Page
            REGISTRATION_NUMBER: 'In-numru tar-reġistrazzjoni tagħhom (jew ikteb ċiklist / pedestrian) ',
            THEIR_NAME: 'L-isem tagħhom',
            THEIR_PHONE: 'In-numru tat-telefon tagħhom',
            THEIR_ADDRESS: 'L-indirizz tagħhom',
            THEIR_INSURER: 'L-assiguratur tagħhom',
            DATE: 'Data',
            TIME: 'Ħin',
            THEIR_VEHICLE_MAKE: 'Il-vettura tagħhom tagħmel',
            COLOR: 'Kulur',
            PASSENGERS: 'Numru ta passiġġieri',
            DAMAGE_TO_OTHER: 'Ħsara lill-vettura l-oħra',
            SEE_OTHER_VEHICLE: 'Ridt tara b mod ċar il-vettura l-oħra? (jekk le, għaliex?).',
            OTHER_OBJECT_CALL: 'Il-sewwieq l-ieħor oġġezzjona għal sejħa tal-pulizija? ',
            WHAT_THEY_SAY: 'Xi jfissru attwalment ?',
            WEATHER_LIKE: 'Kif kien it-temp?',
            ANYTHING_ELSE: 'Xi ħaġa oħra li kkontribwiet ?',
            ID_OF_POLICE: 'Numri tal-ID tal-pulizija li jattendu',
            ACCIDENT_REF: 'Numru ta referenza ta',
            WITNESS: 'Kuntatti tax-xhieda',
            REPEAT: 'Irrepeti jekk ikun hemm aktar vetturi involuti,',
        });

        $translateProvider.translations('may', {
            //Report Page Translation

            REPORT: 'Lapor',
            YOUR_REG_NUMBER: 'Nombor pendaftaran anda',
            DAMAGE_TO_YOUR_VEHICLE: 'Kerosakan kepada kenderaan anda',
            WHAT_HAPPENED: 'Apa yang berlaku?',
            YOUR_EMAIL: 'Emel anda',
            SUBMIT: 'Hantar',
            OTHERS_INVOLVED: 'Sekiranya orang lain terlibat',
            INSURANCE: 'Insurans',
            GOTO: 'Pergi ke',

            //Dashboard Translation
            ABOUT: 'Mengenai',
            EMERGENCY: 'EMERGENCY',
            LOCATION: 'Lokasi',
            PHOTOS: 'Foto',
            REMINDERS: 'Peringatan',
            ASSOCIATES: 'Syarikat bersekutu',
            TERMS: 'Terma',

            //Location Page
            GET_MYPOS_BTN: 'Catat lokasi anda (gunakan Dapatkan Posisi Saya) ',
            ROAD_NAME: 'Nama jalan',
            TRAVEL_DIRECTION: 'Arah perjalanan',
            POSITION: 'Jawatan',

            //Reminders Page
            DETAIL: 'Masukkan butiran kenderaan anda dan tarikh luput sijil ujian, cukai dan insurans. Anda akan diingatkan 1 minggu sebelum setiap tarikh pembaharuan.',
            VEHICLE_MANUFAC: 'Pengilang kenderaan',
            MODEL: 'Model',
            ANNUAL_TEST: 'Ujian Tahunan',
            TAX_EXPIRY: 'Tamat Tempoh Cukai',
            INS_EXPIRY: 'Tempoh tamat tempoh insurans',

            //Insurance Page
            REGISTRATION_NUMBER: 'Nombor pendaftaran mereka (atau menulis basikal / pejalan kaki)',
            THEIR_NAME: 'Nama mereka',
            THEIR_PHONE: 'Nombor telefon mereka',
            THEIR_ADDRESS: 'Alamat mereka',
            THEIR_INSURER: 'Penanggung insurans mereka',
            DATE: 'Tarikh',
            TIME: 'Masa',
            THEIR_VEHICLE_MAKE: 'Kenderaan mereka membuat',
            COLOR: 'Warna',
            PASSENGERS: 'Bilangan penumpang',
            DAMAGE_TO_OTHER: 'Kerosakan kepada kenderaan lain',
            SEE_OTHER_VEHICLE: 'Adakah anda dengan jelas melihat kenderaan lain? (jika tidak, mengapa?).',
            OTHER_OBJECT_CALL: 'Adakah objek pemandu lain memanggil polis?',
            WHAT_THEY_SAY: 'Apa yang sebenarnya mereka katakan ?',
            WEATHER_LIKE: 'Apa cuaca seperti ?',
            ANYTHING_ELSE: 'Apa lagi yang menyumbang ?',
            ID_OF_POLICE: 'Nombor ID polis yang menghadiri',
            ACCIDENT_REF: 'Nombor rujukan kemalangan polis',
            WITNESS: 'Kenalan saksi',
            REPEAT: 'Ulangi jika lebih banyak kenderaan terlibat',
        });

        $translateProvider.translations('lit', {
            //Report Page Translation

            REPORT: 'Pranešimas',
            YOUR_REG_NUMBER: 'Jūsų registracijos numeris',
            DAMAGE_TO_YOUR_VEHICLE: 'Jūsų automobilio pažeidimas',
            WHAT_HAPPENED: 'Kas nutiko?',
            YOUR_EMAIL: 'Tavo elektroninis paštas',
            SUBMIT: 'Pateikti',
            OTHERS_INVOLVED: 'Jei dalyvaujate kitiems',
            INSURANCE: 'Draudimas',
            GOTO: 'Eiti į',

            //Dashboard Translation
            ABOUT: 'Apie',
            EMERGENCY: 'SKUBUS ATVĖJIS',
            LOCATION: 'Vieta',
            PHOTOS: 'Nuotraukos',
            REMINDERS: 'Priminimai',
            ASSOCIATES: 'Associates',
            TERMS: 'Sąlygos',

            //Location Page
            GET_MYPOS_BTN: 'Įrašykite savo vietą (naudokite "Gauti mano poziciją")',
            ROAD_NAME: 'Kelio pavadinimas',
            TRAVEL_DIRECTION: 'Kelionių kryptis',
            POSITION: 'Pozicija',

            //Reminders Page
            DETAIL: 'Įveskite savo automobilio duomenis ir bandymo pažymėjimo, mokesčio ir draudimo galiojimo laiką. Jums bus primenama 1 savaitė prieš kiekvieną atnaujinimo datą.',
            VEHICLE_MANUFAC: 'Transporto priemonės gamintojas',
            MODEL: 'Modelis',
            ANNUAL_TEST: 'Metinis testas',
            TAX_EXPIRY: 'Mokesčio galiojimo laikas',
            INS_EXPIRY: 'Draudimo galiojimo laikas',

            //Insurance Page
            REGISTRATION_NUMBER: 'Jų registracijos numeris (arba rašyti dviratį / pėsčiųjų) ',
            THEIR_NAME: 'Jų vardai',
            THEIR_PHONE: 'Jų telefono numeris',
            THEIR_ADDRESS: 'Jų adresas',
            THEIR_INSURER: 'Jų draudikas',
            DATE: 'Data',
            TIME: 'Laikas',
            THEIR_VEHICLE_MAKE: 'Jų automobilis',
            COLOR: 'Spalva',
            PASSENGERS: 'Keleivių skaičius',
            DAMAGE_TO_OTHER: 'Kitos transporto priemonės pažeidimas',
            SEE_OTHER_VEHICLE: 'Ar jūs aiškiai matėte į kitą automobilį? (jei ne, kodėl?)',
            OTHER_OBJECT_CALL: 'Ar kitas vairuotojas nesutiko su policija?',
            WHAT_THEY_SAY: 'Ką jie iš tikrųjų sakė ?',
            WEATHER_LIKE: 'Koks buvo oras?',
            ANYTHING_ELSE: 'Ar viskas, kas prisidėjo?',
            ID_OF_POLICE: 'Policijos dalyvių identifikavimo numeriai',
            ACCIDENT_REF: 'Policijos avarijos nuorodos numeris',
            WITNESS: 'Liudytojų kontaktai',
            REPEAT: 'Pakartokite, jei dalyvauja daugiau transporto priemonių.',
        });

        $translateProvider.translations('lav', {
            //Report Page Translation

            REPORT: 'Ziņojums',
            YOUR_REG_NUMBER: 'Jūsu reģistrācijas numurs ',
            DAMAGE_TO_YOUR_VEHICLE: 'Jūsu automašīnas bojājums',
            WHAT_HAPPENED: 'Kas notika?',
            YOUR_EMAIL: 'Tavs e-pasts',
            SUBMIT: 'Iesniegt',
            OTHERS_INVOLVED: 'Ja citi ir iesaistīti',
            INSURANCE: 'Apdrošināšana',
            GOTO: 'Iet uz',

            //Dashboard Translation
            ABOUT: 'Par',
            EMERGENCY: 'ĀRKĀRTAS',
            LOCATION: 'Atrašanās vieta',
            PHOTOS: 'Fotogrāfijas',
            REMINDERS: 'Atgādinājumi',
            ASSOCIATES: 'Associates',
            TERMS: 'Noteikumi',

            //Location Page
            GET_MYPOS_BTN: '',
            ROAD_NAME: '',
            TRAVEL_DIRECTION: 'Kelionių kryptis',
            POSITION: 'Pozicija',

            //Reminders Page
            DETAIL: 'Įveskite savo automobilio duomenis ir bandymo pažymėjimo, mokesčio ir draudimo galiojimo laiką. Jums bus primenama 1 savaitė prieš kiekvieną atnaujinimo datą.',
            VEHICLE_MANUFAC: 'Transporto priemonės gamintojas',
            MODEL: 'Modelis',
            ANNUAL_TEST: 'Metinis testas',
            TAX_EXPIRY: 'Mokesčio galiojimo laikas',
            INS_EXPIRY: 'Draudimo galiojimo laikas',

            //Insurance Page
            REGISTRATION_NUMBER: 'Jų registracijos numeris (arba rašyti dviratį / pėsčiųjų) ',
            THEIR_NAME: 'Jų vardai',
            THEIR_PHONE: 'Jų telefono numeris',
            THEIR_ADDRESS: 'Jų adresas',
            THEIR_INSURER: 'Jų draudikas',
            DATE: 'Data',
            TIME: 'Laikas',
            THEIR_VEHICLE_MAKE: 'Jų automobilis',
            COLOR: 'Spalva',
            PASSENGERS: 'Keleivių skaičius',
            DAMAGE_TO_OTHER: 'Kitos transporto priemonės pažeidimas',
            SEE_OTHER_VEHICLE: 'Ar jūs aiškiai matėte į kitą automobilį? (jei ne, kodėl?)',
            OTHER_OBJECT_CALL: 'Ar kitas vairuotojas nesutiko su policija?',
            WHAT_THEY_SAY: 'Ką jie iš tikrųjų sakė ?',
            WEATHER_LIKE: 'Koks buvo oras?',
            ANYTHING_ELSE: 'Ar viskas, kas prisidėjo?',
            ID_OF_POLICE: 'Policijos dalyvių identifikavimo numeriai',
            ACCIDENT_REF: 'Policijos avarijos nuorodos numeris',
            WITNESS: 'Liudytojų kontaktai',
            REPEAT: 'Pakartokite, jei dalyvauja daugiau transporto priemonių.',
        });
        // ahsan start from here
        // for catlan
        $translateProvider.translations('cat', {
            //Report Page Translation

            REPORT: 'INFORME',
            YOUR_REG_NUMBER: 'EL NÚMERO DE REGISTRE',
            DAMAGE_TO_YOUR_VEHICLE: 'DANYS A LA TEVA VEHICLE',
            WHAT_HAPPENED: 'QUÈ VA PASSAR?',
            YOUR_EMAIL: 'EL TEU EMAIL',
            SUBMIT: 'PRESENTAR',
            OTHERS_INVOLVED: 'ALTRES_INVOLVAT',
            INSURANCE: 'ASSEGURANCES',
            GOTO: 'ANAR A',

            //Dashboard Translation
            ABOUT: 'QUANT A',
            EMERGENCY: 'EMERGÈNCIA',
            LOCATION: 'UBICACIÓ',
            PHOTOS: 'FOTOGRAFIES',
            REMINDERS: 'RECORDATORIS',
            ASSOCIATES: 'ASSOCIATS',
            TERMS: 'TERMES',

            //Location Page
            GET_MYPOS_BTN: 'Registre la vostra ubicació',
            ROAD_NAME: 'Nom del camí',
            TRAVEL_DIRECTION: 'DIRECCIÓ DE VIATGE',
            POSITION: 'Posició',

            //Reminders Page
            DETAIL: "Introduïu els detalls del vostre vehicle i les dates de caducitat del certificat de prova, impostos i assegurança. Se't recordarà una setmana abans de cada data de renovació",
            VEHICLE_MANUFAC: 'Fabricant de vehicles',
            MODEL: 'Model',
            ANNUAL_TEST: 'Prova anual',
            TAX_EXPIRY: 'Caducitat de l"impost',
            INS_EXPIRY: "Venciment de l'assegurança",

            //Insurance Page
            REGISTRATION_NUMBER: 'El seu número de registre (o escriu ciclista / vianant)',
            THEIR_NAME: 'El seu nom',
            THEIR_PHONE: 'El seu número de telèfon',
            THEIR_ADDRESS: 'La seva adreça',
            THEIR_INSURER: 'La seva asseguradora',
            DATE: 'Data',
            TIME: 'Temps',
            THEIR_VEHICLE_MAKE: 'El seu vehicle fa',
            COLOR: 'Color',
            PASSENGERS: 'Nombre de passatgers',
            DAMAGE_TO_OTHER: 'Danys a l"altre vehicle"',
            SEE_OTHER_VEHICLE: "Vas veure clarament a l'altre vehicle? (si no, per què?).",
            OTHER_OBJECT_CALL: "L'altre conductor es va oposar a trucar a la policia?",
            WHAT_THEY_SAY: ' Què van dir realment?',
            WEATHER_LIKE: 'Com va ser el temps? »',
            ANYTHING_ELSE: ' Una altra cosa que va contribuir?',
            ID_OF_POLICE: "Nombres d'identificació de la policia que assisteixen",
            ACCIDENT_REF: "Número de referència d'accidents policials",
            WITNESS: 'Contactes de testimonis',
            REPEAT: 'Repetiu si hi ha més vehicles implicats.',
        });
        // catlan end here
        // for Danish
        $translateProvider.translations('dani', {
            //Report Page Translation

            REPORT: 'Rapport',
            YOUR_REG_NUMBER: 'Dit registreringsnummer',
            DAMAGE_TO_YOUR_VEHICLE: 'Skader på dit køretøj',
            WHAT_HAPPENED: 'Hvad skete der?',
            YOUR_EMAIL: 'Din email',
            SUBMIT: 'Indsend',
            OTHERS_INVOLVED: 'Hvis andre er involveret',
            INSURANCE: 'Forsikring',
            GOTO: 'Gå til',

            //Dashboard Translation
            ABOUT: 'Om',
            EMERGENCY: 'NØD',
            LOCATION: 'Placering',
            PHOTOS: 'Billeder',
            REMINDERS: 'Påmindelser',
            ASSOCIATES: 'Associates',
            TERMS: ' Vilkår',

            //Location Page
            GET_MYPOS_BTN: 'Optag din placering (brug Få min position)',
            ROAD_NAME: 'Vejnavn',
            TRAVEL_DIRECTION: 'Rejse retning',
            POSITION: 'Position',

            //Reminders Page
            DETAIL: " Indtast detaljerne i dit køretøj og udløbsdatoen for testcertifikat, skat og forsikring. Du vil blive mindet 1 uge før hver fornyelsesdato.",
            VEHICLE_MANUFAC: 'Køretøjsproducent',
            MODEL: 'Model',
            ANNUAL_TEST: 'årlig test',
            TAX_EXPIRY: 'Skat Udløb',
            INS_EXPIRY: "Forsikringsudløb",

            //Insurance Page
            REGISTRATION_NUMBER: 'Deres registreringsnummer (eller skrive cyklist / fodgænger)',
            THEIR_NAME: 'deres navn',
            THEIR_PHONE: 'deres telefonnummer',
            THEIR_ADDRESS: ' deres adresse',
            THEIR_INSURER: 'Deres forsikringsselskab',
            DATE: 'Dato',
            TIME: 'Tid',
            THEIR_VEHICLE_MAKE: 'deres køretøj gør',
            COLOR: 'Farve',
            PASSENGERS: 'Antal passagerer',
            DAMAGE_TO_OTHER: 'Skader på det andet køretøj',
            SEE_OTHER_VEHICLE: "Så du tydeligt ind i det andet køretøj? (hvis ikke, hvorfor?).",
            OTHER_OBJECT_CALL: "Har den anden chauffør protesteret mod at ringe til politiet?",
            WHAT_THEY_SAY: ' Hvad sagde de faktisk?',
            WEATHER_LIKE: 'Hvad var vejret?',
            ANYTHING_ELSE: ' Noget andet der bidrog?',
            ID_OF_POLICE: "ID-numre for politiets deltagelse",
            ACCIDENT_REF: "Referencenummer for politiulykke",
            WITNESS: ' Vidnekontakter',
            REPEAT: 'Gentag, hvis flere køretøjer er involveret.',
        });
        // Danish end here
// for french
        $translateProvider.translations('fre', {
            //Report Page Translation

            REPORT: 'Rapport',
            YOUR_REG_NUMBER: "Votre numéro d'enregistrement",
            DAMAGE_TO_YOUR_VEHICLE: 'Dommage à votre véhicule',
            WHAT_HAPPENED: "Qu'est-ce qui s'est passé?",
            YOUR_EMAIL: 'Votre email',
            SUBMIT: 'Soumettre',
            OTHERS_INVOLVED: "Si d'autres sont impliqués",
            INSURANCE: 'Assurances',
            GOTO: 'Aller à',

            //Dashboard Translation
            ABOUT: 'A propos de',
            EMERGENCY: 'URGENCE',
            LOCATION: 'Lieu',
            PHOTOS: 'Photos',
            REMINDERS: 'Rappels',
            ASSOCIATES: 'Associés',
            TERMS: ' Termes',

            //Location Page
            GET_MYPOS_BTN: 'Optag din placering (brug Få min position)',
            ROAD_NAME: 'Nom de la route',
            TRAVEL_DIRECTION: 'Direction des déplacements',
            POSITION: 'Position',

            //Reminders Page
            DETAIL: "Entrez les détails de votre véhicule et les dates d'expiration du certificat de test, de la taxe et de l'assurance. Vous serez rappelé 1 semaine avant chaque date de renouvellement",
            VEHICLE_MANUFAC: 'Fabricant de véhicules',
            MODEL: 'Modèle',
            ANNUAL_TEST: 'Test annuel',
            TAX_EXPIRY: 'Échéance de la taxe',
            INS_EXPIRY: "Échéance de l'assurance",

            //Insurance Page
            REGISTRATION_NUMBER: "Leur numéro d'enregistrement (ou écrire un cycliste / piétons)",
            THEIR_NAME: 'Leur nom',
            THEIR_PHONE: 'Leur numéro de téléphone',
            THEIR_ADDRESS: 'Leur adresse',
            THEIR_INSURER: 'Leur assureur',
            DATE: 'Date',
            TIME: 'Temps',
            THEIR_VEHICLE_MAKE: 'Leur véhicule fait',
            COLOR: 'Couleur',
            PASSENGERS: 'Nombre de passagers',
            DAMAGE_TO_OTHER: "Dommage à l'autre véhicule",
            SEE_OTHER_VEHICLE: "Avez-vous clairement vu dans l'autre véhicule? (sinon, pourquoi?).",
            OTHER_OBJECT_CALL: " L'autre conducteur a-t-il l'intention d'appeler la police? ",
            WHAT_THEY_SAY: "Qu'est-ce qu'ils ont réellement dit?",
            WEATHER_LIKE: 'À quoi ressemblait le temps',
            ANYTHING_ELSE: ' Tout ce qui a contribué?',
            ID_OF_POLICE: "numéros d'identité de la police qui fréquentent »",
            ACCIDENT_REF: "Numéro de référence de l'accident policier",
            WITNESS: ' Contacts du témoin',
            REPEAT: 'Répétez si plusieurs véhicules sont impliqués.',
        });
        // French end here

        // for german

        $translateProvider.translations('ger', {
            //Report Page Translation

            REPORT: 'Bericht',
            YOUR_REG_NUMBER: "Ihre Registrierungsnummer",
            DAMAGE_TO_YOUR_VEHICLE: 'Schäden an Ihrem Fahrzeug',
            WHAT_HAPPENED: "Was ist passiert?",
            YOUR_EMAIL: 'Ihre E-Mail',
            SUBMIT: 'senden',
            OTHERS_INVOLVED: "Wenn andere beteiligt sind",
            INSURANCE: 'Versicherung',
            GOTO: 'Gehen Sie zu',

            //Dashboard Translation
            ABOUT: 'über',
            EMERGENCY: 'NOTFALL',
            LOCATION: 'Lage',
            PHOTOS: 'Fotos',
            REMINDERS: 'Erinnerungen',
            ASSOCIATES: 'assoziiert',
            TERMS: ' Begriffe',

            //Location Page
            GET_MYPOS_BTN: 'Notieren Sie Ihren Standort (verwenden Sie Meine Position)',
            ROAD_NAME: 'Straßenname',
            TRAVEL_DIRECTION: 'Fahrtrichtung',
            POSITION: 'Position',

            //Reminders Page
            DETAIL: "Geben Sie die Details Ihres Fahrzeugs und die Verfallsdaten des Prüfzeugnisses, der Steuer und der Versicherung ein. Sie werden 1 Woche vor jedem Verlängerungsdatum erinnert.",
            VEHICLE_MANUFAC: 'Fahrzeughersteller',
            MODEL: 'Modell',
            ANNUAL_TEST: 'Jährlicher Test',
            TAX_EXPIRY: 'Steuerablauf',
            INS_EXPIRY: "Versicherungsablauf",

            //Insurance Page
            REGISTRATION_NUMBER: "Ihre Registriernummer (oder Radfahrer / Fußgänger)",
            THEIR_NAME: 'Ihr Name',
            THEIR_PHONE: 'Ihre Telefonnummer',
            THEIR_ADDRESS: 'Ihre Adresse',
            THEIR_INSURER: 'Ihr Versicherer',
            DATE: 'Datum',
            TIME: 'Zeit',
            THEIR_VEHICLE_MAKE: 'Ihr Fahrzeug macht',
            COLOR: 'Farbe',
            PASSENGERS: 'Anzahl der Passagiere',
            DAMAGE_TO_OTHER: "Beschädigung des anderen Fahrzeugs",
            SEE_OTHER_VEHICLE: "Hast du deutlich in das andere Fahrzeug gesehen? (wenn nicht, warum?).",
            OTHER_OBJECT_CALL: " Hat der andere Fahrer die Polizei aufgerufen?",
            WHAT_THEY_SAY: "Was haben sie eigentlich gesagt?",
            WEATHER_LIKE: 'Wie war das Wetter?',
            ANYTHING_ELSE: 'Was sonst noch dazu beigetragen hat?',
            ID_OF_POLICE: "ID-Nummern der Polizei teilnehmen",
            ACCIDENT_REF: "Polizei Unfall Referenznummer ",
            WITNESS: ' Zeugenkontakte',
            REPEAT: 'Wiederholen, wenn mehr Fahrzeuge beteiligt sind.',
        });
        // german end here

        // for hungray

        $translateProvider.translations('hun', {
            //Report Page Translation

            REPORT: 'jelentés',
            YOUR_REG_NUMBER: "A regisztrációs számod",
            DAMAGE_TO_YOUR_VEHICLE: 'A gépkocsi károsodása',
            WHAT_HAPPENED: "Mi történt?",
            YOUR_EMAIL: ' Az Ön e-mailje',
            SUBMIT: ' elküldése',
            OTHERS_INVOLVED: " Ha mások veszek részt",
            INSURANCE: ' biztosítás',
            GOTO: 'Menj',

            //Dashboard Translation
            ABOUT: 'Körülbelül',
            EMERGENCY: 'ESETÉN ',
            LOCATION: 'Elhelyezkedés',
            PHOTOS: 'Fotók',
            REMINDERS: 'Emlékeztetők',
            ASSOCIATES: 'Társult',
            TERMS: ' Feltételek',

            //Location Page
            GET_MYPOS_BTN: 'Rögzítse helyét (Használja a Saját pozíciót)',
            ROAD_NAME: 'Út neve',
            TRAVEL_DIRECTION: 'Utazás iránya',
            POSITION: 'Pozíció',

            //Reminders Page
            DETAIL: "Írja be a jármű adatait, valamint a vizsgálati igazolás, az adó és a biztosítás lejárati dátumát. Minden megújítási dátum előtt 1 héttel emlékeztetni fogsz",
            VEHICLE_MANUFAC: 'Járműgyártó',
            MODEL: 'Modell',
            ANNUAL_TEST: 'Éves teszt',
            TAX_EXPIRY: 'Az adó lejárata',
            INS_EXPIRY: "Biztosítási lejárat",

            //Insurance Page
            REGISTRATION_NUMBER: "A regisztrációs számuk (vagy írjon kerékpáros / gyalogos)",
            THEIR_NAME: ' A nevük',
            THEIR_PHONE: 'A telefonszámuk',
            THEIR_ADDRESS: 'Címük',
            THEIR_INSURER: 'Biztosítójuk',
            DATE: 'Dátum',
            TIME: 'Idő',
            THEIR_VEHICLE_MAKE: 'A járművük',
            COLOR: 'Szín',
            PASSENGERS: 'Az utasok száma',
            DAMAGE_TO_OTHER: "A másik jármű károsodása",
            SEE_OTHER_VEHICLE: "Jól láttad a másik járművet? (ha nem, miért?).",
            OTHER_OBJECT_CALL: "  A másik vezető ellenezte a hívó rendőrséget?",
            WHAT_THEY_SAY: "Mit írtak valójában? ",
            WEATHER_LIKE: 'Milyen volt az időjárás?',
            ANYTHING_ELSE: 'Valami más, ami hozzájárult?',
            ID_OF_POLICE: "A rendőrség azonosítási száma",
            ACCIDENT_REF: "Rendőrségi baleset hivatkozási szám ",
            WITNESS: 'Tanúi kapcsolatok',
            REPEAT: 'Ismételje meg, ha több jármű van bekapcsolva.',
        });
        // hungary end here
        // italian starts from here
        $translateProvider.translations('ita', {
            //Report Page Translation

            REPORT: 'Relazione',
            YOUR_REG_NUMBER: "Il tuo numero di registrazione",
            DAMAGE_TO_YOUR_VEHICLE: 'danni al veicolo',
            WHAT_HAPPENED: "Che cosa è successo?",
            YOUR_EMAIL: 'la tua e-mail',
            SUBMIT: 'Invia',
            OTHERS_INVOLVED: "Se sono coinvolti altri",
            INSURANCE: 'Assicurazione',
            GOTO: 'Vai a',

            //Dashboard Translation
            ABOUT: ' A proposito',
            EMERGENCY: 'EMERGENZA',
            LOCATION: 'Posizione',
            PHOTOS: 'Foto',
            REMINDERS: 'Ricordi',
            ASSOCIATES: 'Associati',
            TERMS: ' Termini',

            //Location Page
            GET_MYPOS_BTN: 'Registrare la tua posizione (utilizzare Get My Position)',
            ROAD_NAME: 'Nome della strada',
            TRAVEL_DIRECTION: 'Direzione di viaggio',
            POSITION: 'Posizione',

            //Reminders Page
            DETAIL: "Inserire i dati del veicolo e le date di scadenza del certificato di prova, delle imposte e delle assicurazioni. Sarai ricordato 1 settimana prima di ogni data di rinnovo.",
            VEHICLE_MANUFAC: 'Produttore del veicolo',
            MODEL: 'Modello',
            ANNUAL_TEST: 'Test annuale',
            TAX_EXPIRY: 'Scadenza fiscale',
            INS_EXPIRY: "Scadenza dell'assicurazione",

            //Insurance Page
            REGISTRATION_NUMBER: "il loro numero di registrazione (o scrivere ciclista / pedone)",
            THEIR_NAME: 'Il loro nome',
            THEIR_PHONE: ' Il loro numero di telefono',
            THEIR_ADDRESS: ' Il loro indirizzo',
            THEIR_INSURER: ' Il loro assicuratore',
            DATE: ' Data',
            TIME: 'Tempo',
            THEIR_VEHICLE_MAKE: ' Il loro veicolo fa ',
            COLOR: ' Colore ',
            PASSENGERS: 'Numero di passeggeri',
            DAMAGE_TO_OTHER: "Danni all'altro veicolo",
            SEE_OTHER_VEHICLE: "Hai visto chiaramente l'altro veicolo? (se no, perché?)",
            OTHER_OBJECT_CALL: " L'altro autista si oppose alla polizia di chiamata? »",
            WHAT_THEY_SAY: " Che cosa hanno effettivamente detto?",
            WEATHER_LIKE: ' Qual era il tempo come? ',
            ANYTHING_ELSE: 'Tutto ciò che ha contribuito?',
            ID_OF_POLICE: "Numero di identificazione delle forze di polizia che partecipano",
            ACCIDENT_REF: "Numero di riferimento dell'incidente della polizia",
            WITNESS: 'contatti testimoni',
            REPEAT: 'Ripetere se sono coinvolti più veicoli',
        });
        // italian end here

        // polish starts from here
        $translateProvider.translations('pol', {
            //Report Page Translation

            REPORT: 'Sprawozdanie',
            YOUR_REG_NUMBER: "Twój numer rejestracyjny",
            DAMAGE_TO_YOUR_VEHICLE: 'Uszkodzenie pojazdu',
            WHAT_HAPPENED: "Co się stało?",
            YOUR_EMAIL: 'Twój e-mail',
            SUBMIT: 'Prześlij',
            OTHERS_INVOLVED: "Jeśli inni są zaangażowani",
            INSURANCE: 'Ubezpieczenia',
            GOTO: 'Idź',

            //Dashboard Translation
            ABOUT: 'O',
            EMERGENCY: 'AWARIA',
            LOCATION: 'Lokalizacja',
            PHOTOS: 'Zdjęcia',
            REMINDERS: 'Przypomnienia',
            ASSOCIATES: 'stowarzyszeni',
            TERMS: ' Warunki',

            //Location Page
            GET_MYPOS_BTN: 'Zapisz swoją lokalizację (użyj funkcji Get My Position)',
            ROAD_NAME: 'Nazwa drogi',
            TRAVEL_DIRECTION: 'Kierunek jazdy',
            POSITION: 'Pozycja',

            //Reminders Page
            DETAIL: "Wprowadź dane dotyczące pojazdu i daty ważności certyfikatu badania, podatku i ubezpieczenia. Zostaniesz przypominony na 1 tydzień przed każdą dniem przedłużenia.",
            VEHICLE_MANUFAC: 'Producent pojazdu',
            MODEL: 'Model',
            ANNUAL_TEST: 'Roczny Test',
            TAX_EXPIRY: 'Podatek Wygaśnięcie',
            INS_EXPIRY: "Wygaśnięcie ubezpieczenia",

            //Insurance Page
            REGISTRATION_NUMBER: "ich numer rejestracyjny (lub pisanie rowerzystów / pieszych)",
            THEIR_NAME: 'ich imię',
            THEIR_PHONE: 'ich numer telefonu',
            THEIR_ADDRESS: 'ich adres',
            THEIR_INSURER: 'ich ubezpieczyciel',
            DATE: 'Data',
            TIME: 'Czas',
            THEIR_VEHICLE_MAKE: 'Ich pojazd tworzy',
            COLOR: 'Kolor',
            PASSENGERS: 'Liczba pasażerów',
            DAMAGE_TO_OTHER: "Uszkodzenie drugiego pojazdu",
            SEE_OTHER_VEHICLE: "Czy widziałeś wyraźnie w innym pojeździe? (jeśli nie, dlaczego?).",
            OTHER_OBJECT_CALL: "Czy drugi kierowca sprzeciwia się powołaniu policji?",
            WHAT_THEY_SAY: "Co właściwie powiedzieli?",
            WEATHER_LIKE: 'Jaka była pogoda?',
            ANYTHING_ELSE: 'Czy coś innego przyczyniło się?',
            ID_OF_POLICE: "numery identyfikacyjne policji uczestniczącej",
            ACCIDENT_REF: "Numer referencyjny wypadków w policji",
            WITNESS: 'Kontakty ze świadkami',
            REPEAT: 'Powtarzaj, jeśli uczestniczą więcej pojazdów.',
        });
        // Polish end here
        // Portugese starts from here
        $translateProvider.translations('por', {
            //Report Page Translation

            REPORT: 'Relatório',
            YOUR_REG_NUMBER: "Seu número de registro",
            DAMAGE_TO_YOUR_VEHICLE: 'danos ao seu veículo',
            WHAT_HAPPENED: "O que aconteceu?",
            YOUR_EMAIL: 'Seu e-mail',
            SUBMIT: 'Enviar',
            OTHERS_INVOLVED: "Se outros estiverem envolvidos",
            INSURANCE: 'Seguro',
            GOTO: 'Ir para',

            //Dashboard Translation
            ABOUT: 'Sobre',
            EMERGENCY: 'EMERGÊNCIA',
            LOCATION: 'Localização',
            PHOTOS: 'Fotos',
            REMINDERS: 'Lembretes',
            ASSOCIATES: 'Associados',
            TERMS: 'Termos',

            //Location Page
            GET_MYPOS_BTN: 'Registre sua localização (use Get My Position)',
            ROAD_NAME: 'Nome da estrada',
            TRAVEL_DIRECTION: 'Direção de viagem',
            POSITION: 'Posição',

            //Reminders Page
            DETAIL: "Insira os detalhes do seu veículo e as datas de caducidade do certificado de teste, imposto e seguro. Você será lembrado 1 semana antes de cada data de renovação.",
            VEHICLE_MANUFAC: 'Fabricante do veículo',
            MODEL: 'Modelo',
            ANNUAL_TEST: 'Teste anual',
            TAX_EXPIRY: 'Vencimento do Imposto',
            INS_EXPIRY: "Seguro de expiração",

            //Insurance Page
            REGISTRATION_NUMBER: "Seu número de registro (ou escreva ciclista / pedestre)",
            THEIR_NAME: 'O nome deles',
            THEIR_PHONE: 'Seu número de telefone',
            THEIR_ADDRESS: 'Seu endereço',
            THEIR_INSURER: 'Sua seguradora',
            DATE: 'Data',
            TIME: 'Tempo',
            THEIR_VEHICLE_MAKE: 'Seu veículo faz',
            COLOR: 'Cor',
            PASSENGERS: 'Número de passageiros',
            DAMAGE_TO_OTHER: "Danos ao outro veículo",
            SEE_OTHER_VEHICLE: "Você viu claramente o outro veículo? (se não, por quê?).",
            OTHER_OBJECT_CALL: "O outro motorista se opôs a chamar a polícia?",
            WHAT_THEY_SAY: "O que eles realmente disseram?",
            WEATHER_LIKE: 'Como era o clima?',
            ANYTHING_ELSE: 'Mais alguma coisa que contribuiu?',
            ID_OF_POLICE: "números de identificação da polícia que freqüentam",
            ACCIDENT_REF: "Número de referência do acidente policial",
            WITNESS: 'Contatos de testemunhas',
            REPEAT: 'Repita se houver mais veículos envolvidos.',
        });
        // Portugese end here

        // Romanian starts from here
        $translateProvider.translations('rom', {
            //Report Page Translation

            REPORT: 'Raport',
            YOUR_REG_NUMBER: "Numărul dvs. de înregistrare",
            DAMAGE_TO_YOUR_VEHICLE: 'Deteriorarea vehiculului',
            WHAT_HAPPENED: "Ce sa întâmplat?",
            YOUR_EMAIL: 'Adresa dvs. de e-mail',
            SUBMIT: 'Trimite',
            OTHERS_INVOLVED: "Dacă sunt implicați alții",
            INSURANCE: 'Asigurare',
            GOTO: 'Du-te la',

            //Dashboard Translation
            ABOUT: 'Despre',
            EMERGENCY: 'URGENȚĂ',
            LOCATION: 'Locație',
            PHOTOS: 'Fotografii',
            REMINDERS: 'Mementouri',
            ASSOCIATES: 'Asociații',
            TERMS: 'Termeni',

            //Location Page
            GET_MYPOS_BTN: 'Înregistrați locația (utilizați Poziția mea)',
            ROAD_NAME: 'Denumirea drumului',
            TRAVEL_DIRECTION: 'Direcția de deplasare',
            POSITION: 'Poziția',

            //Reminders Page
            DETAIL: "Introduceți detaliile vehiculului dvs. și datele de expirare ale certificatului de testare, ale impozitelor și ale asigurărilor. Veți fi reamintit cu o săptămână înainte de fiecare dată de reînnoire.",
            VEHICLE_MANUFAC: 'Producătorul de vehicule',
            MODEL: 'Model',
            ANNUAL_TEST: 'Testul anual',
            TAX_EXPIRY: 'Expirarea taxei',
            INS_EXPIRY: "Expirarea termenului de asigurare",

            //Insurance Page
            REGISTRATION_NUMBER: "numărul lor de înregistrare (sau ciclistul / pietonul)",
            THEIR_NAME: 'Numele lor',
            THEIR_PHONE: 'numărul lor de telefon',
            THEIR_ADDRESS: 'Adresa lor',
            THEIR_INSURER: 'Asiguratorul lor',
            DATE: 'Data',
            TIME: 'Ora',
            THEIR_VEHICLE_MAKE: 'Vehiculul lor face',
            COLOR: 'Culoare',
            PASSENGERS: 'Numărul pasagerilor',
            DAMAGE_TO_OTHER: "Deteriorarea celuilalt vehicul",
            SEE_OTHER_VEHICLE: "Ați văzut în mod clar celălalt vehicul? (dacă nu, de ce?).",
            OTHER_OBJECT_CALL: "Celălalt șofer a obiectat să cheme poliția?",
            WHAT_THEY_SAY: "Ce au spus de fapt?",
            WEATHER_LIKE: 'Cum a fost vremea?',
            ANYTHING_ELSE: 'Altceva care a contribuit? ',
            ID_OF_POLICE: "numerele de identificare ale poliției care participă",
            ACCIDENT_REF: "Numărul de referință al accidentelor de poliție",
            WITNESS: 'Contactele martorilor',
            REPEAT: 'Repetați dacă sunt implicate mai multe vehicule.',
        });
        // Romanian end here
        // Russian starts from here
        $translateProvider.translations('rus', {
            //Report Page Translation

            REPORT: 'Отчет',
            YOUR_REG_NUMBER: "Ваш регистрационный номер",
            DAMAGE_TO_YOUR_VEHICLE: 'Повреждение вашего автомобиля ',
            WHAT_HAPPENED: "Что случилось?",
            YOUR_EMAIL: 'Ваш адрес электронной почты',
            SUBMIT: 'Добавить',
            OTHERS_INVOLVED: "Если другие участвуют",
            INSURANCE: 'страхование»',
            GOTO: 'Перейти к',

            //Dashboard Translation
            ABOUT: 'О',
            EMERGENCY: 'АВАРИЙНЫЙ',
            LOCATION: 'Местоположение ',
            PHOTOS: 'Фотографии',
            REMINDERS: 'Напоминания',
            ASSOCIATES: 'Ассоциированные члены ',
            TERMS: 'Условия',

            //Location Page
            GET_MYPOS_BTN: 'Запишите свое местоположение (используйте «Получить мою позицию»)',
            ROAD_NAME: 'Название дороги',
            TRAVEL_DIRECTION: 'Направление движения',
            POSITION: 'Позиция',

            //Reminders Page
            DETAIL: "Введите данные вашего автомобиля и даты истечения срока действия свидетельства об испытании, налога и страхования. Вам напомнят за неделю до каждой даты продления.",
            VEHICLE_MANUFAC: 'Производитель автомобиля',
            MODEL: 'Модель',
            ANNUAL_TEST: 'Ежегодный тест',
            TAX_EXPIRY: 'Истечение срока действия налогоплательщика',
            INS_EXPIRY: "Истечение срока страхования",

            //Insurance Page
            REGISTRATION_NUMBER: "Их регистрационный номер (или запись велосипедиста / пешехода) »",
            THEIR_NAME: 'Их имя',
            THEIR_PHONE: 'Их номер телефона',
            THEIR_ADDRESS: 'Их адрес',
            THEIR_INSURER: 'их страховщик',
            DATE: 'Дата',
            TIME: 'Время',
            THEIR_VEHICLE_MAKE: 'Их автомобиль делает',
            COLOR: 'Цвет',
            PASSENGERS: 'Количество пассажиров',
            DAMAGE_TO_OTHER: "Повреждение другого транспортного средства",
            SEE_OTHER_VEHICLE: "Вы ясно видели в другом автомобиле? (если нет, то почему?).",
            OTHER_OBJECT_CALL: "Другой водитель возражал против вызова полиции? »",
            WHAT_THEY_SAY: "Что они на самом деле говорили? »",
            WEATHER_LIKE: 'Какая была погода? »',
            ANYTHING_ELSE: 'Что-нибудь еще, что способствовало? »',
            ID_OF_POLICE: "Идентификационные номера полицейских, посещающих",
            ACCIDENT_REF: "Номер служебной информации о происшествии",
            WITNESS: 'Свидетельские контакты',
            REPEAT: 'Повторяйте, если задействовано больше транспортных средств.',
        });
        // Russian end here
        // Spanish starts from here
        $translateProvider.translations('spa', {
            //Report Page Translation

            REPORT: 'Informe',
            YOUR_REG_NUMBER: "Su número de registro",
            DAMAGE_TO_YOUR_VEHICLE: 'Daño a su vehículo',
            WHAT_HAPPENED: "¿Qué sucedió?",
            YOUR_EMAIL: 'Su correo electrónico',
            SUBMIT: 'Enviar',
            OTHERS_INVOLVED: "Si otros están involucrados",
            INSURANCE: 'Seguros',
            GOTO: 'Ir a',

            //Dashboard Translation
            ABOUT: 'Acerca de',
            EMERGENCY: 'EMERGENCIA',
            LOCATION: 'Ubicación ',
            PHOTOS: 'Fotos',
            REMINDERS: 'Recordatorios',
            ASSOCIATES: 'Asociados',
            TERMS: 'Términos',

            //Location Page
            GET_MYPOS_BTN: 'Registre su ubicación (use Get My Position)',
            ROAD_NAME: 'Nombre del camino',
            TRAVEL_DIRECTION: 'Dirección de viaje',
            POSITION: 'Posición',

            //Reminders Page
            DETAIL: "Ingrese los detalles de su vehículo y las fechas de caducidad del certificado de prueba, impuestos y seguros. Se le recordará 1 semana antes de cada fecha de renovación.",
            VEHICLE_MANUFAC: 'Fabricante del vehículo',
            MODEL: 'Modelo',
            ANNUAL_TEST: 'Prueba anual',
            TAX_EXPIRY: 'Expiración de impuestos',
            INS_EXPIRY: "Expiración del seguro",

            //Insurance Page
            REGISTRATION_NUMBER: "Su número de registro (o escribir ciclista / peatón) »",
            THEIR_NAME: 'Su nombre',
            THEIR_PHONE: 'Su número de teléfono',
            THEIR_ADDRESS: 'Su dirección',
            THEIR_INSURER: 'Su aseguradora',
            DATE: 'Fecha',
            TIME: 'Tiempo ',
            THEIR_VEHICLE_MAKE: 'Su vehículo hacer',
            COLOR: 'Color',
            PASSENGERS: 'Número de pasajeros',
            DAMAGE_TO_OTHER: "Daño al otro vehículo »",
            SEE_OTHER_VEHICLE: "¿Te viste claramente en el otro vehículo? (si no, ¿por qué?).",
            OTHER_OBJECT_CALL: "¿El otro conductor se oponía a llamar a la policía?",
            WHAT_THEY_SAY: "¿Qué dijeron realmente?",
            WEATHER_LIKE: '¿Cómo estaba el clima? ',
            ANYTHING_ELSE: '¿Algo más que contribuyó?',
            ID_OF_POLICE: "Número de identificación de la policía que asiste",
            ACCIDENT_REF: "Número de referencia del accidente de policía",
            WITNESS: 'Contactos de los testigos',
            REPEAT: 'Repetir si hay más vehículos implicados.',
        });
        // Spanish end here

        // Turkish starts from here
        $translateProvider.translations('tur', {
            //Report Page Translation

            REPORT: 'Rapor',
            YOUR_REG_NUMBER: "Kayıt numaranız",
            DAMAGE_TO_YOUR_VEHICLE: 'Aracınıza hasar',
            WHAT_HAPPENED: "Neler oldu?",
            YOUR_EMAIL: 'E-postanız',
            SUBMIT: 'Gönder',
            OTHERS_INVOLVED: "Başkaları dahilse",
            INSURANCE: 'Sigorta',
            GOTO: 'Git',

            //Dashboard Translation
            ABOUT: 'Hakkında',
            EMERGENCY: 'ACİL',
            LOCATION: 'Konum',
            PHOTOS: 'Fotoğraflar',
            REMINDERS: 'Hatırlatmalar',
            ASSOCIATES: 'İştirakçiler',
            TERMS: 'Terimler',

            //Location Page
            GET_MYPOS_BTN: "Konumunuzu kaydedin (Konumumu Al'ı kullanın)",
            ROAD_NAME: 'Yol adı',
            TRAVEL_DIRECTION: 'Seyahat yönü',
            POSITION: 'Pozisyon',

            //Reminders Page
            DETAIL: "Aracınızın detaylarını ve test belgesinin, vergi ve sigortanın son kullanma tarihlerini girin. Her yenileme tarihinden 1 hafta önce size hatırlatılacaksınız.",
            VEHICLE_MANUFAC: 'Araç Üreticisi',
            MODEL: 'Model',
            ANNUAL_TEST: 'Yıllık Test',
            TAX_EXPIRY: 'Verginin Sona Ermesi',
            INS_EXPIRY: "Sigorta Süresinin Sona Ermesi",

            //Insurance Page
            REGISTRATION_NUMBER: "Onların kayıt numarası (veya yaz bisikletçi / yaya)",
            THEIR_NAME: 'Onların adı',
            THEIR_PHONE: 'Onların telefon numarası',
            THEIR_ADDRESS: 'Adresleri',
            THEIR_INSURER: 'Onların sigortacısı',
            DATE: 'Tarih',
            TIME: 'Zaman',
            THEIR_VEHICLE_MAKE: 'Onların aracı yap',
            COLOR: 'Renkli',
            PASSENGERS: 'Yolcu sayısı',
            DAMAGE_TO_OTHER: "Diğer aracın hasar görmesi",
            SEE_OTHER_VEHICLE: "Diğer aracı açıkça gördün mü? (değilse, neden?)",
            OTHER_OBJECT_CALL: "Diğer şoför polise çağrı yapmayı reddetti mi? ",
            WHAT_THEY_SAY: "Gerçekten ne söylediler?",
            WEATHER_LIKE: 'Hava nasıldı?',
            ANYTHING_ELSE: 'Katkıda bulunulan başka bir şey var mı?',
            ID_OF_POLICE: "Katılan polis kimliği sayısı",
            ACCIDENT_REF: "Polis kazası referans numarası",
            WITNESS: 'Tanıkların iletişim bilgileri',
            REPEAT: 'Eğer daha fazla taşıdıysanız tekrarlayın.',
        });
        // Turkish end here

// Ukranian starts from here
        $translateProvider.translations('ukr', {
            //Report Page Translation

            REPORT: 'Звіт',
            YOUR_REG_NUMBER: "Ваш реєстраційний номер",
            DAMAGE_TO_YOUR_VEHICLE: 'пошкодження Вашого автомобіля',
            WHAT_HAPPENED: "Що сталося?",
            YOUR_EMAIL: 'Ваш електронний лист',
            SUBMIT: 'Відправити',
            OTHERS_INVOLVED: "якщо інші залучені",
            INSURANCE: 'Страхування ',
            GOTO: 'Перейти до',

            //Dashboard Translation
            ABOUT: 'Про',
            EMERGENCY: 'АВАРІЯ',
            LOCATION: 'Місцезнаходження',
            PHOTOS: 'Фотографії',
            REMINDERS: 'Нагадування',
            ASSOCIATES: 'Асоційовані компанії',
            TERMS: 'Умови',

            //Location Page
            GET_MYPOS_BTN: 'Запишіть своє місцеположення (використовуйте "Отримати мою позицію")',
            ROAD_NAME: 'Назва дороги',
            TRAVEL_DIRECTION: 'напрямок руху',
            POSITION: 'Позиція',

            //Reminders Page
            DETAIL: "Введіть подробиці свого автомобіля та термін придатності тестового свідоцтва, податку та страхування. Вам буде нагадувати 1 тиждень до кожної дати поновлення.",
            VEHICLE_MANUFAC: 'Виробник транспортних засобів',
            MODEL: 'Модель',
            ANNUAL_TEST: 'Щорічний тест',
            TAX_EXPIRY: 'Податковий термін',
            INS_EXPIRY: "Страхування закінчується",

            //Insurance Page
            REGISTRATION_NUMBER: "їх реєстраційний номер (або запис велосипедиста / пішохода)",
            THEIR_NAME: "їхнє ім'я",
            THEIR_PHONE: 'їхній номер телефону',
            THEIR_ADDRESS: 'їх адреса',
            THEIR_INSURER: 'їх страховик ',
            DATE: 'Дата',
            TIME: 'Час',
            THEIR_VEHICLE_MAKE: 'їхні машини роблять',
            COLOR: 'Колір',
            PASSENGERS: 'Кількість пасажирів',
            DAMAGE_TO_OTHER: "пошкодження іншого транспортного засобу",
            SEE_OTHER_VEHICLE: "Ви чітко побачили в інший транспортний засіб? (якщо ні, то чому?)",
            OTHER_OBJECT_CALL: "Чи інший водій виступав проти дзвінка поліції?",
            WHAT_THEY_SAY: "Що вони насправді сказали ?",
            WEATHER_LIKE: 'Яка була погода?',
            ANYTHING_ELSE: 'Щось інше, що сприяло?',
            ID_OF_POLICE: "ідентифікаційні номери присутності поліції",
            ACCIDENT_REF: "Номер поліції ДТП",
            WITNESS: 'Свідок контактів',
            REPEAT: 'Повторіть, якщо залучено більше транспортних засобів.',
        });
        // Ukranian end here

        var lang = window.localStorage.getItem("language");
        if(lang != undefined || lang != '')
        {
            $translateProvider.preferredLanguage(lang);
        }
        else
        {
            $translateProvider.preferredLanguage('eng');
        }

        $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.icon('ion-android-arrow-back');
        var datePickerObj = {
            inputDate: new Date(),
            setLabel: 'Set',
            todayLabel: 'Today',
            closeLabel: 'Close',
            mondayFirst: false,
            weeksList: ["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            templateType: 'popup',
            from: new Date(2012, 8, 1),
            to: new Date(2018, 8, 1),
            showTodayButton: true,
            dateFormat: 'dd MMMM yyyy',
            closeOnSelect: false
            //disableWeekdays: [6],
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);

        var timePickerObj = {
            inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
            format: 12,
            step: 1,
            setLabel: 'Set',
            closeLabel: 'Close'
        };
        ionicTimePickerProvider.configTimePicker(timePickerObj);


        $stateProvider.state('app', {
            url: '/app',
            cache: false,
            abstract: true,
            templateUrl: 'templates/themes/menu.html',
            controller: 'AppCtrl'
        })
            .state('app.page', {
                url: '/page/:post',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/post.html',
                        controller:'MainCtrl'
                    }
                }
            })
            .state('app.form_1', {
                url: '/form_1',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/form_1.html',
                        controller:'MainCtrl'
                    }
                }
            })
            .state('app.form_2', {
                url: '/form_2',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/form_2.html',
                        controller:'MainCtrl'
                    }
                }
            })
            .state('app.location', {
                url: '/location',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/location.html',
                        controller:'MainCtrl'
                    }
                }
            })
            .state('app.reminders', {
                url: '/reminders',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/reminders.html',
                        controller:'MainCtrl'
                    }
                }
            })
            //login (home)
            .state('app.login', {
                url: '/login',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/login.html',
                        controller: 'AuthCtrl'
                    }
                }
            })

            //user profile
            .state('app.profile', {
                url: '/profile',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/profile.html'
                    }
                }
            })
            //Polices
            .state('app.policies', {
                url: '/policies',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/policy.html',
                        controller: 'PolicyCtrl'
                    }
                }
            })
            //check Calls
            .state('app.checkcalls', {
                url: '/check-calls',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/checkcalls.html',
                        controller: 'CheckCalls'
                    }
                }
            })

            // take a picture
            .state('app.takepic', {
                url: '/guard/takepic/:status',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/take-picture/camera.html',
                        controller: 'CameraCtrl'
                    }
                }
            })


            .state('app.guarddash', {
                url: '/guard/dash',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/guard-dashboard.html',
                        controller: 'GuardCtrl'
                    }
                }
            })
            .state('app.companydash', {
                url: '/company/dash',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/company-dashboard.html',
                        controller: 'CompanyCtrl'
                    }
                }
            })

            .state('app.selectsite', {
                url: '/user/select/site',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/weekly-rota/sites.html',
                        controller: 'SiteCtrl'
                    }
                }
            })
            .state('app.logout', {
                url: '/user/logout',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/login.html',
                        controller: 'LogoutCtrl'
                    }
                }
            })
            .state('app.send-checkcall', {
                url: '/company/send/checkcall',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/company/send-checkcall.html',
                        controller: 'Company'
                    }
                }
            })
            .state('app.selectsite1', {
                url: '/user/select/site',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/weekly-rota/sites.html',
                        controller: 'SiteCtrl1'
                    }
                }
            })

            //weekly rota index
            .state('app.weeklyrota', {
                url: '/user/weekly/rota',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/weekly-rota/index.html',
                        controller: 'SiteCtrl'
                    }
                }
            })

            // rota location
            .state('app.rotalocation', {
                url: '/rota-location/:lat/:log',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/weekly-rota/rota-location.html',
                        //controller: 'GuardRotaLocationCtrl'
                        controller: 'MapCtrl'
                    }
                }
            })

            // check calls
            .state('app.checkcall', {
                url: '/check-call',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/check-call/call.html',
                        controller: 'CheckCallCtrl'
                    }
                }
            })

            // news letters
            .state('app.newsletters', {
                url: '/newsletters',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/newsletters/newsletters.html',
                        controller: 'NewslettersCtrl'
                    }
                }
            })

            // news letters
            .state('app.signature', {
                url: '/signature/:backTo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/signature.html',
                        controller: 'SignatureCtrl'
                    }
                }
            })

            // newsletter detail
            .state('app.newsletter-single', {
                url: '/newsletter/show/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/newsletters/newsletter-single.html',
                        controller:'NewslettersCtrl'
                    }
                }
            })

            // messages
            .state('app.messages', {
                url: '/messages',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/messages/messages.html',
                        controller:'MessageCtrl'
                    }
                }
            })

            // sites: assignment instructions
            .state('app.instruction-sites', {
                url: '/instruction/sites',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/assignment-instructions/sites.html',
                        controller: 'SiteCtrl'
                    }
                }
            })

            // sites: assignment instructions
            .state('app.site-instructions', {
                url: '/site/instructions/:siteid',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/assignment-instructions/instructions.html',
                        controller: 'SiteCtrl'
                    }
                }
            })

            // sites: risk assignments
            .state('app.site-risk-assignment', {
                url: '/site/risk/assignment',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/risk-assignments/risk-assignment.html',
                        controller: 'SiteCtrl'
                    }
                }
            })

            // Patrol timing
            .state('app.patrol-timing', {
                url: '/patrol/timing',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/patrol/patrol-timing.html',
                        controller: 'PatrolCtrl'
                    }
                }
            })

            // Patrol notification
            .state('app.patrol-notification', {
                url: '/patrol/notification/:latitudes/:longitudes',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/patrol/patrol-notification.html',
                        controller: 'RouteMakerCtrl'
                    }
                }
            })
            // site checks
            .state('app.site-checks', {
                url: '/site/checks',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/opening-and-closing-check/checks.html',
                        controller: 'SiteCtrl'
                    }
                }
            })



            // daily occurrence book
            .state('app.site-daily-occurrence', {
                url: '/site/daily-occurrences',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/daily-occurrence-book/daily-occurrence.html',
                        controller: 'DailyOccurrence'
                    }
                }
            })


            // daily occurrence book
            .state('app.site-picture-of-customer-id', {
                url: '/site/customer-id/picture',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/picture-of-customer-id/camera.html',
                        controller: 'CustomerIdCtrl'
                    }
                }
            })

            .state('app.incidents', {
                url: '/user/incidents',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/incidents.html',
                        controller: 'IncidentCtrl'
                    }
                }
            })
            // sites: assignment instructions
            .state('app.accidents', {
                url: '/user/accidents',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/accidents.html',
                        controller: 'AccidentCtrl'
                    }
                }
            })
            .state('app.tallyCounter', {
                url: '/tallyCounter/:count',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/tallyCounter.html',
                        controller: 'TallyCtrl'
                    }
                }
            })
            .state('app.visitorLog', {
                url: '/visitorLog/:count',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/visitorLog.html',
                        controller: 'TallyCtrl'
                    }
                }
            })
            .state('app.holiday', {
                url: '/user/holiday',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/holiday.html',
                        controller: 'HolidayCtrl'
                    }
                }
            })
            .state('app.training', {
                url: '/user/training',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/training.html',
                        controller:'TrainingCtrl'
                    }
                }
            })
            .state('app.training.video', {
                url: '/user/training/video',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/training-video.html',
                        controller:'TrainingCtrl'
                    }
                }
            })
            .state('app.payslips', {
                url: '/user/payslips',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events/payslips.html',
                        controller:'payslip'
                    }
                }
            })

            //user profile edit
            /*.state('app.profileedit', {
             url: '/profile/edit',
             views: {
             'menuContent': {
             templateUrl: 'templates/themes/profile/profile_edit.html'
             }
             }
             })*/

            //add attendance
            .state('app.addattendance', {
                url: '/attendance/add',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/attendance/add.html'
                    }
                }
            })

            // HOME

            .state('app.dash', {
                url: '/dash',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/dashboard.html'
                    }
                }
            })

            .state('app.dashlist', {
                url: '/dash/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/dashboard-list.html',
                        controller: 'DashListCtrl'
                    }
                }
            })

            // PUSH NOTIFICATION
            .state('app.localpush', {
                url: '/push/local',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/push/local.html',
                        controller: 'LocalPush'
                    }
                }
            })

            .state('app.googlepush', {
                url: '/push/google',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/push/google.html',
                        controller: 'GooglePush'
                    }
                }
            })

            // MENU DETAIL

            .state('app.newscategory', {
                url: '/newscategory',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/newscategory.html',
                        controller: 'NewsCtrl'
                    }
                }
            })

            .state('app.ecommerce', {
                url: '/ecommerce',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/ecommerce/home.html'
                    }
                }
            })

            .state('app.ecommerce-category', {
                url: '/category',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/ecommerce/category.html'
                    }
                }
            })

            .state('app.ecommerce-product', {
                url: '/ecommerce/product',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/ecommerce/product.html'
                    }
                }
            })

            .state('app.ecommerce-cart', {
                url: '/ecommerce/cart',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/ecommerce/cart.html'
                    }
                }
            })

            .state('app.ecommerce-wish', {
                url: '/ecommerce/wish',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/ecommerce/wish.html'
                    }
                }
            })

            .state('app.hotel', {
                url: '/hotel',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/hotel.html',
                        controller: 'HotelCtrl'
                    }
                }
            })

            .state('app.socialmedia', {
                url: '/socialmedia',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/themes/socialmedia.html'
                    }
                }
            })


            /* MAP */

            .state('app.currentlocation', {
                url: '/current-location',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/map/current-location.html',
                        controller: 'CurrentLocationCtrl'
                    }
                }
            })

            .state('app.navigator', {
                url: '/navigator',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/map/navigator.html',
                        controller: 'NavigatorCtrl'
                    }
                }
            })

            // CRUD

            .state('app.localstorage', {
                url: '/crud/localstorage',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/crud/localstorage.html',
                        controller: 'LocalStorageCtrl'
                    }
                }
            })

            .state('app.localcreate', {
                url: '/crud/local/create',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/crud/local-create.html',
                        controller: 'LocalCreateCtrl'
                    }
                }
            })

            .state('app.localedit', {
                url: '/crud/local/edit/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/crud/local-edit.html',
                        controller: 'LocalEditCtrl'
                    }
                }
            })

            .state('app.backand', {
                url: '/crud/backand',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/crud/backand.html',
                        controller: 'BackandCtrl'
                    }
                }
            })

            .state('app.backandcreate', {
                url: '/crud/backand/create',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/crud/backand-create.html',
                        controller: 'BackandCreateCtrl'
                    }
                }
            })

            .state('app.backandedit', {
                url: '/crud/backand/edit/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/crud/backand-edit.html',
                        controller: 'BackandEditCtrl'
                    }
                }
            })

            /* SOCIAL LOGIN */

            .state('app.fblogin', {
                cache: false,
                url: '/fb-login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/social-login/facebook/index.html',
                        controller: 'FbLoginCtrl'
                    }
                }
            })

            .state('app.fbprofile', {
                cache: false,
                url: '/fb-profile',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/social-login/facebook/profile.html',
                        controller: 'FbProfileCtrl'
                    }
                }
            })

            .state('app.fbfriends', {
                url: '/fb-friends',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/social-login/facebook/friends.html',
                        controller: 'FbFriendsCtrl'
                    }
                }
            })

            .state('app.fbfeeds', {
                url: '/fb-feeds',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/social-login/facebook/feeds.html',
                        controller: 'FbFeedsCtrl'
                    }
                }
            })

            .state('app.gplogin', {
                cache: false,
                url: '/gp-login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/social-login/google/index.html',
                        controller: 'GpLoginCtrl'
                    }
                }
            })

            .state('app.gpprofile', {
                cache: false,
                url: '/gp-profile',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/social-login/google/profile.html',
                        controller: 'GpProfileCtrl'
                    }
                }
            })

            //  FEATURES

            .state('app.pull', {
                url: '/features/pull',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/pull-to-refresh.html',
                        controller: 'PullCtrl'
                    }
                }
            })

            .state('app.infinite', {
                url: '/features/infinite',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/infinite.html',
                        controller: 'MyInfiniteCtrl'
                    }
                }
            })

            .state('app.pinchzoom', {
                url: '/features/pinchzoom',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/pinch-zoom.html',
                        controller: 'PinchZoomCtrl'
                    }
                }
            })

            .state('app.backtotop', {
                url: '/features/backtotop',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/back-to-top.html',
                        controller: 'BackToTopCtrl'
                    }
                }
            })

            .state('app.youtube', {
                url: '/features/youtube',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/youtube.html',
                        controller: 'YoutubeCtrl'
                    }
                }
            })

            .state('app.share', {
                url: '/features/share',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/share.html',
                        controller: 'SocialCtrl'
                    }
                }
            })

            .state('app.callemailsms', {
                url: '/features/callemailsms',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/call-email-sms.html',
                        controller: 'CallEmailSmsCtrl'
                    }
                }
            })

            .state('app.impicker', {
                url: '/features/impicker',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/impicker.html',
                        controller: 'ImgPickerCtrl'
                    }
                }
            })

            .state('app.admob', {
                url: '/features/admob',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/features/admob.html',
                        controller: 'AdmobCtrl'
                    }
                }
            })

            //  HARDWARE

            .state('app.vibra', {
                url: '/hardware/vibra',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hardware/vibra.html',
                        controller: 'VibraCtrl'
                    }
                }
            })

            .state('app.toast', {
                url: '/hardware/toast',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hardware/toast.html',
                        controller: 'ToastCtrl'
                    }
                }
            })

            .state('app.dialog', {
                url: '/hardware/dialog',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hardware/dialog.html',
                        controller: 'DialogCtrl'
                    }
                }
            })

            .state('app.devinfo', {
                url: '/hardware/devinfo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hardware/devinfo.html',
                        controller: 'DevInfoCtrl'
                    }
                }
            })

            .state('app.flash', {
                url: '/hardware/flash',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hardware/flashlight.html',
                        controller: 'FlashCtrl'
                    }
                }
            })

            .state('app.netinfo', {
                url: '/hardware/netinfo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hardware/netinfo.html',
                        controller: 'NetInfoCtrl'
                    }
                }
            })

            //  MATERIAL DESIGN

            .state('app.component', {
                url: '/material/component',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/material/components.html',
                        controller: 'ComponentCtrl'
                    }
                }
            })

            .state('app.motionlist', {
                cache: false,
                url: '/material/motion',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/material/motion.html',
                        controller: 'MotionCtrl'
                    }
                }
            });;

        $urlRouterProvider.otherwise('/app/guard/dash');
    })


// It is used to convert datetime into time ago format

moment.locale('en', {
    relativeTime : {
        future: " %s",
        past:   "%s",
        s:  "1s",
        m:  "1m",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "1d",
        dd: "%dd",
        M:  "1m",
        MM: "%dm",
        y:  "1y",
        yy: "%dy"
    }
});
