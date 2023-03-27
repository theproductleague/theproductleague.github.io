const API_ENDPOINT = "https://api.airtable.com/v0/appRfhrf9UrjQOxP9/newsletter";
const ACCESS_TOKEN =
  "patwRgg1iYlLE5NMA.f46ac7d733a7f5fcfa8002040e14aecf3c0d2d48df7dd9f59944ebd6be30bede";

const myInput = document.getElementById("myInput");

function addToAirtable(text) {
  axios
    .post(
      API_ENDPOINT,
      {
        fields: {
          Text: text,
        },
      },
      {
        headers: {
          Authorization: `patwRgg1iYlLE5NMA.f46ac7d733a7f5fcfa8002040e14aecf3c0d2d48df7dd9f59944ebd6be30bede`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function submitToAirtable() {
  const text = document.getElementById("myInput").value;
  console.log(text);
  addToAirtable(text);
}
