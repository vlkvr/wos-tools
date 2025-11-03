# GitHub Pages Deployment Guide

## 🚀 Готовность к развертыванию на GitHub Pages

Этот проект готов к развертыванию на GitHub Pages как статический сайт.

## 📋 Что уже настроено

### ✅ SPA Routing
- Создан `client/public/404.html` для корректной работы маршрутизации на GitHub Pages
- Используется `wouter` для клиентской навигации

### ✅ Статический сайт
- Все калькуляторы работают полностью на клиенте
- Данные хранятся в localStorage
- Нет серверных запросов

## 🔧 Настройка GitHub Pages

### Метод 1: GitHub Actions (Рекомендуется)

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build for GitHub Pages
      run: |
        export GITHUB_PAGES_BASE=/$(basename ${{ github.repository }})/
        npx vite build --base=/$(basename ${{ github.repository }})/
        
    - name: Fix SPA routing
      run: |
        cp dist/public/index.html dist/public/404.html
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist/public
```

### Метод 2: Ручная сборка

1. Склонируйте репозиторий
2. Установите зависимости: `npm install`
3. Соберите проект с правильным base path: 
   ```bash
   npx vite build --base=/your-repo-name/
   ```
4. Скопируйте index.html в 404.html для SPA routing:
   ```bash
   cp dist/public/index.html dist/public/404.html
   ```
5. Загрузите содержимое папки `dist/public` в ветку `gh-pages`

## ⚙️ Настройки репозитория

1. В Settings → Pages → Source выберите "Deploy from a branch"
2. Branch: `gh-pages` 
3. Folder: `/ (root)`

## 🌐 Base Path

Если ваш репозиторий называется `wos-calc`, сайт будет доступен по адресу:
`https://yourusername.github.io/wos-calc/`

## 🧹 Оптимизация (опционально)

Для уменьшения размера bundle можно удалить неиспользуемые компоненты:
- 49+ неиспользуемых shadcn компонентов
- TanStack Query (не используется для запросов)
- Серверные зависимости

## ⚠️ Важные замечания

- Убедитесь, что все ссылки в приложении используют относительные пути
- 404.html уже настроен для SPA routing
- Все изображения должны быть в папке assets или public