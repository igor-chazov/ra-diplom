import links from './Links';

export const fetchOrder = async (order, rejectWithValue) => {
  try {
    const response = await fetch(`${links.api}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
  catch (err) {
    return rejectWithValue(err.message);
  }
}

export const fetchProducts = async (categoryId, offset, searchString, rejectWithValue) => {
  try {
    const response = await fetch(`${links.api}/items?categoryId=${categoryId}&offset=${offset}&q=${searchString}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return { data, categoryId, offset, searchString };
  }
  catch (err) {
    return rejectWithValue(err.message);
  }
}

export const fetchProduct = async (productId, rejectWithValue) => {
  try {
    const response = await fetch(`${links.api}/items/${productId}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
  catch (err) {
    return rejectWithValue(err.message);
  }
}

export const fetchCategories = async (rejectWithValue) => {
  try {
    const response = await fetch(`${links.api}/categories`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
  catch (err) {
    return rejectWithValue(err.message);
  }
}

export const fetchTopSales = async (rejectWithValue) => {
  try {
    const response = await fetch(`${links.api}/top-sales`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
  catch (err) {
    return rejectWithValue(err.message);
  }
}
