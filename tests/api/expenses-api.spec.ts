import { test, expect } from '@playwright/test';

test.describe.serial('Expenses API - CRUD Lifecycle', () => {
  // Use serial to ensure tests run in order
  let userId: string;
  let expenseId: string;

  // Fetch the authenticated user's ID before running the tests
  test.beforeAll(async ({ request }) => {
    const sessionResponse = await request.get('/api/auth/session');
    expect(sessionResponse.ok()).toBeTruthy();

    const sessionData = await sessionResponse.json();
    userId = sessionData.user?.id; // Assuming the session response contains the user ID
    expect(userId, 'User ID must exist in session').toBeDefined();
  });

  test('Should create an expense succesfully', async ({ request }) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    const newExpensePayload = {
      userId: userId,
      title: 'Coffee',
      amount: 4,
      category: 'DINING',
      date: currentDate,
    };

    const createResponse = await request.post('/api/expenses', {
      data: newExpensePayload,
    });

    expect(createResponse.status()).toBe(200);

    const createdExpense = await createResponse.json();
    expect(createdExpense).toHaveProperty('id');
    expect(createdExpense.title).toBe(newExpensePayload.title);
    expect(createdExpense.amount).toBe(newExpensePayload.amount);
    expect(createdExpense.category).toBe(newExpensePayload.category);

    expenseId = createdExpense.id; // Store the created expense ID for later tests
  });

  test('Should delete an expense successfully', async ({ request }) => {
    // Ensure that expenseId is defined before attempting to delete
    expect(expenseId, 'Expense ID must be defined before deletion').toBeDefined();

    const deleteResponse = await request.delete(`/api/expenses/${expenseId}`, {
      data: {
        userId: userId,
      },
    });
    expect(deleteResponse.status()).toBe(200);

    // Optionally, verify that the expense no longer exists
    const verifyDeleteResponse = await request.delete(`/api/expenses/${expenseId}`, {
      data: {
        userId: userId,
      },
    });
    expect([404, 400]).toContain(verifyDeleteResponse.status());
  });
});
