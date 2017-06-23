### eqMac2 WebPage https://bitgapp.com/eqmac
Standalone source-code that gets compiled with Gulp and the Build is then added to a private bitgapp.com website repo.

Click [HERE](https://github.com/romankisil/eqMac2) if you are looking for the eqMac2 app repo.
___
There's no CI for now. I will upload the source manually.

### Install and build
You need to have NodeJS and NPM installed. [Download Here](https://nodejs.org/)
```
git clone https://github.com/romankisil/eqmac-webpage
cd eqmac-webpage/
npm i
gulp build
```
If gulp build fails you might need to install gulp globally:
```
sudo npm i -g gulp
```

### Run locally
```
sudo npm i -g http-server
http-server build/
```
And how you should have it running on [http://localhost:8080/](http://localhost:8080/)

### Things to do:
* Improve Design
* Improve SEO (keywords mostly)
* Make Mobile friendly (only get around 3% mobile traffic, so low priority, just for Google Ranking)
* ~~Write tests~~ (nah screw this)