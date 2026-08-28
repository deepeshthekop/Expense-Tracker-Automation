import { test, expect } from '@playwright/test';

const BUDGET_CONFIG = {
  type: 'GROCERIES',
  initialCapacity: 200,
  updatedCapacity: 250,
};

test.describe.serial('Budgets API - CRUD Lifecycle', () => {
  let userId: string;

  test.beforeAll(async ({ request }) => {
    const sessionResponse = await request.get('/api/auth/session');
    expect(sessionResponse.ok()).toBeTruthy();

    const sessionData = await sessionResponse.json();
    userId = sessionData.user?.id;
    expect(userId, 'User ID must exist in session').toBeDefined();
  });

  test('Should create a budget successfully', async ({ request }) => {
    const newBudgetPayload = {
      userId: userId,
      type: BUDGET_CONFIG.type,
      capacity: BUDGET_CONFIG.initialCapacity,
    };

    const createResponse = await request.post('/api/budgets', {
      data: newBudgetPayload,
    });

    expect(createResponse.status()).toBe(200);

    const createdBudget = await createResponse.json();
    expect(createdBudget.type).toBe(BUDGET_CONFIG.type);
    expect(createdBudget.capacity).toBe(BUDGET_CONFIG.initialCapacity);
  });

  test('Should update budget capacity successfully', async ({ request }) => {
    const updatePayload = {
      userId: userId,
      type: BUDGET_CONFIG.type,
      capacity: BUDGET_CONFIG.updatedCapacity,
    };

    const updateResponse = await request.patch(`/api/budgets/${BUDGET_CONFIG.type}`, {
      data: updatePayload,
    });

    expect(updateResponse.status()).toBe(200);

    const updatedBudget = await updateResponse.json();
    expect(updatedBudget.type).toBe(BUDGET_CONFIG.type);
    expect(updatedBudget.capacity).toBe(BUDGET_CONFIG.updatedCapacity);
  });

  test('Should delete budget successfully', async ({ request }) => {
    const deletePayload = {
      userId: userId,
      type: BUDGET_CONFIG.type,
    };

    const deleteResponse = await request.delete(`/api/budgets/${BUDGET_CONFIG.type}`, {
      data: deletePayload,
    });

    expect(deleteResponse.status()).toBe(200);

    // Verify budget no longer exists
    const verifyDeleteResponse = await request.delete(`/api/budgets/${BUDGET_CONFIG.type}`, {
      data: deletePayload,
    });

    expect([404, 400]).toContain(verifyDeleteResponse.status());
  });
});
