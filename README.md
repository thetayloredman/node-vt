# node-vt

Welcome to **node-vt**, a VirusTotal API client made by BadBoyHaloCat!

## What is node-vt?

node-vt is a VirusTotal API client. It provides a simple exported API for your use.

## What is VirusTotal?

[VirusTotal](//www.virustotal.com/) is a service for scanning files with many Antivirus engines.

It provides a **free** API for your use.

## About the VT API

The VT API has 2 different tiers:

* [Free](#free)
* [Premium](#premium)

### Free

The free API is very limited.

It only has access to a subset of features, but can stull upload files. You have a `4 requests / minute` ratelimit and a `1000 requests / day` quota.

### Premium

The premium API is only obtainable if eligible, and costs a fee.

This API has almost no limitations.

## Getting Started

### Installing

To install, run:

```bash
npm install node-vt
```

### Importing

When importing `node-vt`, it's most common to use any of the following variable names:

* `vt`
* `VT`
* `nvt`
* `nVT`
* `virusTotal`
* `VirusTotal`
* **Destructuring**

Here's how to import. (*We'll use VT and Destructuring as examples*)

#### `VT`

```javascript
const VT = require('node-vt');
```

#### Destructuring

```javascript
const {
    Client
    // ... (any other imports you need)
} = require('node-vt');
```

### Getting an API key

To get an API key, follow these steps:

1. Go to [https://www.virustotal.com/](https://www.virustotal.com/)
2. Sign up for an account
3. Click on your name in the top right corner:
   ![Where to find the button](https://media.discordapp.net/attachments/731940839458340915/766376135998570596/Screen_Shot_2020-10-15_at_12.04.51_PM.png)
4. Select **![Key](https://raw.github.com/thetayloredman/node-vt/main/icons/key.svg) API Key**.
5. Copy the API key.