https://github.com/ocombe/ng2-translate

1. them key va value tuong ung vao file 
https://docs.google.com/spreadsheets/d/132DHAtXabSXgcbuZciNmcEe-OmW23csuroLi9CnkO_4/edit#gid=554493754

2. copy column vi.json, en.json vao cac file tuong ung tai thu muc "assets/i18n"
- assets/i18n/(vi|en|...).json
- format json file: ctrl + shift + I

3. su dung
- Import
import {TranslateService} from 'ng2-translate/ng2-translate';

- Constructor
constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
} 

- Template
key: "HELLO": "hello {{value}}"
template: <div>{{ 'HELLO' | translate:{value: param} }}</div>
