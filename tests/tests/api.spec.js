// tests/api.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe.serial('Simple Grocery Store API - flujo de Bruno', () => {
  let apiContext;
  let accessToken;
  let cartId;
  let orderId;

  const BASE = 'https://simple-grocery-store-api.click';
  const LOGIN_ENDPOINT = '/api-clients'; // <-- reemplaza si tu collection usa otro endpoint

  test.beforeAll(async () => {
    apiContext = await request.newContext({ baseURL: BASE });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

    test('1) Crear token (login con email único)', async () => {
    const email = `vicente_${Date.now()}@demo.com`;
    const res = await apiContext.post(LOGIN_ENDPOINT, {
      data: { clientName: 'Usuario Bruno', clientEmail: email }
    });

    expect(res.status()).toBe(201);

    const body = await res.json();
    accessToken = body.accessToken;
    expect(accessToken).toBeTruthy();

    // 🟢 Imprimir valores en consola
    console.log('\n==============================');
    console.log('✅ TOKEN GENERADO CORRECTAMENTE');
    console.log('Email:', email);
    console.log('Access Token:', accessToken);
    console.log('==============================\n');
  });

  test('2) Crear carrito (cart)', async () => {
    const res = await apiContext.post('/carts', {
      headers: { Authorization: `Bearer ${accessToken}` }
      // body vacío según tu colección
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    cartId = body.cartId;
    expect(cartId).toBeTruthy();

    // 🟢 Imprimir valores en consola
    console.log('\n==============================');
    console.log('✅ CARRO GENERADO CORRECTAMENTE');
    console.log('CartId:', cartId);
  });

  

  test('3) Agregar item al carrito', async () => {
    const productId = 1225; // usa un productId válido de tu entorno (ajusta)
    const res = await apiContext.post(`/carts/${cartId}/items`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: { productId, quantity: 1 }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    // valida que el item se añadió al cart (la respuesta depende de la API)
    expect(body).toBeDefined();
    // si la API devuelve cartId:
    if (body.cartId) expect(body.cartId).toBe(cartId);
  });

  test('4) Crear order (usando el cartId)', async () => {
    const res = await apiContext.post('/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: { cartId, customerName: 'Cesar De Martinez', comment: 'Primera orden' }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    orderId = body.orderId;
    expect(orderId).toBeTruthy();
  });

  test('5) Asociar cart a order (PATCH)', async () => {
    // PATCH suele devolver 204 No Content (según Bruno)
    const res = await apiContext.patch(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: { cartId }
    });
    expect(res.status()).toBe(204);
    // no await res.json() aquí porque es 204
  });

  test('6) GET order y validar', async () => {
  const res = await apiContext.get(`/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  expect(res.status()).toBe(200);

  const body = await res.json();

  // algunos devuelven id, no orderId
  const returnedOrderId = body.orderId || body.id;
  expect(returnedOrderId).toBe(orderId);

  if (body.cartId) {
    expect(body.cartId).toBe(cartId);
  } else {
    console.warn('⚠️ GET /orders no devuelve cartId — validación opcional omitida.');
  }
});
});
