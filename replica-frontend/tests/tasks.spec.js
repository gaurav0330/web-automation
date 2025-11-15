import { test, expect } from '@playwright/test';

test('Tasks page matches baseline', async ({ page }) => {
  await page.goto('http://localhost:5173/tasks');

  await page.locator('span').evaluateAll(nodes =>
    nodes.forEach(n => {
      if (/\d/.test(n.textContent)) n.textContent = "<<NUM>>";
    })
  );

  expect(await page.screenshot()).toMatchSnapshot('tasks.png');
});
