
export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.token; // Return the authentication token
  } catch (error) {
    throw error;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem('authToken');
};



export const fetchCustomers = async () => {
  try {
    const response = await fetch('/api/customers');  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

