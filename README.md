# 初期設定
## 必要なツール
1. Node.js v16以降推奨
2. Yarn v1
3. Visual Studio Code

上記 3 つをインストールする必要があります。インストールできているかの確認やインストール方法は、
[Railway 準備編](https://www.notion.so/techbowl/Railway-ceba695d5014460e9733c2a46318cdec) をご確認いただき、挑戦の準備をしましょう。

その他リポジトリの更新の仕方や、トラブルシューティングについても上記の Railway 準備編にございます。
何かあった際は、まずそちらを確認しましょう。

## .envファイルの設定
クローンしたリポジトリには .env.sample というファイルがあります。それをコピーしたものを .env にファイル名を変更してください。  
Fork して最初の状態では API の URL を .env ファイルから読み込むようになっています。それを自身の .env に追記してください。

## パッケージのインストール
Clone したばかりのリポジトリは歯抜けの状態なので、必要なファイルをダウンロードする必要があります。 10 分程度掛かることもあるため、気長に待ちましょう。上から順番に __１つずつ__ コマンドを実行しましょう。

```powershell
cd railway-todo-app

yarn install
```

## ローカルサーバの起動
以下コマンドを実行します。

```powershell
yarn start
```



$ yarn start
yarn run v1.22.22
Compiled with warnings.

src\components\Header.jsx
  Line 12:10:  'cookies' is assigned a value but never used    no-unused-vars
  Line 12:19:  'setCookie' is assigned a value but never used  no-unused-vars

src\pages\EditList.jsx
  Line 61:6:  React Hook useEffect has missing dependencies: 'cookies.token' and 'listId'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

src\pages\EditTask.jsx
  Line 71:6:  React Hook useEffect has missing dependencies: 'cookies.token', 'listId', and 'taskId'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

src\pages\Home.jsx
  Line 30:6:    React Hook useEffect has a missing dependency: 'cookies.token'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  Line 48:6:    React Hook useEffect has a missing dependency: 'cookies.token'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  Line 115:20:  Expected '===' and instead saw '=='                                                     
                          eqeqeq

src\pages\NewTask.jsx
  Line 53:6:  React Hook useEffect has a missing dependency: 'cookies.token'. Either include it or remove the dependency array  react-hooks/exhaustive-deps 

src\pages\SignIn.jsx
  Line 19:10:  'cookies' is assigned a value but never used       no-unused-vars
  Line 19:30:  'removeCookie' is assigned a value but never used  no-unused-vars

src\pages\SignUp.jsx
  Line 19:10:  'cookies' is assigned a value but never used       no-unused-vars
  Line 19:30:  'removeCookie' is assigned a value but never used  no-unused-vars

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.

WARNING in src\components\Header.jsx
  Line 12:10:  'cookies' is assigned a value but never used    no-unused-vars
  Line 12:19:  'setCookie' is assigned a value but never used  no-unused-vars

src\pages\EditList.jsx
  Line 61:6:  React Hook useEffect has missing dependencies: 'cookies.token' and 'listId'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

src\pages\EditTask.jsx
  Line 71:6:  React Hook useEffect has missing dependencies: 'cookies.token', 'listId', and 'taskId'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

src\pages\Home.jsx
  Line 30:6:    React Hook useEffect has a missing dependency: 'cookies.token'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  Line 48:6:    React Hook useEffect has a missing dependency: 'cookies.token'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  Line 115:20:  Expected '===' and instead saw '=='                                                     
                          eqeqeq

src\pages\NewTask.jsx
  Line 53:6:  React Hook useEffect has a missing dependency: 'cookies.token'. Either include it or remove the dependency array  react-hooks/exhaustive-deps 

src\pages\SignIn.jsx
  Line 19:10:  'cookies' is assigned a value but never used       no-unused-vars
  Line 19:30:  'removeCookie' is assigned a value but never used  no-unused-vars

src\pages\SignUp.jsx
  Line 19:10:  'cookies' is assigned a value but never used       no-unused-vars
  Line 19:30:  'removeCookie' is assigned a value but never used  no-unused-vars

webpack compiled with 1 warning