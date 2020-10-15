# node-vt

Welcome to **node-vt**, a VirusTotal API client made by BadBoyHaloCat!

## Note

If you are reading this from GitHub, some links will be broken. Check out the [docs](https://thetayloredman.github.io/node-vt/)!

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

1. Go to [https://www.virustotal.com/](https://www.virustotal.com/).
2. Sign up for an account.
3. Click on your name in the top right corner.
4. Select **API Key**.
5. Copy the API key.
6. You now have your API key.

### Making a client

In order to interface with the API, we have 2 options.

1. Using the [`Client`](Client.html) class
2. Using [`APIRequest`](APIRequest.html)

#### Using `Client`

First, we create a Client with our API key:

```javascript
const key = 'your-api-key-here';

const client = new VT.Client(key);
```

Now we can use the Client! For more information, see [`Client`](Client.html)

#### Using `APIRequest`

This is a bit advanced, but we can use the `APIRequest` class to send direct requests to the API.

Here is a demo:

```javascript
const key = 'your-api-key-here';

function request(method, path, data) {
    /**
     * APIRequest's constructor takes 3 parameters.
     * 
     * 1. The method (GET/POST/etc.)
     * 2. The path ("/", "/files", etc.)
     * 3. Your API key.
     */
    const req = new VT.APIRequest(method, path, key);

    /**
     * To *send* this request, we use APIRequest#send.
     */
    if (method === 'POST') {
        req.send(data)
            .then(handle); // Fire the callback
    } else {
        req.send()
            .then(handle); // Fire the callback
    }

    /**
     * We need to handle the request when it's done.
     */
    const handle = (data) => {
        // data is a Response with the RAW API response.
        // We can get the data as JSON and log it.
        console.log(data.data.json);
    }
}
```