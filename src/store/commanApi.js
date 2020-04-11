export const getDataApi = (url, accessToken) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": accessToken
                }
            }).then(response =>
                response.json()).then(response => {
                console.log("Get Api data response", response)
                if (response !== null) {
                    let data = response;
                    if (data !== null && Object.keys(data).length !== 0) {
                        if (data.statusCode === 200) {
                            resolve(data);
                        }
                    }
                } else {
                    reject(data);
                }
            })
            .catch(error => {
                reject(error);
                console.log("GEt Api data error", error)
            });
    });
};

export const postDataApi = (url, body, headers) => {
    let data = JSON.stringify(body)
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers,
            body: data
        }).then(response =>
            response.json()).then(response => {
            console.log('Post response:', response)
            if (response != null) {
                if (response != null && Object.keys(response).length !== 0) {
                    if (response.statusCode === 200) {
                        resolve(response);
                    } else {
                        reject(response)
                    }
                }
            } else {
                reject(response)
            }
        }).catch(error => {
            reject(error);
        });
    });
};

export const putDataApi = (url, body,authToken) => {
    let data = JSON.stringify(body)
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": authToken
        },
        body: data
      }).then(response =>
        response.json()).then(response => {
          console.log("Put Api data response", response)
          if (response !== null) {
            let data = response;
            if (data !== null && Object.keys(data).length !== 0) {
              if (data.statusCode === 200 || data.statusCode === 303) {
                resolve(data);
              }
            }
          } else {
            reject(data);
          }
        })
        .catch(error => {
          reject(error);
          console.log("putAPIerror", error)
        });
    });
  };

export const uploadImageApi = (url, body, headers) => {

    return new Promise((resolve, reject) => {
        fetch(url, {
                method: 'POST',
                headers,
                body: body
            }).then(response =>
                response.json()).then(response => {
                console.log("Post Api data response", response)
                if (response !== null) {
                    let data = response;
                    if (data !== null && Object.keys(data).length !== 0) {
                        if (data.statusCode === 200 || data.statusCode === 303) {
                            console.log("in")
                            resolve(data);
                        }
                    }
                } else {
                    reject(data);
                }
            })
            .catch(error => {
                reject(error);
                console.log("imageUploadAPIError", error)
            });
    });
};