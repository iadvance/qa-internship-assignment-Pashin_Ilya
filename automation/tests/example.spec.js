// @ts-check
import { test, expect } from '@playwright/test';
const BASE_URL = 'https://www.voxys.ru/';

// Тест на кликабельность логотипа
test('ATC-001', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  // Аргумент после BASE_URL нужен так как сайт постоянно подгружает данные и 
  // Playwright ждёт, пока элемент станет полностью интерактивным, а не просто отобразится

  const logo = page.locator('.h__logo-wrp');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('href', expect.stringContaining('/'));
  await logo.click();

  await expect(page).toHaveURL(BASE_URL);
});

// Тест кнопки новостей в навигационном меню
test('ATC-002', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  await page.locator('a.h__menu-link--with-sub[href="/news.html"]').click();

  await expect(page).toHaveURL(BASE_URL + 'news.html');
});

// Тест на кнопки "Рекрутинг" в навигационном меню
test('ATC-003', async ({ page, context }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  const Button = page.locator('a.out-personal', { hasText: 'Рекрутинг' });
  await expect(Button).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    Button.click()
  ]);

  await newPage.waitForLoadState('load');

  await expect(newPage).toHaveURL('https://staff.voxys.ru/');
});

// Тест на кнопки "twin" в навигационном меню
test('ATC-004', async ({ page, context }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  const Button = page.locator('a[href="https://twin24.ai/"]');
  await expect(Button).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    Button.click()
  ]);

  await newPage.waitForLoadState('load');

  await expect(newPage).toHaveURL('https://twin24.ai/');
});

// Тест на кнопки "Касание" в навигационном меню
test('ATC-005', async ({ page, context }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  const Button = page.locator('a[href="https://kasanie-cc.ru/"]');
  await expect(Button).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    Button.click()
  ]);

  await newPage.waitForLoadState('load');

  await expect(newPage).toHaveURL('https://kasanie-cc.ru/');
});
