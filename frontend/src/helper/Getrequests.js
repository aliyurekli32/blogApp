

export const makeRequest=async(url, method, data,cook=false)=> {
    try {
      const response = await fetch(url, {
        method: method,
        ...(cook && {credentials: "include"}),
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }