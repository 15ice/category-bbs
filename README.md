# README

## ローカル環境

### APIサーバーの起動

```
cd backend
bundle exec thin start --ssl -p 3000 -D -V
```

### Clientサーバーの起動

```
cd frontend
npm start
```

## 本番環境

### サーバー起動
```
docker-compose build
docker-compose up
```

### 初期データ設定 ※初回のみ
```
# サーバー起動後別ターミナルで実行
docker-compose run backend rake db:create
docker-compose run backend rake db:migrate
docker-compose run backend rake db:seed
```
