cooker
==================

##grunt.jsのタスク
- 'livereloadx' ブラウザのライブリロード（chromreのアドオン必要）
- 'connect' ローカルサーバー
- 'esteWatch' ファイル監視
- 'bower' ベンダーライブラリのインストール（インストールするライブラリはbower.jsonで管理）　
- 'jshint' jsエラーチェック
- 'concat' jsファイル結合
- 'uglify' jsファイルにクレジットバナー追加
- 'validation' hmtlエラーチェック
- 'htmlmin' html圧縮
- 'csslint' cssエラーチェック
- 'usebanner' cssファイルにクレジットバナー追加
- 'less' lessのコンパイル
- 'csscomb' cssの最適化
- 'shell' jekyllコマンド実行
- 'copy' ファイルコピー
- 'notify' growl通知


##install 
ローカル環境に'git','node','npm','ruby','gem'をインストールされているか確認。
```
$ git -v
$ node -v
$ npm -v
$ ruby -v
$ gem -v
```

確認後'jekyll','grunt','bower'をインストール
```
$ gem install jekyll
$ npm install -g grunt-cli
$ npm install -g bower
```

###Step 1
作業用ディレクトリでgit cloneかダウンロードしてファイルの準備。
```
$ cd my-site
$ git clone https://github.com/teq-inc/cooker.git
```

###Step 2
npmでgruntのモジュールを作業用ディレクトリにインストール。
```
$ cd cooker/
$ npm install
```
node_modulesフォルダが作られる。

###Step 3
gruntとbowerで関連ファイルのインストール→ビルドを行う。
```
$ grunt go
```
インストールが成功するとブラウザが起動する。
  
##grunt commnad

###default
サーバー起動（+livereload）　→　ファイル監視（jekyll,less）
```
$ grunt　
```

###go
vendorファイルをbowerでインストール → grunt build → grunt default
```
$ grunt go
```

###build
エラーチェック → ファイルの最適化 → ビルド
```
$ grunt build
```
