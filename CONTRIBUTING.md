## Contributing Guide
---

### Submitting Issues (Bug reports)
If you found a bug or typo on the website, please follow these steps to properly report it:
1. Sign-up / Log-in to GitHub
2. Go to [Issues tab](https://github.com/romankisil/eqmac-website/issues) **and make sure your issue was not reported yet**
3. **If issue wasn't reported yet**, create a new one.
3. Set the Label (on the right) to Bug or any other appropriate
4. Describe the Bug as much as possible
5. If possible include some Screenshots

### Fixing Issues and Adding new Languages
1. First, create an Issue with an 'enhancement' or 'bug' label
2. Before doing any work, wait for someone to approve or discuss the issue
3. Once work has been approved and/or coordinated, fork the repository

4. Code bugs: Write code in your Forked repository. Make sure to properly comment complex solutions
<br>Languages: Copy ./src/locales/en-GB.json to the same folder with your locale name, translate english to your language.

5. Once you are happy with your code / translation, test it until no bugs are prevalent.
6. Submit a [New Pull Request](https://github.com/romankisil/eqmac-website/pulls) and wait for someone to review it.
7. Once your Pull Request has been reviewed and approved it will be merged

## How to Install and build
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
