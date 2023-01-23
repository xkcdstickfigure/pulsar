# Pulsar
Pulsar was an Electron app similar to Spotlight and Raycast. It will no longer work because it relies on cloud services that are no longer online.

![website 1](https://user-images.githubusercontent.com/97917457/214051869-b8f96d47-9a63-4b6c-ae53-f0d7fe6b2460.png)
![website 2](https://user-images.githubusercontent.com/97917457/214051966-c77f3798-cc39-47f7-951b-e178b235112d.png)

## Config Directory
The config directory contains Electron data, but it also has some files that directly affect Pulsar. `theme.css` is loaded into Pulsar and can be used for custom theming, and `api` will override the default API origin, which is useful for development. `credentials.json` contains the credentials for the Pulsar client.
