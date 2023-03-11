## Getting Started

### Initial Local Setup

#### 1. Clone git repository

Open your terminal and clone this repository into a directory of your choice.
```
cd <path to directory of choice>
git clone https://github.com/myc37/fdps.git
```

#### 2. Install dependencies

Ensure that you have installed and are using version **16.15.X** of Node.js. 
If you have a different version of Node.js installed, you can make use of nvm for [Windows](https://github.com/coreybutler/nvm-windows) or [macOS/unix/WSL](https://github.com/nvm-sh/nvm) to change it.
```
cd fdps
npm install
```

#### 3. Set up .env File

You can rename the `.env.example` file in the repository to `.env` and add the API Token sent via email.

#### 4. Host the web application locally

Finally, run the application with the command `npm run dev` and access it at `http://127.0.0.1:5173/`.
You can also access it on your mobile phone via your IP address, eg; `192.168.X.X:5173/`.
