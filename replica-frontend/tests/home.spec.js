import { test, expect } from '@playwright/test';

test('Home screen matches baseline', async ({ page }) => {
  await page.goto('http://localhost:5173/home');

  // Mask dynamic elements
  await page.locator('h2').evaluateAll(nodes =>
    nodes.forEach(n => n.textContent = "<<DATE>>")
  );

  expect(await page.screenshot()).toMatchSnapshot('home.png');
});
