# DiaKEM Dexcom Follower to Nightscout Bridge

Transfer CGM data from Dexcom's follower service to a Nightscout instance.

## Description

This small application will allow you to utilitize Dexcom's follower service as data provider for Nightscout.
You may ask why it was necessary to create another bridge beside of the already existing [nightscout/share2nightscout-bridge](https://github.com/nightscout/share2nightscout-bridge) which works perfectly.

There was only one single reason:

**Because time matters**

Everyone who deals with diabetes and uses a CGM sensor knows that data should be available asap. The retrieval procedure of the original bridge
is very dumb and really on periodically nightscout/share2nightscout-bridgered requests without considering the known 5 minutes gaps between data points.

This bridge uses the [DiaKEM/dexcom-api-client](https://github.com/DiaKEM/dexcom-api-client) which exactly implement this special strategy to
only ask for new data if it is expected and this will be done in a very aggresive way.

That's all to my general motivation to start writing this bridge application.

**But**

I just realized that [Chris Pitchford](https://github.com/cpitchford) just implemented this for
nightscout in this [PR](https://github.com/nightscout/cgm-remote-monitor/pull/7231).

## Installation

```
$ git clone git@github.com:DiaKEM/dexcom-follower-to-nightscout-bridge.git
$ npm install
$ npm run build
```

## Configuration

The bridge needs the following information:

* Dexcom follower username
* Dexcom follower password
* Nightscout instance url
* Nightscout api secret

The bridge allows you to provide these information over command options or environment variables:

**Command options**
```
$  ./cli sync \ -s EU \
-u DexcomUsername \
-p DexcomPassword \
-i http://my-nightscout-instance \
-a NightscoutApiSecret
```

**Environment variables**

```
DEXCOM_FOLLOWER_USERNAME=DexomUsername DEXCOM_FOLLOWER_PASSWORD=DexcomPassword DEXCOM_FOLLOWER_SERVER=EU NIGHTSCOUT_INSTANCE_URL=https://my-nightscout-instance NIGHTSCOUT_API_SECRET=NightscoutApiSecret ./cli sync  
```
## Development

Just checkout this repository and install the dependencies:

```
$ npm i
```

Now you can do your changes. To test them you have to rebuild the sources and run the corresponding command;

```
$ npm start -- sync \
-s EU \
-u DexcomUsername\
-p DexcomPassword \
-i https://your-nightscout-instance \
-a NightscoutApiSecret
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. 
Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. 
You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

* Fork the Project
* Create your Feature Branch (git checkout -b feature/AmazingFeature)
* Commit your Changes (git commit -m 'Add some AmazingFeature')
* Push to the Branch (git push origin feature/AmazingFeature)
* Open a Pull Request

### Standards

This project is using commit hooks to ensure code quality and prevent code smell. This will be done by ESLint and Prettier.
If there are noticeable problems with your code the commit will be rejected. Furthermore convential commits are used to
standardize commit messages to generate changelogs automatically.

## License

Distributed under the MIT License.

## Contact

Selcuk Kekec

E-mail: [khskekec@gmail.com](khskekec@gmail.com)
