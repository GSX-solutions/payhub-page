import { apiUrl } from "@/services/config";

export const processPayinRequestBazorpay = async (data: any) => {
  const txId = Math.floor(Math.random() * 90000) + 10000;

  const response = await fetch(
    `https://api.bazorpay.com/transactions/createtransaction?merchant_id=MR_0000013&api_key=CwZYdjcDNFlkY56P4H5SEvhCyhFE05KidHhYPW_yo9GzXSQ1&transaction_id=${data.txId}&amount=${data.amount}&user_name=${data.username}&mobile_no=${data.phone}&email=${data.emailId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    },
  )
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json);
      if (json) return json;
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export async function pinwalletPayin(details: any) {
  const referenceId = Math.floor(Math.random() * 1000000000);

  const response = await fetch(
    "https://app.pinwallet.in/api/DyupiV2/V4/GenerateUPI",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        AuthKey:
          "edb7293b7a983d8b330a52a2ef139b8ee8054ac832db536491d197fee0184667",
        IPAddress: "103.176.136.226",
        Authentication:
          "Bearer {eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTkwMDA4NjYzIiwibmFtZWlkIjoiMTQ3IiwiZW1haWwiOiJpbmZvQHdlcm5lci5hc2lhIiwianRpIjoiOTM0ODIyYzktNjk0Ny00MTJhLWE2ZTgtZmRmYzNiMzdkYjMyIiwiZXhwIjoxNjk1ODIyMjgzLCJpc3MiOiJFenVsaXhiMmIiLCJhdWQiOiJFenVsaXhiMmIifQ.VdcZVGxitNcqJ_sjWMGQ2uU7P24HIVQkAi_TjyFD9zM}",
      },
      body: JSON.stringify({
        Name: details.username,
        ReferenceId: referenceId,
        Email: details.emailId,
        Phone: details.phone,
        amount: details.amount,
      }),
    },
  )
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json);
      if (json) return json;
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

export async function checkPageExpiry(token: string) {
  return await fetch(`${apiUrl}/user/verifypageexpirytoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((resp) => resp.json())
    .then((json) => {
      // console.log(json)
      if (json) return json;
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function checkPaymentTime(token: string, id: string) {
  const response = await fetch(`${apiUrl}/user/getTransactionTime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify({
      token: token,
      transactionId: id,
    }),
  })
    .then((resp) => resp.json())
    .then((json) => {
      //console.log(json)
      if (json) return json;
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

export async function checkPaymentStatus(token: string, id: string) {
  return await fetch(`${apiUrl}/user/getTransactionStatus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify({
      token: token,
      transactionId: id,
    }),
  })
    .then((resp) => resp.json())
    .then((json) => {
      //console.log(json)
      if (json) return json;
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
}
//
// export const checkPaymentStatus = (
//   token: string,
//   id: string,
// ): Promise<boolean> =>
//   request.post(`${apiUrl}/admin/getTransactionStatus`, { token, id });
