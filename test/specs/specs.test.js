var assert = require('assert');
const spell = require('spell-checker-js');

// Making sure images and graphics are all visible

describe('Images & Graphics: ', function() {
    it('should make sure that images are all visible', function () {
        browser.url('https://internet.frontier.com');
        var images = browser.isVisible('<img>');

        images.forEach(function(image) {
            assert.equal(image, true);
        });
    });

    it('should make sure that icons are all visible', function () {
        browser.url('https://internet.frontier.com');
        var icons = browser.isVisible('<i>');

        icons.forEach(function(icon) {
            assert.equal(icon, true);
        });
    });
});

// Making sure prices, phone numbers, and timer are formatted correctly (using regex)	

    describe('Prices, Phone Numbers, and Timer: ', function() {
        it('should make sure prices are formatted properly', function() {
            browser.url('https://internet.frontier.com');

            var priceCurrency = browser.getText('.price__currency');
            var priceDollars = browser.getText('.price__dollars');
            var priceCents = browser.getText('.price__cents');
            var priceFrequency = browser.getText('.price__frequency');

            assert(priceCurrency === '$'); 
            assert(!isNaN(parseInt(priceDollars)));
            console.log(priceCents);
            console.log(priceFrequency);            
        });

        it('should make sure phone numbers are formatted properly', function() {
            browser.url('https://internet.frontier.com');

            var phoneNumbers = browser.getText('span[data-fuse-format]');
            console.log(phoneNumbers);

            phoneNumbers.forEach(function(phoneNumber) {
                assert(/^(?:(?:\+?1\s*(?:[.]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(phoneNumber)); 
            });
        });
    });

// Making sure form is validated			
	// submit form without entering any information		
	// submit form by entering incorrect information		
    // submit form by entering valid information		
    
    describe('Form Validation: ', function() {
        it('should not submit the form with no information', function() {
            browser.url('https://internet.frontier.com');
            browser.addValue('.js-track-form-zip', '');
            browser.click('.form-address-check__button');

            var url = browser.getUrl();
            assert.equal(url,'https://internet.frontier.com/');
        });
    
        it('should not submit the form with incorrect information', function () {
            browser.url('https://internet.frontier.com');
            browser.addValue('.js-track-form-zip', 'abcde');
            browser.click('.form-address-check__button');

            var url = browser.getUrl();
            assert.equal(url,'https://internet.frontier.com/');
        });

        it('should submit the form with correct information', function () {
            browser.url('https://internet.frontier.com');
            browser.addValue('.js-track-form-zip', '23233');
            browser.click('.form-address-check__button');
            var url = browser.getUrl();       
            console.log(url);             

            assert.equal(url, 'https://internet.frontier.com/plans-pricing.html');
        });
    });

// Making sure links direct correctly		

describe('Check Links: ', function() {
    it('should have fully functional links', function() {
        browser.url('https://internet.frontier.com');
        var links = browser.getAttribute('<a>', 'href');

        //console.log(links);

        var filteredLinks = links.filter(function(link) {
            return link === null;
        });

        //console.log(filteredLinks);

        assert(filteredLinks[0] === undefined); 
    });
});

// Making sure text is correct / spelling is correct			

    describe('Spell Check: ', function() {
        it('should not have any incorrectly spelled words', function() {

            browser.url('https://internet.frontier.com');

            // Load dictionary
            spell.load('en');

            var text = browser.getText('*');

            var checkedWords = [];

            text.forEach(function(word) {

                // Checking text
                checkedWords.push(spell.check(word).toString());
            });

            var cleanedWords = checkedWords.filter(function(word) {
                return word !== ''; 
            });

            var filteredWords = cleanedWords.filter(function(word) {
                // var exceptions = [
                //     '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'FiOS'
                // ];
                
                // for (i=0; i<exceptions.length; i++) {
                //     word = word.replace(/exception[i]/g , '');        
                // }     
                
                // Filter out known characters/words that are not included in the dictionary
                word = word.replace(/,|-|0|1|2|3|4|5|6|7|8|9|FiOS/g , '');

                return word !== ''; 
            });

            // console.log(filteredWords); 
            assert(filteredWords[0] === undefined); 
        });
    });

// Making sure JavaScript interactions are working i.e. hovering, clicking, animations		
// Making sure CSS is consistent across similar elements i.e. link styling, button styling



    // ./node_modules/.bin/wdio wdio.conf.js

    // java -jar -Dwebdriver.geckdriver=./geckodriver selenium-server-standalone-3.5.3.jar